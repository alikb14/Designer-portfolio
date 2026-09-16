export type EarthQuality = "high" | "low" | "medium";

export const gridResolutionByQuality: Record<EarthQuality, number> = {
  high: 84,
  low: 54,
  medium: 70,
};

export type EarthGridPoint = Readonly<{
  index: number;
  x: number;
  y: number;
}>;

type Coordinate = readonly [longitude: number, latitude: number];
type Polygon = readonly Coordinate[];

// Deliberately low-resolution continent silhouettes. The visual language is
// typographic, not cartographic, but the major land masses remain legible.
const landPolygons: readonly Polygon[] = [
  [
    [-168, 70],
    [-140, 72],
    [-125, 55],
    [-108, 50],
    [-95, 25],
    [-82, 18],
    [-78, 8],
    [-94, 15],
    [-110, 30],
    [-125, 32],
    [-142, 50],
  ],
  [
    [-81, 12],
    [-66, 8],
    [-50, -2],
    [-36, -8],
    [-47, -28],
    [-58, -52],
    [-72, -44],
    [-76, -18],
  ],
  [
    [-74, 82],
    [-22, 82],
    [-18, 66],
    [-42, 58],
    [-60, 66],
  ],
  [
    [-18, 36],
    [8, 37],
    [35, 31],
    [52, 12],
    [43, -14],
    [31, -35],
    [16, -35],
    [4, -19],
    [-10, 5],
  ],
  [
    [-11, 36],
    [2, 56],
    [25, 71],
    [60, 74],
    [95, 76],
    [135, 66],
    [178, 61],
    [165, 43],
    [142, 35],
    [126, 20],
    [105, 8],
    [81, 8],
    [67, 24],
    [45, 29],
    [31, 40],
    [12, 42],
  ],
  [
    [67, 25],
    [89, 28],
    [96, 21],
    [89, 7],
    [77, 8],
  ],
  [
    [113, -11],
    [154, -10],
    [153, -39],
    [132, -44],
    [114, -31],
  ],
  [
    [43, -12],
    [51, -16],
    [50, -26],
    [44, -25],
  ],
  [
    [-180, -67],
    [180, -67],
    [180, -90],
    [-180, -90],
  ],
];

function isInsidePolygon(
  longitude: number,
  latitude: number,
  polygon: Polygon,
) {
  let inside = false;

  for (
    let current = 0, previous = polygon.length - 1;
    current < polygon.length;
    previous = current, current += 1
  ) {
    const [currentLongitude, currentLatitude] = polygon[current]!;
    const [previousLongitude, previousLatitude] = polygon[previous]!;
    const crossesLatitude =
      currentLatitude > latitude !== previousLatitude > latitude;
    const edgeLongitude =
      ((previousLongitude - currentLongitude) * (latitude - currentLatitude)) /
        (previousLatitude - currentLatitude || Number.EPSILON) +
      currentLongitude;

    if (crossesLatitude && longitude < edgeLongitude) inside = !inside;
  }

  return inside;
}

export function isLand(longitude: number, latitude: number) {
  return landPolygons.some((polygon) =>
    isInsidePolygon(longitude, latitude, polygon),
  );
}

export function createAsciiGrid(resolution = gridResolutionByQuality.high) {
  const points: EarthGridPoint[] = [];
  const step = 2 / (resolution - 1);

  for (let row = 0; row < resolution; row += 1) {
    for (let column = 0; column < resolution; column += 1) {
      const seed = row * resolution + column;
      const jitterX = Math.sin(seed * 12.9898) * 0.09 * step;
      const jitterY = Math.sin(seed * 78.233) * 0.09 * step;
      const x = -1 + column * step + jitterX;
      const y = -1 + row * step + jitterY;

      if (x * x + y * y > 0.985) continue;

      points.push({ index: seed, x, y });
    }
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
