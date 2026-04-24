import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import "./App.css";
import {
  playBgMusic,
  pauseBgMusic,
  playClick,
  playDayMusic,
  stopDayMusic,
} from "@/lib/audio";
import {
  days,
  OverworldMap,
  GameScene,
  CloudTransition,
  MenuScene,
} from "@/features/journey";
import type { Day } from "@/features/journey";

function ModalButton({
  label,
  onClick,
  active = false,
}: {
  label: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const filled = active || hovered;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 7,
        color: filled ? "#111" : "#fff",
        background: filled ? "#fff" : "transparent",
        border: "2px solid rgba(255,255,255,0.75)",
        boxShadow: hovered
          ? "1px 1px 0 rgba(255,255,255,0.6)"
          : "4px 4px 0 rgba(255,255,255,0.55)",
        transform: hovered ? "translate(3px, 3px)" : "translate(0, 0)",
        padding: "9px 0",
        cursor: "pointer",
        letterSpacing: 1,
        transition:
          "box-shadow 0.1s, transform 0.1s, background 0.1s, color 0.1s",
      }}
    >
      {label}
    </button>
  );
}

function MusicModal({ onChoice }: { onChoice: (enable: boolean) => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: "#111",
          border: "2px solid rgba(255,255,255,0.3)",
          padding: "36px 32px 28px",
          maxWidth: 360,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 12,
            color: "#fff",
            lineHeight: 1.9,
            margin: 0,
            letterSpacing: 1,
          }}
        >
          BACKGROUND MUSIC
        </p>
        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 20,
            color: "rgba(255,255,255,0.7)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          This experience is best enjoyed with background music. Enable it?
        </p>
        <div style={{ display: "flex", gap: 30, width: "100%" }}>
          <ModalButton
            active
            label="YES"
            onClick={() => {
              playClick();
              onChoice(true);
            }}
          />
          <ModalButton
            label="SKIP"
            onClick={() => {
              playClick();
              onChoice(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function RetroBackButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => {
        playClick();
        onClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: 16,
        top: "50%",
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 10,
        color: hovered ? "#111" : "#fff",
        background: hovered ? "#fff" : "transparent",
        border: "2px solid rgba(255,255,255,0.75)",
        boxShadow: hovered
          ? "1px 1px 0 rgba(255,255,255,0.6)"
          : "4px 4px 0 rgba(255,255,255,0.55)",
        transform: hovered
          ? "translateY(calc(-50% + 3px)) translateX(3px)"
          : "translateY(-50%)",
        padding: "7px 12px",
        cursor: "pointer",
        letterSpacing: 1,
        transition:
          "box-shadow 0.1s, transform 0.1s, background 0.1s, color 0.1s",
        imageRendering: "pixelated",
      }}
    >
      ◀
    </button>
  );
}

function MapRoute({ goTo }: { goTo: (path: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  return (
    <div
      className="flex flex-col h-svh overflow-hidden"
      style={{
        backgroundImage: 'url("/background/background_7.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header
        className="shrink-0 relative flex flex-col items-center py-10 gap-1 transition-all duration-300"
        style={{
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.2)"
            : "1px solid transparent",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: scrolled ? "blur(2px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(2px)" : "none",
        }}
      >
        <RetroBackButton onClick={() => goTo("/")} />
        <h1
          className="font-pixel text-white tracking-wide"
          style={{ fontSize: "clamp(16px, 5vw, 48px)" }}
        >
          PYQUEST MAP
        </h1>
      </header>
      <div className="flex-1 min-h-0">
        <OverworldMap
          onDaySelect={(id) => goTo(`/day/${id}`)}
          onScroll={(top) => setScrolled(top > 10)}
        />
      </div>
    </div>
  );
}

function AppInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const nextPathRef = useRef<string>("/");
  const [showMusicModal, setShowMusicModal] = useState(true);
  const musicEnabledRef = useRef(false);

  function handleMusicChoice(enable: boolean) {
    musicEnabledRef.current = enable;
    setShowMusicModal(false);
    if (enable) playBgMusic();
  }

  useEffect(() => {
    if (!musicEnabledRef.current) return;
    const onMenuOrMap =
      location.pathname === "/" || location.pathname === "/map";
    if (onMenuOrMap) {
      stopDayMusic();
      playBgMusic();
    } else if (location.pathname === "/day/0") {
      pauseBgMusic();
      playDayMusic("/music/day00_bg.mp3");
    } else {
      pauseBgMusic();
      stopDayMusic();
    }
  }, [location.pathname]);

  function goTo(path: string) {
    if (transitioning) return;
    nextPathRef.current = path;
    setTransitioning(true);
  }

  function handleCloudSwitch() {
    navigate(nextPathRef.current);
  }

  function handleCloudDone() {
    setTransitioning(false);
  }

  return (
    <>
      {showMusicModal && <MusicModal onChoice={handleMusicChoice} />}

      <Routes>
        <Route path="/" element={<MenuScene onStart={() => goTo("/map")} />} />
        <Route path="/map" element={<MapRoute goTo={goTo} />} />
        <Route path="/day/:id" element={<DayRoute goTo={goTo} />} />
      </Routes>

      <CloudTransition
        active={transitioning}
        onSwitch={handleCloudSwitch}
        onDone={handleCloudDone}
      />
    </>
  );
}

function DayRoute({ goTo }: { goTo: (path: string) => void }) {
  const { id } = useParams<{ id: string }>();
  const dayId = parseInt(id ?? "0", 10);
  const day = days.find((d: Day) => d.id === dayId) ?? null;

  if (!day) {
    goTo("/map");
    return null;
  }

  function exitGame() {
    goTo("/map");
  }

  function nextDay() {
    const next = days.find((d: Day) => d.id === dayId + 1);
    goTo(next ? `/day/${next.id}` : "/map");
  }

  function prevDay() {
    const prev = days.find((d: Day) => d.id === dayId - 1);
    if (prev) goTo(`/day/${prev.id}`);
  }

  return (
    <GameScene
      day={day}
      onExit={exitGame}
      onNextDay={nextDay}
      onPrevDay={prevDay}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
