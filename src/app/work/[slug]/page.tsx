import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getWorkProject, workProjects } from "@/lib/content/projects";
import {
  getPublishedWorkProject,
  getPublishedWorkProjects,
} from "@/sanity/lib/work";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const publishedProjects = await getPublishedWorkProjects();
  const slugs = new Set([
    ...workProjects.map(({ slug }) => slug),
    ...publishedProjects.map(({ slug }) => slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const project = (await getPublishedWorkProject(slug)) ?? getWorkProject(slug);
  return { title: project?.title ?? "Project" };
}

export default async function WorkDetailPage({ params }: ProjectPageProps) {
  const slug = (await params).slug;
  const project = (await getPublishedWorkProject(slug)) ?? getWorkProject(slug);
  if (!project) notFound();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="project-page">
        <h1>
          <TypewriterText blinkPeriod delayMs={0} text={project.title} />
        </h1>
        {project.detailVimeoUrl ? (
          <iframe
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            className="project-video"
            frameBorder={0}
            referrerPolicy="strict-origin-when-cross-origin"
            src={project.detailVimeoUrl}
            title={project.title}
          />
        ) : project.preview ? (
          <video
            className="project-video"
            controls
            playsInline
            poster={project.poster}
            preload="metadata"
            src={project.preview}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={project.posterAlt ?? ""}
            className="project-video"
            src={project.poster}
          />
        )}
        <div className="project-copy">
          <p>{project.description}</p>
          <div className="project-credits">
            {project.credits.map((credit) => (
              <p key={credit}>{credit}</p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
