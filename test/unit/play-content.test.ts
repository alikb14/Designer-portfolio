import { describe, expect, it } from "vitest";
import { toPublishedPlayItems } from "@/sanity/lib/play-content";

describe("published Play content", () => {
  it("keeps only complete cards and accepts only Sanity-controlled assets", () => {
    expect(
      toPublishedPlayItems([
        {
          _id: "valid-item",
          artworkAlt: "A geometric project artwork",
          artworkUrl: "https://cdn.sanity.io/images/project/dataset/image.png",
          description: "A downloadable motion study.",
          downloadUrl: "https://cdn.sanity.io/files/project/dataset/file.zip",
          title: "Motion study",
        },
        {
          _id: "invalid-item",
          description: "Missing title must not render.",
          title: " ",
        },
        {
          _id: "unsafe-url-item",
          artworkUrl: "javascript:alert(1)",
          description: "Safe content with an invalid asset URL.",
          downloadUrl: "https://example.invalid/file.zip",
          title: "Safe title",
        },
      ]),
    ).toEqual([
      {
        artworkAlt: "A geometric project artwork",
        artworkUrl: "https://cdn.sanity.io/images/project/dataset/image.png",
        description: "A downloadable motion study.",
        downloadUrl: "https://cdn.sanity.io/files/project/dataset/file.zip",
        id: "valid-item",
        licenseNote: undefined,
        title: "Motion study",
      },
      {
        artworkAlt: undefined,
        artworkUrl: undefined,
        description: "Safe content with an invalid asset URL.",
        downloadUrl: undefined,
        id: "unsafe-url-item",
        licenseNote: undefined,
        title: "Safe title",
      },
    ]);
  });
});
