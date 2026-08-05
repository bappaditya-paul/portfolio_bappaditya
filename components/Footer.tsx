"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function InteractiveCat() {
  const [isAngry, setIsAngry] = useState(false);
  const [zzzText, setZzzText] = useState("zZz");

  useEffect(() => {
    if (isAngry) return;
    const interval = setInterval(() => {
      setZzzText((prev) => (prev === "z" ? "zZ" : prev === "zZ" ? "zZz" : "z"));
    }, 1200);
    return () => clearInterval(interval);
  }, [isAngry]);

  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer select-none group p-2 rounded-lg transition-transform"
      onMouseEnter={() => setIsAngry(true)}
      onMouseLeave={() => setIsAngry(false)}
      onClick={() => setIsAngry(!isAngry)}
      title="Hover or click to wake the cat!"
    >
      <AnimatePresence mode="wait">
        {isAngry ? (
          <motion.div
            key="angry"
            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, -4, 0], opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Angry Speech Bubble */}
            <span className="font-mono text-[10px] font-bold text-red-500 animate-bounce mb-1">
              💢 HISS! DON'T TOUCH! 😾
            </span>
            {/* Pixel Art Cat (Angry) */}
            <pre className="font-mono text-[11px] leading-tight text-red-400 font-extrabold whitespace-pre drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
{` /\\_/\\
( ಠ益ಠ)
 > ^ < `}
            </pre>
          </motion.div>
        ) : (
          <motion.div
            key="sleeping"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Sleeping ZZZ animation */}
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-mono text-[10px] text-muted-foreground mb-0.5"
            >
              {zzzText}...
            </motion.span>
            {/* Pixel Art Cat (Sleeping) */}
            <pre className="font-mono text-[11px] leading-tight text-muted-foreground whitespace-pre">
{` /\\_/\\
(- ω -) zZ
(  "  )`}
            </pre>
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

          {/* Interactive Animated Sleeping & Angry Cat */}
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
