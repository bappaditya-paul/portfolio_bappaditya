"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Film, Tv, Sparkles, HelpCircle } from "lucide-react";
import { playUISFX } from "@/lib/uisfx";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  title: string;
  creator: string;
  cover: string;
  category: "movies" | "series" | "anime";
  description: string;
}

const initialMedia: MediaItem[] = [
  {
    id: "1",
    title: "Zindagi Na Milegi Dobara",
    creator: "Zoya Akhtar (2011)",
    cover: "/images/favourites/jindigi_na_milega_dubara.jpg",
    category: "movies",
    description: "A beautiful exploration of friendship, fear, and living in the present. The perfect cinematic road trip that always inspires adventure.",
  },
];

export default function FavouritesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    playUISFX("tap");
    setSelectedId(selectedId === id ? null : id);
  };

  const renderMediaGrid = (category: "movies" | "series" | "anime") => {
    const filtered = initialMedia.filter((m) => m.category === category);

    if (filtered.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-edge bg-muted/20 text-center">
          <HelpCircle className="w-8 h-8 text-zinc-600 mb-2" />
          <p className="text-sm text-muted-foreground font-mono">No items in this category yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="group cursor-pointer relative flex flex-col items-center"
            >
              {/* Vertical Media Cover Card */}
              <div className="relative aspect-[3/4] w-full max-w-[180px] rounded-lg overflow-hidden border border-edge bg-zinc-950 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
                />

                {/* High contrast dark overlay on click */}
                <div
                  className={cn(
                    "absolute inset-0 bg-zinc-950/95 backdrop-blur-sm flex flex-col justify-center p-4 transition-opacity duration-300 select-none border border-zinc-800 rounded-lg",
                    isSelected ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <h3 className="font-serif text-sm font-semibold tracking-tight text-zinc-100 text-center line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-400 text-center mt-1">
                    by {item.creator}
                  </p>
                  <p className="font-sans text-[11px] text-zinc-300 text-center mt-3 leading-relaxed line-clamp-5">
                    {item.description}
                  </p>
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      Tap to close
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick labels below cover */}
              <div className="mt-2.5 text-center select-none">
                <h4 className="text-xs font-mono font-medium text-foreground line-clamp-1 max-w-[140px]">
                  {item.title}
                </h4>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  {item.creator}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="min-h-screen py-16 px-4 bg-background text-foreground animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          onClick={() => playUISFX("back")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <header className="mb-12">
          <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4">Favourites</h1>
          <p className="text-muted-foreground font-sans text-base leading-relaxed">
            Stories I&rsquo;ve enjoyed and connected with, across anime, movies, and series. Some inspired me, some made me think, and some I just genuinely loved watching.
          </p>
        </header>

        {/* Categories Section */}
        <div className="space-y-12">
          {/* Movies */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold border-b border-edge pb-2">
              <Film className="w-4 h-4 text-zinc-400" />
              Movies
            </h2>
            {renderMediaGrid("movies")}
          </section>

          {/* Series */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold border-b border-edge pb-2">
              <Tv className="w-4 h-4 text-zinc-400" />
              Series
            </h2>
            {renderMediaGrid("series")}
          </section>

          {/* Anime */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold border-b border-edge pb-2">
              <Sparkles className="w-4 h-4 text-zinc-400" />
              Anime
            </h2>
            {renderMediaGrid("anime")}
          </section>
        </div>
      </div>
    </main>
  );
}
