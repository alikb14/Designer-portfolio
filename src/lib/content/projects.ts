export type WorkProject = {
  credits: readonly string[];
  description: string;
  poster: string;
  preview: string;
  slug: string;
  title: string;
};

export const workProjects: readonly WorkProject[] = [
  {
    credits: ["Animation: MD.yaad", "Direction: MD.yaad"],
    description:
      "A motion study built around shape, rhythm, and a restrained monochrome visual system.",
    poster: "/work/project-1-poster00001.png",
    preview: "/work/project-1-preview.mp4",
    slug: "project-01",
    title: "Project 01",
  },
  {
    credits: ["Animation: MD.yaad", "Direction: MD.yaad"],
    description:
      "A second motion experiment exploring pacing, contrast, and graphic transformation.",
    poster: "/work/project-2-poster00001.png",
    preview: "/work/project-2-preview.mp4",
    slug: "project-02",
    title: "Project 02",
  },
];

export function getWorkProject(slug: string) {
  return workProjects.find((project) => project.slug === slug);
}
