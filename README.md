# PyQuest — Interactive Educational Tour

A retro-style browser game documenting the DJM Educational Tour by IT students from the **College of Computing Studies, Western Mindanao State University (WMSU)**, Zamboanga City, Philippines.

Walk through each day of the tour as a side-scrolling pixel-art game — explore the world, interact with landmarks, and relive 7 days across Manila, Tagaytay, and Baguio City.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 + inline styles |
| Routing | React Router v7 |
| AI Chatbot | OpenRouter API (NVIDIA Nemotron) |
| Lightbox | yet-another-react-lightbox |
| Icons | react-icons (Font Awesome) |
| Analytics | Vercel Analytics + Speed Insights |
| Hosting | Vercel |

---

## Features

- **Side-scrolling game engine** — custom RAF-based physics, sprite animation, and camera system built from scratch
- **7 playable days** — each with unique pixel-art backgrounds, world decorations, and interactive activity banners
- **Day 00 runway sequence** — board the plane, watch it taxi and take off to transition to Day 01
- **Rich diary modals** — each banner opens a diary-style popup with story, feelings, quick facts, photos, realizations, and keyword tags
- **Photo carousel + lightbox** — multi-photo groups with thumbnail strip, prev/next paging, and full-screen lightbox viewer
- **End credits screen** — auto-scrolling movie-style credits after completing Day 6, with social links
- **Mobile gamepad** — on-screen D-pad and action buttons for touch devices
- **Cloud wipe transition** — multi-strip animated scene transition between all routes
- **AI chatbot** — ask Aldrin anything about the tour; powered by OpenRouter
- **Background music + SFX** — opt-in music prompt on load, per-route play/pause
- **Vercel Analytics & Speed Insights** — production performance and usage tracking

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_key_here
```

Get a free API key at [openrouter.ai](https://openrouter.ai).

### Dev Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Deployment

The project is configured for Vercel with SPA rewrites (`vercel.json`).

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add `VITE_OPENROUTER_API_KEY` in **Project → Settings → Environment Variables**
4. Deploy — Vercel auto-detects Vite and builds correctly

---

## Project Structure

```
src/
├── features/journey/
│   ├── components/
│   │   ├── GameScene.tsx         # Core game engine (physics, RAF loop, sprites)
│   │   ├── GameHUD.tsx           # Top HUD bar (day title + map button)
│   │   ├── BusMenu.tsx           # Bus navigation modal (map / prev / next / finish)
│   │   ├── BusLayer.tsx          # Bus DOM elements (bus image, smoke, prompt)
│   │   ├── MobileGamepad.tsx     # On-screen D-pad + action buttons
│   │   ├── Day0Scenery.tsx       # Day 0 world objects (house, airport, plane)
│   │   ├── Day1Scenery.tsx       # Day 1 world objects (Rizal Park → MOA)
│   │   ├── Day2Scenery.tsx       # Day 2 world objects (HyTech, OpenText)
│   │   ├── Day3Scenery.tsx       # Day 3 world objects (TOP PEG, Teleperformance)
│   │   ├── Day4Scenery.tsx       # Day 4 world objects (MMDA, MicroSourcing)
│   │   ├── Day5Scenery.tsx       # Day 5 world objects (People's Park, Sky Ranch)
│   │   ├── Day6Scenery.tsx       # Day 6 world objects (Strawberry Farm → Burnham)
│   │   ├── Banner.tsx            # In-world activity banners
│   │   ├── StopModal.tsx         # Diary-style activity detail modal + carousel
│   │   ├── EndCredits.tsx        # Auto-scrolling end credits screen
│   │   ├── MenuScene.tsx         # Main menu with animated bus + modals
│   │   ├── OverworldMap.tsx      # Day selection map
│   │   ├── CloudTransition.tsx   # Multi-strip scene wipe animation
│   │   └── ChatBot.tsx           # AI chatbot overlay
│   ├── data/
│   │   ├── gameConstants.ts      # All game constants, palette, and sprite paths
│   │   ├── days.ts               # All Day/Activity data (story, photos, keywords…)
│   │   └── index.ts
│   └── index.ts
├── lib/
│   └── audio.ts                  # Singleton audio manager (bg music + SFX)
└── App.tsx                       # Router, transitions, music state
public/
├── background/                   # Per-day background images (.webp)
├── music/                        # bg_music_main.mp3, day00_bg.mp3, allday_bg.mp3
├── photos/                       # Diary photos organised by day (day00/, day01/…)
└── sprites/                      # All pixel-art assets (.webp)
```

---

## Credits

**Game Design & Development** — Mohammad Aldrin Said  
BS Information Technology, 4th Year — WMSU CCS

**Advisers** — Jason Catadman, Jaydee Ballaho, Odon Maravillas Jr., Edwin Arip

**Tour Organizer** — DJM Travel and Tours Services  
Tour Guides — Kuya Jero & Ate Veron

**Companies Visited** — MicroSourcing, OpenText, Top Peg Animation, HyTech Power Inc., Teleperformance

---

© 2026 DJM Educational Tour · WMSU College of Computing Studies
