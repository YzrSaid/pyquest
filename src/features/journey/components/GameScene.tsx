import { useEffect, useMemo, useRef, useState } from "react";
import { playJump } from "@/lib/audio";
import type { Day } from "@/features/journey";
import { Banner } from "./Banner";
import { StopModal } from "./StopModal";

// ── World constants ────────────────────────────────────────────────────────
const GROUND_H = 80;
const PLAYER_W = 64;
const PLAYER_H = 64;
const MOVE_SPEED = 5;
const GRAVITY = 0.58;
const JUMP_VEL = -13;
const TRIGGER_R = 90;
const BANNER_FIRST = 750;
const BANNER_GAP = 640;
const GAMEPAD_H = 150;
const BUS_W = 330; // displayed width of bus_side_view.png

// ── Palette — modern warm 8-bit (replaces neon greens) ───────────────────
const C_ACCENT = "#F0A020"; // warm amber  — interactive highlights
const C_BORDER = "#7A5010"; // dark amber  — passive borders
const C_DARK = "#1C1208"; // dark warm   — fills & ground
const C_DARKER = "#0A0806"; // near-black with warmth
const C_TEXT = "#E8DFC8"; // warm cream

// ── Sprite sheets ──────────────────────────────────────────────────────────
const IDLE_SHEET = "/sprites/Idle_Sprite.png";
const WALK_SHEET = "/sprites/Walking_and_Jumpring_Sprite.png";
const IDLE_SHEET_0 = "/sprites/Idle (Character)_2.png";
const WALK_SHEET_0 = "/sprites/Walking_and_Jumpring_Sprite_2.png";
const STONE_TILE = "/sprites/tile_stone_brick.png"; // 64×64
const BG_DAY0 = "/background/background_1.png";
const BG_DAY1 = "/background/background_1.png";
const BG_DAY2 = "/background/background_2.png";
const BG_DAY5 = "/background/background_3.png";
const BG_DAY6 = "/background/background_4.png";
const GRASS_TILE = "/sprites/tileset_1/tile_grass_1.png";
const ROAD_TILE = "/sprites/tileset_1/tile_road_.png";
const SAND_TILE = "/sprites/tileset_1/tile_sand.png";

const CLOUD_SRCS = [
  "/sprites/cloud_a.png",
  "/sprites/cloud_b.png",
  "/sprites/cloud_c.png",
];

type AnimState =
  | "idle-front"
  | "idle-side"
  | "idle-back"
  | "walking"
  | "jumping";

// ── Decorative background trees (hidden for day 1 — bg image handles it) ──
function BgTree({ x }: { x: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: GROUND_H,
        transform: "translateX(-50%)",
      }}
    >
      <div
        style={{
          width: 6,
          height: 18,
          background: "#1C1208",
          margin: "0 auto",
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "18px solid transparent",
          borderRight: "18px solid transparent",
          borderBottom: `28px solid ${C_DARK}`,
          marginTop: -28,
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "13px solid transparent",
          borderRight: "13px solid transparent",
          borderBottom: `22px solid ${C_BORDER}`,
          marginTop: -18,
          marginLeft: 5,
        }}
      />
    </div>
  );
}

// ── Mobile on-screen gamepad ───────────────────────────────────────────────
interface GamepadProps {
  onLeftDown: () => void;
  onLeftUp: () => void;
  onRightDown: () => void;
  onRightUp: () => void;
  onUpDown: () => void;
  onUpUp: () => void;
  onJump: () => void;
  onInteract: () => void;
}

function MobileGamepad(props: GamepadProps) {
  const {
    onLeftDown,
    onLeftUp,
    onRightDown,
    onRightUp,
    onUpDown,
    onUpUp,
    onJump,
    onInteract,
  } = props;

  const base: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "none",
    cursor: "pointer",
  };

  function HoldBtn({
    label,
    size = 54,
    onDown,
    onUp,
  }: {
    label: React.ReactNode;
    size?: number;
    onDown: () => void;
    onUp: () => void;
  }) {
    return (
      <div
        style={{
          ...base,
          width: size,
          height: size,
          background: "rgba(30,20,10,0.9)",
          border: `2px solid ${C_BORDER}`,
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          e.currentTarget.setPointerCapture(e.pointerId);
          onDown();
        }}
        onPointerUp={(e) => {
          e.currentTarget.releasePointerCapture(e.pointerId);
          onUp();
        }}
        onPointerCancel={(e) => {
          e.currentTarget.releasePointerCapture(e.pointerId);
          onUp();
        }}
      >
        {label}
      </div>
    );
  }

  function TapBtn({
    label,
    sub,
    size = 60,
    bg,
    border,
    color,
    onTap,
  }: {
    label: string;
    sub: string;
    size?: number;
    bg: string;
    border: string;
    color: string;
    onTap: () => void;
  }) {
    return (
      <div
        style={{
          ...base,
          flexDirection: "column",
          gap: 4,
          width: size,
          height: size,
          background: bg,
          border: `2px solid ${border}`,
          color,
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 7,
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          onTap();
        }}
      >
        <span style={{ fontSize: 20 }}>{label}</span>
        {sub}
      </div>
    );
  }

  const tri = (dir: "up" | "left" | "right") => {
    const c = C_ACCENT;
    if (dir === "up")
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "11px solid transparent",
            borderRight: "11px solid transparent",
            borderBottom: `16px solid ${c}`,
          }}
        />
      );
    if (dir === "left")
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "11px solid transparent",
            borderBottom: "11px solid transparent",
            borderRight: `16px solid ${c}`,
          }}
        />
      );
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: "11px solid transparent",
          borderBottom: "11px solid transparent",
          borderLeft: `16px solid ${c}`,
        }}
      />
    );
  };

  return (
    <>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <TapBtn
          label="*"
          sub="JUMP"
          bg="rgba(15,40,80,0.9)"
          border="#3a6ab0"
          color="#a8c8ff"
          onTap={onJump}
        />
        <TapBtn
          label="↩"
          sub="ENTER"
          bg="rgba(50,20,70,0.9)"
          border="#7a3ab0"
          color="#d4a8ff"
          onTap={onInteract}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <HoldBtn label={tri("up")} onDown={onUpDown} onUp={onUpUp} />
        <div style={{ display: "flex", gap: 6 }}>
          <HoldBtn label={tri("left")} onDown={onLeftDown} onUp={onLeftUp} />
          <HoldBtn label={tri("right")} onDown={onRightDown} onUp={onRightUp} />
        </div>
      </div>
    </>
  );
}

// ── GameScene ──────────────────────────────────────────────────────────────
interface Props {
  day: Day;
  onExit: () => void;
  onNextDay?: () => void;
  onPrevDay?: () => void;
}

type BusPhase =
  | "arriving"
  | "parked"
  | "leaving-right"
  | "leaving-left"
  | "gone";

type PlanePhase = "idle" | "taxiing" | "climbing" | "gone";

