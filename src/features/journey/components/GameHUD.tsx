import { C_ACCENT, C_TEXT } from "../data/gameConstants";

interface Props {
  dayId: number;
  subtitle: string;
  onExit: () => void;
}

export function GameHUD({ dayId, subtitle, onExit }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        zIndex: 20,
        background:
          "linear-gradient(to bottom, rgba(10,8,6,0.88) 0%, transparent 100%)",
        pointerEvents: "none",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 9,
            color: C_ACCENT,
          }}
        >
          DAY {String(dayId).padStart(2, "0")}
        </div>
        <div
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 20,
            color: C_TEXT,
            marginTop: 4,
          }}
        >
          {subtitle}
        </div>
      </div>
      <button
        onClick={onExit}
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 10,
          color: "#B09060",
          background: "none",
          border: "none",
          cursor: "pointer",
          pointerEvents: "all",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = C_ACCENT)}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#B09060")}
      >
        &lt; MAP
      </button>
    </div>
  );
}
