export function toVimeoPlayerUrl(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  try {
    const source = new URL(value);
    if (
      source.protocol !== "https:" ||
      source.username ||
      source.password ||
      source.port ||
      !["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(
        source.hostname,
      )
    ) {
      return undefined;
    }

    const match =
      source.hostname === "player.vimeo.com"
        ? source.pathname.match(/^\/video\/(\d+)\/?$/)
        : source.pathname.match(/^\/(\d+)(?:\/([a-zA-Z0-9]+))?\/?$/);
    const id = match?.[1];
    if (!id) {
      return undefined;
    }

    const player = new URL(`https://player.vimeo.com/video/${id}`);
    const hash = source.searchParams.get("h") ?? match?.[2];
    if (hash !== undefined && hash !== null && !/^[a-zA-Z0-9]+$/.test(hash))
      return undefined;
    if (hash) {
      player.searchParams.set("h", hash);
    }
    player.searchParams.set("badge", "0");
    player.searchParams.set("autopause", "0");
    player.searchParams.set("player_id", "0");
    player.searchParams.set("app_id", "58479");
    return player.toString();
  } catch {
    return undefined;
  }
}
