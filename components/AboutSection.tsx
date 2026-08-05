"use client";

import { SpotifyWidget } from "./SpotifyWidget";

export function AboutSection() {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="about">
      <header className="screen-line-after px-4">
        <h2 className="font-pixel text-3xl font-semibold py-4">About</h2>
      </header>
      <div className="p-4 space-y-4">
        <div className="prose max-w-none prose-zinc dark:prose-invert prose-headings:text-balance prose-a:font-medium prose-a:wrap-break-word prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-strong:font-medium prose-hr:border-edge prose-blockquote:border-s-border prose-blockquote:[&_p:first-of-type]:before:content-none prose-blockquote:[&_p:last-of-type]:after:content-none prose-sm font-mono text-foreground">
          <ul>
            <li>I&apos;m an AI/ML developer passionate about building real-world intelligent systems at the intersection of computer vision, deep learning, and LLM-integrated applications. I enjoy turning complex problems into practical solutions.</li>
            <li>At my core, I believe in continuous learning and open-source contribution. Growth, for me, isn&apos;t just about mastering frameworks — it&apos;s about understanding how technology can genuinely improve lives.</li>
            <li>I don&apos;t see growth as just skills or achievements, but as becoming more aware, disciplined, and aligned with what I&apos;m doing, and that&apos;s something I&apos;m continuously working on.</li>
          </ul>
        </div>

        {/* Spotify Widget */}
        <SpotifyWidget />
      </div>
    </section>
  );
}

export default AboutSection;
