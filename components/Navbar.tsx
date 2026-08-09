"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sun, Moon, ChevronDown, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [affixed, setAffixed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
          className="transition-[scale] ease-out active:scale-[0.98]"
          aria-label="Home"
        >
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-foreground text-background font-black text-sm">
            BP
          </div>
        </Link>

        <div className="flex-1" />

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-sm font-medium transition-[color] duration-300 hover:text-foreground text-muted-foreground"
            >
              {link.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 font-mono text-sm font-medium text-muted-foreground transition-[color] duration-300 hover:text-foreground outline-none">
              More
              <ChevronDown className="size-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-edge bg-background shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center">
          {/* Search Button */}
          <button
            className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-full border border-input bg-background text-muted-foreground shadow-sm select-none hover:bg-accent transition-all"
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
            }}
          >
            <Search className="size-4" />
            <span className="font-sans text-sm font-medium sm:hidden">Search</span>
            <kbd className="hidden sm:inline-flex h-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-[13px] font-normal text-muted-foreground select-none bg-black/5 shadow-[inset_0_-1px_2px] shadow-black/10 dark:bg-white/10 dark:shadow-white/10">
              ⌘
            </kbd>
            <kbd className="hidden sm:inline-flex h-5 w-5 items-center justify-center rounded-sm font-sans text-[13px] font-normal text-muted-foreground select-none bg-black/5 shadow-[inset_0_-1px_2px] shadow-black/10 dark:bg-white/10 dark:shadow-white/10">
              K
            </kbd>
          </button>

          <span className="mx-2 flex h-4 w-px bg-border" aria-hidden="true" />

          {/* Theme Toggle */}
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap ease-out outline-none select-none size-8 shrink-0 transition-transform active:scale-95 hover:bg-accent hover:text-accent-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && (
              <>
                <Sun className="size-[18px] dark:hidden" />
                <Moon className="size-[18px] hidden dark:block" />
              </>
            )}
            <span className="sr-only">Theme Toggle</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden inline-flex items-center justify-center size-8 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-background border border-edge rounded-lg mx-2 mt-1 shadow-lg py-2 z-50">
          {[...navLinks, ...moreLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(false)}
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
