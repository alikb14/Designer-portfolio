export function hasAllowedVimeoUrl(value: unknown) {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "vimeo.com" || url.hostname.endsWith(".vimeo.com"))
    );
  } catch {
    return false;
  }
}
