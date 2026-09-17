import { sanityClient } from "@/sanity/lib/client";
import { toVimeoPlayerUrl } from "@/lib/media/vimeo";

type SanityHomePage = {
  intro?: string;
  reelLabel?: string;
  reelVimeoUrl?: string;
};

export type PublishedHomePage = {
  intro: string;
  reelLabel?: string;
  reelVimeoUrl?: string;
};

const homePageQuery = `*[_type == "homePage"][0]{intro, reelLabel, reelVimeoUrl}`;

export async function getPublishedHomePage(): Promise<PublishedHomePage | null> {
  try {
    const entry = await sanityClient.fetch<SanityHomePage | null>(
      homePageQuery,
      {},
      { cache: "no-store" },
    );
    if (!entry) {
      return null;
    }
    const intro = entry?.intro?.trim();
    if (!intro) {
      return null;
    }

    return {
      intro,
      reelLabel: entry.reelLabel?.trim() || undefined,
      reelVimeoUrl: toVimeoPlayerUrl(entry.reelVimeoUrl),
    };
  } catch {
    return null;
  }
}
