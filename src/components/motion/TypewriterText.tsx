"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type TypewriterTextProps = {
  active?: boolean;
  delayMs?: number;
  text: string;
};

const minimumDurationMs = 1_600;
const maximumDurationMs = 2_200;
const millisecondsPerCharacter = 30;
const typingDelayMs = 700;

function TypewriterRun({
  active = true,
  delayMs = typingDelayMs,
  text,
}: TypewriterTextProps) {
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
    const startedAt = performance.now() + delayMs;
    let animationFrame = 0;

    const update = (time: number) => {
      if (reduceMotion.matches) {
        setVisibleCharacters(text.length);
        return;
      }

      const progress = Math.min(1, Math.max(0, (time - startedAt) / duration));
      setVisibleCharacters(Math.round(progress * text.length));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [active, delayMs, text]);

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

export function TypewriterText(props: TypewriterTextProps) {
  const pathname = usePathname();

  return (
    <TypewriterRun
      {...props}
      key={`${pathname}:${props.active ? "active" : "idle"}:${props.text}`}
    />
  );
}
