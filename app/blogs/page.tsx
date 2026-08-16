import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogsPage() {
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
        <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4">Blogs</h1>
        <p className="text-muted-foreground font-sans text-base leading-relaxed">
          Thoughts, technical notes, and essays coming soon.
        </p>
      </div>
    </main>
  );
}
