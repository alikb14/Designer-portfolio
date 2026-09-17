import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getWorkProject, workProjects } from "@/lib/content/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getWorkProject((await params).slug);
  return { title: project?.title ?? "Project" };
}

export default async function WorkDetailPage({ params }: ProjectPageProps) {
  const project = getWorkProject((await params).slug);
  if (!project) notFound();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="project-page">
        <h1>
          <TypewriterText blinkPeriod delayMs={0} text={project.title} />
        </h1>
        <video
          className="project-video"
          controls
          playsInline
          poster={project.poster}
          preload="metadata"
          src={project.preview}
        />
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
