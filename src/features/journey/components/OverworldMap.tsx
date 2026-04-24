import { useState } from "react";
import { playClick } from "@/lib/audio";

interface Props {
  onDaySelect: (dayId: number) => void;
  onScroll?: (scrollTop: number) => void;
}

const ACCENT = "#ffffff";
const ACCENT2 = "#ffffff";

const STOPS = [
  { day: 0, subtitle: "The Journey Begins" },
  { day: 1, subtitle: "Historical Manila" },
  { day: 2, subtitle: "Corporate World" },
  { day: 3, subtitle: "Creativity & Comm." },
  { day: 4, subtitle: "Public Service & Biz" },
  { day: 5, subtitle: "Tagaytay Free Day" },
  { day: 6, subtitle: "City of Pines" },
];

// Each day has its own vivid retro colour — green is reserved for the accent
const NODE_COLOR: Record<number, string> = {
  0: "#ff6b81",
  1: "#ff9f43",
  2: "#feca57",
  3: "#48dbfb",
  4: "#54a0ff",
  5: "#a29bfe",
  6: "#fd79a8",
};

function Connector() {
  return (
    <div
      style={{
        width: 4,
        height: 52,
        borderRadius: 2,
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          ${ACCENT}55 0px,  ${ACCENT}55 10px,
          transparent 10px, transparent 20px
        )`,
        flexShrink: 0,
      }}
    />
  );
}

export function OverworldMap({ onDaySelect, onScroll }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
        scrollBehavior: "smooth",
        background: "rgba(0,0,0,0.52)",
        WebkitOverflowScrolling: "touch",
      }}
      className="map-scroll"
      onScroll={(e) => onScroll?.((e.currentTarget as HTMLDivElement).scrollTop)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "36px 16px 56px",
        }}
      >
        {STOPS.map((stop, i) => {
          const isHovered = hovered === stop.day;
          const col = NODE_COLOR[stop.day];

          return (
            <div
              key={stop.day}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => { playClick(); onDaySelect(stop.day); }}
                onMouseEnter={() => setHovered(stop.day)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: isHovered
                    ? `radial-gradient(circle at 36% 36%, ${col}, ${col}99)`
                    : `radial-gradient(circle at 36% 36%, ${col}cc, ${col}55)`,
                  border: `3px solid ${isHovered ? ACCENT : col + "88"}`,
                  boxShadow: isHovered
                    ? `0 0 0 5px ${ACCENT}33, 0 0 24px ${col}55, inset 0 2px 5px rgba(255,255,255,0.18)`
                    : `0 6px 18px ${col}33, inset 0 2px 4px rgba(255,255,255,0.12)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition:
                    "box-shadow 0.15s, border-color 0.15s, background 0.15s",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  touchAction: "manipulation",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: 24,
                    color: "#fff",
                    textShadow: "0 1px 4px rgba(0,0,0,0.55)",
                    letterSpacing: 1,
                  }}
                >
                  {String(stop.day).padStart(2, "0")}
                </span>
              </div>

              <div style={{ marginTop: 8, textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: 18,
                    color: isHovered ? ACCENT2 : "#8baab4",
                    transition: "color 0.15s",
                    lineHeight: 1.2,
                  }}
                >
                  {stop.subtitle}
                </div>
                {isHovered && (
                  <div
                    style={{
                      fontFamily: "'Press Start 2P', cursive",
                      fontSize: 6,
                      color: ACCENT,
                      marginTop: 4,
                      letterSpacing: 1,
                    }}
                  >
                    ▶ ENTER
                  </div>
                )}
              </div>

              {i < STOPS.length - 1 && (
                <div style={{ marginTop: 10 }}>
                  <Connector />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
