"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

type TypewriterTextProps = {
  active?: boolean;
  blinkPeriod?: boolean;
  delayMs?: number;
  text: string;
};

const defaultDurationMs = 400;
const typingDelayMs = 0;
const subscribeHydration = () => () => {};

function TypewriterRun({
  active = true,
  blinkPeriod = false,
  delayMs = typingDelayMs,
  text,
}: TypewriterTextProps) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!active) {
      return;
    }

    const duration = defaultDurationMs;
    const startedAt = performance.now() + delayMs;
    let animationFrame = 0;

    const update = (time: number) => {
      const progress = Math.min(1, Math.max(0, (time - startedAt) / duration));
      setVisibleCharacters(Math.round(progress * text.length));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [active, delayMs, text]);

  const accessibleText = blinkPeriod ? `${text}.` : text;

  return (
    <span
      className={hydrated ? "typewriter-text" : "typewriter-text is-static"}
    >
      <span aria-hidden="true" className="typewriter-text-measure">
        {text}
        {blinkPeriod ? <span className="typewriter-period">.</span> : null}
      </span>
      <span aria-hidden="true" className="typewriter-text-live">
        {active ? text.slice(0, visibleCharacters) : ""}
        {blinkPeriod ? <span className="typewriter-period">.</span> : null}
      </span>
      <span className="sr-only">{accessibleText}</span>
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
