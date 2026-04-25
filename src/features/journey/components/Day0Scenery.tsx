import { GROUND_H } from "../data/gameConstants";

interface Banner {
  x: number;
  activityIndex: number;
}

interface Props {
  banners: Banner[];
  worldWidth: number;
  planeRef: React.RefObject<HTMLImageElement | null>;
  planePromptRef: React.RefObject<HTMLDivElement | null>;
}

export function Day0Scenery({ banners, worldWidth, planeRef, planePromptRef }: Props) {
  const b0 = banners[0]?.x ?? 150;
  const b1 = banners[1]?.x ?? 800;

  const treePositions: number[] = [];
  for (let x = 30; x < worldWidth; x += 250) treePositions.push(x);
  const filteredTrees = treePositions.filter(
    (x) =>
      !(x > b0 - 220 && x < b0 + 230) &&
      !(x > b1 - 270 && x < b1 + 220),
  );

  return (
    <>
      {/* ── Our Home scenery (banner 0) ───────────────────────────────── */}
      {/* House — main attraction */}
      <img
        src="/sprites/home.webp"
        style={{
          position: "absolute",
          left: b0 - 100,
          bottom: GROUND_H,
          width: 280,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
      {/* Cat beside the house */}
      <img
        src="/sprites/blook.webp"
        style={{
          position: "absolute",
          left: b0 + 175,
          bottom: GROUND_H,
          width: 30,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      {/* ── Zamboanga Airport building (banner 1) ──────────────────────── */}
      {banners.length > 1 && (
        <img
          src="/sprites/airport.webp"
          style={{
            position: "absolute",
            left: b1 - 180,
            bottom: GROUND_H - 3,
            width: 360,
            imageRendering: "pixelated",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Trees every 250px across the world ────────────────────────── */}
      {filteredTrees.map((x, i) => (
        <img
          key={i}
          src="/sprites/tree_2.webp"
          style={{
            position: "absolute",
            left: x,
            bottom: GROUND_H - 3,
            width: 35,
            imageRendering: "pixelated",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Airplane + ENTER prompt (banner 1) ──────────────────────────── */}
      {banners.length > 1 && (
        <>
          {/* Plane image — position managed by game loop via ref */}
          <img
            ref={planeRef}
            src="/sprites/airplane.webp"
            style={{
              position: "absolute",
              left: b1 + 300,
              bottom: GROUND_H - 5,
              width: 400,
              imageRendering: "pixelated",
              pointerEvents: "none",
              transformOrigin: "15% bottom",
              transform: "rotate(2deg)",
            }}
          />
          {/* ENTER prompt above plane */}
          <div
            ref={planePromptRef}
            style={{
              position: "absolute",
              bottom: GROUND_H + 120,
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
        </>
      )}
    </>
  );
}
