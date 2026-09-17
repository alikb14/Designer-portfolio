"use client";

import { useState } from "react";
import Image from "next/image";
import { TypewriterText } from "@/components/motion/TypewriterText";
import type { PublishedPlayItem } from "@/sanity/lib/play-content";

type PlayCardProps = {
  index: number;
  item: PublishedPlayItem;
};

export function PlayCard({ index, item }: PlayCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      aria-label={item.title}
      className={expanded ? "play-card is-active" : "play-card"}
      onPointerEnter={() => setExpanded(true)}
      onPointerLeave={() => setExpanded(false)}
      tabIndex={0}
    >
      <h2>{item.title}</h2>
      <div className={`play-art play-art-${index}`}>
        {item.artworkUrl ? (
          <Image
            alt={item.artworkAlt ?? ""}
            fill
            sizes="(max-width: 680px) 100vw, (max-width: 900px) 50vw, 33vw"
            src={item.artworkUrl}
            unoptimized
          />
        ) : (
          <span aria-hidden="true" />
        )}
      </div>
      {item.downloadUrl ? (
        <a className="download-bar" download href={item.downloadUrl}>
          DOWNLOAD
        </a>
      ) : (
        <button className="download-bar" disabled type="button">
          DOWNLOAD
        </button>
      )}
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
          delayMs={40}
          key={expanded ? "expanded" : "collapsed"}
          text={item.description}
        />
      </p>
      {item.licenseNote ? <small>{item.licenseNote}</small> : null}
    </article>
  );
}
