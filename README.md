# Sumaid Ahmed — Portfolio

A modern, high-performance portfolio for a developer & security engineer, built with React 19, TypeScript, Vite, and Tailwind CSS v4. It features smooth scroll-driven animations (GSAP ScrollTrigger + Lenis), Framer Motion micro-interactions, a floating iOS-style bottom tab bar, and full case-study pages for each project.

![Stack](https://img.shields.io/badge/React%2019-20232a?style=flat-square&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- **Smooth scrolling** — Lenis + GSAP ScrollTrigger, with a styled scroll progress and glowing section indicators
- **Five content sections** — Intro, About, Experience, Projects, Stack, Contact, each with a numbered header and reveal-on-scroll motion
- **Interactive headings** — letter-level variable-font responsiveness that reacts to the cursor (Geist Sans variable font)
- **iOS-style mobile navigation** — a floating, frosted-glass bottom tab bar with active-section highlighting via a shared IntersectionObserver
- **Project case studies** — dedicated routes (`/projects/:slug`) with image decks, narrative sections, and prev/next navigation
- **Premium cool aesthetic** — sky-blue accent `#7DD3FC` built on a semantic token system, layered grain/noise and drifting orbs on a cool blue-black canvas
- **Resume download** — one-click PDF download from the Contact section
- **Performance-conscious** — rAF loops and canvas effects pause off-screen, one shared scroll observer, compositor-only animations

## 🛠 Tech Stack

| Area | Tools |
| --- | --- |
| Framework | [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org) |
| Build tool | [Vite](https://vitejs.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animation | [Framer Motion](https://www.framer.com/motion/), [GSAP + ScrollTrigger](https://gsap.com), [Lenis](https://github.com/darkroomengineering/lenis) |
| Routing | [React Router v7](https://reactrouter.com) |
| Icons | [lucide-react](https://lucide.dev), [react-icons](https://react-icons.github.io/react-icons/) |
| Fonts | Geist Sans / Geist Mono (variable) |
| Linting | [oxlint](https://oxc.rs) |

## 🚀 Getting Started

### Prerequisites

- Node.js **≥ 20.19** (required by Vite 8)

### Installation

```bash
# Clone the repository
git clone https://github.com/CheeseBallz/portfolio
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open http://localhost:5173 (or the port shown in your terminal).

### Production build

```bash
npm run build     # type-check + production build into dist/
npm run preview   # preview the production build locally
```

### Linting

```bash
npm run lint
```

## ☁️ Deploying to Vercel

The repository ships with a static Vite output and a `vercel.json` SPA rewrite so client-side routes (`/projects/:slug`) work on refresh.

1. Push this repository to GitHub.
2. Import the repository in the [Vercel dashboard](https://vercel.com/new).
3. Framework preset: **Vite** (auto-detected). Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Everything in `public/` (fonts, favicons, project images, resume PDF) is served automatically.

## 📁 Project Structure

```
├── public/                 # Static assets (fonts, images, favicons, resume)
├── src/
│   ├── animations/         # Shared Framer Motion variants
│   ├── components/
│   │   ├── layout/         # Sidebar, MobileNav, BottomNav, Footer
│   │   ├── pages/          # Project case study route page
│   │   ├── sections/       # Hero, About, Experience, Projects, Stack, Contact
│   │   └── ui/             # LogoLoop, DotField, Noise, VariableProximity, icons
│   ├── data/               # Portfolio content (projects, experience, skills, etc.)
│   └── hooks/              # Shared scroll-spy + in-view observers
├── index.html
├── vercel.json             # SPA rewrite config
└── package.json
```

## 🧑‍💻 Author

**Sumaid Ahmed** — Developer & Security Engineer

- GitHub: [@CheeseBallz](https://github.com/CheeseBallz)
- Website: [sumaid.vercel.app](https://sumaid.vercel.app/)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2026 Sumaid Ahmed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
