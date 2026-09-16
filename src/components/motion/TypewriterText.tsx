"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  active?: boolean;
  text: string;
};

const minimumDurationMs = 800;
const maximumDurationMs = 1_500;
const millisecondsPerCharacter = 15;

export function TypewriterText({ active = true, text }: TypewriterTextProps) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const duration = Math.min(
      maximumDurationMs,
      Math.max(minimumDurationMs, text.length * millisecondsPerCharacter),
    );
    const startedAt = performance.now();
    let animationFrame = 0;

    const update = (time: number) => {
      if (reduceMotion.matches) {
        setVisibleCharacters(text.length);
        return;
      }

      const progress = Math.min(1, (time - startedAt) / duration);
      setVisibleCharacters(Math.round(progress * text.length));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [active, text]);

  return (
    <span className="typewriter-text">
      <span aria-hidden="true" className="typewriter-text-measure">
        {text}
      </span>
      <span aria-hidden="true" className="typewriter-text-live">
        {active ? text.slice(0, visibleCharacters) : ""}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
