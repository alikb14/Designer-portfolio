export function frameAncestors(studioOrigin: string | undefined): string {
  if (!studioOrigin) return "'self'";
  const url = new URL(studioOrigin);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (
    (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/" ||
    /[\s;]/.test(studioOrigin)
  ) {
    throw new Error(
      "SANITY_STUDIO_ORIGIN must be a single HTTPS origin (HTTP is allowed only for local development).",
    );
  }
  return `'self' ${url.origin}`;
}
