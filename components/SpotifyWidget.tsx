"use client";

import { useEffect, useState } from "react";
import { Music } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false });

  useEffect(() => {
    fetch("/api/spotify")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => setData({ isPlaying: false }));
  }, []);

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="w-full">
        <a
          href={data.songUrl || "#"}
          target={data.songUrl ? "_blank" : undefined}
          rel={data.songUrl ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm shadow-sm transition-all duration-300 hover:bg-neutral-50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
        >
          <div className="relative h-16 w-16 shrink-0" aria-hidden="true">
            {data.isPlaying && data.albumImageUrl ? (
              <img
                src={data.albumImageUrl}
                alt={data.title || "Album Art"}
                className="h-16 w-16 rounded-full object-cover shadow-xl animate-spin-slow"
              />
            ) : (
              <>
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-neutral-700 via-neutral-900 to-black shadow-xl" />
                <div className="absolute inset-[5px] flex items-center justify-center rounded-full bg-neutral-800">
                  <Music className="text-muted-foreground" size={16} />
                </div>
              </>
            )}
            <div
              className="absolute inset-0 rounded-full opacity-30 mix-blend-screen"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.1) 10%, transparent 20%, rgba(255,255,255,0.05) 30%, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%, rgba(255,255,255,0.08) 70%, transparent 80%, rgba(255,255,255,0.05) 90%, transparent 100%)",
                animation: "rotate 8s linear infinite",
              }}
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-black/50" />
            <div className="absolute inset-0 rounded-full bg-linear-to-tl from-transparent via-white/5 to-transparent" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1 leading-tight">
            <div className="flex items-center gap-1.5 text-xs leading-none text-muted-foreground transition-colors group-hover:text-foreground/80">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  data.isPlaying ? "bg-green-500 animate-pulse" : "bg-muted-foreground/40"
                }`}
              />
              <span className="font-mono">{data.isPlaying ? "Listening to Spotify" : "Not listening"}</span>
            </div>
            <span className="truncate text-[15px] leading-snug font-semibold text-muted-foreground">
              {data.isPlaying && data.title ? `${data.title} - ${data.artist}` : "Nothing playing"}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default SpotifyWidget;
