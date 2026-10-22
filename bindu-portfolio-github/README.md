# BINDU — Premium 3D Creative Portfolio & Studio Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-purple?style=flat-square&logo=three.js)](https://threejs.org/)

> **"Stories Beyond Time. Visuals Beyond Imagination."**  
> Official creative portfolio for **Bindu**, Creative Filmmaker, AI Visual Storyteller, Cinematic Content Creator, and creator behind the storytelling channel **Kadha Cheppana Meeku**.

---

## 🌟 Highlights

- **Zero Database, Zero CMS, Zero Authentication**: Completely self-contained, high-performance static/server-rendered Next.js application.
- **Automated Filesystem Asset Discovery**: Simply drop images and videos into local asset directories. The website discovers them automatically, infers readable titles, determines categories, generates covers, and dynamically creates project detail pages.
- **Original Pomelli-Style Brand DNA**: Custom geometric monogram `B` with negative-space cinematic play symbol, orbital horizon detailing, royal-blue-to-hyacinth gradient, and an interactive Brand Book modal.
- **Cinematic 3D WebGL Hero**: Interactive Three.js / React Three Fiber scene featuring floating widescreen frames, glowing abstract creative sphere, orbiting rings, gentle mouse parallax, and a non-WebGL fallback.
- **Fluid & Accessible**: Fluid typography using CSS `clamp()`, dark jet-black studio aesthetic, blackberry purple card depths, full-screen lightbox with zoom, and custom cinematic video players.

---

## 🎨 Brand Identity & Exact Color System

| Token | Name | Hex | RGB | Purpose |
|---|---|---|---|---|
| `jet` | Jet Black | `#08090D` | `8, 9, 13` | Deep cinematic canvas background |
| `blackberry` | Blackberry Purple | `#171B3A` | `23, 27, 58` | Cards, navigation panels, and deep depths |
| `royal` | Royal Blue | `#3B82F6` | `59, 130, 246` | Primary interaction, buttons, glowing borders |
| `hyacinth` | Hyacinth Blue | `#8B5CF6` | `139, 92, 246` | Creative accents, gradient transitions, highlights |
| `white` | Pure White | `#FFFFFF` | `255, 255, 255` | High-contrast editorial typography |

**Signature Gradient**: `linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)`

### Typography Hierarchy
- **Space Grotesk**: Monolithic hero text and high-contrast creative headings.
- **Inter**: Body narrative, editorial biography, and UI components.
- **DM Mono**: Technical labels, aspect ratios, timestamps, and metadata tags.

---

## 📁 Automatic Asset Discovery Workflow

You never need to edit code or JavaScript arrays to add, remove, or organize your creative work.

### 1. Folder Architecture
```
public/
└── assets/
    ├── profile/
    │   └── bindu.jpg               # Your profile photo (shows monogram if omitted)
    ├── projects/
    │   ├── kaalanni-kalipina-tera/
    │   │   ├── cover.jpg           # Project cover
    │   │   ├── scene-01.mp4        # Video sequence
    │   │   └── scene-02.jpg        # Keyframe still
    │   ├── chanakya-chandragupta/
    │   ├── yaksha-prashna/
    │   ├── ancient-indian-knowledge/
    │   ├── galaxy-s26-ultra/
    │   └── bindus-kitchen/
    ├── gallery/
    │   ├── images/                 # Stills displayed in Frames of Imagination
    │   └── videos/                 # Showreel and standalone video clips
    └── branding/                   # Vector logos and identity assets
```

### 2. Supported Formats
- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, `.svg`
- **Videos**: `.mp4`, `.webm`, `.mov`

### 3. How to Add a New Project
1. Open `public/assets/projects/`.
2. Create a folder with your project's name, e.g. `mauryan-conquest/`.
3. Drop your media files inside:
   - Name your preferred thumbnail `cover.jpg` (or `cover.png` / `cover.webp`).
   - Add your video files (e.g. `teaser.mp4`) and still renders (e.g. `palace-dawn.jpg`).
4. **Done!** The system automatically:
   - Creates the project card on `/projects` and the homepage.
   - Generates the dynamic route `/projects/mauryan-conquest`.
   - Infers the title: `"Mauryan Conquest"`.
   - Categorizes it as `"Historical Stories"`.

### 4. Optional: Adding Custom Metadata
If you wish to specify a custom title, description, year, or category, add an optional `project.json` inside your project folder:
```json
{
  "title": "Mauryan Conquest: Rise of an Empire",
  "category": "Historical Stories",
  "year": "2026",
  "shortDescription": "An epic cinematic sequence tracing imperial tactics.",
  "tags": ["Ancient India", "Maurya Empire", "AI Filmmaking"]
}
```
*If this file is omitted, the website automatically infers all values cleanly!*

---

## 🚀 Quick Start & Development

### Installation
```bash
npm install --legacy-peer-deps
```

### Run Locally (with Live Auto-Discovery)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> In development mode, Next.js dynamically rescans `public/assets` on every page request. Simply dropping new files into your assets folder and refreshing the browser instantly displays them!

### Run Background Asset Watcher (Optional)
```bash
npm run watch
```
Automatically regenerates the manifest in real time whenever files are added or renamed.

### Production Build
```bash
npm run build
```
Runs `scripts/generate-assets-manifest.ts` as a `prebuild` hook, creates the optimized production build, and statically prerenders all discovered projects and routes.

### Start Production Server
```bash
npm run start
```

---

## 🗺️ Routes & Pages

| Route | Page | Description |
|---|---|---|
| `/` | **Homepage** | 3D WebGL Hero, Selected Works, About Preview, Theater Showreel, Visual Gallery Preview, 5-Step Process Timeline, Bento Skills, and Contact CTA. |
| `/about` | **About Me** | Full personal story, creative journey, channel mission (*Kadha Cheppana Meeku*), brand DNA, and complete capabilities. |
| `/projects` | **Project Library** | Client-side searchable and filterable project grid with category tabs, sort options, and asset counters. |
| `/projects/[slug]` | **Project Detail** | Automatically renders all images & videos discovered inside that project's folder, with custom video players and full-screen lightbox. |
| `/gallery` | **Visual Gallery** | Masonry and editorial grid of stills and video assets, featuring category filtering and full-screen lightbox with zoom. |
| `/contact` | **Contact** | Direct `mailto:` action to `kadhacheppana14@gmail.com`, copy email button, and links to YouTube, Instagram, and Facebook. |

---

## 👤 About Bindu

- **Name**: Bindu
- **Creative Brand**: BINDU Creative Studio
- **Role**: Creative Filmmaker | AI Visual Storyteller | Cinematic Content Creator
- **Storytelling Channel**: [Kadha Cheppana Meeku (YouTube)](https://www.youtube.com/@kadhacheppana-meeku)
- **Email**: [kadhacheppana14@gmail.com](mailto:kadhacheppana14@gmail.com)
- **Instagram**: [@kadhacheppana14](https://www.instagram.com/kadhacheppana14/?hl=en)
- **Facebook**: [Bindu Creative Channel](https://www.facebook.com/profile.php?id=61594848533470)

---

## 📄 License
© 2026 BINDU Creative Studio. All stories, mythologies, and cinematic sequences preserved.
