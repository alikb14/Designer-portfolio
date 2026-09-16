import { describe, expect, it } from "vitest";
import {
  createAsciiGrid,
  isLand,
  selectQuality,
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
    expect(isLand(20, 5)).toBe(true);
    expect(isLand(-30, 0)).toBe(false);
  });

  it("reduces quality after sustained slow frames and recovers after fast frames", () => {
    expect(selectQuality("high", 26)).toBe("medium");
    expect(selectQuality("medium", 26)).toBe("low");
    expect(selectQuality("low", 16)).toBe("medium");
    expect(selectQuality("medium", 16)).toBe("high");
  });
});
