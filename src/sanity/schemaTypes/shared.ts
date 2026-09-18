import { toVimeoPlayerUrl } from "../../lib/media/vimeo";

export function hasAllowedVimeoUrl(value: unknown) {
  return Boolean(toVimeoPlayerUrl(value));
}
