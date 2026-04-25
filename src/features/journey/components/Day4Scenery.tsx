import { GROUND_H, BUS_W } from "../data/gameConstants";

interface Banner {
  x: number;
  activityIndex: number;
}

interface Props {
  banners: Banner[];
  worldWidth: number;
}

export function Day4Scenery({ banners, worldWidth }: Props) {
  const START_X = BUS_W + 100;
  const lightPositions = Array.from(
    { length: Math.ceil((worldWidth - START_X) / 100) },
    (_, i) => START_X + i * 250,
  );

  const BOLLARD_W = 25;
  const BUSH_W = 35;

  // ── MMDA (banner 0) ───────────────────────────────────────────────────────
  const TLIGHT_W = 55;
  const MMDA_W = 200;
  const b0 = banners[0]?.x ?? 850;
  const leftX = b0 - 175;
  const rightX = b0 + 145;

  // ── MicroSourcing (banner 1) ──────────────────────────────────────────────
  const MS_W = 280;
  const b1 = banners[1]?.x ?? 1490;
  const ms1LeftBollardX = b1 - 175;
  const ms1RightBollardX = b1 + 145;
  const ms1BushOffset = BUSH_W - BOLLARD_W + 10;

  return (
    <>
      {/* ── Billboard + street lights ──────────────────────────────────── */}
      <img
        src="/sprites/billboard_day/billboard_day_4.webp"
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

      {/* ── MMDA scenery (banner 0) ───────────────────────────────────────── */}
      {/* MMDA building — behind everything */}
      <img
        src="/sprites/mmda.webp"
        style={{
          position: "absolute",
          left: b0 - MMDA_W / 2,
          bottom: GROUND_H - 3,
          width: MMDA_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Left traffic light */}
      <img
        src="/sprites/traffic_light.webp"
        style={{
          position: "absolute",
          left: leftX,
          bottom: GROUND_H,
          width: TLIGHT_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* MMDA officers */}
      <img
        src="/sprites/mmda_officer.webp"
        style={{
          position: "absolute",
          left: rightX + 10,
          bottom: GROUND_H,
          width: 28,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/mmda_officer.webp"
        style={{
          position: "absolute",
          left: rightX - 10,
          bottom: GROUND_H,
          width: 28,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/mmda_officer.webp"
        style={{
          position: "absolute",
          left: rightX - 30,
          bottom: GROUND_H,
          width: 28,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── MicroSourcing scenery (banner 1) ─────────────────────────────── */}
      <img
        src="/sprites/microsourcing.webp"
        style={{
          position: "absolute",
          left: b1 - MS_W / 2,
          bottom: GROUND_H - 3,
          width: MS_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Left bollard */}
      <img
        src="/sprites/bollards.webp"
        style={{
          position: "absolute",
          left: ms1LeftBollardX + 5,
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
          left: ms1RightBollardX,
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
          left: ms1LeftBollardX - ms1BushOffset + 10,
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
          left: ms1LeftBollardX - ms1BushOffset + 60,
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
          left: ms1LeftBollardX - ms1BushOffset + 35,
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
          left: ms1RightBollardX - ms1BushOffset + 25,
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
          left: ms1RightBollardX - ms1BushOffset - 20,
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
          left: ms1RightBollardX - ms1BushOffset,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
