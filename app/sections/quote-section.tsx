"use client";

import { Quote } from "lucide-react";

export function QuoteSection() {
  return (
    <div className="relative flex flex-col items-center justify-center border-x border-edge px-6 py-12 text-center">
      <div className="absolute top-0 left-[-100vw] h-px w-[200vw] bg-edge" />
      <div className="absolute bottom-0 left-[-100vw] h-px w-[200vw] bg-edge" />

      <Quote className="mb-6 size-10 fill-current text-zinc-300 dark:text-zinc-600" />

      <blockquote className="mb-6 max-w-2xl text-xl font-medium text-zinc-700 italic sm:text-2xl dark:text-zinc-300">
        &ldquo;The only way to do great work is to love what you do. If you haven&apos;t found it yet, keep looking. Don&apos;t settle.&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-600" />
        <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          Steve Jobs
        </span>
        <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-600" />
      </div>
    </div>
  );
}
