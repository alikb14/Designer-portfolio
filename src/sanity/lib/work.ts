import { toVimeoPlayerUrl } from "@/lib/media/vimeo";
import type { WorkProject } from "@/lib/content/projects";
import { isSanityAssetUrl } from "@/sanity/lib/assets";
import { sanityClient } from "@/sanity/lib/client";

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

function normalizeWorkProject(
  entry: SanityWorkProject,
): PublishedWorkProject | null {
  const title = entry.title?.trim();
  const slug = entry.slug?.current?.trim();
  const poster = isSanityAssetUrl(entry.posterUrl, "/images/")
    ? entry.posterUrl
    : isSanityAssetUrl(entry.previewPosterUrl, "/images/")
      ? entry.previewPosterUrl
      : undefined;

  if (!title || !slug || !poster) {
    return null;
  }

  return {
    credits: [],
    description: entry.summary?.trim() || "",
    detailVimeoUrl: toVimeoPlayerUrl(entry.detailVimeoUrl),
    poster,
    posterAlt: entry.posterAlt?.trim() || undefined,
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
    return entries.flatMap((entry) => {
      const project = normalizeWorkProject(entry);
      return project ? [project] : [];
    });
  } catch {
    return [];
  }
}

export async function getPublishedWorkProject(slug: string) {
  const projects = await getPublishedWorkProjects();
  return projects.find((project) => project.slug === slug);
}
