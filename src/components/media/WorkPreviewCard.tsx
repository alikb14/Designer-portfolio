"use client";

import { useEffect, useRef, useState } from "react";

export function WorkPreviewCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const stop = () => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setIsPreviewing(false);
  };

  const start = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      await video.play();
      setIsPreviewing(true);
    } catch {
      setIsPreviewing(false);
    }
  };

  const toggleKeyboardPreview = () => {
    if (isPreviewing) stop();
    else void start();
  };

  return (
    <article
      className="preview-card"
      onPointerEnter={() => {
        if (finePointer) void start();
      }}
      onPointerLeave={() => {
        if (finePointer) stop();
      }}
    >
      <div className="preview-visual">
        <div aria-hidden="true" className="preview-poster">
          <span>PREVIEW ASSET</span>
        </div>
        <video
          aria-hidden="true"
          className={
            isPreviewing ? "preview-video is-playing" : "preview-video"
          }
          loop
          muted
          playsInline
          preload="none"
          ref={videoRef}
          src="/spikes/earth-reference-preview.mp4"
        />
      </div>
      <div className="preview-card-footer">
        <div>
          <p className="preview-label">Representative MP4 loop</p>
          <h2>Work-card interaction spike</h2>
        </div>
        <button
          aria-pressed={isPreviewing}
          className="preview-control"
          onClick={toggleKeyboardPreview}
          type="button"
        >
          {isPreviewing ? "Stop preview" : "Preview"}
        </button>
      </div>
      <p className="preview-note">
        Fine pointer starts a muted loop; focus remains stable and offers this
        explicit control. Touch has no hover-only action.
      </p>
    </article>
  );
}