export function GameScene({ day, onExit, onNextDay, onPrevDay }: Props) {
  const worldRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const onExitRef = useRef(onExit);
  const onNextDayRef = useRef(onNextDay);
  const onPrevDayRef = useRef(onPrevDay);

  // ── Bus refs (direct DOM for RAF performance) ───────────────────────────
  const busRef = useRef<HTMLImageElement>(null);
  const busSmokeRef = useRef<HTMLDivElement>(null);
  const busPromptRef = useRef<HTMLDivElement>(null);
  const busXRef = useRef(-BUS_W); // starts off-screen left
  const busFacingRef = useRef<1 | -1>(1);
  const busPhaseRef = useRef<BusPhase>("arriving");
  const busCallbackRef = useRef<(() => void) | null>(null);
  const nearBusRef = useRef(false);
  const camOffsetRef = useRef(0);
  const showBusMenuRef = useRef(false);

  // ── Plane refs (Day 0 only) ──────────────────────────────────────────────
  const planeRef = useRef<HTMLImageElement>(null);
  const planePromptRef = useRef<HTMLDivElement>(null);
  const planePhaseRef = useRef<PlanePhase>("idle");
  const planeXRef = useRef(0);
  const planeYRef = useRef(0);
  const planeRotRef = useRef(0);
  const nearPlaneRef = useRef(false);
  const planeTaxiStartXRef = useRef(0);
  const worldWidthOverrideRef = useRef<number | null>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const robotPlacardRef = useRef<HTMLImageElement>(null);
  const robotAnimRef = useRef({ frame: 0, timer: 0 });
  const treseRef = useRef<HTMLImageElement>(null);
  const treseAnimRef = useRef({ frame: 0, timer: 0 });
  const batmanRef = useRef<HTMLImageElement>(null);
  const batmanAnimRef = useRef({ frame: 0, timer: 0 });

  const phys = useRef({
    x: 80,
    y: 0,
    vy: 0,
    onGround: false,
    facing: 1 as 1 | -1,
  });
  const keys = useRef({ left: false, right: false, up: false });
  const anim = useRef<{
    state: AnimState;
    frame: number;
    timer: number;
    wasInAir: boolean;
  }>({ state: "idle-front", frame: 0, timer: 0, wasInAir: false });

  const prevNear = useRef<number | null>(null);
  const openRef = useRef<number | null>(null);
  const rafIdRef = useRef(0);

  const [nearBanner, setNearBanner] = useState<number | null>(null);
  const [openActivity, setOpenActivity] = useState<number | null>(null);
  const [showGamepad, setShowGamepad] = useState(false);
  const [showBusMenu, setShowBusMenu] = useState(false);
  const showGamepadRef = useRef(false);

  useEffect(() => {
    onExitRef.current = onExit;
  }, [onExit]);
  useEffect(() => {
    onNextDayRef.current = onNextDay;
  }, [onNextDay]);
  useEffect(() => {
    onPrevDayRef.current = onPrevDay;
  }, [onPrevDay]);
  useEffect(() => {
    openRef.current = openActivity;
  }, [openActivity]);
  useEffect(() => {
    showBusMenuRef.current = showBusMenu;
  }, [showBusMenu]);

  // Inject animation keyframes once
  useEffect(() => {
    if (document.getElementById("pq-smoke-style")) return;
    const s = document.createElement("style");
    s.id = "pq-smoke-style";
    s.textContent = `
      @keyframes smokeRise {
        0%   { transform: translateY(0)     scale(0.7); opacity: 0.75; }
        100% { transform: translateY(-36px) scale(1.8); opacity: 0;    }
      }
      @keyframes robotCycle {
        from { background-position: 0px 0px; }
        to   { background-position: -400px 0px; }
      }
      @keyframes placardToggle {
        0%, 49.9% { opacity: 1; }
        50%, 100%  { opacity: 0; }
      }
    `;
    document.head.appendChild(s);
    return () => {
      document.getElementById("pq-smoke-style")?.remove();
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    showGamepadRef.current = mq.matches;
    setShowGamepad(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      showGamepadRef.current = e.matches;
      setShowGamepad(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isDay0 = day.id === 0;
  const isDay1 = day.id === 1;
  const idleSheet = isDay0 ? IDLE_SHEET_0 : IDLE_SHEET;
  const walkSheet = isDay0 ? WALK_SHEET_0 : WALK_SHEET;
  const isDay2 = day.id === 2;
  const isDay3 = day.id === 3;
  const isDay4 = day.id === 4;
  const isDay5 = day.id === 5;
  const isDay6 = day.id === 6;
  const hasBus = !isDay0;

  // Reset all bus + player state whenever the day changes
  useEffect(() => {
    busXRef.current = -BUS_W;
    busFacingRef.current = 1;
    busPhaseRef.current = "arriving";
    busCallbackRef.current = null;
    nearBusRef.current = false;
    camOffsetRef.current = 0;
    planePhaseRef.current = "idle";
    planeYRef.current = 0;
    planeRotRef.current = -2;
    nearPlaneRef.current = false;
    worldWidthOverrideRef.current = null;
    const spawnX = day.id === 0 ? 230 : 292;
    phys.current.x = spawnX;
    phys.current.vy = 0;
    phys.current.onGround = true;
    const player = playerRef.current;
    if (player) {
      player.style.opacity = "0";
      player.style.transform = `translate(${spawnX}px, ${
        window.innerHeight -
        (showGamepadRef.current ? GAMEPAD_H : 0) -
        GROUND_H -
        PLAYER_H
      }px)`;
    }
  }, [day.id]);

  const bannerGap = isDay0
    ? Math.round(BANNER_GAP * 1.3)
    : isDay2 || isDay3 || isDay4 || isDay5 || isDay6
      ? Math.round(BANNER_GAP * 1.1)
      : BANNER_GAP;
  const bannerFirst = isDay0
    ? window.innerWidth < 768
      ? 300
      : 150
    : isDay2 || isDay3 || isDay4 || isDay5 || isDay6
      ? BANNER_FIRST + 100
      : isDay1
        ? BANNER_FIRST + 130
        : BANNER_FIRST;

  const { banners, worldWidth } = useMemo(
    () => ({
      banners: day.activities.map((_, i) => ({
        x: bannerFirst + i * bannerGap,
        activityIndex: i,
      })),
      worldWidth: Math.max(
        bannerFirst +
          day.activities.length * bannerGap +
          (isDay2 || isDay3 || isDay4 || isDay5 || isDay6 ? -280 : 150),
        window.innerWidth,
      ),
    }),
    [day.activities, bannerGap, bannerFirst, isDay0, isDay2, isDay3, isDay6],
  );

  const treesX = useMemo(() => {
    const positions: number[] = [];
    for (let x = 160; x < worldWidth; x += 220 + (x % 90)) positions.push(x);
    return positions.filter(
      (x) => !banners.some((b) => Math.abs(x - b.x) < 120),
    );
  }, [worldWidth, banners]);

  // Generate clouds randomly spread across the world width (stable per day)
  const clouds = useMemo(() => {
    const COUNT = isDay2 || isDay3 || isDay4 || isDay5 || isDay6 ? 12 : 20;
    return Array.from({ length: COUNT }, (_, i) => {
      // Spread evenly across world then jitter randomly within each slot
      const slotW = worldWidth / COUNT;
      const x = slotW * i + Math.random() * slotW * 0.9;
      return {
        src: CLOUD_SRCS[Math.floor(Math.random() * CLOUD_SRCS.length)],
        x: Math.round(x),
        topPct: Math.round(3 + Math.random() * 20), // 3–23% from top
        width: Math.round(55 + Math.random() * 110), // 55–165 px wide
      };
    });
  }, [worldWidth, isDay2]);

  const doJump = () => {
    if (phys.current.onGround && openRef.current === null) {
      phys.current.vy = JUMP_VEL;
      phys.current.onGround = false;
      playJump();
    }
  };
  const doInteract = () => {
    if (openRef.current !== null) setOpenActivity(null);
    else if (prevNear.current !== null) setOpenActivity(prevNear.current);
  };

  const handleInteract = () => {
    if (nearBusRef.current && busPhaseRef.current === "parked") {
      setShowBusMenu(true);
    } else if (nearPlaneRef.current && planePhaseRef.current === "idle") {
      const pl = playerRef.current;
      if (pl) pl.style.opacity = "0";
      const extendedWidth = planeXRef.current + Math.max(window.innerWidth * 2, 2500);
      worldWidthOverrideRef.current = extendedWidth;
      const wd = worldRef.current;
      if (wd) wd.style.width = `${extendedWidth}px`;
      planeTaxiStartXRef.current = planeXRef.current;
      planePhaseRef.current = "taxiing";
    } else {
      doInteract();
    }
  };

  // ── Game loop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const player = playerRef.current as HTMLDivElement;
    const world = worldRef.current as HTMLDivElement;
    if (!player || !world) return;

    const groundY = () =>
      window.innerHeight -
      (showGamepadRef.current ? GAMEPAD_H : 0) -
      GROUND_H -
      PLAYER_H;

    phys.current.y = groundY();
    phys.current.onGround = true;
    // Day 0: spawn at the first banner; others: spawn just right of the arrival bus
    if (hasBus) phys.current.x = 292;
    else {
      phys.current.x = 230;
      // Init plane at banner 1
      if (banners.length > 1) {
        planeXRef.current = banners[1].x + 300;
        planePhaseRef.current = "idle";
        planeYRef.current = 0;
        planeRotRef.current = -3;
      }
    }
    player.style.transform = `translate(${phys.current.x}px, ${phys.current.y}px)`;
    // Hide player until bus parks
    player.style.opacity = hasBus ? "0" : "1";
    player.style.transition = "opacity 0.5s";

    function loop() {
      const p = phys.current;
      const k = keys.current;
      const a = anim.current;
      const sprite = spriteRef.current;
      const vp = window.innerWidth;
      const gy = groundY();

      if (openRef.current === null) {
        if (k.left) {
          p.x -= MOVE_SPEED;
          p.facing = -1;
        }
        if (k.right) {
          p.x += MOVE_SPEED;
          p.facing = 1;
        }
        p.x = Math.max(0, Math.min(p.x, worldWidth - PLAYER_W));
        p.vy += GRAVITY;
        p.y += p.vy;
        if (p.y >= gy) {
          p.y = gy;
          p.vy = 0;
          p.onGround = true;
        }
      }

      const moving = k.left || k.right;
      const goBack = k.up;
      const inAir = !p.onGround;
      const justLanded = a.wasInAir && !inAir;

      if (inAir) {
        if (a.state !== "jumping") {
          a.state = "jumping";
          a.frame = 0;
          a.timer = 0;
        }
      } else if (justLanded) {
        a.state = moving ? "idle-side" : "idle-front";
        a.frame = 0;
        a.timer = 0;
      } else if (moving) {
        if (a.state === "idle-front" || a.state === "idle-back") {
          a.state = "idle-side";
          a.frame = 0;
          a.timer = 0;
        }
      } else if (goBack && !inAir) {
        if (a.state !== "idle-back") {
          a.state = "idle-back";
          a.frame = 0;
          a.timer = 0;
        }
      } else {
        if (a.state === "walking" || a.state === "idle-side") {
          a.state = "idle-front";
          a.frame = 0;
          a.timer = 0;
        } else if (a.state !== "idle-front") {
          a.state = "idle-front";
          a.frame = 0;
          a.timer = 0;
        }
      }
      a.wasInAir = inAir;

      const speed =
        a.state === "jumping" || a.state === "walking"
          ? 8
          : a.state === "idle-side"
            ? 8
            : 45;
      a.timer++;
      if (a.timer >= speed) {
        a.timer = 0;
        switch (a.state) {
          case "idle-front":
          case "idle-back":
            a.frame = (a.frame + 1) % 2;
            break;
          case "idle-side":
            if (moving) {
              a.state = "walking";
              a.frame = 0;
            } else {
              a.state = "idle-front";
              a.frame = 0;
            }
            break;
          case "walking":
            a.frame = (a.frame + 1) % 8;
            break;
          case "jumping":
            a.frame = Math.min(a.frame + 1, 7);
            break;
        }
      }

      let bgImage: string;
      let bgPos: string;
      if (a.state === "walking" || a.state === "jumping") {
        bgImage = `url("${walkSheet}")`;
        const baseRow = a.state === "jumping" ? 2 : 0;
        bgPos = `${-(a.frame % 4) * PLAYER_W}px ${-(baseRow + Math.floor(a.frame / 4)) * PLAYER_H}px`;
      } else {
        bgImage = `url("${idleSheet}")`;
        bgPos =
          a.state === "idle-front"
            ? `${-a.frame * PLAYER_W}px 0px`
            : a.state === "idle-side"
              ? `${-2 * PLAYER_W}px 0px`
              : `${-a.frame * PLAYER_W}px ${-(PLAYER_H + 1)}px`;
      }

      if (sprite) {
        sprite.style.backgroundImage = bgImage;
        sprite.style.backgroundPosition = bgPos;
        sprite.style.transform =
          a.state === "idle-back" ? "scaleX(1)" : `scaleX(${p.facing})`;
      }

      player.style.transform = `translate(${p.x}px, ${p.y}px)`;

      // When bus departs right, follow it — but clamp so we never show tiles past world edge
      // When bus is 'gone', freeze camera so there's no snap before cloud transition covers screen
      const planePh = planePhaseRef.current;
      const camOffset =
        !hasBus && planePh !== "idle"
          ? camOffsetRef.current
            : hasBus && busPhaseRef.current === "leaving-right"
              ? Math.round(
                  Math.max(
                    0,
                    Math.min(busXRef.current - vp * 0.35, worldWidth - vp),
                  ),
                )
              : hasBus && busPhaseRef.current === "gone"
                ? camOffsetRef.current
                : Math.round(
                    Math.max(0, Math.min(p.x - vp * 0.35, worldWidth - vp)),
                  );
      camOffsetRef.current = camOffset;
      world.style.transform = `translateX(${-camOffset}px)`;

      const cx = p.x + PLAYER_W / 2;
      let nb: number | null = null;
      for (const b of banners) {
        if (Math.abs(cx - b.x) < TRIGGER_R) {
          nb = b.activityIndex;
          break;
        }
      }
      if (nb !== prevNear.current) {
        prevNear.current = nb;
        setNearBanner(nb);
      }

      // ── Robot animation (Day 2) ──────────────────────────────────────
      if (isDay2 && robotRef.current) {
        const ra = robotAnimRef.current;
        ra.timer++;
        if (ra.timer >= 40) {
          ra.timer = 0;
          ra.frame = (ra.frame + 1) % 4;
          robotRef.current.src = `/sprites/hytech_robot_${ra.frame}.png`;
          if (robotPlacardRef.current)
            robotPlacardRef.current.style.opacity = ra.frame === 2 ? "1" : "0";
        }
      }

      // ── Trese + Batman animation (Day 3) ─────────────────────────────
      if (isDay3) {
        if (treseRef.current) {
          const ta = treseAnimRef.current;
          ta.timer++;
          if (ta.timer >= 40) {
            ta.timer = 0;
            ta.frame = (ta.frame + 1) % 4;
            treseRef.current.src = `/sprites/trese_0${ta.frame === 0 ? "" : ta.frame}.png`;
          }
        }
        if (batmanRef.current) {
          const ba = batmanAnimRef.current;
          ba.timer++;
          if (ba.timer >= 40) {
            ba.timer = 0;
            ba.frame = (ba.frame + 1) % 4;
            batmanRef.current.src = `/sprites/batman_0${ba.frame === 0 ? "" : ba.frame}.png`;
          }
        }
      }

      // ── Bus animation ────────────────────────────────────────────────
      if (hasBus) {
        const bus = busRef.current;
        const smoke = busSmokeRef.current;
        const prompt = busPromptRef.current;
        const phase = busPhaseRef.current;

        if (bus) {
          if (phase === "arriving") {
            busXRef.current = Math.min(busXRef.current + 6, 0);
            if (busXRef.current >= 0) busPhaseRef.current = "parked";
          } else if (phase === "leaving-right") {
            busXRef.current += 9;
            if (busXRef.current > worldWidth + BUS_W) {
              busPhaseRef.current = "gone";
              const cb = busCallbackRef.current;
              busCallbackRef.current = null;
              if (cb) setTimeout(cb, 0);
            }
          } else if (phase === "leaving-left") {
            busXRef.current -= 9;
            if (busXRef.current < -(BUS_W * 2)) {
              busPhaseRef.current = "gone";
              const cb = busCallbackRef.current;
              busCallbackRef.current = null;
              if (cb) setTimeout(cb, 0);
            }
          }

          const isMoving =
            phase === "arriving" ||
            phase === "leaving-right" ||
            phase === "leaving-left";
          bus.style.left = `${busXRef.current}px`;
          bus.style.transform = `scaleX(${busFacingRef.current})`;

          // Show/hide player based on bus phase
          const targetOpacity =
            phase === "parked"
              ? "1" // visible once parked
              : phase === "leaving-right"
                ? "0" // hide as bus departs
                : /* arriving / leaving-left */ "0";
          if (player.style.opacity !== targetOpacity)
            player.style.opacity = targetOpacity;

          // Smoke — appears from the back of the bus
          if (smoke) {
            const exhaustX =
              busFacingRef.current === 1
                ? busXRef.current + 18 // back = left side when facing right
                : busXRef.current + BUS_W - 38; // back = right side when facing left
            smoke.style.left = `${exhaustX}px`;
            smoke.style.opacity = isMoving ? "1" : "0";
          }

          // ENTER prompt above bus — only when parked & nearby & menu closed
          if (prompt) {
            const busRightEdge = busXRef.current + BUS_W;
            const isNearBus =
              phase === "parked" &&
              !showBusMenuRef.current &&
              Math.abs(cx - busRightEdge) < 150;
            if (isNearBus !== nearBusRef.current)
              nearBusRef.current = isNearBus;
            prompt.style.left = `${busXRef.current + BUS_W / 2}px`;
            prompt.style.opacity = isNearBus ? "1" : "0";
          }
        }
      }

      // ── Plane animation (Day 0) ──────────────────────────────────────
      if (!hasBus) {
        const planeEl = planeRef.current;
        const planePrmt = planePromptRef.current;
        const ph = planePhaseRef.current;
        const PLANE_W = 400;

        // Proximity check runs every frame regardless of DOM state
        const planeCx = planeXRef.current + PLANE_W / 2;
        const isNear = ph === "idle" && Math.abs(cx - planeCx) < 160;
        nearPlaneRef.current = isNear;
        if (planePrmt) {
          planePrmt.style.left = `${planeCx}px`;
          planePrmt.style.opacity = isNear ? "1" : "0";
        }

        if (planeEl && ph !== "gone") {
          if (ph === "taxiing") {
            planeXRef.current += 5;
            if (planeXRef.current - planeTaxiStartXRef.current >= 200)
              planePhaseRef.current = "climbing";
          } else if (ph === "climbing") {
            planeXRef.current += 9;
            planeYRef.current += 8;
            planeRotRef.current = Math.min(planeRotRef.current + 2, 35);
            const screenX = planeXRef.current - camOffsetRef.current;
            if (screenX > vp + 100 || planeYRef.current > window.innerHeight - GROUND_H) {
              planePhaseRef.current = "gone";
              setTimeout(() => onNextDayRef.current?.(), 0);
            }
          }

          planeEl.style.left = `${planeXRef.current}px`;
          planeEl.style.bottom = `${GROUND_H + planeYRef.current}px`;
          planeEl.style.transform = `rotate(-${planeRotRef.current}deg)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    }
    rafIdRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [banners, worldWidth]);

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.code === "ArrowLeft" || e.code === "KeyA") keys.current.left = true;
      if (e.code === "ArrowRight" || e.code === "KeyD")
        keys.current.right = true;
      if (e.code === "ArrowUp" || e.code === "KeyW") keys.current.up = true;
      if (e.code === "Space") {
        e.preventDefault();
        doJump();
      }
      if (e.code === "Enter") {
        handleInteract();
      }
      if (e.code === "Escape") {
        if (openRef.current !== null) setOpenActivity(null);
        else onExitRef.current();
      }
    }
    function up(e: KeyboardEvent) {
      if (e.code === "ArrowLeft" || e.code === "KeyA")
        keys.current.left = false;
      if (e.code === "ArrowRight" || e.code === "KeyD")
        keys.current.right = false;
      if (e.code === "ArrowUp" || e.code === "KeyW") keys.current.up = false;
    }
    function preventScroll(e: KeyboardEvent) {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "Space"].includes(e.code))
        e.preventDefault();
    }
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("keydown", preventScroll, { passive: false });
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("keydown", preventScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: showGamepad ? GAMEPAD_H : 0,
          overflow: "hidden",
        }}
      >
        {/* ── Static background (doesn't scroll) ─────────────────────── */}
        {isDay0 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url(${BG_DAY0})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
            }}
          />
        ) : isDay1 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url(${BG_DAY1})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
            }}
          />
        ) : isDay5 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url(${BG_DAY5})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
            }}
          />
        ) : isDay6 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url(${BG_DAY6})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
            }}
          />
        ) : isDay2 || isDay3 || isDay4 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url(${BG_DAY2})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background: `linear-gradient(to bottom, ${C_DARKER} 0%, #120E08 55%, ${C_DARK} 100%)`,
            }}
          />
        )}

        {/* ── Scrolling world (z-index above background) ──────────────── */}
        <div
          ref={worldRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: worldWidth,
            height: "100%",
            willChange: "transform",
            zIndex: 1,
          }}
        >
          {/* Clouds — world-space positions, stay in place as player walks */}
          {(isDay1 || isDay2 || isDay3 || isDay4 || isDay5) &&
            clouds.map((c, i) => (
              <img
                key={i}
                src={c.src}
                style={{
                  position: "absolute",
                  left: c.x,
                  top: `${c.topPct}%`,
                  width: c.width,
                  imageRendering: "pixelated",
                  pointerEvents: "none",
                }}
              />
            ))}

          {/* Decorative trees — hidden for days with bg image */}
          {!isDay0 &&
            !isDay1 &&
            !isDay2 &&
            !isDay3 &&
            !isDay4 &&
            !isDay5 &&
            !isDay6 &&
            treesX.map((x, i) => <BgTree key={i} x={x} />)}

          {/* Ground strip */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: GROUND_H,
              ...(isDay0
                ? {
                    backgroundImage: `url(${GRASS_TILE})`,
                    backgroundRepeat: "repeat-x",
                    backgroundSize: `128px ${GROUND_H}px`,
                    backgroundPosition: "0 0",
                    imageRendering: "pixelated" as const,
                  }
                : isDay1
                  ? {
                      backgroundImage: `url(${STONE_TILE})`,
                      backgroundRepeat: "repeat-x",
                      backgroundSize: "128px 128px",
                      backgroundPosition: "0 bottom",
                      imageRendering: "pixelated" as const,
                    }
                  : isDay2 || isDay3 || isDay4
                    ? {
                        backgroundImage: `url(${ROAD_TILE})`,
                        backgroundRepeat: "repeat-x",
                        backgroundSize: `128px ${GROUND_H}px`,
                        backgroundPosition: "0 0",
                        imageRendering: "pixelated" as const,
                      }
                    : isDay5 || isDay6
                      ? {
                          backgroundImage: `url(${SAND_TILE})`,
                          backgroundRepeat: "repeat-x",
                          backgroundSize: `128px ${GROUND_H}px`,
                          backgroundPosition: "0 0",
                          imageRendering: "pixelated" as const,
                        }
                      : {
                          background: C_DARK,
                          borderTop: `4px solid ${C_BORDER}`,
                        }),
            }}
          />

          {/* Surface highlight line (days without a tiled ground) */}
          {!isDay0 &&
            !isDay1 &&
            !isDay2 &&
            !isDay3 &&
            !isDay4 &&
            !isDay5 &&
            !isDay6 && (
              <div
                style={{
                  position: "absolute",
                  bottom: GROUND_H,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: C_ACCENT,
                  opacity: 0.2,
                }}
              />
            )}

          {/* Banners */}
          {banners.map((b) => (
            <Banner
              key={b.activityIndex}
              x={b.x}
              activity={day.activities[b.activityIndex]}
              isNear={nearBanner === b.activityIndex}
              groundH={GROUND_H}
            />
          ))}

          {/* ── Day 0: Our Home scenery (banner 0) ────────────────────── */}
          {isDay0 &&
            (() => {
              const b0 = banners[0]?.x ?? 150;
              return (
                <>
                  {/* House — main attraction */}
                  <img
                    src="/sprites/home.png"
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
                    src="/sprites/blook.png"
                    style={{
                      position: "absolute",
                      left: b0 + 175,
                      bottom: GROUND_H,
                      width: 30,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 0: Zamboanga Airport building (banner 1) ──────────── */}
          {isDay0 &&
            banners.length > 1 &&
            (() => {
              const b1 = banners[1].x;
              return (
                <>
                  <img
                    src="/sprites/airport.png"
                    style={{
                      position: "absolute",
                      left: b1 - 180,
                      bottom: GROUND_H - 3,
                      width: 360,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 0: Trees every 150px across the world ────────────── */}
          {isDay0 &&
            (() => {
              const b0 = banners[0]?.x ?? 150;
              const b1 = banners[1]?.x ?? 800;
              const positions: number[] = [];
              for (let x = 30; x < worldWidth; x += 250) positions.push(x);
              return positions
                .filter(
                  (x) =>
                    !(x > b0 - 220 && x < b0 + 230) &&
                    !(x > b1 - 270 && x < b1 + 220),
                )
                .map((x, i) => (
                  <img
                    key={i}
                    src="/sprites/tree_2.png"
                    style={{
                      position: "absolute",
                      left: x,
                      bottom: GROUND_H - 3,
                      width: 35,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                ));
            })()}

          {/* ── Day 0: Zamboanga Airport plane (banner 1) ─────────────── */}
          {isDay0 && banners.length > 1 && (
            <>
              {/* Plane image — position managed by game loop via ref */}
              <img
                ref={planeRef}
                src="/sprites/airplane.png"
                style={{
                  position: "absolute",
                  left: banners[1].x + 300,
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

          {/* ── Day 1: Street lights + billboard ──────────────────────── */}
          {isDay1 &&
            (() => {
              const START_X = BUS_W + 50;
              return (
                <>
                  <img
                    src="/sprites/billboard_day/billboard_day_1.png"
                    style={{
                      position: "absolute",
                      left: START_X,
                      bottom: GROUND_H,
                      width: 135,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Rizal Park scenery (banner 0, x=750) ───────────────────── */}
          {isDay1 &&
            (() => {
              const FLAG_W = 90;
              const STATUE_W = 300;
              const GUARD_W = 35;
              const b0 = banners[0].x; // 750
              const sHalf = STATUE_W / 2; // 130
              // flags placed left of statue, overlapping each other by 20px
              const flag2L = b0 - sHalf - FLAG_W + 30; // flush against statue left edge
              const flag1L = flag2L - (FLAG_W - 20); // 20px overlap with flag2
              return (
                <>
                  {/* Two overlapping flag poles */}
                  <img
                    src="/sprites/rizal_park/flag_pole.png"
                    style={{
                      position: "absolute",
                      left: flag1L + 20,
                      bottom: GROUND_H,
                      width: FLAG_W,
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/rizal_park/flag_pole.png"
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
                    src="/sprites/rizal_park/rizal_statue.png"
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
                    src="/sprites/rizal_park/guard.png"
                    style={{
                      position: "absolute",
                      left: b0 + sHalf + 10,
                      bottom: GROUND_H - 3,
                      width: GUARD_W,
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Intramuros scenery (banner 1, x=1390) ──────────────────── */}
          {isDay1 &&
            (() => {
              const TREE_W = 35;
              const ENTRANCE_W = 370;
              const b1 = banners[1].x; // 1390
              const entL = b1 - 160;
              const entR = entL + ENTRANCE_W;
              const closingX = entR;
              return (
                <>
                  <img
                    src="/sprites/intramuros/intramuros_entrance.png"
                    style={{
                      position: "absolute",
                      left: entL - 20,
                      bottom: GROUND_H - 3,
                      width: ENTRANCE_W,
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/tree_1.png"
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
                    src="/sprites/tree_1.png"
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
                    src="/sprites/tree_1.png"
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
                    src="/sprites/tree_1.png"
                    style={{
                      position: "absolute",
                      left: closingX + (TREE_W - 80),
                      bottom: GROUND_H,
                      width: TREE_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Manila Cathedral scenery (banner 2, x=2030) ─────────────── */}
          {isDay1 &&
            (() => {
              const KALESA_W = 70;
              const CATHEDRAL_W = 340;
              const BENCH_W = 35;
              const b2 = banners[2].x; // 2030
              return (
                <>
                  <img
                    src="/sprites/intramuros/manila_cathedral.png"
                    style={{
                      position: "absolute",
                      left: b2 - 155,
                      bottom: GROUND_H - 3,
                      width: CATHEDRAL_W,
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/intramuros/kalesa.png"
                    style={{
                      position: "absolute",
                      left: b2 - 200,
                      bottom: GROUND_H - 3,
                      width: KALESA_W,
                      pointerEvents: "none",
                    }}
                  />

                  <img
                    src="/sprites/bench.png"
                    style={{
                      position: "absolute",
                      left: b2 + 170,
                      bottom: GROUND_H - 3,
                      width: BENCH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── CCP scenery (banner 3, x=2670) ──────────────────────────── */}
          {isDay1 &&
            (() => {
              const TREE2_W = 45;
              const FOUNTAIN_W = 80;
              const CCP_W = 520;
              const b3 = banners[3].x; // 2670
              return (
                <>
                  {/* CCP entrance — main building */}
                  <img
                    src="/sprites/ccp/ccp_entrance.png"
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
                    src="/sprites/tree_2.png"
                    style={{
                      position: "absolute",
                      left: b3 - 280,
                      bottom: GROUND_H - 3,
                      width: TREE2_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Left fountain — in front of entrance */}
                  <img
                    src="/sprites/water_fountain_no_grass.png"
                    style={{
                      position: "absolute",
                      left: b3 - 195,
                      bottom: GROUND_H - 3,
                      width: FOUNTAIN_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right fountain — in front of entrance */}
                  <img
                    src="/sprites/water_fountain_no_grass.png"
                    style={{
                      position: "absolute",
                      left: b3 + 100,
                      bottom: GROUND_H - 3,
                      width: FOUNTAIN_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right tree — closes the scene */}
                  <img
                    src="/sprites/tree_2.png"
                    style={{
                      position: "absolute",
                      left: b3 + 230,
                      bottom: GROUND_H - 3,
                      width: TREE2_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Mall of Asia scenery (banner 4, x=3310) ─────────────── */}
          {isDay1 &&
            (() => {
              const BUILDING1_W = 80;
              const BUILDING2_W = 185;
              const MOA_W = 350;
              const FERRIS_W = 300;
              const b4 = banners[4].x; // 3310
              return (
                <>
                  {/* building_1 left — furthest back */}
                  <img
                    src="/sprites/building_1.png"
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
                    src="/sprites/moa/ferris_wheel.png"
                    style={{
                      position: "absolute",
                      left: b4 + 160,
                      bottom: GROUND_H - 3,
                      width: FERRIS_W,
                      pointerEvents: "none",
                    }}
                  />
                  {/* building_1 right — right end closer */}
                  <img
                    src="/sprites/building_1.png"
                    style={{
                      position: "absolute",
                      left: b4 + 220,
                      bottom: GROUND_H - 3,
                      width: BUILDING1_W,
                      pointerEvents: "none",
                    }}
                  />
                  {/* building_2 — in front of building_1 left, intersecting */}
                  <img
                    src="/sprites/building_2.png"
                    style={{
                      position: "absolute",
                      left: b4 - 260,
                      bottom: GROUND_H - 3,
                      width: BUILDING2_W,
                      pointerEvents: "none",
                    }}
                  />

                  {/* building_2 — in front of building_1 left, intersecting */}
                  <img
                    src="/sprites/building_2.png"
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
                    src="/sprites/moa/moa_entrance.png"
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
            })()}

          {/* ── Day 2: Street lights + billboard ──────────────────────── */}
          {isDay2 &&
            (() => {
              const START_X = BUS_W + 100; // 380px — 50px after bus right edge
              const lightPositions = Array.from(
                { length: Math.ceil((worldWidth - START_X) / 100) },
                (_, i) => START_X + i * 250,
              );
              return (
                <>
                  {/* Billboard — right after bus */}
                  <img
                    src="/sprites/billboard_day/billboard_day_2.png"
                    style={{
                      position: "absolute",
                      left: START_X,
                      bottom: GROUND_H,
                      width: 135,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Street lights every 100px */}
                  {lightPositions.map((x) => (
                    <img
                      key={x}
                      src="/sprites/street_lights.png"
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
                </>
              );
            })()}

          {/* ── Day 2: Hytec Power scenery (banner 0, x=750) ────────────── */}
          {isDay2 &&
            (() => {
              const BOLLARD_W = 25;
              const BUSH_W = 35;
              const HYTECH_W = 280;
              const b0 = banners[0].x; // 750
              const leftBollardX = b0 - 175;
              const rightBollardX = b0 + 145;
              // center each bush over its bollard
              const bushOffset = BUSH_W - BOLLARD_W + 10;
              return (
                <>
                  {/* Hytec building — behind bollards & bushes */}
                  <img
                    src="/sprites/hytech.png"
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
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX + 5,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bollard */}
                  <img
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Left bush — in front of left bollard */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 10,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 60,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 35,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bush — in front of right bollard */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset + 25,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset - 20,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Robot wrapper — no overflow so placard can float above */}
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
                      src="/sprites/bubble_hytech.png"
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
                      src="/sprites/hytech_robot_0.png"
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
                </>
              );
            })()}

          {/* ── Day 2: OpenText scenery (banner 1, x=1390) ──────────────── */}
          {isDay2 &&
            (() => {
              const BOLLARD_W = 25;
              const BUSH_W = 35;
              const OT_W = 280;
              const b1 = banners[1].x; // 1390
              const leftBollardX = b1 - 175;
              const rightBollardX = b1 + 145;
              const bushOffset = BUSH_W - BOLLARD_W + 10;
              return (
                <>
                  {/* OpenText building — behind bollards & bushes */}
                  <img
                    src="/sprites/opentext.png"
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
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX + 5,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bollard */}
                  <img
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Left bushes */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 10,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 60,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 35,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bushes */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset + 25,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset - 20,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 3: Street lights + billboard ──────────────────────── */}
          {isDay3 &&
            (() => {
              const START_X = BUS_W + 100;
              const lightPositions = Array.from(
                { length: Math.ceil((worldWidth - START_X) / 100) },
                (_, i) => START_X + i * 250,
              );
              return (
                <>
                  <img
                    src="/sprites/billboard_day/billboard_day_3.png"
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
                      src="/sprites/street_lights.png"
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
                </>
              );
            })()}

          {/* ── Day 4: Street lights + billboard ──────────────────────── */}
          {isDay4 &&
            (() => {
              const START_X = BUS_W + 100;
              const lightPositions = Array.from(
                { length: Math.ceil((worldWidth - START_X) / 100) },
                (_, i) => START_X + i * 250,
              );
              return (
                <>
                  <img
                    src="/sprites/billboard_day/billboard_day_4.png"
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
                      src="/sprites/street_lights.png"
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
                </>
              );
            })()}

          {/* ── Day 5: Billboard + pine trees ────────────────────────── */}
          {isDay5 &&
            (() => {
              const START_X = BUS_W + 100;
              const treePositions = Array.from(
                { length: Math.ceil((worldWidth - START_X) / 100) },
                (_, i) => START_X + i * 120,
              );
              return (
                <>
                  <img
                    src="/sprites/billboard_day/billboard_day_5.png"
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
                      src="/sprites/tileset_1/tree_pine.png"
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
                </>
              );
            })()}

          {/* ── Day 6: Billboard + pine trees ────────────────────────── */}
          {isDay6 &&
            (() => {
              const START_X = BUS_W + 100;
              const treePositions = Array.from(
                { length: Math.ceil((worldWidth - START_X) / 100) },
                (_, i) => START_X + i * 250,
              );
              return (
                <>
                  <img
                    src="/sprites/billboard_day/billboard_day_6.png"
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
                      src="/sprites/tileset_1/tree_pine.png"
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
                </>
              );
            })()}

          {/* ── Day 6: Strawberry Farm scenery (banner 0) ───────────────── */}
          {isDay6 &&
            (() => {
              const STATUE_W = 380;
              const FARMER_W = 120;
              const b0 = banners[0].x;
              return (
                <>
                  {/* Strawberry statue — main attraction */}
                  <img
                    src="/sprites/strawberry_statue.png"
                    style={{
                      position: "absolute",
                      left: b0 - STATUE_W / 2,
                      bottom: GROUND_H - 6,
                      width: STATUE_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* House 1 — further left, behind house 2 */}
                  <img
                    src="/sprites/house_1.png"
                    style={{
                      position: "absolute",
                      left: b0 - STATUE_W / 2 - 80,
                      bottom: GROUND_H,
                      width: 90,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* House 2 — in front of house 1, intersecting */}
                  <img
                    src="/sprites/house_1.png"
                    style={{
                      position: "absolute",
                      left: b0 - STATUE_W / 2 - 50,
                      bottom: GROUND_H,
                      width: 90,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Farmers — right of statue */}
                  <img
                    src="/sprites/farmers.png"
                    style={{
                      position: "absolute",
                      left: b0 + STATUE_W / 2 - 10,
                      bottom: GROUND_H - 6,
                      width: FARMER_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 6: Bell Church scenery (banner 1) ───────────────────── */}
          {isDay6 &&
            (() => {
              const CHURCH_W = 300;
              const STATUE_W = 130;
              const b1 = banners[1].x;
              return (
                <>
                  {/* Bell Church — main attraction */}
                  <img
                    src="/sprites/bell_church.png"
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
                    src="/sprites/bell_church_statue.png"
                    style={{
                      position: "absolute",
                      left: b1 - CHURCH_W / 2 - STATUE_W + 20,
                      bottom: GROUND_H - 6,
                      width: STATUE_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Right bell church statue */}
                  <img
                    src="/sprites/bell_church_statue.png"
                    style={{
                      position: "absolute",
                      left: b1 + CHURCH_W / 2 - 20,
                      bottom: GROUND_H - 6,
                      width: STATUE_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 6: PMA scenery (banner 2) ───────────────────────────── */}
          {isDay6 &&
            (() => {
              const PMA_W = 350;
              const OFFICERS_W = 120;
              const AIRCRAFT_W = 280;
              const b2 = banners[2].x;
              return (
                <>
                  {/* PMA Melchor Hall — main attraction */}
                  <img
                    src="/sprites/pma.png"
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
                    src="/sprites/pma_aircraft.png"
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
                    src="/sprites/pma_officers.png"
                    style={{
                      position: "absolute",
                      left: b2 - PMA_W / 2 - OFFICERS_W + 60,
                      bottom: GROUND_H - 3,
                      width: OFFICERS_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 6: The Mansion scenery (banner 3) ───────────────────── */}
          {isDay6 &&
            (() => {
              const MANSION_W = 480;
              const b3 = banners[3].x;
              return (
                <img
                  src="/sprites/mansion.png"
                  style={{
                    position: "absolute",
                    left: b3 - MANSION_W / 2,
                    bottom: GROUND_H - 3,
                    width: MANSION_W,
                    imageRendering: "pixelated",
                    pointerEvents: "none",
                  }}
                />
              );
            })()}

          {/* ── Day 6: Mines View Park scenery (banner 4) ───────────────── */}
          {isDay6 &&
            (() => {
              const MINES_W = 380;
              const HORSE_W = 110;
              const IFUGAO_W = 70;
              const b4 = banners[4].x;
              return (
                <>
                  {/* Horse — left of main attraction */}
                  <img
                    src="/sprites/horse.png"
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
                    src="/sprites/mines_view.png"
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
                    src="/sprites/ifugao.png"
                    style={{
                      position: "absolute",
                      left: b4 + MINES_W / 2 - 10,
                      bottom: GROUND_H - 3,
                      width: IFUGAO_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 6: Burnham Park scenery (banner 5) ──────────────────── */}
          {isDay6 &&
            (() => {
              const BURNHAM_W = 520;
              const TAHO_W = 70;
              const CART1_W = 55;
              const CART2_W = 70;
              const b5 = banners[5].x;
              return (
                <>
                  {/* Burnham Park gate — main attraction */}
                  <img
                    src="/sprites/burnham.png"
                    style={{
                      position: "absolute",
                      left: b5 - BURNHAM_W / 2,
                      bottom: GROUND_H - 3,
                      width: BURNHAM_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Ice cream vendor — beside taho vendor */}
                  <img
                    src="/sprites/ice_cream.png"
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
                    src="/sprites/taho_vendor.png"
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
                    src="/sprites/bubble_2.png"
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
                    src="/sprites/house_1.png"
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
                    src="/sprites/cart_1.png"
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
                    src="/sprites/cart_2.png"
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
            })()}

          {/* ── Day 5: People's Park scenery (banner 0) ─────────────────── */}
          {isDay5 &&
            (() => {
              const PARK_W = 500;
              const STATUE_W = 70;
              const b0 = banners[0].x + 40;
              return (
                <>
                  {/* People's Park — main attraction, behind statue */}
                  <img
                    src="/sprites/tileset_1/people_park.png"
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
                    src="/sprites/tileset_1/jesus_statue.png"
                    style={{
                      position: "absolute",
                      left: b0 - PARK_W / 2 - 40,
                      bottom: GROUND_H - 3,
                      width: STATUE_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 5: Sky Ranch scenery (banner 1) ──────────────────────── */}
          {isDay5 &&
            (() => {
              const SKYRANCH_W = 450;
              const SKYDROP_W = 80;
              const b1 = banners[1].x;
              return (
                <>
                  {/* Sky Ranch — main attraction */}
                  <img
                    src="/sprites/tileset_1/skyranch.png"
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
                    src="/sprites/tileset_1/sky_drop.png"
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
                    src="/sprites/tileset_1/bubble_1.png"
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
            })()}

          {/* ── Day 4: MMDA scenery (banner 0) ──────────────────────────── */}
          {isDay4 &&
            (() => {
              const TLIGHT_W = 55;
              const MMDA_W = 200;
              const b0 = banners[0].x;
              const leftX = b0 - 175;
              const rightX = b0 + 145;
              return (
                <>
                  {/* MMDA building — behind everything */}
                  <img
                    src="/sprites/mmda.png"
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
                    src="/sprites/traffic_light.png"
                    style={{
                      position: "absolute",
                      left: leftX,
                      bottom: GROUND_H,
                      width: TLIGHT_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />

                  {/* MMDA officer — right side, in front */}
                  <img
                    src="/sprites/mmda_officer.png"
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
                    src="/sprites/mmda_officer.png"
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
                    src="/sprites/mmda_officer.png"
                    style={{
                      position: "absolute",
                      left: rightX - 30,
                      bottom: GROUND_H,
                      width: 28,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 4: MicroSourcing scenery (banner 1) ─────────────────── */}
          {isDay4 &&
            (() => {
              const BOLLARD_W = 25;
              const BUSH_W = 35;
              const MS_W = 280;
              const b1 = banners[1].x;
              const leftBollardX = b1 - 175;
              const rightBollardX = b1 + 145;
              const bushOffset = BUSH_W - BOLLARD_W + 10;
              return (
                <>
                  {/* MicroSourcing building — behind bollards & bushes */}
                  <img
                    src="/sprites/microsourcing.png"
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
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX + 5,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bollard */}
                  <img
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Left bushes */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 10,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 60,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 35,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bushes */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset + 25,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset - 20,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Day 3: TOP PEG scenery (banner 0) ───────────────────────── */}
          {isDay3 &&
            (() => {
              const BOLLARD_W = 25;
              const BUSH_W = 35;
              const TOPPEG_W = 220;
              const b0 = banners[0].x;
              const leftBollardX = b0 - 175;
              const rightBollardX = b0 + 145;
              const bushOffset = BUSH_W - BOLLARD_W + 10;
              return (
                <>
                  {/* TOP PEG building — behind bollards & bushes */}
                  <img
                    src="/sprites/top_peg.png"
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
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX + 5,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bollard */}
                  <img
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Left bushes */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 10,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 60,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 35,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bushes */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset + 25,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset - 20,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Trese — animated, left of banner */}
                  <img
                    ref={treseRef}
                    src="/sprites/trese_0.png"
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
                    src="/sprites/batman_0.png"
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
                </>
              );
            })()}

          {/* ── Day 3: Teleperformance scenery (banner 1) ───────────────── */}
          {isDay3 &&
            (() => {
              const BOLLARD_W = 25;
              const BUSH_W = 35;
              const TP_W = 180;
              const b1 = banners[1].x;
              const leftBollardX = b1 - 175;
              const rightBollardX = b1 + 145;
              const bushOffset = BUSH_W - BOLLARD_W + 10;
              return (
                <>
                  {/* building_3 left — in front of teleperformance, intersecting left side */}
                  <img
                    src="/sprites/building_3.png"
                    style={{
                      position: "absolute",
                      left: b1 - TP_W / 2 - 30,
                      bottom: GROUND_H - 3,
                      width: 55,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* building_3 right — in front of teleperformance, intersecting right side */}
                  <img
                    src="/sprites/building_3.png"
                    style={{
                      position: "absolute",
                      left: b1 + TP_W / 2 - 30,
                      bottom: GROUND_H - 3,
                      width: 55,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Teleperformance building — behind everything */}
                  <img
                    src="/sprites/teleperformance.png"
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
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX + 5,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bollard */}
                  <img
                    src="/sprites/bollards.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX,
                      bottom: GROUND_H - 3,
                      width: BOLLARD_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Left bushes */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 10,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 60,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: leftBollardX - bushOffset + 35,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Right bushes */}
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset + 25,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset - 20,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/sprites/bush.png"
                    style={{
                      position: "absolute",
                      left: rightBollardX - bushOffset,
                      bottom: GROUND_H - 3,
                      width: BUSH_W,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                  />
                </>
              );
            })()}

          {/* ── Bus — rendered after all scenery so it's in front of everything except player ── */}
          {hasBus && (
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
                src="/sprites/tileset2/bus_side_view.png"
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
          )}

          {/* Player */}
          <div
            ref={playerRef}
            style={{
              position: "absolute",
              top: 0,
              left: 20,
              width: PLAYER_W,
              height: PLAYER_H,
              willChange: "transform",
            }}
          >
            <div
              ref={spriteRef}
              style={{
                width: PLAYER_W,
                height: PLAYER_H,
                backgroundImage: `url("${idleSheet}")`,
                backgroundPosition: "0px 0px",
                backgroundRepeat: "no-repeat",
                backgroundSize: `${PLAYER_W * 4}px ${PLAYER_H * 4}px`,
                imageRendering: "pixelated",
              }}
            />
          </div>
        </div>

        {/* ── HUD ──────────────────────────────────────────────────────── */}
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
              DAY {String(day.id).padStart(2, "0")}
            </div>
            <div
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: 20,
                color: C_TEXT,
                marginTop: 4,
              }}
            >
              {day.subtitle}
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

        {/* ── Stop modal ───────────────────────────────────────────────── */}
        {openActivity !== null && (
          <StopModal
            activity={day.activities[openActivity]}
            onClose={() => setOpenActivity(null)}
          />
        )}

        {/* ── Bus menu ─────────────────────────────────────────────────── */}
        {showBusMenu && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                background: "#2f2420",
                border: "2px solid #fffdd0",
                borderRadius: 4,
                padding: "36px 48px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
                minWidth: 300,
              }}
            >
              <div
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: 10,
                  color: "#fffdd0",
                  letterSpacing: 1,
                }}
              >
                DJM BUS ROUTES
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: "100%",
                }}
              >
                {/* Back to map */}
                <button
                  onClick={() => {
                    setShowBusMenu(false);
                    if (playerRef.current)
                      playerRef.current.style.opacity = "0";
                    setTimeout(() => {
                      busFacingRef.current = -1;
                      busPhaseRef.current = "leaving-left";
                      busCallbackRef.current = () => onExitRef.current();
                    }, 500);
                  }}
                  style={{
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: 7,
                    color: "#fffdd0",
                    background: "#0b390b",
                    border: "2px solid #fffdd0",
                    padding: "11px 16px",
                    cursor: "pointer",
                    borderRadius: 3,
                    width: "100%",
                  }}
                >
                  MAP
                </button>

                {/* Prev + Next day on one row */}
                <div style={{ display: "flex", gap: 10 }}>
                  {day.id > 1 && (
                    <button
                      onClick={() => {
                        setShowBusMenu(false);
                        if (playerRef.current)
                          playerRef.current.style.opacity = "0";
                        setTimeout(() => {
                          busFacingRef.current = -1;
                          busPhaseRef.current = "leaving-left";
                          busCallbackRef.current = () =>
                            onPrevDayRef.current?.();
                        }, 500);
                      }}
                      style={{
                        fontFamily: "'Press Start 2P', cursive",
                        fontSize: 7,
                        color: "#fffdd0",
                        background: "#1a1a3a",
                        border: "2px solid #fffdd0",
                        padding: "11px 16px",
                        cursor: "pointer",
                        borderRadius: 3,
                        flex: 1,
                      }}
                    >
                      &lt; PREV DAY
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowBusMenu(false);
                      busFacingRef.current = 1;
                      busPhaseRef.current = "leaving-right";
                      busCallbackRef.current = () => onNextDayRef.current?.();
                    }}
                    style={{
                      fontFamily: "'Press Start 2P', cursive",
                      fontSize: 7,
                      color: "#0b390b",
                      background: "#fffdd0",
                      border: "2px solid #0b390b",
                      padding: "11px 16px",
                      cursor: "pointer",
                      borderRadius: 3,
                      flex: 1,
                    }}
                  >
                    NEXT DAY &gt;
                  </button>
                </div>

                {/* Close — dismisses menu, stay in scene */}
                <button
                  onClick={() => setShowBusMenu(false)}
                  style={{
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: 7,
                    color: "#fffdd0",
                    background: "transparent",
                    border: "2px solid #fffdd0",
                    padding: "11px 16px",
                    cursor: "pointer",
                    borderRadius: 3,
                    width: "100%",
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Gamepad bar — below game viewport ─────────────────────────── */}
      {showGamepad && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: GAMEPAD_H,
            background: "#ffffff",
            borderTop: `3px solid ${C_DARK}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            zIndex: 40,
          }}
        >
          <MobileGamepad
            onLeftDown={() => {
              keys.current.left = true;
            }}
            onLeftUp={() => {
              keys.current.left = false;
            }}
            onRightDown={() => {
              keys.current.right = true;
            }}
            onRightUp={() => {
              keys.current.right = false;
            }}
            onUpDown={() => {
              keys.current.up = true;
            }}
            onUpUp={() => {
              keys.current.up = false;
            }}
            onJump={doJump}
            onInteract={handleInteract}
          />
        </div>
      )}
    </>
  );
}
