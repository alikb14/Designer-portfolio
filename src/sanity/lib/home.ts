import { record, text } from "@/sanity/lib/validation";
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
    const response = await sanityClient.fetch<SanityHomePage | null>(
      homePageQuery,
      {},
      { cache: "no-store" },
    );
    if (!response) {
      return null;
    }
    const entry = record(response);
    const intro = text(entry.intro);
    if (!intro) {
      return null;
    }

    return {
      intro,
      reelLabel: text(entry.reelLabel) || undefined,
      reelVimeoUrl: toVimeoPlayerUrl(entry.reelVimeoUrl),
    };
  } catch {
    return null;
  }
}
