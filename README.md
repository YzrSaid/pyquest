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
| Analytics | Vercel Analytics + Speed Insights |
| Hosting | Vercel |

---

## Features

- **Side-scrolling game engine** — custom RAF-based physics, sprite animation, and camera system built from scratch
- **7 playable days** — each with unique backgrounds, world decorations, and interactive activity banners
- **Day 00 runway sequence** — board the plane and watch it taxi and take off to transition to Day 01
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
├── components/         # Shared UI (LoadingScreen)
├── features/journey/   # All game logic
│   └── components/
│       ├── GameScene.tsx      # Core game engine (physics, RAF loop, sprites)
│       ├── MenuScene.tsx      # Main menu with animated bus + modals
│       ├── OverworldMap.tsx   # Day selection map
│       ├── CloudTransition.tsx# Scene wipe animation
│       ├── Banner.tsx         # In-world activity banners
│       ├── StopModal.tsx      # Activity detail modal
│       └── ChatBot.tsx        # AI chatbot overlay
├── lib/
│   └── audio.ts       # Singleton audio manager (bg music + SFX)
└── App.tsx            # Router, transitions, music state
public/
├── background/        # Background images per day
├── music/             # bg_music_main.mp3, fx_1.mp3
└── sprites/           # All pixel art assets
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

© 2025 DJM Educational Tour · WMSU College of Computing Studies
