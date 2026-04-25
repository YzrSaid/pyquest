import { GROUND_H, BUS_W } from "../data/gameConstants";

interface Banner {
  x: number;
  activityIndex: number;
}

interface Props {
  banners: Banner[];
  worldWidth: number;
}

export function Day5Scenery({ banners, worldWidth }: Props) {
  const START_X = BUS_W + 100;
  const treePositions = Array.from(
    { length: Math.ceil((worldWidth - START_X) / 100) },
    (_, i) => START_X + i * 120,
  );

  // ── People's Park (banner 0) ──────────────────────────────────────────────
  const PARK_W = 500;
  const STATUE_W = 70;
  const b0 = (banners[0]?.x ?? 850) + 40;

  // ── Sky Ranch (banner 1) ──────────────────────────────────────────────────
  const SKYRANCH_W = 450;
  const SKYDROP_W = 80;
  const b1 = banners[1]?.x ?? 1490;

  return (
    <>
      {/* ── Billboard + pine trees ─────────────────────────────────────── */}
      <img
        src="/sprites/billboard_day/billboard_day_5.webp"
        style={{
          position: "absolute",
          left: START_X,
          bottom: GROUND_H,
          width: 135,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {treePositions.map((x) => (
        <img
          key={x}
          src="/sprites/tileset_1/tree_pine.webp"
          style={{
            position: "absolute",
            left: x + 150,
            bottom: GROUND_H,
            width: 100,
            imageRendering: "pixelated",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── People's Park scenery (banner 0) ─────────────────────────────── */}
      {/* People's Park — main attraction, behind statue */}
      <img
        src="/sprites/tileset_1/people_park.webp"
        style={{
          position: "absolute",
          left: b0 - PARK_W / 2,
          bottom: GROUND_H,
          width: PARK_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Jesus statue — in front, intersecting left-center of park */}
      <img
        src="/sprites/tileset_1/jesus_statue.webp"
        style={{
          position: "absolute",
          left: b0 - PARK_W / 2 - 40,
          bottom: GROUND_H - 3,
          width: STATUE_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── Sky Ranch scenery (banner 1) ──────────────────────────────────── */}
      {/* Sky Ranch — main attraction */}
      <img
        src="/sprites/tileset_1/skyranch.webp"
        style={{
          position: "absolute",
          left: b1 - SKYRANCH_W / 2,
          bottom: GROUND_H - 3,
          width: SKYRANCH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Sky Drop ride — right of skyranch, in front */}
      <img
        src="/sprites/tileset_1/sky_drop.webp"
        style={{
          position: "absolute",
          left: b1 + SKYRANCH_W / 2 - 20,
          bottom: GROUND_H,
          width: SKYDROP_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Speech bubble — near the riders at the top of the sky drop */}
      <img
        src="/sprites/tileset_1/bubble_1.webp"
        style={{
          position: "absolute",
          left: b1 + SKYRANCH_W / 2 - 100,
          bottom: GROUND_H + 125,
          width: 180,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
