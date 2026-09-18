"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useVideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const generation = useRef(0);
  const visible = useRef(true);
  const [finePointer, setFinePointer] = useState(false);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    generation.current += 1;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setPlaying(false);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    update();
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", onVisibility);
    const video = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      visible.current = entry.isIntersecting;
      if (!entry.isIntersecting) stop();
    });
    if (video) observer.observe(video);
    return () => {
      generation.current += 1;
      video?.pause();
      observer.disconnect();
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [stop]);

  const start = async () => {
    const video = videoRef.current;
    if (!video || document.hidden || !visible.current) return;
    const request = ++generation.current;
    try {
      await video.play();
      if (request === generation.current) setPlaying(true);
    } catch {
      if (request === generation.current) setPlaying(false);
    }
  };

  return { finePointer, playing, start, stop, videoRef };
}
