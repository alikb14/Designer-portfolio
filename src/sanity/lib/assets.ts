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
      !url.port &&
      !url.username &&
      !url.password &&
      url.pathname.startsWith(prefix)
    );
  } catch {
    return false;
  }
}

export function toDownloadUrl(value: unknown): string | undefined {
  if (!isSanityAssetUrl(value, "/files/")) return undefined;
  const url = new URL(value);
  // The cross-origin HTML download attribute alone cannot force attachment.
  url.searchParams.set("dl", "");
  return url.toString();
}
