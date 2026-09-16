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
type LandMass = Readonly<{
  center: Coordinate;
  polygon: Polygon;
  scale: number;
}>;

// Deliberately low-resolution continent silhouettes. The visual language is
// typographic, not cartographic. Each mass is slightly reduced before an
// irregular, deterministic fragmentation pass keeps any region from reading
// as one large solid blob.
const landMasses: readonly LandMass[] = [
  {
    center: [-122, 40],
    scale: 0.84,
    polygon: [
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
  },
  {
    center: [-59, -22],
    scale: 0.82,
    polygon: [
      [-81, 12],
      [-66, 8],
      [-50, -2],
      [-36, -8],
      [-47, -28],
      [-58, -52],
      [-72, -44],
      [-76, -18],
    ],
  },
  {
    center: [-47, 70],
    scale: 0.82,
    polygon: [
      [-74, 82],
      [-22, 82],
      [-18, 66],
      [-42, 58],
      [-60, 66],
    ],
  },
  {
    center: [18, 5],
    scale: 0.82,
    polygon: [
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
  },
  {
    center: [84, 46],
    scale: 0.83,
    polygon: [
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
  },
  {
    center: [83, 17],
    scale: 0.8,
    polygon: [
      [67, 25],
      [89, 28],
      [96, 21],
      [89, 7],
      [77, 8],
    ],
  },
  {
    center: [134, -25],
    scale: 0.82,
    polygon: [
      [113, -11],
      [154, -10],
      [153, -39],
      [132, -44],
      [114, -31],
    ],
  },
  {
    center: [47, -20],
    scale: 0.8,
    polygon: [
      [43, -12],
      [51, -16],
      [50, -26],
      [44, -25],
    ],
  },
  {
    center: [-105, -73],
    scale: 1,
    polygon: [
      [-134, -68],
      [-101, -64],
      [-78, -72],
      [-104, -80],
    ],
  },
  {
    center: [6, -77],
    scale: 1,
    polygon: [
      [-25, -75],
      [8, -70],
      [34, -77],
      [3, -84],
    ],
  },
  {
    center: [112, -76],
    scale: 1,
    polygon: [
      [79, -73],
      [117, -68],
      [148, -77],
      [111, -84],
    ],
  },
];

export const landGlyphPalette = [
  "/",
  "\\",
  "+",
  ":",
  "=",
  "~",
  "*",
  "x",
] as const;
export const coastGlyphPalette = ["*", "+", "x", "/", "\\"] as const;

function wrapLongitude(longitude: number) {
  return ((longitude + 540) % 360) - 180;
}

function coordinateNoise(longitude: number, latitude: number, salt: number) {
  const value =
    Math.sin(longitude * 12.9898 + latitude * 78.233 + salt * 37.719) *
    43758.5453;

  return value - Math.floor(value);
}

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

function isInsideLandMass(
  longitude: number,
  latitude: number,
  landMass: LandMass,
) {
  const [centerLongitude, centerLatitude] = landMass.center;
  const scaledLongitude =
    centerLongitude +
    wrapLongitude(longitude - centerLongitude) / landMass.scale;
  const scaledLatitude =
    centerLatitude + (latitude - centerLatitude) / landMass.scale;

  return isInsidePolygon(scaledLongitude, scaledLatitude, landMass.polygon);
}

function keepsFragment(
  longitude: number,
  latitude: number,
  landMassIndex: number,
) {
  const broadCell = coordinateNoise(
    Math.floor(longitude / 9),
    Math.floor(latitude / 9),
    landMassIndex + 13,
  );
  const shard = coordinateNoise(
    Math.round(longitude / 3.5),
    Math.round(latitude / 3.5),
    landMassIndex + 29,
  );

  return broadCell > 0.1 && shard > 0.17;
}

export function isLand(longitude: number, latitude: number) {
  const normalizedLongitude = wrapLongitude(longitude);
  const landMassIndex = landMasses.findIndex((landMass) =>
    isInsideLandMass(normalizedLongitude, latitude, landMass),
  );

  return (
    landMassIndex >= 0 &&
    keepsFragment(normalizedLongitude, latitude, landMassIndex)
  );
}

function glyphHash(
  longitude: number,
  latitude: number,
  pointIndex: number,
  salt: number,
) {
  return coordinateNoise(
    Math.floor(longitude / 4) + pointIndex * 0.13,
    Math.floor(latitude / 4) + pointIndex * 0.07,
    salt,
  );
}

export function landGlyphMutationInterval(
  longitude: number,
  latitude: number,
  pointIndex: number,
) {
  return 360 + Math.floor(glyphHash(longitude, latitude, pointIndex, 41) * 520);
}

export function selectLandGlyph(
  longitude: number,
  latitude: number,
  pointIndex: number,
  elapsedMs: number,
  coast: boolean,
) {
  const palette = coast ? coastGlyphPalette : landGlyphPalette;
  const base = Math.floor(
    glyphHash(longitude, latitude, pointIndex, 53) * palette.length,
  );
  const step = Math.floor(
    elapsedMs / landGlyphMutationInterval(longitude, latitude, pointIndex),
  );
  const stride =
    1 +
    Math.floor(
      glyphHash(longitude, latitude, pointIndex, 67) * (palette.length - 1),
    );

  return palette[(base + step * stride) % palette.length]!;
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
