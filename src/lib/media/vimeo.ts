export function toVimeoPlayerUrl(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  try {
    const source = new URL(value);
    if (
      source.protocol !== "https:" ||
      (source.hostname !== "vimeo.com" &&
        !source.hostname.endsWith(".vimeo.com"))
    ) {
      return undefined;
    }

    const id =
      source.pathname.match(
        /(?:^|\/)video\/(\d+)|(?:^|\/)(\d+)(?:\/|$)/,
      )?.[1] ?? source.pathname.match(/(?:^|\/)(\d+)(?:\/|$)/)?.[1];
    if (!id) {
      return undefined;
    }

    const player = new URL(`https://player.vimeo.com/video/${id}`);
    const hash = source.searchParams.get("h");
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
