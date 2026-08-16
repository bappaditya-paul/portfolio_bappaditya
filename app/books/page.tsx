"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle, Hourglass, HelpCircle } from "lucide-react";
import { playUISFX } from "@/lib/uisfx";
import { cn } from "@/lib/utils";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  status: "reading" | "read" | "to-read";
  description?: string;
}

const initialBooks: Book[] = [
  {
    id: "1",
    title: "$100M Offers",
    author: "Alex Hormozi",
    cover: "/images/books/100_million.webp",
    status: "reading",
    description: "How to make offers so good people feel stupid saying no. A masterclass in creating value, packaging products, and pricing mechanics.",
  },
  {
    id: "2",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    cover: "/images/books/naval_ravikant.webp",
    status: "read",
    description: "A curation of wisdom and teachings from Naval Ravikant on building wealth, learning happiness, and identifying singular leverage.",
  },
  {
    id: "3",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/images/books/psychology_of_money.jpg",
    status: "read",
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave. Timeless lessons on greed, wealth, and patience.",
  },
];

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const handleBookClick = (bookId: string) => {
    playUISFX("tap");
    setSelectedBook(selectedBook === bookId ? null : bookId);
  };

  const renderBookGrid = (status: "reading" | "read" | "to-read") => {
    const filtered = initialBooks.filter((b) => b.status === status);

    if (filtered.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-edge bg-muted/20 text-center">
          <HelpCircle className="w-8 h-8 text-zinc-600 mb-2" />
          <p className="text-sm text-muted-foreground font-mono">No books in this shelf yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((book) => {
          const isSelected = selectedBook === book.id;
          return (
            <div
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className="group cursor-pointer relative flex flex-col items-center"
            >
              {/* 3D-like book container */}
              <div className="relative aspect-[3/4] w-full max-w-[160px] rounded-lg overflow-hidden border border-edge bg-zinc-950 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Premium high-contrast dark overlay for card reveal */}
                <div
                  className={cn(
                    "absolute inset-0 bg-zinc-950/95 backdrop-blur-sm flex flex-col justify-center p-4 transition-opacity duration-300 select-none border border-zinc-800 rounded-lg",
                    isSelected ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <h3 className="font-serif text-sm font-semibold tracking-tight text-zinc-100 text-center line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-400 text-center mt-1">
                    by {book.author}
                  </p>
                  {book.description && (
                    <p className="font-sans text-[11px] text-zinc-300 text-center mt-3 leading-relaxed line-clamp-5">
                      {book.description}
                    </p>
                  )}
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      Tap to close
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick info below the card */}
              <div className="mt-2.5 text-center select-none">
                <h4 className="text-xs font-mono font-medium text-foreground line-clamp-1 max-w-[140px]">
                  {book.title}
                </h4>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  {book.author}
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
          <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4">Books</h1>
          <p className="text-muted-foreground font-sans text-base leading-relaxed">
            A collection of books that made me pause, think, and see things differently. Some for growth, some for curiosity, and some that just stayed with me.
          </p>
        </header>

        {/* Shelf categories */}
        <div className="space-y-12">
          {/* Reading */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold border-b border-edge pb-2">
              <BookOpen className="w-4 h-4 text-zinc-400" />
              Reading
            </h2>
            {renderBookGrid("reading")}
          </section>

          {/* Read */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold border-b border-edge pb-2">
              <CheckCircle className="w-4 h-4 text-zinc-400" />
              Read
            </h2>
            {renderBookGrid("read")}
          </section>

          {/* To Read */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold border-b border-edge pb-2">
              <Hourglass className="w-4 h-4 text-zinc-400" />
              To Read
            </h2>
            {renderBookGrid("to-read")}
          </section>
        </div>
      </div>
    </main>
  );
}
