import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { WorkCard } from "@/components/work/WorkCard";
import { workProjects } from "@/lib/content/projects";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="work-page">
        <h1 className="sr-only">Selected work</h1>
        <div className="work-grid">
          {workProjects.map((project, index) => (
            <WorkCard index={index} key={project.slug} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
