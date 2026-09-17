import { describe, expect, it } from "vitest";
import { toVimeoPlayerUrl } from "@/lib/media/vimeo";

describe("Vimeo URL normalization", () => {
  it("converts supported Vimeo links to the official player URL", () => {
    expect(toVimeoPlayerUrl("https://vimeo.com/1227330980")).toMatch(
      /^https:\/\/player\.vimeo\.com\/video\/1227330980\?/,
    );
    expect(toVimeoPlayerUrl("https://vimeo.com/1227330980?h=abc123")).toContain(
      "h=abc123",
    );
  });

  it("rejects non-Vimeo or malformed links", () => {
    expect(toVimeoPlayerUrl("https://example.com/video/123")).toBeUndefined();
    expect(toVimeoPlayerUrl("javascript:alert(1)")).toBeUndefined();
    expect(toVimeoPlayerUrl(undefined)).toBeUndefined();
  });
});
