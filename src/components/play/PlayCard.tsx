"use client";

import { useState } from "react";
import { TypewriterText } from "@/components/motion/TypewriterText";

export function PlayCard({ index }: { index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      aria-label={`Project ${index}`}
      className={expanded ? "play-card is-active" : "play-card"}
      onPointerEnter={() => setExpanded(true)}
      onPointerLeave={() => setExpanded(false)}
      tabIndex={0}
    >
      <h2>Project Name</h2>
      <div aria-hidden="true" className={`play-art play-art-${index}`}>
        <span />
      </div>
      <button className="download-bar" disabled type="button">
        DOWNLOAD
      </button>
      <button
        aria-expanded={expanded}
        className="play-details-toggle"
        onClick={() => setExpanded((current) => !current)}
        type="button"
      >
        {expanded ? "HIDE DETAILS" : "DETAILS"}
      </button>
      <p className="play-description">
        <TypewriterText
          active={expanded}
          key={expanded ? "expanded" : "collapsed"}
          text="Project file and description will be published here when the final downloadable asset is ready."
        />
      </p>
    </article>
  );
}
