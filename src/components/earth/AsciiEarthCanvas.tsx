"use client";

import { useEffect, useRef, useState } from "react";
import {
  createSpherePoints,
  pointCountByQuality,
  selectQuality,
  type EarthQuality,
} from "./sphere";

type EarthMetrics = {
  frameMs: number | null;
  quality: EarthQuality;
  status: "fallback" | "ready" | "reduced-motion";
};

const vertexShaderSource = `
  attribute vec4 aPoint;
  uniform float uPointerStrength;
  uniform float uTime;
  uniform vec2 uPointer;
  varying float vGlyph;

  void main() {
    float angle = uTime * 0.00012;
    float cosine = cos(angle);
    float sine = sin(angle);
    vec3 point = aPoint.xyz;
    point = vec3(
      cosine * point.x - sine * point.z,
      point.y,
      sine * point.x + cosine * point.z
    );

    float depth = (point.z + 1.0) * 0.5;
    vec2 projected = point.xy * (0.74 + depth * 0.16);
    vec2 pointerDelta = projected - uPointer;
    float pointerDistance = length(pointerDelta);
    float influence = smoothstep(0.58, 0.0, pointerDistance) * uPointerStrength;

    if (pointerDistance > 0.0001) {
      projected += normalize(pointerDelta) * influence * 0.11;
    }

    gl_Position = vec4(projected, depth * 0.1, 1.0);
    gl_PointSize = 1.5 + depth * 2.2;
    vGlyph = aPoint.w;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform vec3 uColor;
  varying float vGlyph;

  float line(vec2 point, float slope) {
    return smoothstep(0.09, 0.025, abs(point.y - point.x * slope));
  }

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float glyph;

    if (vGlyph < 0.5) {
      glyph = 1.0 - smoothstep(0.12, 0.3, length(point));
    } else if (vGlyph < 1.5) {
      glyph = line(point, 0.78);
    } else if (vGlyph < 2.5) {
      glyph = max(line(point, 0.0), line(point, 100.0));
    } else {
      glyph = max(line(point, 0.78), line(point, -0.78));
    }

    if (glyph < 0.04) discard;
    gl_FragColor = vec4(uColor, glyph);
  }
`;

function compileShader(
  context: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = context.createShader(type);

  if (!shader) {
    throw new Error("WebGL shader allocation failed.");
  }

  context.shaderSource(shader, source);
  context.compileShader(shader);

  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    throw new Error(context.getShaderInfoLog(shader) ?? "WebGL shader error.");
  }

  return shader;
}

function createProgram(context: WebGLRenderingContext) {
  const program = context.createProgram();

  if (!program) {
    throw new Error("WebGL program allocation failed.");
  }

  const vertex = compileShader(
    context,
    context.VERTEX_SHADER,
    vertexShaderSource,
  );
  const fragment = compileShader(
    context,
    context.FRAGMENT_SHADER,
    fragmentShaderSource,
  );

  context.attachShader(program, vertex);
  context.attachShader(program, fragment);
  context.linkProgram(program);
  context.deleteShader(vertex);
  context.deleteShader(fragment);

  if (!context.getProgramParameter(program, context.LINK_STATUS)) {
    throw new Error(context.getProgramInfoLog(program) ?? "WebGL link error.");
  }

  return program;
}

