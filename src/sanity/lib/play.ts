import { sanityClient } from "@/sanity/lib/client";
import {
  toPublishedPlayItems,
  type PublishedPlayItem,
} from "@/sanity/lib/play-content";

export type { PublishedPlayItem } from "@/sanity/lib/play-content";

const playItemsQuery = `*[_type == "playItem"] | order(order asc, _createdAt asc) {
  _id,
  title,
  description,
  "artworkUrl": artwork.asset->url,
  "artworkAlt": artwork.alt,
  "downloadUrl": download.asset->url,
  licenseNote
}`;

export async function getPublishedPlayItems(): Promise<
  PublishedPlayItem[] | null
> {
  try {
    const entries = await sanityClient.fetch<
      Parameters<typeof toPublishedPlayItems>[0]
    >(playItemsQuery, {}, { cache: "no-store" });

    return toPublishedPlayItems(entries);
  } catch {
    return null;
  }
}
