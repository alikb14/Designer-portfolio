import { describe, expect, it } from "vitest";
import {
  createAsciiGrid,
  isLand,
  landGlyphMutationInterval,
  selectQuality,
  selectLandGlyph,
} from "@/components/earth/sphere";

describe("ASCII Earth point generation", () => {
  it("creates deterministic points inside a flat circular grid", () => {
    const points = createAsciiGrid(16);

    expect(points.length).toBeGreaterThan(150);

    for (const point of points) {
      expect(point.x * point.x + point.y * point.y).toBeLessThanOrEqual(0.985);
    }

    expect(createAsciiGrid(16)).toEqual(points);
  });

  it("uses geographic land silhouettes instead of a uniform sphere", () => {
    const africaSamples: readonly (readonly [number, number])[] = [
      [18, 5],
      [10, 10],
      [25, 5],
      [12, 0],
      [25, 15],
    ];

    expect(
      africaSamples.some(([longitude, latitude]) =>
        isLand(longitude, latitude),
      ),
    ).toBe(true);
    expect(isLand(-30, 0)).toBe(false);
  });

  it("mutates land glyphs in staggered, stable time windows", () => {
    const longitude = 20;
    const latitude = 5;
    const pointIndex = 173;
    const interval = landGlyphMutationInterval(longitude, latitude, pointIndex);
    const initial = selectLandGlyph(longitude, latitude, pointIndex, 0, false);

    expect(selectLandGlyph(longitude, latitude, pointIndex, 16, false)).toBe(
      initial,
    );
    expect(
      selectLandGlyph(longitude, latitude, pointIndex, interval, false),
    ).not.toBe(initial);

    const spatialGlyphs = new Set(
      [173, 174, 175, 176, 177].map((index) =>
        selectLandGlyph(longitude, latitude, index, 0, false),
      ),
    );
    expect(spatialGlyphs.size).toBeGreaterThan(2);
  });

  it("reduces quality after sustained slow frames and recovers after fast frames", () => {
    expect(selectQuality("high", 26)).toBe("medium");
    expect(selectQuality("medium", 26)).toBe("low");
    expect(selectQuality("low", 16)).toBe("medium");
    expect(selectQuality("medium", 16)).toBe("high");
  });
});
