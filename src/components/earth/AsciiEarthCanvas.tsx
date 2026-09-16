"use client";

import { useEffect, useRef, useState } from "react";
import {
  createAsciiGrid,
  gridResolutionByQuality,
  isLand,
  selectLandGlyph,
  selectQuality,
  type EarthQuality,
} from "@/components/earth/sphere";

type PointerState = {
  active: boolean;
  hasPosition: boolean;
  strength: number;
  velocity: number;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
};

const degree = 180 / Math.PI;
const revealDurationMs = 780;

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function pointNoise(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function wrapLongitude(longitude: number) {
  return ((longitude + 540) % 360) - 180;
}

function landGlyph(
  longitude: number,
  latitude: number,
  index: number,
  elapsedMs: number,
) {
  const coast =
    !isLand(wrapLongitude(longitude - 3), latitude) ||
    !isLand(wrapLongitude(longitude + 3), latitude) ||
    !isLand(longitude, Math.max(-89, latitude - 3)) ||
    !isLand(longitude, Math.min(89, latitude + 3));

  return selectLandGlyph(longitude, latitude, index, elapsedMs, coast);
}

export function AsciiEarthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const [status, setStatus] = useState("Preparing 2D Earth");

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !wrap || !context) {
      setFallback(true);
      setStatus("Static Earth fallback");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    const pointer: PointerState = {
      active: false,
      hasPosition: false,
      strength: 0,
      targetX: 0,
      targetY: 0,
      velocity: 0,
      x: 0,
      y: 0,
    };
    let quality: EarthQuality = "high";
    let points = createAsciiGrid(gridResolutionByQuality[quality]);
    let width = 1;
    let height = 1;
    let visible = true;
    let animationFrame = 0;
    let previousTime = performance.now();
    const startedAt = previousTime;
    let rotation = -18;
    let frameTotal = 0;
    let frameCount = 0;

    const resize = () => {
      const bounds = wrap.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
    };

    const draw = (time: number) => {
      const frameMs = Math.min(50, time - previousTime);
      previousTime = time;

      // The reference establishes a clearly readable geographic drift rather
      // than an almost-static globe. Reduced motion keeps that orientation cue
      // at a lower rate without disabling the pointer-driven render loop.
      rotation -= frameMs * (reducedMotion.matches ? 0.0048 : 0.0095);

      const pointerTarget = pointer.active && !coarsePointer.matches ? 1 : 0;
      const seconds = frameMs / 1_000;
      const spring = pointerTarget ? 210 : 145;
      const damping = pointerTarget ? 19 : 17;
      pointer.velocity += (pointerTarget - pointer.strength) * spring * seconds;
      pointer.velocity *= Math.exp(-damping * seconds);
      pointer.strength = clamp(
        pointer.strength + pointer.velocity * seconds,
        -0.04,
        1.08,
      );

      if (!pointerTarget && Math.abs(pointer.strength) < 0.001) {
        pointer.strength = 0;
        pointer.velocity = 0;
      }

      const pointerFollow = 1 - Math.exp(-frameMs / 48);
      pointer.x += (pointer.targetX - pointer.x) * pointerFollow;
      pointer.y += (pointer.targetY - pointer.y) * pointerFollow;

      context.clearRect(0, 0, width, height);

      const size = Math.min(width, height);
      const radius = size * 0.465;
      const centerX = width / 2;
      const centerY = height / 2;
      const fontSize = Math.max(5.5, size / 96);
      const dark =
        document.documentElement.dataset.theme === "dark" ||
        (!document.documentElement.dataset.theme && systemDark.matches);
      const ink = dark ? "245, 245, 242" : "13, 13, 12";
      const revealElapsed = time - startedAt;
      const revealProgress = clamp(
        revealElapsed /
          (reducedMotion.matches ? revealDurationMs * 0.52 : revealDurationMs),
      );

      context.font = `${fontSize}px "IBM Plex Mono", monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (const point of points) {
        const revealDelay =
          pointNoise(point.index, 1) * 0.5 + ((point.x + 1) / 2) * 0.22;
        const resolved = clamp((revealProgress - revealDelay) / 0.28);

        if (resolved <= 0.01) continue;

        const z = Math.sqrt(Math.max(0, 1 - point.x ** 2 - point.y ** 2));
        const latitude = Math.asin(-point.y) * degree;
        const longitude = wrapLongitude(
          Math.atan2(point.x, z) * degree + rotation,
        );
        const land = isLand(longitude, latitude);
        const scatter = (1 - resolved) * 0.065;
        const scatterAngle = pointNoise(point.index, 2) * Math.PI * 2;
        let x = point.x + Math.cos(scatterAngle) * scatter;
        let y = point.y + Math.sin(scatterAngle) * scatter;

        if (land && pointer.strength > 0.001) {
          const deltaX = pointer.x - x;
          const deltaY = pointer.y - y;
          const distance = Math.hypot(deltaX, deltaY);
          const influence = Math.max(0, 1 - distance / 0.64) ** 2;
          const pull = influence * pointer.strength * 0.76;
          x += deltaX * pull;
          y += deltaY * pull;
        }

        context.fillStyle = `rgba(${ink}, ${(land ? 0.92 : 0.58) * resolved})`;
        context.fillText(
          land ? landGlyph(longitude, latitude, point.index, time) : ".",
          centerX + x * radius,
          centerY + y * radius,
        );
      }

      frameTotal += frameMs;
      frameCount += 1;

      if (frameCount >= 90) {
        const nextQuality = selectQuality(quality, frameTotal / frameCount);
        if (nextQuality !== quality) {
          quality = nextQuality;
          points = createAsciiGrid(gridResolutionByQuality[quality]);
          setStatus(`2D Earth · ${quality} detail`);
        }
        frameTotal = 0;
        frameCount = 0;
      }

      if (visible && !document.hidden) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const renderOnce = () => {
      cancelAnimationFrame(animationFrame);
      previousTime = performance.now();
      draw(previousTime);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = wrap.getBoundingClientRect();
      const size = Math.min(bounds.width, bounds.height) * 0.465;
      pointer.targetX = (event.clientX - bounds.left - bounds.width / 2) / size;
      pointer.targetY = (event.clientY - bounds.top - bounds.height / 2) / size;

      if (!pointer.hasPosition) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        pointer.hasPosition = true;
      }

      pointer.active = pointer.targetX ** 2 + pointer.targetY ** 2 <= 1.25;
      wrap.dataset.pointerActive = String(pointer.active);
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      wrap.dataset.pointerActive = "false";
    };

    const handleVisibility = () => {
      if (!document.hidden && visible) renderOnce();
    };

    const handleMotionChange = () => renderOnce();
    const handleThemeChange = () => renderOnce();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) renderOnce();
      else cancelAnimationFrame(animationFrame);
    });
    const resizeObserver = new ResizeObserver(() => {
      resize();
      renderOnce();
    });

    resize();
    observer.observe(wrap);
    resizeObserver.observe(wrap);
    wrap.addEventListener("pointermove", handlePointerMove);
    wrap.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("themechange", handleThemeChange);
    reducedMotion.addEventListener("change", handleMotionChange);
    systemDark.addEventListener("change", handleThemeChange);
    setStatus(
      `2D Earth · high detail${reducedMotion.matches ? " · gentle motion" : ""}`,
    );
    renderOnce();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      resizeObserver.disconnect();
      wrap.removeEventListener("pointermove", handlePointerMove);
      wrap.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("themechange", handleThemeChange);
      reducedMotion.removeEventListener("change", handleMotionChange);
      systemDark.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <div className="earth-prototype">
      <div
        aria-label="Animated two-dimensional ASCII Earth"
        className="earth-canvas-wrap"
        ref={wrapRef}
        role="img"
      >
        <canvas aria-hidden="true" className="earth-canvas" ref={canvasRef} />
        {fallback ? (
          <pre className="earth-fallback" aria-hidden="true">
            {
              ".....***.....\n...//111*....\n..///111**...\n...******....\n.....**......"
            }
          </pre>
        ) : null}
        <noscript>
          <pre className="earth-fallback" aria-hidden="true">
            {"....***....\n..///11*...\n....***...."}
          </pre>
        </noscript>
      </div>
      <output className="spike-metric" data-testid="earth-status">
        {status}
      </output>
    </div>
  );
}
