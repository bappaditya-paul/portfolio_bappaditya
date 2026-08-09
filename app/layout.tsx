import type { Metadata } from "next";
import { Inter, JetBrains_Mono, VT323 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Bappaditya Paul — AI/ML Developer",
  description:
    "Bappaditya Paul is an AI/ML developer from India building computer vision, deep learning, and LLM-integrated systems. Explore his portfolio and projects.",
  keywords: [
    "Bappaditya Paul",
    "AI/ML Developer",
    "Computer Vision",
    "Deep Learning",
    "IIT Madras",
    "Python",
    "TensorFlow",
  ],
  authors: [{ name: "Bappaditya Paul" }],
  creator: "Bappaditya Paul",
  publisher: "Bappaditya Paul",
  robots: "index, follow",
  openGraph: {
    title: "Bappaditya Paul — AI/ML Developer",
    description:
      "AI/ML developer building computer vision, deep learning, and LLM-integrated systems.",
    url: "https://bappaditya.dev",
    type: "profile",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Bappaditya Paul — AI/ML Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bappaditya Paul — AI/ML Developer",
    description:
      "AI/ML developer building computer vision, deep learning, and LLM-integrated systems.",
    images: ["/og_image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add('dark');
                    root.style.colorScheme = 'dark';
                  } else {
                    root.classList.remove('dark');
                    root.style.colorScheme = 'light';
                  }
                  var meta = document.querySelector('meta[name="theme-color"]');
                  if (meta) meta.setAttribute('content', isDark ? '#000000' : '#ffffff');
                } catch (_) {}
                try {
                  if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
                    document.documentElement.classList.add('os-macos');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${vt323.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="max-w-screen overflow-x-hidden px-2">
            <div className="mx-auto md:max-w-3xl">{children}</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
