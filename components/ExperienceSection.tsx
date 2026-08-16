"use client";

import { useState } from "react";
import { CodeXml, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { playUISFX } from "@/lib/uisfx";

interface ExperienceItem {
  company: string;
  companyUrl: string;
  role: string;
  type: string;
  period: string;
  description: string[];
  tags: string[];
  logo?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "National Informatics Centre (NIC)",
    companyUrl: "https://www.nic.in/",
    role: "Backend & Systems Developer Intern",
    type: "Internship",
    period: "08.2025 — 01.2026",
    description: [
      "Engineered robust and scalable backend REST APIs and secure data pipelines for government citizen-facing platforms and e-governance systems",
      "Optimized database queries and schemas to handle high-concurrency requests, reducing response latency for citizen data lookups",
      "Assisted in deploying secure server infrastructure complying with government cyber security guidelines and standard data storage protocols",
    ],
    tags: ["Node.js", "Python", "PostgreSQL", "REST APIs", "E-Governance", "Security"],
    logo: "/images/nic.png",
  },
  {
    company: "Astranex Defence (NIRMAAN IIT Madras)",
    companyUrl: "https://nirmaan.iitm.ac.in/",
    role: "AI/ML Developer — Startup Team",
    type: "Startup Team",
    period: "02.2026 — Present",
    description: [
      "Contributing to the AI/ML and computer vision development of autonomous defence-oriented systems Incubated under NIRMAAN IIT Madras",
      "Designing and implementing ML pipelines (YOLOv8, TensorFlow, OpenCV) for real-time object tracking, classification, and visual analysis",
      "Co-developed technology modules that successfully secured incubation support and funding of up to ₹2 Lakhs through the pre-incubator program",
    ],
    tags: ["Python", "OpenCV", "TensorFlow", "YOLOv8", "Computer Vision", "Robotics", "Deep Learning"],
    logo: "/images/nirman.png",
  },
];

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="screen-line-after space-y-4 py-4">
      <div className="flex items-center gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-edge bg-white dark:bg-zinc-900 p-1.5 select-none overflow-hidden">
          {item.logo ? (
            <img src={item.logo} alt={item.company} className="w-full h-full object-contain rounded" />
          ) : (
            <CodeXml className="size-5 text-muted-foreground" />
          )}
        </div>
        <h3 className="flex-1 text-lg leading-snug font-medium">
          <a
            className="underline-offset-4 hover:underline"
            href={item.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.company}
          </a>
        </h3>
      </div>

      <div className="relative space-y-4 before:absolute before:left-5 before:h-full before:w-px before:bg-border">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              playUISFX("tap");
              setOpen(!open);
            }}
            className="block w-full text-left relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-11 before:-z-[1] before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted"
          >
            <div className="relative z-[1] mb-1 flex items-center gap-3">
              <div
                className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background ml-2"
                aria-hidden="true"
              >
                <CodeXml className="size-4" />
              </div>
              <h4 className="flex-1 font-medium text-balance">{item.role}</h4>
              <ChevronUp
                className={cn(
                  "shrink-0 text-muted-foreground size-4 transition-transform duration-300 mr-2",
                  !open && "rotate-180"
                )}
              />
            </div>
            <div className="flex items-center gap-2 pl-11 text-sm text-muted-foreground">
              <dl>
                <dt className="sr-only">Employment Type</dt>
                <dd>{item.type}</dd>
              </dl>
              <div className="shrink-0 bg-border w-px h-4" role="none" />
              <dl>
                <dt className="sr-only">Employment Period</dt>
                <dd className="flex items-center gap-0.5">
                  {item.period.split(" — ").map((part, i) => (
                    <span key={i}>
                      {i > 0 && <span className="font-mono">—</span>}
                      <span>{part}</span>
                    </span>
                  ))}
                </dd>
              </dl>
            </div>
          </button>

          {/* Collapsible content */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <ul className="pl-11 pt-3 space-y-2">
              {item.description.map((desc, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed list-item list-disc list-outside ml-4"
                >
                  {desc}
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-wrap gap-1.5 pt-3 pl-11">
            {item.tags.map((tag) => (
              <li key={tag} className="flex">
                <span className="inline-flex items-center rounded-lg border bg-zinc-50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground dark:bg-zinc-900">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="experience">
      <header className="screen-line-after px-4">
        <h2 className="font-serif text-3xl font-semibold tracking-tight py-4">Experience</h2>
      </header>
      <div className="pr-2 pl-4">
        {experiences.map((item, i) => (
          <ExperienceCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
