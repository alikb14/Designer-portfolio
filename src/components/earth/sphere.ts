export type EarthQuality = "high" | "low" | "medium";

export const pointCountByQuality: Record<EarthQuality, number> = {
  high: 12_000,
  low: 4_000,
  medium: 8_000,
};

const goldenAngle = Math.PI * (3 - Math.sqrt(5));

export function createSpherePoints(count = pointCountByQuality.high) {
  const points = new Float32Array(count * 4);

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    const offset = index * 4;

    points[offset] = Math.cos(theta) * radius;
    points[offset + 1] = y;
    points[offset + 2] = Math.sin(theta) * radius;
    points[offset + 3] = index % 4;
  }

  return points;
}

export function selectQuality(
  current: EarthQuality,
  averageFrameMs: number,
): EarthQuality {
  if (averageFrameMs > 25) {
    return current === "high" ? "medium" : "low";
  }

  if (averageFrameMs < 17) {
    return current === "low" ? "medium" : "high";
  }

  return current;
}
