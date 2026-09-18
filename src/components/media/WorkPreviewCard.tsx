"use client";

import { useVideoPreview } from "./useVideoPreview";

export function WorkPreviewCard() {
  const {
    videoRef,
    finePointer,
    playing: isPreviewing,
    start,
    stop,
  } = useVideoPreview();

  const toggleKeyboardPreview = () => {
    if (isPreviewing) stop();
    else void start();
  };

  return (
    <article
      className="preview-card"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) stop();
      }}
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
          onError={stop}
          playsInline
          preload="none"
          ref={videoRef}
          src="/work/project-1-preview.mp4"
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
