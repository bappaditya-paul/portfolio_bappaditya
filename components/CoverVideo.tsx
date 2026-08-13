"use client";

import { useEffect, useRef } from "react";

export function CoverVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <div className="relative border-x border-edge border-b-0 select-none overflow-hidden aspect-[1.8/1] sm:aspect-[2.8/1] w-full bg-zinc-950">
      {/* Subtle scanline/grid overlay for tech aesthetic */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/10" />
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]" />
      
      {/* Corner crosshairs matching your design system */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative flex size-3 items-center justify-center">
          <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-500" />
          <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-500" />
        </div>
      </div>
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative flex size-3 items-center justify-center">
          <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-500" />
          <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-500" />
        </div>
      </div>

      <video
        ref={videoRef}
        src="/top-banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-95 transition-opacity duration-500 hover:opacity-100"
      />
    </div>
  );
}

export default CoverVideo;
