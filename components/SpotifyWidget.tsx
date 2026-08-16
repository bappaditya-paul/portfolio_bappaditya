"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { playUISFX } from "@/lib/uisfx";

// ── MUSIC CONFIGURATION ──────────────────────────────────────────────────────
const nowPlaying = {
  title: "Tum Prem Ho (Reprise)",
  artist: "Jubin Nautiyal",
  cover: "/music/cover.jpg",
  audio: "/music/song.mp3",
};
// ─────────────────────────────────────────────────────────────────────────────

export function SpotifyWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(nowPlaying.audio);
    audio.preload = "none";
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setError(true);
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || error) return;
    playUISFX("tap");
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch {
      setError(true);
    }
  };

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px]">
      <button
        onClick={togglePlay}
        disabled={error}
        type="button"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={cn(
          "group flex w-full items-center gap-4 rounded-xl p-3 text-sm transition-all duration-300",
          "border border-zinc-200 bg-zinc-50 hover:bg-zinc-100/70 hover:border-zinc-300",
          "dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 dark:hover:border-zinc-700",
          "disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
        )}
      >
        {/* Album Art / Icon */}
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg shadow-inner bg-zinc-100 dark:bg-zinc-800" aria-hidden="true">
          {error ? (
            <div className="flex h-full w-full items-center justify-center">
              <Music className="text-zinc-400 dark:text-zinc-500" size={18} />
            </div>
          ) : (
            <>
              <img
                src={nowPlaying.cover}
                alt={nowPlaying.title}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                  isPlaying && "animate-rotate rounded-full"
                )}
              />
              {/* Play/Pause overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                {isPlaying ? (
                  <Pause className="text-white" size={16} />
                ) : (
                  <Play className="text-white" size={16} fill="currentColor" />
                )}
              </div>
            </>
          )}
        </div>

        {/* Text Info */}
        <div className="flex min-w-0 flex-1 flex-col gap-1 leading-tight text-left">
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {isPlaying && (
              <span className="inline-flex gap-[2px] items-end h-3">
                <span className="w-[2px] bg-[#1db954] animate-[music-bar_0.8s_ease-in-out_infinite]" style={{height:"8px"}} />
                <span className="w-[2px] bg-[#1db954] animate-[music-bar_0.8s_ease-in-out_0.2s_infinite]" style={{height:"12px"}} />
                <span className="w-[2px] bg-[#1db954] animate-[music-bar_0.8s_ease-in-out_0.4s_infinite]" style={{height:"6px"}} />
              </span>
            )}
            {isPlaying ? "Now playing" : "↑ Last played"}
          </span>
          <span className="truncate text-sm font-semibold leading-snug text-zinc-800 dark:text-zinc-100">
            {nowPlaying.title}
          </span>
          <span className="truncate font-mono text-xs leading-none text-zinc-500 dark:text-zinc-400">
            {nowPlaying.artist}
          </span>
        </div>

        {/* Spotify-style icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 text-[#1db954] transition-transform duration-300 group-hover:scale-110"
          fill="currentColor"
          aria-label="Spotify"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </button>
    </div>
  );
}

export default SpotifyWidget;
