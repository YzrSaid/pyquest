import { GROUND_H, BUS_W } from "../data/gameConstants";

interface Banner {
  x: number;
  activityIndex: number;
}

interface Props {
  banners: Banner[];
  worldWidth: number;
}

export function Day6Scenery({ banners, worldWidth }: Props) {
  const START_X = BUS_W + 100;
  const treePositions = Array.from(
    { length: Math.ceil((worldWidth - START_X) / 100) },
    (_, i) => START_X + i * 250,
  );

  // ── Strawberry Farm (banner 0) ────────────────────────────────────────────
  const STATUE_W_0 = 380;
  const FARMER_W = 120;
  const b0 = banners[0]?.x ?? 850;

  // ── Bell Church (banner 1) ────────────────────────────────────────────────
  const CHURCH_W = 300;
  const CHURCH_STATUE_W = 130;
  const b1 = banners[1]?.x ?? 1490;

  // ── PMA (banner 2) ────────────────────────────────────────────────────────
  const PMA_W = 350;
  const OFFICERS_W = 120;
  const AIRCRAFT_W = 280;
  const b2 = banners[2]?.x ?? 2130;

  // ── The Mansion (banner 3) ────────────────────────────────────────────────
  const MANSION_W = 480;
  const b3 = banners[3]?.x ?? 2770;

  // ── Mines View Park (banner 4) ────────────────────────────────────────────
  const MINES_W = 380;
  const HORSE_W = 110;
  const IFUGAO_W = 70;
  const b4 = banners[4]?.x ?? 3410;

  // ── Burnham Park (banner 5) ───────────────────────────────────────────────
  const BURNHAM_W = 520;
  const TAHO_W = 70;
  const CART1_W = 55;
  const CART2_W = 70;
  const b5 = banners[5]?.x ?? 4050;

  return (
    <>
      {/* ── Billboard + pine trees ─────────────────────────────────────── */}
      <img
        src="/sprites/billboard_day/billboard_day_6.webp"
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

      {/* ── Strawberry Farm scenery (banner 0) ───────────────────────────── */}
      {/* Strawberry statue — main attraction */}
      <img
        src="/sprites/strawberry_statue.webp"
        style={{
          position: "absolute",
          left: b0 - STATUE_W_0 / 2,
          bottom: GROUND_H - 9,
          width: STATUE_W_0,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* House 1 — further left, behind house 2 */}
      <img
        src="/sprites/house_1.webp"
        style={{
          position: "absolute",
          left: b0 - STATUE_W_0 / 2 - 80,
          bottom: GROUND_H,
          width: 90,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* House 2 — in front of house 1 */}
      <img
        src="/sprites/house_1.webp"
        style={{
          position: "absolute",
          left: b0 - STATUE_W_0 / 2 - 50,
          bottom: GROUND_H,
          width: 90,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Farmers — right of statue */}
      <img
        src="/sprites/farmers.webp"
        style={{
          position: "absolute",
          left: b0 + STATUE_W_0 / 2 - 10,
          bottom: GROUND_H - 6,
          width: FARMER_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── Bell Church scenery (banner 1) ───────────────────────────────── */}
      {/* Bell Church — main attraction */}
      <img
        src="/sprites/bell_church.webp"
        style={{
          position: "absolute",
          left: b1 - CHURCH_W / 2,
          bottom: GROUND_H - 3,
          width: CHURCH_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Left bell church statue */}
      <img
        src="/sprites/bell_church_statue.webp"
        style={{
          position: "absolute",
          left: b1 - CHURCH_W / 2 - CHURCH_STATUE_W + 20,
          bottom: GROUND_H - 6,
          width: CHURCH_STATUE_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Right bell church statue */}
      <img
        src="/sprites/bell_church_statue.webp"
        style={{
          position: "absolute",
          left: b1 + CHURCH_W / 2 - 20,
          bottom: GROUND_H - 6,
          width: CHURCH_STATUE_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── PMA scenery (banner 2) ───────────────────────────────────────── */}
      {/* PMA Melchor Hall — main attraction */}
      <img
        src="/sprites/pma.webp"
        style={{
          position: "absolute",
          left: b2 - PMA_W / 2,
          bottom: GROUND_H - 10,
          width: PMA_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Aircraft display — right of building */}
      <img
        src="/sprites/pma_aircraft.webp"
        style={{
          position: "absolute",
          left: b2 + PMA_W / 2 - 150,
          bottom: GROUND_H - 3,
          width: AIRCRAFT_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* PMA cadets/officers — left of building */}
      <img
        src="/sprites/pma_officers.webp"
        style={{
          position: "absolute",
          left: b2 - PMA_W / 2 - OFFICERS_W + 60,
          bottom: GROUND_H - 3,
          width: OFFICERS_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── The Mansion scenery (banner 3) ───────────────────────────────── */}
      <img
        src="/sprites/mansion.webp"
        style={{
          position: "absolute",
          left: b3 - MANSION_W / 2,
          bottom: GROUND_H - 3,
          width: MANSION_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── Mines View Park scenery (banner 4) ───────────────────────────── */}
      {/* Horse — left of main attraction */}
      <img
        src="/sprites/horse.webp"
        style={{
          position: "absolute",
          left: b4 - MINES_W / 2 - HORSE_W + 10,
          bottom: GROUND_H - 10,
          width: HORSE_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Mines View — main attraction */}
      <img
        src="/sprites/mines_view.webp"
        style={{
          position: "absolute",
          left: b4 - MINES_W / 2,
          bottom: GROUND_H - 3,
          width: MINES_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Ifugao — right end of mines view */}
      <img
        src="/sprites/ifugao.webp"
        style={{
          position: "absolute",
          left: b4 + MINES_W / 2 - 10,
          bottom: GROUND_H - 3,
          width: IFUGAO_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── Burnham Park scenery (banner 5) ──────────────────────────────── */}
      {/* Burnham Park gate — main attraction */}
      <img
        src="/sprites/burnham.webp"
        style={{
          position: "absolute",
          left: b5 - BURNHAM_W / 2,
          bottom: GROUND_H - 3,
          width: BURNHAM_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Ice cream vendor */}
      <img
        src="/sprites/ice_cream.webp"
        style={{
          position: "absolute",
          left: b5 - BURNHAM_W / 2 - TAHO_W + 120,
          bottom: GROUND_H - 3,
          width: 120,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Taho vendor — left of main attraction */}
      <img
        src="/sprites/taho_vendor.webp"
        style={{
          position: "absolute",
          left: b5 - BURNHAM_W / 2 - TAHO_W + 50,
          bottom: GROUND_H - 3,
          width: TAHO_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Tahooo bubble — above vendor */}
      <img
        src="/sprites/bubble_2.webp"
        style={{
          position: "absolute",
          left: b5 - BURNHAM_W / 2 - TAHO_W + TAHO_W - 75,
          bottom: GROUND_H + 95,
          width: 130,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* House — behind both carts */}
      <img
        src="/sprites/house_1.webp"
        style={{
          position: "absolute",
          left: b5 + BURNHAM_W / 2 - 80,
          bottom: GROUND_H - 3,
          width: 120,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Cart 1 — right of gate, in front of house */}
      <img
        src="/sprites/cart_1.webp"
        style={{
          position: "absolute",
          left: b5 + BURNHAM_W / 2 - 70,
          bottom: GROUND_H - 3,
          width: CART1_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Cart 2 — after cart 1 */}
      <img
        src="/sprites/cart_2.webp"
        style={{
          position: "absolute",
          left: b5 + BURNHAM_W / 2 + CART1_W - 75,
          bottom: GROUND_H - 3,
          width: CART2_W,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
