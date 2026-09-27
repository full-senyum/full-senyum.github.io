"use client";

import { useEffect, useRef } from "react";

/**
 * tumbleryuk pattern: poster paints immediately; the MP4 is only attached
 * (data-src → src) once the tile is ≥20% in view, plays muted, pauses when it
 * leaves. Reduced-motion users get the poster only and download no video.
 */
export function BentoVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const attach = () => {
      if (video.dataset.loaded) return;
      const source = video.querySelector<HTMLSourceElement>("source[data-src]");
      if (source?.dataset.src) {
        source.src = source.dataset.src;
        video.load();
      }
      video.dataset.loaded = "1";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attach();
          video.muted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover"
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      disableRemotePlayback
    >
      <source data-src={src} type="video/mp4" />
    </video>
  );
}
