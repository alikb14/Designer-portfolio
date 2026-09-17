import { isSanityAssetUrl } from "@/sanity/lib/assets";

type SanityPlayItem = {
  _id: string;
  artworkAlt?: string;
  artworkUrl?: string;
  description?: string;
  downloadUrl?: string;
  licenseNote?: string;
  title?: string;
};

export type PublishedPlayItem = {
  artworkAlt?: string;
  artworkUrl?: string;
  description: string;
  downloadUrl?: string;
  id: string;
  licenseNote?: string;
  title: string;
};

export function toPublishedPlayItems(
  entries: readonly SanityPlayItem[],
): PublishedPlayItem[] {
  return entries.flatMap((entry) => {
    const title = entry.title?.trim();
    const description = entry.description?.trim();

    if (!title || !description) {
      return [];
    }

    return [
      {
        artworkAlt: entry.artworkAlt?.trim() || undefined,
        artworkUrl: isSanityAssetUrl(entry.artworkUrl, "/images/")
          ? entry.artworkUrl
          : undefined,
        description,
        downloadUrl: isSanityAssetUrl(entry.downloadUrl, "/files/")
          ? entry.downloadUrl
          : undefined,
        id: entry._id,
        licenseNote: entry.licenseNote?.trim() || undefined,
        title,
      },
    ];
  });
}
