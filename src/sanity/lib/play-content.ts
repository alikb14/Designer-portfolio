import { isSanityAssetUrl, toDownloadUrl } from "@/sanity/lib/assets";
import { record, text } from "@/sanity/lib/validation";

export type PublishedPlayItem = {
  artworkAlt?: string;
  artworkUrl?: string;
  description: string;
  downloadUrl?: string;
  id: string;
  licenseNote?: string;
  title: string;
};

export function toPublishedPlayItems(entries: unknown): PublishedPlayItem[] {
  if (!Array.isArray(entries)) return [];
  const seen = new Set<string>();
  return entries.flatMap((value) => {
    const entry = record(value);
    const title = text(entry.title);
    const description = text(entry.description);
    const id = text(entry._id);

    if (!title || !description || !id || seen.has(id)) {
      return [];
    }
    seen.add(id);

    return [
      {
        artworkAlt: text(entry.artworkAlt),
        artworkUrl: isSanityAssetUrl(entry.artworkUrl, "/images/")
          ? entry.artworkUrl
          : undefined,
        description,
        downloadUrl: toDownloadUrl(entry.downloadUrl),
        id,
        licenseNote: text(entry.licenseNote),
        title,
      },
    ];
  });
}
