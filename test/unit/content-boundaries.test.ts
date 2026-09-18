import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getPublishedWorkProjects,
  normalizeWorkProject,
} from "@/sanity/lib/work";
import { getPublishedPlayItems } from "@/sanity/lib/play";
import { toPublishedPlayItems } from "@/sanity/lib/play-content";
import { getPublishedContactPage } from "@/sanity/lib/contact";
import { getPublishedAboutPage } from "@/sanity/lib/about";
import { getPublishedHomePage } from "@/sanity/lib/home";
import { isSanityAssetUrl, toDownloadUrl } from "@/sanity/lib/assets";
import { frameAncestors } from "@/lib/security/headers";
import { toVimeoPlayerUrl } from "@/lib/media/vimeo";
import { hasAllowedVimeoUrl } from "@/sanity/schemaTypes/shared";

const { fetchContent } = vi.hoisted(() => ({
  fetchContent: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
}));
vi.mock("@/sanity/lib/client", () => ({
  sanityClient: { fetch: fetchContent },
}));
const validWork = {
  title: "Work",
  slug: { current: "motion-01" },
  posterUrl: "https://cdn.sanity.io/images/project/dataset/image.png",
};
beforeEach(() => vi.clearAllMocks());

describe("CMS trust boundaries and recovery", () => {
  it("isolates malformed records and duplicate slugs", async () => {
    fetchContent.mockResolvedValue([
      null,
      { ...validWork, title: 12 },
      validWork,
      validWork,
    ]);
    expect(await getPublishedWorkProjects()).toHaveLength(1);
    for (const slug of [
      "../contact",
      "a/b",
      "a?b",
      "a#b",
      ".",
      "..",
      "%2f",
      "a".repeat(97),
    ]) {
      expect(
        normalizeWorkProject({ ...validWork, slug: { current: slug } }),
      ).toBeNull();
    }
    expect(
      toPublishedPlayItems([
        null,
        { _id: "bad", title: 12 },
        { _id: "ok", title: "Title", description: "Details", licenseNote: {} },
      ]),
    ).toEqual([expect.objectContaining({ id: "ok", licenseNote: undefined })]);
    expect(toPublishedPlayItems({})).toEqual([]);
  });

  it("distinguishes an empty Play collection from unavailable content", async () => {
    fetchContent.mockResolvedValue([]);
    expect(await getPublishedPlayItems()).toEqual([]);
    fetchContent.mockRejectedValue(new Error("CMS unavailable"));
    expect(await getPublishedPlayItems()).toBeNull();
    expect(await getPublishedWorkProjects()).toEqual([]);
    expect(await getPublishedHomePage()).toBeNull();
    expect(await getPublishedAboutPage()).toBeNull();
    expect(await getPublishedContactPage()).toBeNull();
  });

  it("ignores malformed optional fields without discarding valid page content", async () => {
    fetchContent.mockResolvedValue({ intro: "Welcome", reelLabel: 123 });
    expect(await getPublishedHomePage()).toEqual({
      intro: "Welcome",
      reelLabel: undefined,
      reelVimeoUrl: undefined,
    });
    fetchContent.mockResolvedValue({
      invitation: "Hello",
      email: "hello@example.com",
      socialLinks: [
        null,
        { label: "Bad", url: "javascript:alert(1)" },
        { label: "Profile", url: "https://example.com" },
      ],
    });
    expect(await getPublishedContactPage()).toEqual({
      invitation: "Hello",
      email: "hello@example.com",
      socialLinks: [{ label: "Profile", url: "https://example.com" }],
    });
    fetchContent.mockResolvedValue({
      biography: [
        null,
        {
          children: [null, { text: "Hello " }, { text: 12 }, { text: "world" }],
        },
      ],
      heading: 42,
    });
    expect(await getPublishedAboutPage()).toEqual(
      expect.objectContaining({ biography: "Hello world", heading: undefined }),
    );
  });

  it("rejects disguised asset origins and requests CDN attachment disposition", () => {
    for (const value of [
      "javascript:alert(1)",
      "https://cdn.sanity.io.evil.test/files/x",
      "https://user@cdn.sanity.io/files/x",
      "https://cdn.sanity.io:444/files/x",
    ]) {
      expect(isSanityAssetUrl(value, "/files/")).toBe(false);
    }
    expect(
      toDownloadUrl("https://cdn.sanity.io/files/p/d/file.zip?dl=other"),
    ).toBe("https://cdn.sanity.io/files/p/d/file.zip?dl=");
  });
});

describe("Vimeo and CSP configuration", () => {
  it("preserves unlisted path hashes and uses the same schema validation", () => {
    expect(toVimeoPlayerUrl("https://vimeo.com/123/abc123")).toContain(
      "h=abc123",
    );
    for (const value of [
      "https://vimeo.com/about",
      "https://vimeo.com/123/abc/extra",
      "https://vimeo.com/123?h=a;b",
      "https://evil.vimeo.com/123",
      "https://user@vimeo.com/123",
    ]) {
      expect(toVimeoPlayerUrl(value)).toBeUndefined();
      expect(hasAllowedVimeoUrl(value)).toBe(false);
    }
  });
  it("allows only a single validated Studio origin in frame ancestors", () => {
    expect(frameAncestors(undefined)).toBe("'self'");
    expect(frameAncestors("https://studio.example.com/")).toBe(
      "'self' https://studio.example.com",
    );
    expect(frameAncestors("http://localhost:3000")).toContain(
      "http://localhost:3000",
    );
    for (const value of [
      "https://example.com; script-src *",
      "https://example.com/path",
      "https://u:p@example.com",
      "http://external.example.com",
      "https://example.com/?q=1",
    ])
      expect(() => frameAncestors(value)).toThrow();
  });
});
