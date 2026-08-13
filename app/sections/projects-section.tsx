"use client";

import { useState } from "react";
import { CodeXml, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectItem {
  name: string;
  nameUrl?: string;
  tagline: string;
  description: string[];
  stack: string;
  tags: string[];
}

const projects: ProjectItem[] = [
  {
    name: "ArogyaVani",
    tagline: "AI-Powered Smart Health Assistant",
    description: [
      "Built an AI-powered healthcare assistant using NLP and LLM integration for symptom-based doctor recommendation and medical specialty identification",
      "Engineered an ETL pipeline processing 295+ doctor records across 20+ specialties with real-time availability filtering and interactive location mapping",
    ],
    stack: "Python · Streamlit · NLP · LLM API · Scikit-learn · Pandas",
    tags: ["Python", "Streamlit", "NLP", "LLM API", "Scikit-learn", "Pandas"],
  },
  {
    name: "Kidney Stone Detection",
    tagline: "Deep Learning System",
    description: [
      "Developed a deep learning-based kidney stone detection system using MobileNetV2, transfer learning, and medical image preprocessing techniques",
      "Deployed a Streamlit web application for real-time ultrasound image prediction with confidence scoring",
    ],
    stack: "Python · TensorFlow · Keras · MobileNetV2 · OpenCV · Streamlit",
    tags: ["Python", "TensorFlow", "Keras", "MobileNetV2", "OpenCV", "Streamlit"],
  },
];

function ProjectCard({ item }: { item: ProjectItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="screen-line-after space-y-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>
        <h3 className="text-lg leading-snug font-medium">
          {item.nameUrl ? (
            <a className="underline-offset-4 hover:underline" href={item.nameUrl} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          ) : (
            item.name
          )}
          <span className="font-normal text-muted-foreground"> — {item.tagline}</span>
        </h3>
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
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
                <CodeXml className="size-4" />
              </div>
              <h4 className="flex-1 font-medium text-balance">{item.tagline}</h4>
              <ChevronUp
                className={cn(
                  "shrink-0 text-muted-foreground size-4 transition-transform duration-300",
                  !open && "rotate-180"
                )}
              />
            </div>
            <div className="flex items-center gap-2 pl-9 text-sm text-muted-foreground flex-wrap">
              {item.stack.split(" · ").map((tech, i) => (
                <span key={i}>
                  {i > 0 && <span className="font-mono mx-1">·</span>}
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <ul className="pl-9 pt-3 space-y-2">
              {item.description.map((desc, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
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

export function ProjectsSection() {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="projects">
      <header className="screen-line-after px-4">
        <h2 className="font-pixelify text-2xl font-semibold tracking-tight py-4">Projects</h2>
      </header>
      <div className="pr-2 pl-4">
        {projects.map((item, i) => (
          <ProjectCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
