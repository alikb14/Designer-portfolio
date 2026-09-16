"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TypewriterText } from "@/components/motion/TypewriterText";
import type { WorkProject } from "@/lib/content/projects";

export function WorkCard({
  index,
  project,
}: {
  index: number;
  project: WorkProject;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const start = async () => {
    try {
      await videoRef.current?.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const stop = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  return (
    <article
      className="work-card"
      onPointerEnter={() => finePointer && void start()}
      onPointerLeave={() => finePointer && stop()}
    >
      <Link className="work-card-link" href={`/work/${project.slug}`}>
        <span className="work-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={project.poster} />
          <video
            aria-hidden="true"
            className={playing ? "is-playing" : undefined}
            loop
            muted
            playsInline
            poster={project.poster}
            preload="none"
            ref={videoRef}
            src={project.preview}
          />
        </span>
        <span className="work-title">
          <TypewriterText delayMs={700 + index * 100} text={project.title} />
        </span>
      </Link>
      <button
        aria-pressed={playing}
        className="work-preview-control"
        onClick={() => (playing ? stop() : void start())}
        type="button"
      >
        {playing ? "STOP PREVIEW" : "PREVIEW"}
      </button>
    </article>
  );
}
