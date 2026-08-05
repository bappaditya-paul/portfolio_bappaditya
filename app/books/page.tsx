import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BooksPage() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <h1 className="font-pixel text-4xl font-bold mb-4">Books</h1>
        <p className="text-muted-foreground font-mono text-sm leading-relaxed">
          Reading list, highlights, and book recommendations coming soon.
        </p>
      </div>
    </main>
  );
}
