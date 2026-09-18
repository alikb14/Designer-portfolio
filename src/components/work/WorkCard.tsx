"use client";

import Link from "next/link";
import { useVideoPreview } from "@/components/media/useVideoPreview";
import type { WorkProject } from "@/lib/content/projects";

export function WorkCard({ project }: { project: WorkProject }) {
  const { videoRef, finePointer, playing, start, stop } = useVideoPreview();

  return (
    <article
      className="work-card"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) stop();
      }}
      onPointerEnter={() => finePointer && void start()}
      onPointerLeave={() => finePointer && stop()}
    >
      <Link className="work-card-link" href={`/work/${project.slug}`}>
        <span className="work-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={project.posterAlt ?? ""} src={project.poster} />
          {project.preview ? (
            <video
              aria-hidden="true"
              className={playing ? "is-playing" : undefined}
              loop
              muted
              onError={stop}
              playsInline
              poster={project.poster}
              preload="none"
              ref={videoRef}
              src={project.preview}
            />
          ) : null}
        </span>
        <span className="work-title">{project.title}</span>
      </Link>
      {project.preview ? (
        <button
          aria-pressed={playing}
          className="work-preview-control"
          onClick={() => (playing ? stop() : void start())}
          type="button"
        >
          {playing ? "STOP PREVIEW" : "PREVIEW"}
        </button>
      ) : null}
    </article>
  );
}
