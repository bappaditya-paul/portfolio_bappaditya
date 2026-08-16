"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sun, Moon, ChevronDown, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useUISFX } from "@/lib/uisfx";

export function Navbar() {
  const [affixed, setAffixed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isEnabled, toggleSound, pack, changePack, play } = useUISFX();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setAffixed(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
  ];

  const moreLinks = [
    { href: "/blogs", label: "Blogs" },
    { href: "/books", label: "Books" },
    { href: "/favourites", label: "Favourites" },
  ];

  return (
    <header
      data-affix={affixed}
      className={cn(
        "sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-2 pt-2",
        "transition-shadow duration-300",
        affixed && "shadow-[0_0_16px_0_rgba(0,0,0,0.08)] dark:shadow-[0_0_16px_0_rgba(0,0,0,1)]"
      )}
    >
      <div
        className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 after:z-[1] after:transition-[background-color] sm:gap-4 md:max-w-3xl"
        data-header-container="true"
      >
        {/* Logo */}
        <Link
          href="/"
          className="transition-[scale,opacity] ease-out active:scale-[0.98] hover:opacity-85"
          aria-label="Home"
          onClick={() => play("press")}
        >
          <span className="font-serif text-xl font-bold tracking-tight text-foreground select-none">
            BP
          </span>
        </Link>

        <div className="flex-1" />

        {/* Desktop Nav - Premium Sans Serif Typography */}
        <nav className="hidden sm:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] font-medium tracking-tight transition-[color] duration-300 hover:text-foreground text-muted-foreground/80"
              onClick={() => play("press")}
            >
              {link.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative group">
            <button 
              className="flex items-center gap-1 font-sans text-[13px] font-medium tracking-tight text-muted-foreground/80 transition-[color] duration-300 hover:text-foreground outline-none"
              onClick={() => play("tap")}
            >
              More
              <ChevronDown className="size-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-1.5 w-40 rounded-lg border border-edge bg-background/95 backdrop-blur-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-250 py-1 z-50">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-xs font-sans font-medium text-muted-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => play("press")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Search Button (Optimized for Mobile/Desktop) */}
          <button
            className="inline-flex items-center justify-center gap-1.5 h-8 w-8 sm:w-auto sm:px-2.5 rounded-full border border-input bg-background text-muted-foreground shadow-sm select-none hover:bg-accent transition-all shrink-0 active:scale-95"
            onClick={() => {
              play("focus");
              window.dispatchEvent(new CustomEvent("toggle-search"));
            }}
            title="Search (⌘K)"
          >
            <Search className="size-[15px]" />
            <kbd className="hidden sm:inline-flex h-4 items-center justify-center gap-0.5 rounded-sm px-1 font-sans text-[11px] font-normal text-muted-foreground/60 select-none bg-black/5 dark:bg-white/5 border border-edge/30">
              ⌘
            </kbd>
            <kbd className="hidden sm:inline-flex h-4 w-4 items-center justify-center rounded-sm font-sans text-[11px] font-normal text-muted-foreground/60 select-none bg-black/5 dark:bg-white/5 border border-edge/30">
              K
            </kbd>
          </button>

          <span className="mx-1.5 flex h-4 w-px bg-border" aria-hidden="true" />

          {/* SFX Toggle & Dropdown */}
          <div className="relative group flex items-center">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap ease-out outline-none select-none size-8 shrink-0 transition-transform active:scale-95 hover:bg-accent hover:text-accent-foreground"
              onClick={toggleSound}
              aria-label="Toggle UI Sound Effects"
              title={isEnabled ? "Mute UI sounds" : "Unmute UI sounds"}
            >
              {mounted && (
                <>
                  {isEnabled ? (
                    <Volume2 className="size-[17px] text-foreground" />
                  ) : (
                    <VolumeX className="size-[17px] text-muted-foreground" />
                  )}
                </>
              )}
              <span className="sr-only">Toggle UI Sound Effects</span>
            </button>
            {isEnabled && mounted && (
              <div className="absolute top-full right-0 mt-1 w-28 rounded-lg border border-edge bg-background shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 z-50">
                <div className="px-2.5 py-1 text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                  Sound Pack
                </div>
                {(["scifi", "glass", "arcade", "zen", "minimal"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => changePack(p)}
                    className={cn(
                      "w-full text-left px-3 py-1 text-xs font-mono capitalize transition-colors hover:bg-accent",
                      pack === p ? "text-foreground font-semibold" : "text-muted-foreground"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="mx-1.5 flex h-4 w-px bg-border" aria-hidden="true" />

          {/* Theme Toggle */}
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap ease-out outline-none select-none size-8 shrink-0 transition-transform active:scale-95 hover:bg-accent hover:text-accent-foreground"
            onClick={() => {
              play("success");
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            aria-label="Toggle theme"
          >
            {mounted && (
              <>
                <Sun className="size-[17px] dark:hidden" />
                <Moon className="size-[17px] hidden dark:block" />
              </>
            )}
            <span className="sr-only">Theme Toggle</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden inline-flex items-center justify-center size-8 rounded-lg hover:bg-accent transition-colors"
            onClick={() => {
              play("tap");
              setMobileOpen(!mobileOpen);
            }}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border border-edge rounded-lg mx-2 mt-1 shadow-lg py-2 z-50">
          {[...navLinks, ...moreLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 text-sm font-sans font-medium text-muted-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => {
                play("press");
                setMobileOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
