"use client";

import { Info } from "lucide-react";

export function GitHubSection() {
  // Generates realistic mock contribution data blocks matching GitHub contribution graph styling
  const generateContributionWeeks = () => {
    const weeks = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let w = 0; w < 48; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const rand = (w * 7 + d * 13) % 17;
        let level = 0;
        if (rand > 13) level = 3;
        else if (rand > 9) level = 2;
        else if (rand > 5) level = 1;
        days.push(level);
      }
      weeks.push(days);
    }
    return { weeks, months };
  };

  const { weeks, months } = generateContributionWeeks();

  const getLevelColor = (level: number) => {
    switch (level) {
      case 3: return "bg-zinc-300 dark:bg-zinc-200";
      case 2: return "bg-zinc-500 dark:bg-zinc-500";
      case 1: return "bg-zinc-700 dark:bg-zinc-700";
      default: return "bg-zinc-200/40 dark:bg-zinc-800/80";
    }
  };

  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="github">
      <header className="screen-line-after px-4">
        <div className="flex items-center justify-between py-4">
          <h2 className="font-pixelify text-2xl font-semibold tracking-tight">GitHub Activity</h2>
          <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Info className="w-3.5 h-3.5" />
            <span>Didn&apos;t code today</span>
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Months Header */}
        <div className="flex justify-between font-mono text-[10px] text-muted-foreground mb-2 px-1 overflow-hidden">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>

        {/* Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1.5 min-w-[580px] justify-between">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((level, dIdx) => (
                  <div
                    key={dIdx}
                    className={`w-2.5 h-2.5 rounded-[2px] transition-colors ${getLevelColor(level)}`}
                    title={`Activity level: ${level}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-edge/60 font-mono text-xs text-muted-foreground">
          <span>342 activities in 2026</span>
          <div className="flex items-center gap-1 text-[10px]">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-500" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-200" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
