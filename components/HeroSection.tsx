"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Eye, CircleDot } from "lucide-react";

const LiquidHover = dynamic(() => import("./LiquidHover"), { ssr: false });

export function HeroSection() {
  const [viewCount, setViewCount] = useState(0);
  const [pfpIndex, setPfpIndex] = useState(0);
  const [activityText, setActivityText] = useState("Checking activity...");
  const [activityIndex, setActivityIndex] = useState(0);

  const pfpUrls = [
    "/images/avatar.png",
    "/images/avatar2.png",
    "/images/avatar3.png",
  ];

  const activityTexts = [
    "Building backend & GenAI systems...",
    "Working on LLM applications...",
    "Exploring FastAPI & backends...",
    "Training ML models...",
    "Open to opportunities",
  ];

  useEffect(() => {
    // Animate view count
    const target = Math.floor(Math.random() * 500) + 100;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil((target - current) / 20);
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setViewCount(current);
    }, 50);

    // Activity text rotation
    const activityInterval = setInterval(() => {
      setActivityIndex((prev) => {
        const next = (prev + 1) % activityTexts.length;
        setActivityText(activityTexts[next]);
        return next;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(activityInterval);
    };
  }, []);

  const togglePfp = () => {
    setPfpIndex((prev) => (prev + 1) % pfpUrls.length);
  };

  return (
    <div className="flex border-x border-edge relative animate-fade-in">
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex size-3 items-center justify-center">
          <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-500" />
          <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-500" />
        </div>
      </div>
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
        <div className="relative flex size-3 items-center justify-center">
          <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-500" />
          <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-500" />
        </div>
      </div>

      {/* Avatar with Liquid Distortion */}
      <div className="w-[35%] shrink-0 p-2 sm:w-auto sm:shrink-0 sm:p-5">
        <div
          className="aspect-square h-auto w-full rounded-[12px] border border-border p-[4px] sm:size-32 overflow-hidden cursor-pointer"
          onClick={togglePfp}
          title="Click to change avatar"
        >
          <div className="relative aspect-square h-auto w-full rounded-[8px] overflow-hidden">
            <LiquidHover
              imageSrc={pfpUrls[pfpIndex]}
              resolution={5}
              cursorSize={45}
              intensity={65}
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-center gap-1 pl-2 sm:pl-4">
        <div className="flex items-center justify-between pr-2 sm:pr-4">
          <button
            type="button"
            className="inline-flex size-5 shrink-0 items-center justify-center rounded-md text-zinc-500 outline-none hover:bg-accent hover:text-accent-foreground dark:text-zinc-400 dark:hover:bg-accent/50"
            onClick={togglePfp}
            aria-label="Toggle avatar"
          >
            <CircleDot className="size-3.5" />
          </button>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Eye className="size-3.5" />
            <span className="tabular-nums">{viewCount}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2 pb-2">
          <h1 className="font-pixel text-xl leading-none font-black sm:text-3xl">
            Bappaditya Paul
          </h1>
          {/* Verified Badge */}
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-5 h-5 shrink-0 text-[#1d9bf0] inline-block select-none"
            aria-label="Verified"
          >
            <path
              fill="currentColor"
              d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
            />
          </svg>
        </div>

        <p className="font-mono text-sm leading-snug text-balance text-muted-foreground">
          21 · AI/ML + Backend Developer
        </p>

        <span className="flex min-h-4 items-center gap-1.5 font-mono text-xs text-muted-foreground" aria-live="polite">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300"
            style={{
              background: activityIndex === 4 ? "#22c55e" : "var(--muted-foreground)",
              opacity: activityIndex === 0 ? 0.4 : 1,
            }}
          />
          <span>{activityText}</span>
        </span>
      </div>
    </div>
  );
}

export default HeroSection;
