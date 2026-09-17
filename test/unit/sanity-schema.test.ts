import { describe, expect, it } from "vitest";
import { hasAllowedVimeoUrl } from "@/sanity/schemaTypes/shared";

describe("Sanity media schema guards", () => {
  it("accepts HTTPS Vimeo URLs only", () => {
    expect(hasAllowedVimeoUrl("https://vimeo.com/1227330980")).toBe(true);
    expect(
      hasAllowedVimeoUrl("https://player.vimeo.com/video/1227330980"),
    ).toBe(true);
    expect(hasAllowedVimeoUrl("http://vimeo.com/1227330980")).toBe(false);
    expect(hasAllowedVimeoUrl("https://example.com/video")).toBe(false);
    expect(hasAllowedVimeoUrl("<iframe src='https://player.vimeo.com'>")).toBe(
      false,
    );
  });
});
