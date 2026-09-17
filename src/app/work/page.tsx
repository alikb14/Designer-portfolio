import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { WorkCard } from "@/components/work/WorkCard";
import { workProjects } from "@/lib/content/projects";
import { getPublishedWorkProjects } from "@/sanity/lib/work";

export const metadata: Metadata = { title: "Work" };

export default async function WorkPage() {
  const publishedProjects = await getPublishedWorkProjects();
  const projects = publishedProjects.length ? publishedProjects : workProjects;

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="work-page">
        <h1 className="sr-only">Selected work</h1>
        <div className="work-grid">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
