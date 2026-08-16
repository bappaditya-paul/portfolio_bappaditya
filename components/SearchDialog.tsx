"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft, Sparkles, Book, Briefcase, GraduationCap, FileText, Heart, X } from "lucide-react";
import { playUISFX } from "@/lib/uisfx";
import { cn } from "@/lib/utils";

interface SearchItem {
  title: string;
  subtitle: string;
  category: "projects" | "experiences" | "education" | "books" | "favourites" | "pages";
  url: string;
  tags?: string[];
}

const searchIndex: SearchItem[] = [
  // Pages
  { title: "Home Page", subtitle: "Main personal portfolio summary, skills, and cover video", category: "pages", url: "/" },
  { title: "Projects Page", subtitle: "Full list of AI/ML, Computer Vision, and Deep Learning systems", category: "pages", url: "/projects" },
  { title: "Blogs Page", subtitle: "Essays, technical notes, and code summaries", category: "pages", url: "/blogs" },
  { title: "Books Shelf", subtitle: "Reading list: Alex Hormozi, Naval Ravikant, and Morgan Housel", category: "pages", url: "/books" },
  { title: "Favourites Page", subtitle: "Curated collection of favorite movies (ZNMD), music, and series", category: "pages", url: "/favourites" },

  // Projects
  { title: "ArogyaVani", subtitle: "AI-Powered Smart Health Assistant & Doctor Recommendation", category: "projects", url: "/projects", tags: ["Python", "Streamlit", "NLP", "LLM API", "Scikit-learn", "Pandas"] },
  { title: "Kidney Stone Detection", subtitle: "Deep Learning Medical Image Preprocessing & MobileNetV2 System", category: "projects", url: "/projects", tags: ["Python", "TensorFlow", "Keras", "MobileNetV2", "OpenCV", "Streamlit"] },

  // Experiences
  { title: "National Informatics Centre (NIC)", subtitle: "Backend & Systems Developer Intern (E-Governance & APIs)", category: "experiences", url: "/#experience", tags: ["Node.js", "Python", "PostgreSQL", "REST APIs", "Security"] },
  { title: "Astranex Defence (NIRMAAN IIT Madras)", subtitle: "AI/ML Developer — Startup Team (Robotics & Computer Vision)", category: "experiences", url: "/#experience", tags: ["Python", "OpenCV", "TensorFlow", "YOLOv8", "Robotics"] },

  // Education
  { title: "IIT Madras", subtitle: "BS in Data Science and Applications (2023 — 2026)", category: "education", url: "/#education" },
  { title: "ICFAI University Tripura", subtitle: "Bachelor of Computer Applications - BCA (2022 — 2025)", category: "education", url: "/#education" },

  // Books
  { title: "$100M Offers", subtitle: "Alex Hormozi — Packaging, pricing, and high-value offers", category: "books", url: "/books" },
  { title: "The Almanack of Naval Ravikant", subtitle: "Eric Jorgenson / Naval Ravikant — Wealth, leverage, and happiness", category: "books", url: "/books" },
  { title: "The Psychology of Money", subtitle: "Morgan Housel — Timeless lessons on behavior, greed, and wealth", category: "books", url: "/books" },

  // Favourites
  { title: "Zindagi Na Milegi Dobara", subtitle: "Movie — Directed by Zoya Akhtar (2011)", category: "favourites", url: "/favourites" },
];

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen to K shortcut and toggle-search custom event
  useEffect(() => {
    const handleToggle = () => {
      setOpen((prev) => !prev);
    };

    window.addEventListener("toggle-search", handleToggle);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("toggle-search", handleToggle);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Play sound on open/close state transitions
  useEffect(() => {
    if (open) {
      playUISFX("focus");
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setOpen(false);
        playUISFX("back");
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Filter items
  const filteredItems = searchIndex.filter((item) => {
    const searchString = `${item.title} ${item.subtitle} ${item.category} ${item.tags?.join(" ") || ""}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleNav = (e: KeyboardEvent) => {
      if (!open || filteredItems.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        playUISFX("tap");
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        playUISFX("tap");
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };
    window.addEventListener("keydown", handleNav);
    return () => window.removeEventListener("keydown", handleNav);
  }, [open, selectedIndex, filteredItems]);

  const handleSelect = (item: SearchItem) => {
    playUISFX("success");
    setOpen(false);
    router.push(item.url);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "projects":
        return <Sparkles className="w-4 h-4 text-cyan-500" />;
      case "experiences":
        return <Briefcase className="w-4 h-4 text-emerald-500" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-amber-500" />;
      case "books":
        return <Book className="w-4 h-4 text-purple-500" />;
      case "favourites":
        return <Heart className="w-4 h-4 text-rose-500" />;
      default:
        return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-md flex items-start justify-center pt-8 md:pt-[15vh] px-3 md:px-4">
      <div
        ref={dialogRef}
        className="w-full max-w-lg rounded-xl border border-edge bg-background shadow-2xl overflow-hidden flex flex-col max-h-[75vh] md:max-h-[60vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search Input Box */}
        <div className="relative flex items-center border-b border-edge">
          <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, experiences, books..."
            className="w-full h-12 md:h-14 bg-transparent pl-12 pr-12 text-sm font-sans text-foreground placeholder-muted-foreground outline-none"
          />
          <button
            onClick={() => {
              setOpen(false);
              playUISFX("back");
            }}
            className="absolute right-4 p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground font-mono text-sm">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 font-bold select-none">
                {query ? "Search Results" : "Suggestions"}
              </div>
              {filteredItems.map((item, index) => {
                const isActive = index === selectedIndex;
                return (
                  <div
                    key={`${item.title}-${index}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => {
                      // Only update selection on hover if hover is supported (prevent issues on touchscreens)
                      if (window.matchMedia("(hover: hover)").matches) {
                        setSelectedIndex(index);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg cursor-pointer transition-all duration-150 select-none",
                      isActive
                        ? "bg-accent text-accent-foreground border-l-2 border-primary pl-2.5"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border border-edge/30 bg-muted/40">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm font-medium text-foreground truncate">
                          {item.title}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-edge bg-muted text-muted-foreground select-none">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    {isActive && (
                      <kbd className="hidden sm:inline-flex items-center gap-1.5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 select-none">
                        <span>Enter</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </kbd>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-edge px-4 py-3 md:py-2.5 bg-muted/20 flex items-center justify-between text-[10px] font-mono text-muted-foreground select-none shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="border border-edge bg-muted px-1.5 py-0.5 rounded text-[9px]">↓↑</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border border-edge bg-muted px-1.5 py-0.5 rounded text-[9px]">Enter</kbd> to select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="border border-edge bg-muted px-1.5 py-0.5 rounded text-[9px]">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
