import { toVimeoPlayerUrl } from "@/lib/media/vimeo";
import type { WorkProject } from "@/lib/content/projects";
import { isSanityAssetUrl } from "@/sanity/lib/assets";
import { sanityClient } from "@/sanity/lib/client";
import { record, text, isWorkSlug } from "@/sanity/lib/validation";

type SanityWorkProject = {
  _id: string;
  detailVimeoUrl?: string;
  order?: number;
  posterAlt?: string;
  posterUrl?: string;
  previewPosterUrl?: string;
  previewUrl?: string;
  slug?: { current?: string };
  summary?: string;
  title?: string;
};

const workProjectsQuery = `*[_type == "workProject"] | order(order asc, _createdAt asc) {
  _id,
  title,
  slug,
  summary,
  "posterUrl": poster.asset->url,
  "posterAlt": poster.alt,
  "previewUrl": previewVideo.asset->url,
  "previewPosterUrl": previewPoster.asset->url,
  detailVimeoUrl
}`;

export type PublishedWorkProject = WorkProject & {
  detailVimeoUrl?: string;
  posterAlt?: string;
};

export function normalizeWorkProject(
  value: unknown,
): PublishedWorkProject | null {
  const entry = record(value);
  const title = text(entry.title);
  const slug = text(record(entry.slug).current);
  const poster = isSanityAssetUrl(entry.posterUrl, "/images/")
    ? entry.posterUrl
    : isSanityAssetUrl(entry.previewPosterUrl, "/images/")
      ? entry.previewPosterUrl
      : undefined;

  if (!title || !isWorkSlug(slug) || !poster) {
    return null;
  }

  return {
    credits: [],
    description: text(entry.summary) || "",
    detailVimeoUrl: toVimeoPlayerUrl(entry.detailVimeoUrl),
    poster,
    posterAlt: text(entry.posterAlt),
    preview: isSanityAssetUrl(entry.previewUrl, "/files/")
      ? entry.previewUrl
      : undefined,
    slug,
    title,
  };
}

export async function getPublishedWorkProjects(): Promise<
  PublishedWorkProject[]
> {
  try {
    const entries = await sanityClient.fetch<SanityWorkProject[]>(
      workProjectsQuery,
      {},
      { cache: "no-store" },
    );
    if (!Array.isArray(entries)) return [];
    const seen = new Set<string>();
    return entries.flatMap((entry) => {
      const project = normalizeWorkProject(entry);
      if (!project || seen.has(project.slug)) return [];
      seen.add(project.slug);
      return [project];
    });
  } catch {
    return [];
  }
}

export async function getPublishedWorkProject(slug: string) {
  const projects = await getPublishedWorkProjects();
  return projects.find((project) => project.slug === slug);
}