export function AsciiEarthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState<EarthMetrics>({
    frameMs: null,
    quality: "high",
    status: "ready",
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });

    if (!context) {
      setMetrics({ frameMs: null, quality: "low", status: "fallback" });
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const program = createProgram(context);
    const buffer = context.createBuffer();

    if (!buffer) {
      setMetrics({ frameMs: null, quality: "low", status: "fallback" });
      return;
    }

    const points = createSpherePoints();
    const pointer = {
      active: false,
      strength: 0,
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
    };
    let animationFrame = 0;
    let documentVisible = document.visibilityState === "visible";
    let inViewport = true;
    let lastFrame = performance.now();
    let measurementStarted = lastFrame;
    let renderedFrames = 0;
    let quality: EarthQuality = "high";
    let isRunning = false;

    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(context.ARRAY_BUFFER, points, context.STATIC_DRAW);
    context.useProgram(program);

    const pointAttribute = context.getAttribLocation(program, "aPoint");
    const timeUniform = context.getUniformLocation(program, "uTime");
    const pointerUniform = context.getUniformLocation(program, "uPointer");
    const pointerStrengthUniform = context.getUniformLocation(
      program,
      "uPointerStrength",
    );
    const colorUniform = context.getUniformLocation(program, "uColor");

    context.enableVertexAttribArray(pointAttribute);
    context.vertexAttribPointer(pointAttribute, 4, context.FLOAT, false, 0, 0);
    context.clearColor(0, 0, 0, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { height, width } = canvas.getBoundingClientRect();
      const nextHeight = Math.max(1, Math.round(height * dpr));
      const nextWidth = Math.max(1, Math.round(width * dpr));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.height = nextHeight;
        canvas.width = nextWidth;
      }

      context.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (time: number) => {
      const delta = Math.min(time - lastFrame, 100);
      lastFrame = time;
      pointer.x += (pointer.targetX - pointer.x) * Math.min(1, delta * 0.014);
      pointer.y += (pointer.targetY - pointer.y) * Math.min(1, delta * 0.014);
      pointer.strength +=
        ((pointer.active && finePointer.matches ? 1 : 0) - pointer.strength) *
        Math.min(1, delta * 0.01);

      context.clear(context.COLOR_BUFFER_BIT);
      context.uniform1f(timeUniform, time);
      context.uniform2f(pointerUniform, pointer.x, pointer.y);
      context.uniform1f(pointerStrengthUniform, pointer.strength);
      context.uniform3f(
        colorUniform,
        darkTheme.matches ? 0.94 : 0.08,
        darkTheme.matches ? 0.94 : 0.08,
        darkTheme.matches ? 0.94 : 0.08,
      );
      context.drawArrays(context.POINTS, 0, pointCountByQuality[quality]);

      renderedFrames += 1;
      const elapsed = time - measurementStarted;

      if (elapsed >= 1_000) {
        const averageFrameMs = elapsed / renderedFrames;
        const nextQuality = selectQuality(quality, averageFrameMs);

        if (nextQuality !== quality) {
          quality = nextQuality;
        }

        setMetrics({
          frameMs: Math.round(averageFrameMs * 10) / 10,
          quality,
          status: reducedMotion.matches ? "reduced-motion" : "ready",
        });
        measurementStarted = time;
        renderedFrames = 0;
      }

      if (isRunning && !reducedMotion.matches) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const start = () => {
      if (isRunning || !documentVisible || !inViewport) return;

      isRunning = true;
      lastFrame = performance.now();
      measurementStarted = lastFrame;
      renderedFrames = 0;

      if (reducedMotion.matches) {
        render(lastFrame);
        isRunning = false;
      } else {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrame);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;

      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.targetY = -(
        ((event.clientY - bounds.top) / bounds.height) * 2 -
        1
      );
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibilityChange = () => {
      documentVisible = document.visibilityState === "visible";

      if (documentVisible) start();
      else stop();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry?.isIntersecting ?? false;

        if (inViewport) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    const resizeObserver = new ResizeObserver(resize);

    resize();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      context.deleteBuffer(buffer);
      context.deleteProgram(program);
    };
  }, []);

  return (
    <div className="earth-prototype">
      <div aria-hidden="true" className="earth-canvas-wrap">
        <canvas className="earth-canvas" ref={canvasRef} />
        {metrics.status === "fallback" ? (
          <pre className="earth-fallback">{`   .-***-.\n .-*#####*-.\n-*##***##*-\n-*##***##*-\n .-*#####*-.\n   .-***-.`}</pre>
        ) : null}
      </div>
      <output className="spike-metric" data-testid="earth-status">
        Earth: {metrics.status}; quality: {metrics.quality}
        {metrics.frameMs ? `; ${metrics.frameMs}ms/frame` : ""}
      </output>
    </div>
  );
}
