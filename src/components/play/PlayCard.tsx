"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { TypewriterText } from "@/components/motion/TypewriterText";
import type { PublishedPlayItem } from "@/sanity/lib/play-content";

type PlayCardProps = {
  index: number;
  item: PublishedPlayItem;
};

export function PlayCard({ index, item }: PlayCardProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const descriptionId = useId();
  const expanded = hovered || focused || detailsOpen;

  return (
    <article
      aria-label={item.title}
      className={expanded ? "play-card is-active" : "play-card"}
      onPointerEnter={(event) => {
        if (
          event.pointerType === "mouse" &&
          window.matchMedia("(min-width: 681px)").matches
        )
          setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => {
        if (
          event.target.matches(":focus-visible") &&
          !event.target.closest(".play-details-toggle")
        )
          setFocused(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
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
        <button
          className="download-bar"
          disabled
          title="No download is available for this project yet."
          type="button"
        >
          DOWNLOAD
        </button>
      )}
      <button
        aria-expanded={detailsOpen}
        aria-controls={descriptionId}
        className="play-details-toggle"
        onClick={() => {
          setFocused(false);
          setHovered(false);
          setDetailsOpen((current) => !current);
        }}
        type="button"
      >
        {detailsOpen ? "HIDE DETAILS" : "DETAILS"}
      </button>
      <p className="play-description" id={descriptionId}>
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
