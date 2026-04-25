import { GROUND_H, BUS_W } from "../data/gameConstants";

interface Banner {
  x: number;
  activityIndex: number;
}

interface Props {
  banners: Banner[];
  worldWidth: number;
  treseRef: React.RefObject<HTMLImageElement | null>;
  batmanRef: React.RefObject<HTMLImageElement | null>;
}

export function Day3Scenery({ banners, worldWidth, treseRef, batmanRef }: Props) {
  const START_X = BUS_W + 100;
  const lightPositions = Array.from(
    { length: Math.ceil((worldWidth - START_X) / 100) },
    (_, i) => START_X + i * 250,
  );

  const BOLLARD_W = 25;
  const BUSH_W = 35;

  // ── TOP PEG (banner 0) ────────────────────────────────────────────────────
  const TOPPEG_W = 220;
  const b0 = banners[0]?.x ?? 850;
  const tp0LeftBollardX = b0 - 175;
  const tp0RightBollardX = b0 + 145;
  const tp0BushOffset = BUSH_W - BOLLARD_W + 10;

  // ── Teleperformance (banner 1) ────────────────────────────────────────────
  const TP_W = 180;
  const b1 = banners[1]?.x ?? 1490;
  const tp1LeftBollardX = b1 - 175;
  const tp1RightBollardX = b1 + 145;
  const tp1BushOffset = BUSH_W - BOLLARD_W + 10;

  return (
    <>
      {/* ── Billboard + street lights ──────────────────────────────────── */}
      <img
        src="/sprites/billboard_day/billboard_day_3.webp"
        style={{
          position: "absolute",
          left: START_X,
          bottom: GROUND_H,
          width: 135,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {lightPositions.map((x) => (
        <img
          key={x}
          src="/sprites/street_lights.webp"
          style={{
            position: "absolute",
            left: x + 150,
            bottom: GROUND_H,
            width: 40,
            imageRendering: "pixelated",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── TOP PEG scenery (banner 0) ────────────────────────────────────── */}
      <img
        src="/sprites/top_peg.webp"
        style={{
          position: "absolute",
          left: b0 - TOPPEG_W / 2,
          bottom: GROUND_H - 3,
          width: TOPPEG_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Left bollard */}
      <img
        src="/sprites/bollards.webp"
        style={{
          position: "absolute",
          left: tp0LeftBollardX + 5,
          bottom: GROUND_H - 3,
          width: BOLLARD_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Right bollard */}
      <img
        src="/sprites/bollards.webp"
        style={{
          position: "absolute",
          left: tp0RightBollardX,
          bottom: GROUND_H - 3,
          width: BOLLARD_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Left bushes */}
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp0LeftBollardX - tp0BushOffset + 10,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp0LeftBollardX - tp0BushOffset + 60,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp0LeftBollardX - tp0BushOffset + 35,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Right bushes */}
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp0RightBollardX - tp0BushOffset + 25,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp0RightBollardX - tp0BushOffset - 20,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp0RightBollardX - tp0BushOffset,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Trese — animated, left of banner */}
      <img
        ref={treseRef}
        src="/sprites/trese_0.webp"
        style={{
          position: "absolute",
          left: b0 - 120,
          bottom: GROUND_H,
          width: 64,
          height: 64,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Batman — animated, right of banner */}
      <img
        ref={batmanRef}
        src="/sprites/batman_0.webp"
        style={{
          position: "absolute",
          left: b0 + 60,
          bottom: GROUND_H,
          width: 64,
          height: 64,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── Teleperformance scenery (banner 1) ───────────────────────────── */}
      {/* building_3 left */}
      <img
        src="/sprites/building_3.webp"
        style={{
          position: "absolute",
          left: b1 - TP_W / 2 - 30,
          bottom: GROUND_H - 3,
          width: 55,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* building_3 right */}
      <img
        src="/sprites/building_3.webp"
        style={{
          position: "absolute",
          left: b1 + TP_W / 2 - 30,
          bottom: GROUND_H - 3,
          width: 55,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Teleperformance building */}
      <img
        src="/sprites/teleperformance.webp"
        style={{
          position: "absolute",
          left: b1 - TP_W / 2,
          bottom: GROUND_H - 3,
          width: TP_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Left bollard */}
      <img
        src="/sprites/bollards.webp"
        style={{
          position: "absolute",
          left: tp1LeftBollardX + 5,
          bottom: GROUND_H - 3,
          width: BOLLARD_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Right bollard */}
      <img
        src="/sprites/bollards.webp"
        style={{
          position: "absolute",
          left: tp1RightBollardX,
          bottom: GROUND_H - 3,
          width: BOLLARD_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Left bushes */}
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp1LeftBollardX - tp1BushOffset + 10,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp1LeftBollardX - tp1BushOffset + 60,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp1LeftBollardX - tp1BushOffset + 35,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Right bushes */}
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp1RightBollardX - tp1BushOffset + 25,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp1RightBollardX - tp1BushOffset - 20,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/bush.webp"
        style={{
          position: "absolute",
          left: tp1RightBollardX - tp1BushOffset,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
