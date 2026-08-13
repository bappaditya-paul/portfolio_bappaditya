"use client";

import { useState } from "react";
import { GraduationCap, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationItem {
  school: string;
  schoolUrl?: string;
  degree: string;
  major: string;
  period: string;
  details?: string;
}

const educations: EducationItem[] = [
  {
    school: "Indian Institute of Technology (IIT) Madras",
    schoolUrl: "https://www.iitm.ac.in/",
    degree: "Bachelor of Science",
    major: "Data Science and Applications",
    period: "2025 — 2029",
    details: "CGPA: 7.0 / 10\nChennai, India",
  },
  {
    school: "ICFAI University Tripura",
    degree: "Bachelor of Computer Applications",
    major: "BCA",
    period: "2024 — 2027",
    details: "CGPA: 8.3 / 10\nTripura, India",
  },
];

function EducationCard({ item }: { item: EducationItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="screen-line-after space-y-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>
        <h3 className="flex-1 text-lg leading-snug font-medium">
          {item.schoolUrl ? (
            <a
              className="underline-offset-4 hover:underline"
              href={item.schoolUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.school}
            </a>
          ) : (
            item.school
          )}
        </h3>
      </div>

      <div className="relative space-y-2 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="block w-full text-left relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-[1] before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted"
          >
            <div className="relative z-[1] mb-1 flex items-center gap-3">
              <div
                className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background"
                aria-hidden="true"
              >
                <GraduationCap className="size-4" />
              </div>
              <h4 className="flex-1 font-medium text-balance">
                {item.degree}
                <span className="font-normal text-muted-foreground"> · {item.major}</span>
              </h4>
              <ChevronUp
                className={cn(
                  "shrink-0 text-muted-foreground size-4 transition-transform duration-300",
                  !open && "rotate-180"
                )}
              />
            </div>
            <div className="flex items-center gap-0.5 pl-9 text-sm text-muted-foreground">
              {item.period.split(" — ").map((part, i) => (
                <span key={i}>
                  {i > 0 && <span className="font-mono">—</span>}
                  <span>{part}</span>
                </span>
              ))}
            </div>
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {item.details && (
              <p className="pl-9 pt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {item.details}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EducationSection() {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="education">
      <header className="screen-line-after px-4">
        <h2 className="font-pixelify text-2xl font-semibold tracking-tight py-4">Education</h2>
      </header>
      <div className="pr-2 pl-4">
        {educations.map((item, i) => (
          <EducationCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
