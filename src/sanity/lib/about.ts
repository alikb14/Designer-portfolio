import { record, text } from "@/sanity/lib/validation";
import { sanityClient } from "@/sanity/lib/client";
import { isSanityAssetUrl } from "@/sanity/lib/assets";

type SanityBlock = {
  children?: readonly { text?: string }[];
};

type SanityAboutPage = {
  biography?: readonly SanityBlock[];
  heading?: string;
  portraitAlt?: string;
  portraitUrl?: string;
};

export type PublishedAboutPage = {
  biography: string;
  heading?: string;
  portraitAlt?: string;
  portraitUrl?: string;
};

const aboutPageQuery = `*[_type == "aboutPage"][0]{
  heading,
  "portraitUrl": portrait.asset->url,
  "portraitAlt": portrait.alt,
  biography[]{children[]{text}}
}`;

export async function getPublishedAboutPage(): Promise<PublishedAboutPage | null> {
  try {
    const response = await sanityClient.fetch<SanityAboutPage | null>(
      aboutPageQuery,
      {},
      { cache: "no-store" },
    );
    if (!response) {
      return null;
    }
    const entry = record(response);
    const paragraphs = Array.isArray(entry.biography)
      ? entry.biography.flatMap((value) => {
          const block = record(value);
          const paragraph = Array.isArray(block.children)
            ? block.children
                .map((child) => {
                  const value = record(child).text;
                  return typeof value === "string" ? value : "";
                })
                .join("")
                .trim()
            : "";
          return paragraph ? [paragraph] : [];
        })
      : [];

    if (!paragraphs?.length) {
      return null;
    }

    return {
      biography: paragraphs.join("\n\n"),
      heading: text(entry.heading) || undefined,
      portraitAlt: text(entry.portraitAlt) || undefined,
      portraitUrl: isSanityAssetUrl(entry.portraitUrl, "/images/")
        ? entry.portraitUrl
        : undefined,
    };
  } catch {
    return null;
  }
}
