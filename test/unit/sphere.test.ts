import { describe, expect, it } from "vitest";
import { createSpherePoints, selectQuality } from "@/components/earth/sphere";

describe("ASCII Earth point generation", () => {
  it("creates deterministic points on the unit sphere", () => {
    const points = createSpherePoints(16);

    expect(points).toHaveLength(64);

    for (let index = 0; index < points.length; index += 4) {
      const radius = Math.hypot(
        points[index] ?? 0,
        points[index + 1] ?? 0,
        points[index + 2] ?? 0,
      );

      expect(radius).toBeCloseTo(1, 5);
      expect(points[index + 3]).toBeGreaterThanOrEqual(0);
      expect(points[index + 3]).toBeLessThan(4);
    }
  });

  it("reduces quality after sustained slow frames and recovers after fast frames", () => {
    expect(selectQuality("high", 26)).toBe("medium");
    expect(selectQuality("medium", 26)).toBe("low");
    expect(selectQuality("low", 16)).toBe("medium");
    expect(selectQuality("medium", 16)).toBe("high");
  });
});
