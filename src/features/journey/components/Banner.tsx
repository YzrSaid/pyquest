import type { Activity } from "@/features/journey";

interface Props {
  x: number;
  activity: Activity;
  isNear: boolean;
  groundH: number;
}

const POLE_H = 250;
const SIGN_W = 176;

// ── Palette ────────────────────────────────────────────────────────────────
const BG = "#0b390b"; // dark forest green — header bar
const BROWN = "#2f2420"; // dark espresso     — pole, borders
const CREAM = "#fffdd0"; // warm vanilla      — sign body background
const WHITE = "#ffffff"; // white             — active highlight

export function Banner({ x, activity, isNear, groundH }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: groundH,
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ── ENTER prompt ── */}
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 6,
          color: CREAM,
          background: BROWN,
          border: `1px solid ${isNear ? WHITE : BROWN}`,
          padding: "3px 8px",
          marginBottom: 6,
          whiteSpace: "nowrap",
          letterSpacing: 1,
          opacity: isNear ? 1 : 0,
          transition: "opacity 0.15s",
          animationName: isNear ? "blink" : "none",
          animationDuration: "1s",
          animationTimingFunction: "step-end",
          animationIterationCount: "infinite",
        }}
      >
        ▶ ENTER
      </div>

      {/* ── Sign card ── */}
      <div
        style={{
          width: SIGN_W,
          border: `2px solid ${isNear ? WHITE : BROWN}`,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: isNear
            ? `0 0 0 1px ${BROWN}, 0 0 22px rgba(255,255,255,0.22)`
            : `0 0 0 1px rgba(47,36,32,0.4)`,
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      >
        {/* Header bar — order + emoji */}
        <div
          style={{
            height: 30,
            background: BG,
            borderBottom: `2px solid ${isNear ? WHITE : BROWN}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px",
            transition: "border-color 0.15s",
          }}
        >
          <span
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: 7,
              color: CREAM,
              opacity: 0.7,
              letterSpacing: 1,
            }}
          >
            #{String(activity.order).padStart(2, "0")}
          </span>
          <span style={{ fontSize: 17, lineHeight: 1 }}>{activity.emoji}</span>
        </div>

        {/* Body — cream background, dark text */}
        <div
          style={{
            minHeight: 72,
            background: CREAM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 12px",
          }}
        >
          <span
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: 18,
              color: isNear ? BG : BROWN,
              textAlign: "center",
              lineHeight: 1,
              wordBreak: "break-word",
              transition: "color 0.15s",
            }}
          >
            {activity.title}
          </span>
        </div>
      </div>

      {/* ── Pole ── */}
      <div
        style={{
          width: 5,
          height: POLE_H,
          background: BROWN,
        }}
      />

      {/* ── Ground base ── */}
      <div
        style={{
          width: 34,
          height: 9,
          background: isNear ? WHITE : BROWN,
          borderRadius: 3,
          marginTop: -4,
          boxShadow: isNear ? "0 0 14px rgba(255,255,255,0.4)" : "none",
          transition: "background 0.15s, box-shadow 0.15s",
        }}
      />
    </div>
  );
}
