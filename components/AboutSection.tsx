"use client";

import { SpotifyWidget } from "./SpotifyWidget";

export function AboutSection() {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="about">
      <header className="screen-line-after px-4">
        <h2 className="font-pixelify text-2xl font-semibold tracking-tight py-4">About</h2>
      </header>
      <div className="p-4 space-y-6">
        <div className="prose max-w-none prose-zinc dark:prose-invert font-sans text-foreground leading-relaxed">
          <ul className="list-none pl-0 space-y-4">
            <li className="relative pl-6 text-[14px] sm:text-[15px] before:absolute before:left-0 before:top-[8px] before:size-1.5 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-600">
              I&apos;m a builder who&apos;s still figuring things out, but doing it by creating along the way. I enjoy working at the intersection of AI and real-world impact, whether it&apos;s building systems, experimenting with LLMs, or turning ideas into something real.
            </li>
            <li className="relative pl-6 text-[14px] sm:text-[15px] before:absolute before:left-0 before:top-[8px] before:size-1.5 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-600">
              At my core, I&apos;m curious not just about technology, but about how it shapes the way people think, act, and grow. That curiosity pushes me beyond just coding into exploring meaning and purpose.
            </li>
            <li className="relative pl-6 text-[14px] sm:text-[15px] before:absolute before:left-0 before:top-[8px] before:size-1.5 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-600">
              I don&apos;t see growth as just skills or achievements, but as becoming more aware, disciplined, and aligned with what I&apos;m doing, and that&apos;s something I&apos;m continuously working on.
            </li>
          </ul>
        </div>

        {/* Local Music Widget */}
        <div className="flex justify-center pt-4 w-full">
          <SpotifyWidget />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
