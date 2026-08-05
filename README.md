# Bappaditya Paul — Portfolio

A pixel-perfect clone of [jdhruv.dev](https://jdhruv.dev/) built with Next.js 15, React 19, Tailwind CSS, and shadcn/ui design system.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Geist Fonts** | Typography (Sans + Mono + Pixel) |
| **Lucide React** | Icons |
| **next-themes** | Dark/light mode |
| **Radix UI** | Headless UI primitives |

## Features

- ✅ Dark/Light/System theme toggle
- ✅ CMD+K Command Palette
- ✅ Spotify "Now Playing" widget
- ✅ Collapsible experience/education cards
- ✅ Avatar glitch effect on hover
- ✅ Screen-line decorative system
- ✅ Pattern backgrounds (dots + diagonal)
- ✅ Animated view counter
- ✅ Typing text animation
- ✅ Scroll-triggered fade-in animations
- ✅ Mobile responsive
- ✅ SEO optimized (Open Graph, Twitter Cards, JSON-LD)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

Deploy to Vercel:
```bash
npm i -g vercel
vercel --prod
```

Or use GitHub Pages, Netlify, or any static host.

## File Structure

```
├── app/
│   ├── sections/          # Page sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── connect-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── education-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── achievements-section.tsx
│   │   └── quote-section.tsx
│   ├── layout.tsx          # Root layout with theme
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles + CSS variables
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── header.tsx          # Sticky navigation
│   ├── footer.tsx          # Footer with ASCII art
│   ├── divider-pattern.tsx # Decorative dividers
│   ├── top-pattern.tsx     # Top pattern block
│   └── theme-provider.tsx  # Theme context
├── lib/
│   └── utils.ts            # Utility functions (cn)
├── public/
│   ├── favicon.svg
│   ├── icon.svg
│   └── manifest.webmanifest
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## License

MIT — Built with curiosity, code, and coffee ☕
