"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Eye } from "lucide-react";

const LiquidHover = dynamic(() => import("./LiquidHover"), { ssr: false });
const PixelDrift = dynamic(() => import("./PixelDrift"), { ssr: false });

export function HeroSection() {
  const [viewCount, setViewCount] = useState(0);
  const [activityText, setActivityText] = useState("Checking activity...");
  const [activityIndex, setActivityIndex] = useState(0);
  // Detect dark mode so we can pass a real hex to the canvas
  const [isDark, setIsDark] = useState(false);

  const activityTexts = [
    "Building backend & GenAI systems...",
    "Working on LLM applications...",
    "Exploring FastAPI & backends...",
    "Training ML models...",
    "Open to opportunities",
  ];

  useEffect(() => {
    // Detect theme
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const docDark = document.documentElement.classList.contains("dark");
    setIsDark(docDark || mq.matches);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

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
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Real hex colors for canvas (CSS vars don't work on canvas)
  const pixelColor = isDark ? "#fafafa" : "#18181b";

  return (
    <div className="flex border-x border-edge relative animate-fade-in pb-4">
      {/* Avatar — single photo with LiquidHover distortion, shifted up to overlap banner */}
      <div className="w-[35%] shrink-0 p-2 sm:w-auto sm:shrink-0 sm:p-5 relative z-20 -mt-10 sm:-mt-20">
        <div
          className="aspect-square h-auto w-full rounded-[12px] border border-edge bg-background p-[4px] sm:size-32 overflow-hidden shadow-md"
          title="Bappaditya Paul"
        >
          <div className="relative aspect-square h-auto w-full rounded-[8px] overflow-hidden">
            <LiquidHover
              imageSrc="/images/avatar.jpg"
              resolution={5}
              cursorSize={45}
              intensity={65}
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-center gap-1 pl-2 sm:pl-4">
        <div className="flex items-center justify-end pr-2 sm:pr-4">
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Eye className="size-3.5" />
            <span className="tabular-nums">{viewCount}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pt-1 pb-2 pr-2 sm:pr-4">
          {/* PixelDrift name — left-aligned, flex-1 fills remaining width */}
          <div className="relative h-10 flex-1 min-w-0 sm:h-12" aria-label="Bappaditya Paul">
            <PixelDrift
              text="Bappaditya Paul"
              fontSize={26}
              fontFamily="'JetBrains Mono', monospace"
              color={pixelColor}
              gap={3}
              speed={4}
              maxDistance={80}
              resetDelay={1500}
              align="left"
              className="absolute inset-0"
            />
          </div>
        </div>

        <p className="font-sans text-sm leading-snug text-balance text-muted-foreground">
          21 · AI/ML + Backend Developer
        </p>

        <span className="flex min-h-4 items-center gap-1.5 font-sans text-xs text-muted-foreground" aria-live="polite">
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
