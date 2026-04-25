import { GROUND_H, BUS_W } from "../data/gameConstants";

interface Props {
  busRef: React.RefObject<HTMLImageElement | null>;
  busSmokeRef: React.RefObject<HTMLDivElement | null>;
  busPromptRef: React.RefObject<HTMLDivElement | null>;
}

export function BusLayer({ busRef, busSmokeRef, busPromptRef }: Props) {
  return (
    <>
      {/* Pixel-art smoke puffs from exhaust */}
      <div
        ref={busSmokeRef}
        style={{
          position: "absolute",
          bottom: GROUND_H + 32,
          left: 18,
          width: 1,
          opacity: 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (i % 2) * 12 - 6,
              bottom: i * 14,
              width: 8 + i * 5,
              height: 8 + i * 5,
              background: i % 2 === 0 ? "#b8b8b8" : "#dedede",
              borderRadius: "50%",
              animationName: "smokeRise",
              animationDuration: `${0.65 + i * 0.2}s`,
              animationDelay: `${i * 0.18}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-out",
            }}
          />
        ))}
      </div>

      {/* ENTER prompt */}
      <div
        ref={busPromptRef}
        style={{
          position: "absolute",
          bottom: GROUND_H + 262,
          left: 0,
          transform: "translateX(-50%)",
          opacity: 0,
          transition: "opacity 0.15s",
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 6,
            color: "#fffdd0",
            background: "#2f2420",
            border: "1px solid #fffdd0",
            padding: "3px 8px",
            whiteSpace: "nowrap",
            animationName: "blink",
            animationDuration: "1s",
            animationTimingFunction: "step-end",
            animationIterationCount: "infinite",
          }}
        >
          ▶ ENTER
        </div>
      </div>

      {/* Bus image */}
      <img
        ref={busRef}
        src="/sprites/tileset2/bus_side_view.webp"
        style={{
          position: "absolute",
          left: -BUS_W,
          bottom: GROUND_H,
          width: BUS_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
          transformOrigin: "center center",
        }}
      />
    </>
  );
}
