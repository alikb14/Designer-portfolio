export function isSanityAssetUrl(
  value: unknown,
  prefix: "/images/" | "/files/",
): value is string {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "cdn.sanity.io" &&
      url.pathname.startsWith(prefix)
    );
  } catch {
    return false;
  }
}
