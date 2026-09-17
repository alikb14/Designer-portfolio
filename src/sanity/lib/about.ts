import { sanityClient } from "@/sanity/lib/client";
import { isSanityAssetUrl } from "@/sanity/lib/assets";

type SanityBlock = {
  children?: readonly { text?: string }[];
};

type SanityAboutPage = {
  biography?: readonly SanityBlock[];
  portraitAlt?: string;
  portraitUrl?: string;
};

export type PublishedAboutPage = {
  biography: string;
  portraitAlt?: string;
  portraitUrl?: string;
};

const aboutPageQuery = `*[_type == "aboutPage"][0]{
  "portraitUrl": portrait.asset->url,
  "portraitAlt": portrait.alt,
  biography[]{children[]{text}}
}`;

export async function getPublishedAboutPage(): Promise<PublishedAboutPage | null> {
  try {
    const entry = await sanityClient.fetch<SanityAboutPage | null>(
      aboutPageQuery,
      {},
      { cache: "no-store" },
    );
    if (!entry) {
      return null;
    }
    const paragraphs = entry?.biography
      ?.map((block) =>
        block.children
          ?.map((child) => child.text ?? "")
          .join("")
          .trim(),
      )
      .filter((paragraph): paragraph is string => Boolean(paragraph));

    if (!paragraphs?.length) {
      return null;
    }

    return {
      biography: paragraphs.join("\n\n"),
      portraitAlt: entry.portraitAlt?.trim() || undefined,
      portraitUrl: isSanityAssetUrl(entry.portraitUrl, "/images/")
        ? entry.portraitUrl
        : undefined,
    };
  } catch {
    return null;
  }
}
