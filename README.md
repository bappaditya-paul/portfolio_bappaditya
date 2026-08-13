# Bappaditya Paul — Portfolio

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

## Docker Setup & Workflow

### 1. Live Reload Development (See changes immediately without rebuilding)
Mounts your code into the container so any changes to `app/`, `components/`, etc. update instantly in the running container.

```bash
docker compose up portfolio-dev --build
```
> Access at: **http://localhost:3000**

---

### 2. Production Docker Build & Run (Updated Image)
Whenever you want to rebuild and update the standalone production container:

```bash
# Build & start container in detached background mode
docker compose up portfolio --build -d

# Check running container status
docker compose ps

# View container logs
docker compose logs -f portfolio

# Stop container
docker compose down
```

---

## Deployment

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
