"use client";

import { SpotifyWidget } from "./SpotifyWidget";

export function AboutSection() {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="about">
      <header className="screen-line-after px-4">
        <h2 className="font-pixel text-3xl font-semibold py-4">About</h2>
      </header>
      <div className="p-4 space-y-4">
        <div className="prose max-w-none prose-zinc dark:prose-invert prose-headings:text-balance prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-strong:font-medium prose-hr:border-edge prose-sm font-mono text-foreground">
          <ul>
            <li>
              I&apos;m an AI/ML developer building practical software at the intersection of backend engineering, GenAI, and full-stack development.
            </li>
            <li>
              I work with Python, FastAPI, machine learning, LLM-powered applications, APIs, databases, and modern web technologies. I enjoy turning ideas into reliable systems — from the model and backend layer to the user-facing product.
            </li>
            <li>
              Currently, I&apos;m focused on getting deeper into backend engineering and GenAI while building real-world applications and contributing to open source.
            </li>
            <li>
              For me, growth comes from building, breaking things, understanding how they work, and continuously improving.
            </li>
          </ul>
        </div>

        {/* Local Music Widget */}
        <SpotifyWidget />
      </div>
    </section>
  );
}

export default AboutSection;
