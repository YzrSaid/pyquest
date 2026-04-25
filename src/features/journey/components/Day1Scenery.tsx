import { GROUND_H, BUS_W } from "../data/gameConstants";

interface Banner {
  x: number;
  activityIndex: number;
}

interface Props {
  banners: Banner[];
}

export function Day1Scenery({ banners }: Props) {
  const START_X = BUS_W + 50;

  const FLAG_W = 90;
  const STATUE_W = 300;
  const GUARD_W = 35;
  const b0 = banners[0]?.x ?? 880;
  const sHalf = STATUE_W / 2;
  const flag2L = b0 - sHalf - FLAG_W + 30;
  const flag1L = flag2L - (FLAG_W - 20);

  const TREE_W = 35;
  const ENTRANCE_W = 370;
  const b1 = banners[1]?.x ?? 1520;
  const entL = b1 - 160;
  const entR = entL + ENTRANCE_W;
  const closingX = entR;

  const KALESA_W = 70;
  const CATHEDRAL_W = 340;
  const BENCH_W = 35;
  const b2 = banners[2]?.x ?? 2160;

  const TREE2_W = 45;
  const FOUNTAIN_W = 80;
  const CCP_W = 520;
  const b3 = banners[3]?.x ?? 2800;

  const BUILDING1_W = 80;
  const BUILDING2_W = 185;
  const MOA_W = 350;
  const FERRIS_W = 300;
  const b4 = banners[4]?.x ?? 3440;

  return (
    <>
      {/* ── Billboard ──────────────────────────────────────────────────── */}
      <img
        src="/sprites/billboard_day/billboard_day_1.webp"
        style={{
          position: "absolute",
          left: START_X,
          bottom: GROUND_H,
          width: 135,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── Rizal Park scenery (banner 0) ──────────────────────────────── */}
      {/* Two overlapping flag poles */}
      <img
        src="/sprites/rizal_park/flag_pole.webp"
        style={{
          position: "absolute",
          left: flag1L + 20,
          bottom: GROUND_H,
          width: FLAG_W,
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/rizal_park/flag_pole.webp"
        style={{
          position: "absolute",
          left: flag2L,
          bottom: GROUND_H,
          width: FLAG_W,
          pointerEvents: "none",
        }}
      />
      {/* Rizal statue */}
      <img
        src="/sprites/rizal_park/rizal_statue.webp"
        style={{
          position: "absolute",
          left: b0 - sHalf,
          bottom: GROUND_H - 5,
          width: STATUE_W,
          pointerEvents: "none",
        }}
      />
      {/* Guard */}
      <img
        src="/sprites/rizal_park/guard.webp"
        style={{
          position: "absolute",
          left: b0 + sHalf + 10,
          bottom: GROUND_H - 3,
          width: GUARD_W,
          pointerEvents: "none",
        }}
      />

      {/* ── Intramuros scenery (banner 1) ──────────────────────────────── */}
      <img
        src="/sprites/intramuros/intramuros_entrance.webp"
        style={{
          position: "absolute",
          left: entL - 20,
          bottom: GROUND_H - 3,
          width: ENTRANCE_W,
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/tree_1.webp"
        style={{
          position: "absolute",
          left: entL - TREE_W - (TREE_W - 10),
          bottom: GROUND_H,
          width: TREE_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/tree_1.webp"
        style={{
          position: "absolute",
          left: entL - TREE_W,
          bottom: GROUND_H,
          width: TREE_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/tree_1.webp"
        style={{
          position: "absolute",
          left: closingX - 20,
          bottom: GROUND_H,
          width: TREE_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/tree_1.webp"
        style={{
          position: "absolute",
          left: closingX + (TREE_W - 80),
          bottom: GROUND_H,
          width: TREE_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── Manila Cathedral scenery (banner 2) ─────────────────────────── */}
      <img
        src="/sprites/intramuros/manila_cathedral.webp"
        style={{
          position: "absolute",
          left: b2 - 155,
          bottom: GROUND_H - 3,
          width: CATHEDRAL_W,
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/intramuros/kalesa.webp"
        style={{
          position: "absolute",
          left: b2 - 200,
          bottom: GROUND_H - 3,
          width: KALESA_W,
          pointerEvents: "none",
        }}
      />
      <img
        src="/sprites/bench.webp"
        style={{
          position: "absolute",
          left: b2 + 170,
          bottom: GROUND_H - 3,
          width: BENCH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── CCP scenery (banner 3) ────────────────────────────────────────── */}
      {/* CCP entrance — main building */}
      <img
        src="/sprites/ccp/ccp_entrance.webp"
        style={{
          position: "absolute",
          left: b3 - CCP_W / 2,
          bottom: GROUND_H - 3,
          width: CCP_W,
          pointerEvents: "none",
        }}
      />
      {/* Left tree — behind everything */}
      <img
        src="/sprites/tree_2.webp"
        style={{
          position: "absolute",
          left: b3 - 280,
          bottom: GROUND_H - 3,
          width: TREE2_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Left fountain */}
      <img
        src="/sprites/water_fountain_no_grass.webp"
        style={{
          position: "absolute",
          left: b3 - 195,
          bottom: GROUND_H - 3,
          width: FOUNTAIN_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Right fountain */}
      <img
        src="/sprites/water_fountain_no_grass.webp"
        style={{
          position: "absolute",
          left: b3 + 100,
          bottom: GROUND_H - 3,
          width: FOUNTAIN_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Right tree */}
      <img
        src="/sprites/tree_2.webp"
        style={{
          position: "absolute",
          left: b3 + 230,
          bottom: GROUND_H - 3,
          width: TREE2_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── Mall of Asia scenery (banner 4) ──────────────────────────────── */}
      {/* building_1 left — furthest back */}
      <img
        src="/sprites/building_1.webp"
        style={{
          position: "absolute",
          left: b4 - 280,
          bottom: GROUND_H - 3,
          width: BUILDING1_W,
          pointerEvents: "none",
        }}
      />
      {/* Ferris wheel — behind moa_entrance */}
      <img
        src="/sprites/moa/ferris_wheel.webp"
        style={{
          position: "absolute",
          left: b4 + 160,
          bottom: GROUND_H - 3,
          width: FERRIS_W,
          pointerEvents: "none",
        }}
      />
      {/* building_1 right */}
      <img
        src="/sprites/building_1.webp"
        style={{
          position: "absolute",
          left: b4 + 220,
          bottom: GROUND_H - 3,
          width: BUILDING1_W,
          pointerEvents: "none",
        }}
      />
      {/* building_2 left */}
      <img
        src="/sprites/building_2.webp"
        style={{
          position: "absolute",
          left: b4 - 260,
          bottom: GROUND_H - 3,
          width: BUILDING2_W,
          pointerEvents: "none",
        }}
      />
      {/* building_2 right */}
      <img
        src="/sprites/building_2.webp"
        style={{
          position: "absolute",
          left: b4 + 90,
          bottom: GROUND_H - 3,
          width: BUILDING2_W,
          transform: "scaleX(-1)",
          pointerEvents: "none",
        }}
      />
      {/* MOA entrance — main attraction, in front of ferris */}
      <img
        src="/sprites/moa/moa_entrance.webp"
        style={{
          position: "absolute",
          left: b4 - MOA_W / 2,
          bottom: GROUND_H - 3,
          width: MOA_W,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
