import { GROUND_H, BUS_W } from "../data/gameConstants";

interface Banner {
  x: number;
  activityIndex: number;
}

interface Props {
  banners: Banner[];
  worldWidth: number;
  robotRef: React.RefObject<HTMLImageElement | null>;
  robotPlacardRef: React.RefObject<HTMLImageElement | null>;
}

export function Day2Scenery({ banners, worldWidth, robotRef, robotPlacardRef }: Props) {
  const START_X = BUS_W + 100;
  const lightPositions = Array.from(
    { length: Math.ceil((worldWidth - START_X) / 100) },
    (_, i) => START_X + i * 250,
  );

  const BOLLARD_W = 25;
  const BUSH_W = 35;

  // ── HyTech (banner 0) ────────────────────────────────────────────────────
  const HYTECH_W = 280;
  const b0 = banners[0]?.x ?? 850;
  const h0LeftBollardX = b0 - 175;
  const h0RightBollardX = b0 + 145;
  const h0BushOffset = BUSH_W - BOLLARD_W + 10;

  // ── OpenText (banner 1) ──────────────────────────────────────────────────
  const OT_W = 280;
  const b1 = banners[1]?.x ?? 1490;
  const h1LeftBollardX = b1 - 175;
  const h1RightBollardX = b1 + 145;
  const h1BushOffset = BUSH_W - BOLLARD_W + 10;

  return (
    <>
      {/* ── Billboard + street lights ──────────────────────────────────── */}
      <img
        src="/sprites/billboard_day/billboard_day_2.webp"
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

      {/* ── HyTech Power scenery (banner 0) ──────────────────────────────── */}
      <img
        src="/sprites/hytech.webp"
        style={{
          position: "absolute",
          left: b0 - HYTECH_W / 2,
          bottom: GROUND_H - 3,
          width: HYTECH_W,
          pointerEvents: "none",
        }}
      />
      {/* Left bollard */}
      <img
        src="/sprites/bollards.webp"
        style={{
          position: "absolute",
          left: h0LeftBollardX + 5,
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
          left: h0RightBollardX,
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
          left: h0LeftBollardX - h0BushOffset + 10,
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
          left: h0LeftBollardX - h0BushOffset + 60,
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
          left: h0LeftBollardX - h0BushOffset + 35,
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
          left: h0RightBollardX - h0BushOffset + 25,
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
          left: h0RightBollardX - h0BushOffset - 20,
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
          left: h0RightBollardX - h0BushOffset,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Robot wrapper */}
      <div
        style={{
          position: "absolute",
          left: b0 + 200,
          bottom: GROUND_H - 5,
          width: 64,
          height: 64,
          pointerEvents: "none",
        }}
      >
        {/* Placard above head — blinks every 2s */}
        <img
          ref={robotPlacardRef}
          src="/sprites/bubble_hytech.webp"
          style={{
            position: "absolute",
            bottom: "70%",
            left: "-30%",
            transform: "translateX(-50%)",
            width: 130,
            maxWidth: "none",
            imageRendering: "pixelated",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
        {/* Robot sprite — src swapped each frame by RAF */}
        <img
          ref={robotRef}
          src="/sprites/hytech_robot_0.webp"
          style={{
            width: 64,
            height: 64,
            transform: "scaleX(-1)",
            imageRendering: "pixelated",
            pointerEvents: "none",
            display: "block",
          }}
        />
      </div>

      {/* ── OpenText scenery (banner 1) ────────────────────────────────────── */}
      <img
        src="/sprites/opentext.webp"
        style={{
          position: "absolute",
          left: b1 - OT_W / 2,
          bottom: GROUND_H - 3,
          width: OT_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Left bollard */}
      <img
        src="/sprites/bollards.webp"
        style={{
          position: "absolute",
          left: h1LeftBollardX + 5,
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
          left: h1RightBollardX,
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
          left: h1LeftBollardX - h1BushOffset + 10,
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
          left: h1LeftBollardX - h1BushOffset + 60,
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
          left: h1LeftBollardX - h1BushOffset + 35,
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
          left: h1RightBollardX - h1BushOffset + 25,
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
          left: h1RightBollardX - h1BushOffset - 20,
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
          left: h1RightBollardX - h1BushOffset,
          bottom: GROUND_H - 3,
          width: BUSH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
