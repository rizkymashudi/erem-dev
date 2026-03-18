# erem.dev

Personal portfolio built with React + Vite. Features cinematic scroll-jacking, sticker pop animations, parallax layers, mouse tilt effects, and full responsive support across all breakpoints.

## Tech Stack

- React 19 + Vite 8
- CSS Modules + CSS custom properties (design tokens)
- Framer Motion + GSAP ScrollTrigger (scroll-jacking)
- Lenis (smooth scroll)
- JetBrains Mono (typography)

## Prerequisites

- Node.js >= 18
- npm >= 9

## Getting Started

```bash
# Clone the repository
git clone git@github.com:rizkymashudi/erem-dev.git
cd erem-dev

# Install dependencies
cd portfolio-react
npm install

# Start development server
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
portfolio-react/
├── public/
│   ├── assets/stickers/      # Sticker images (WebP)
│   ├── favicon.webp           # Apple touch icon
│   ├── favicon-32.webp        # Browser favicon
│   ├── og-image.png           # Open Graph image
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Nav/               # Dynamic Island navigation
│   │   ├── Hero/              # Parallax hero with typing animation
│   │   ├── Marquee/           # Infinite scroll marquee
│   │   ├── WorkSection/       # Horizontal project carousel
│   │   ├── SkillsSection/     # Stacking skill cards
│   │   ├── ExperienceSection/ # Timeline with chapter crossfade
│   │   ├── AboutSection/      # Bio reveal with link cards
│   │   ├── Footer/            # Contact section
│   │   └── Sticker/           # Reusable sticker component
│   ├── hooks/                 # Custom hooks (scroll, tilt, typing, theme)
│   ├── data/                  # Content data files
│   ├── styles/                # Design tokens, global styles, keyframes
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Deployment

Deployed on [Vercel](https://vercel.com). To deploy manually:

```bash
cd portfolio-react
npm run build
npx vercel
```

## License

All rights reserved.
