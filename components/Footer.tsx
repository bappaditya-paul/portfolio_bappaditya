"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUISFX } from "@/lib/uisfx";

// ── PIXEL ART GRIDS (24x24 Matrix) ───────────────────────────────────────────
// 0: transparent, 1: white, 2: gray shadow, 3: dark outline, 
// 4: pink (nose/ears), 5: brown collar, 6: green eye, 7: blue eye
const SLEEPING_CAT = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,3,1,1,3,0,0,3,1,1,3,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,3,1,4,1,3,3,1,4,1,3,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0,0,0,0],
  [0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0,0,0],
  [0,0,0,0,3,1,1,3,1,1,1,1,1,3,1,1,1,3,0,0,0,0,0,0], // Closed eyes
  [0,0,0,0,3,1,1,1,1,1,4,1,1,1,1,1,1,3,0,0,0,0,0,0], // Pink nose
  [0,0,0,0,0,3,3,5,5,5,5,5,5,5,3,3,3,0,0,0,0,0,0,0], // Collar (Brown)
  [0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0,0,0], // Body starts
  [0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0,0],
  [0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0],
  [0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0],
  [0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0],
  [0,3,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,3,0,0,0], // Shadow
  [0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0], // Tail wrap
  [0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

const ACTIVE_CAT = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0], // Ears
  [0,0,0,0,0,0,3,1,4,3,0,0,3,4,1,3,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,3,1,1,1,3,3,3,3,1,1,1,3,0,0,0,3,3,0,0], // Tail tip
  [0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,1,3,0,3,1,1,3,0],
  [0,0,0,0,3,1,1,6,1,1,1,1,1,7,1,1,1,3,3,1,1,3,0,0], // Eyes: Green (6), Blue (7)
  [0,0,0,0,3,1,1,1,1,1,4,1,1,1,1,1,1,3,1,1,3,0,0,0], // Nose: Pink (4)
  [0,0,0,0,0,3,3,3,5,5,5,5,5,5,3,3,3,3,1,3,0,0,0,0], // Collar: Brown (5)
  [0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,3,0,3,3,0,0,0,0], // Body
  [0,0,0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0,0,0],
  [0,0,3,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0,0], // Left arm waving
  [0,3,1,1,1,3,0,3,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0],
  [0,3,1,1,3,0,0,3,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0],
  [0,0,3,3,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0],
  [0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0],
  [0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0],
  [0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0],
  [0,0,0,0,0,0,0,3,1,1,1,3,3,3,1,1,1,1,3,0,0,0,0,0], // Legs
  [0,0,0,0,0,0,0,3,1,1,3,0,0,0,3,1,1,1,3,0,0,0,0,0],
  [0,0,0,0,0,0,0,3,3,3,0,0,0,0,3,3,3,3,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
// ─────────────────────────────────────────────────────────────────────────────

function PixelCat({ grid, isDark }: { grid: number[][]; isDark: boolean }) {
  const pixelSize = 1;
  const colors = [
    "transparent",                       // 0
    isDark ? "#ffffff" : "#fbfbfb",      // 1: White cat body
    isDark ? "#d4d4d8" : "#e4e4e7",      // 2: Shadows
    isDark ? "#18181b" : "#27272a",      // 3: Crisp dark outlines
    "#fda4af",                          // 4: Pink nose/ears
    "#d97706",                          // 5: Brown collar
    "#22c55e",                          // 6: Green Eye
    "#3b82f6",                          // 7: Blue Eye
  ];

  return (
    <svg viewBox="0 0 24 24" className="w-[52px] h-[52px] shape-rendering-crispEdges select-none pointer-events-none">
      {grid.map((row, rIdx) =>
        row.map((val, cIdx) => {
          if (val === 0) return null;
          return (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx * pixelSize}
              y={rIdx * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={colors[val]}
            />
          );
        })
      )}
    </svg>
  );
}

function InteractiveCat() {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { play } = useUISFX();

  // Sync theme
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkTheme(isDark);
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Back to sleep after 3 seconds of click activity
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const showActive = isActive || isHovered;

  return (
    <div
      onClick={() => {
        setIsActive(!isActive);
        play("level-up");
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        play("hover");
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center cursor-pointer select-none p-1 transition-transform active:scale-95"
      title="Hover or click to wake the cat!"
    >
      {/* Floating Sparkles for Active mode */}
      {showActive && (
        <div className="absolute left-[-4px] top-4 w-4 h-8 overflow-hidden pointer-events-none">
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-amber-400 rounded-sm animate-ping opacity-85" />
          <div className="absolute top-4 left-2 w-1 h-1 bg-amber-300 rounded-sm animate-ping opacity-70 [animation-delay:0.3s]" />
        </div>
      )}

      {/* Floating Zzz for Sleeping mode */}
      {!showActive && (
        <div className="absolute top-[-8px] right-2 flex flex-col items-center pointer-events-none">
          <motion.span
            animate={{ opacity: [0, 1, 0], y: [0, -10, -16], x: [0, 3, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className="font-mono text-[9px] text-zinc-500 font-bold select-none"
          >
            z
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0], y: [3, -7, -12], x: [0, -2, -1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
            className="font-mono text-[11px] text-zinc-400 font-bold select-none"
          >
            Z
          </motion.span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {showActive ? (
          <motion.div
            key="active-cat-card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center rounded-[12px] border p-1 shadow-md bg-background border-edge"
          >
            <PixelCat grid={ACTIVE_CAT} isDark={isDarkTheme} />
          </motion.div>
        ) : (
          <motion.div
            key="sleeping-cat-free"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center p-1"
          >
            <PixelCat grid={SLEEPING_CAT} isDark={isDarkTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before screen-line-after relative mx-auto border-x border-edge pt-0.5 md:max-w-3xl">
        {/* Corner decorations */}
        <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2">
          <div className="relative flex size-3 items-center justify-center">
            <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-500" />
            <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-500" />
          </div>
        </div>
        <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
          <div className="relative flex size-3 items-center justify-center">
            <div className="absolute h-px w-full bg-zinc-300 dark:bg-zinc-500" />
            <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-500" />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex flex-col leading-snug">
            <span className="font-mono text-[12px] text-muted-foreground">© 2026 Bappaditya Paul</span>
            <span className="font-mono text-[12px] text-muted-foreground">Built with curiosity, code, and coffee</span>
          </div>

          {/* Interactive Animated Sleeping & Active Pixel Cat */}
          <InteractiveCat />
        </div>
      </div>

      {/* Bottom pattern */}
      <div className="mx-auto md:max-w-3xl">
        <div className="border-x border-edge select-none screen-line-before screen-line-after before:-top-px after:-bottom-px">
          <div className="overflow-hidden p-5">
            <div className="h-full min-h-[70px] w-full pattern-dots px-[5px] sm:min-h-[110px]" />
          </div>
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="h-[2px]" />
      </div>
    </footer>
  );
}

export default Footer;
