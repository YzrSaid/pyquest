import { useEffect, useMemo, useRef, useState } from "react";
import { playJump } from "@/lib/audio";
import type { Day } from "@/features/journey";
import { Banner } from "./Banner";
import { StopModal } from "./StopModal";
import { MobileGamepad } from "./MobileGamepad";
import { BusMenu } from "./BusMenu";
import { BusLayer } from "./BusLayer";
import { GameHUD } from "./GameHUD";
import { Day0Scenery } from "./Day0Scenery";
import { Day1Scenery } from "./Day1Scenery";
import { Day2Scenery } from "./Day2Scenery";
import { Day3Scenery } from "./Day3Scenery";
import { Day4Scenery } from "./Day4Scenery";
import { Day5Scenery } from "./Day5Scenery";
import { Day6Scenery } from "./Day6Scenery";
import {
  GROUND_H, PLAYER_W, PLAYER_H, MOVE_SPEED, GRAVITY, JUMP_VEL,
  TRIGGER_R, BANNER_FIRST, BANNER_GAP, GAMEPAD_H, BUS_W,
  C_ACCENT, C_BORDER, C_DARK, C_DARKER,
  IDLE_SHEET, WALK_SHEET, IDLE_SHEET_0, WALK_SHEET_0,
  STONE_TILE, BG_DAY0, BG_DAY1, BG_DAY2, BG_DAY5, BG_DAY6,
  GRASS_TILE, ROAD_TILE, SAND_TILE, CLOUD_SRCS,
} from "../data/gameConstants";

type AnimState = "idle-front" | "idle-side" | "idle-back" | "walking" | "jumping";
type BusPhase  = "arriving" | "parked" | "leaving-right" | "leaving-left" | "gone";
type PlanePhase = "idle" | "taxiing" | "climbing" | "gone";

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
      <div style={{ width: 6, height: 18, background: C_DARK, margin: "0 auto" }} />
      <div
        style={{
          width: 0, height: 0,
          borderLeft: "18px solid transparent",
          borderRight: "18px solid transparent",
          borderBottom: `28px solid ${C_DARK}`,
          marginTop: -28,
        }}
      />
      <div
        style={{
          width: 0, height: 0,
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

// ── GameScene ──────────────────────────────────────────────────────────────
interface Props {
  day: Day;
  onExit: () => void;
  onNextDay?: () => void;
  onPrevDay?: () => void;
}

export function GameScene({ day, onExit, onNextDay, onPrevDay }: Props) {
  const worldRef  = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const onExitRef    = useRef(onExit);
  const onNextDayRef = useRef(onNextDay);
  const onPrevDayRef = useRef(onPrevDay);

  // ── Bus refs (direct DOM for RAF performance) ───────────────────────────
  const busRef      = useRef<HTMLImageElement>(null);
  const busSmokeRef = useRef<HTMLDivElement>(null);
  const busPromptRef = useRef<HTMLDivElement>(null);
  const busXRef        = useRef(-BUS_W);
  const busFacingRef   = useRef<1 | -1>(1);
  const busPhaseRef    = useRef<BusPhase>("arriving");
  const busCallbackRef = useRef<(() => void) | null>(null);
  const nearBusRef     = useRef(false);
  const camOffsetRef   = useRef(0);
  const showBusMenuRef = useRef(false);

  // ── Plane refs (Day 0 only) ──────────────────────────────────────────────
  const planeRef       = useRef<HTMLImageElement>(null);
  const planePromptRef = useRef<HTMLDivElement>(null);
  const planePhaseRef  = useRef<PlanePhase>("idle");
  const planeXRef      = useRef(0);
  const planeYRef      = useRef(0);
  const planeRotRef    = useRef(0);
  const nearPlaneRef       = useRef(false);
  const planeTaxiStartXRef = useRef(0);
  const worldWidthOverrideRef = useRef<number | null>(null);

  // ── Animated NPC refs ───────────────────────────────────────────────────
  const robotRef       = useRef<HTMLImageElement>(null);
  const robotPlacardRef = useRef<HTMLImageElement>(null);
  const robotAnimRef   = useRef({ frame: 0, timer: 0 });
  const treseRef       = useRef<HTMLImageElement>(null);
  const treseAnimRef   = useRef({ frame: 0, timer: 0 });
  const batmanRef      = useRef<HTMLImageElement>(null);
  const batmanAnimRef  = useRef({ frame: 0, timer: 0 });

  const phys = useRef({ x: 80, y: 0, vy: 0, onGround: false, facing: 1 as 1 | -1 });
  const keys = useRef({ left: false, right: false, up: false });
  const anim = useRef<{ state: AnimState; frame: number; timer: number; wasInAir: boolean }>(
    { state: "idle-front", frame: 0, timer: 0, wasInAir: false },
  );

  const prevNear = useRef<number | null>(null);
  const openRef  = useRef<number | null>(null);
  const rafIdRef = useRef(0);

  const [nearBanner,   setNearBanner]   = useState<number | null>(null);
  const [openActivity, setOpenActivity] = useState<number | null>(null);
  const [showGamepad,  setShowGamepad]  = useState(false);
  const [showBusMenu,  setShowBusMenu]  = useState(false);
  const showGamepadRef = useRef(false);

  useEffect(() => { onExitRef.current    = onExit;    }, [onExit]);
  useEffect(() => { onNextDayRef.current = onNextDay; }, [onNextDay]);
  useEffect(() => { onPrevDayRef.current = onPrevDay; }, [onPrevDay]);
  useEffect(() => { openRef.current      = openActivity; }, [openActivity]);
  useEffect(() => { showBusMenuRef.current = showBusMenu; }, [showBusMenu]);

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
    return () => { document.getElementById("pq-smoke-style")?.remove(); };
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
  const isDay2 = day.id === 2;
  const isDay3 = day.id === 3;
  const isDay4 = day.id === 4;
  const isDay5 = day.id === 5;
  const isDay6 = day.id === 6;
  const hasBus = !isDay0;

  const idleSheet = isDay0 ? IDLE_SHEET_0 : IDLE_SHEET;
  const walkSheet = isDay0 ? WALK_SHEET_0 : WALK_SHEET;

  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const bgSrc = isDay2 ? BG_DAY2 : isDay5 ? BG_DAY5 : isDay6 ? BG_DAY6 : BG_DAY0;
    const srcs = [
      bgSrc,
      isDay0 ? IDLE_SHEET_0 : IDLE_SHEET,
      isDay0 ? WALK_SHEET_0 : WALK_SHEET,
      GRASS_TILE, ROAD_TILE, STONE_TILE, SAND_TILE,
      ...CLOUD_SRCS,
    ];

    const timer = setTimeout(() => setAssetsLoaded(true), 5000);

    Promise.all(
      srcs.map((src) => {
        const img = new Image();
        img.src = src;
        return img.decode().catch(() => {});
      }),
    ).then(() => {
      clearTimeout(timer);
      setAssetsLoaded(true);
    });

    return () => clearTimeout(timer);
  }, [day.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset all bus + player state whenever the day changes
  useEffect(() => {
    busXRef.current       = -BUS_W;
    busFacingRef.current  = 1;
    busPhaseRef.current   = "arriving";
    busCallbackRef.current = null;
    nearBusRef.current    = false;
    camOffsetRef.current  = 0;
    planePhaseRef.current = "idle";
    planeYRef.current     = 0;
    planeRotRef.current   = -2;
    nearPlaneRef.current  = false;
    worldWidthOverrideRef.current = null;
    const spawnX = day.id === 0 ? 230 : 292;
    phys.current.x = spawnX;
    phys.current.vy = 0;
    phys.current.onGround = true;
    const player = playerRef.current;
    if (player) {
      player.style.opacity = "0";
      player.style.transform = `translate(${spawnX}px, ${
        window.innerHeight - (showGamepadRef.current ? GAMEPAD_H : 0) - GROUND_H - PLAYER_H
      }px)`;
    }
  }, [day.id]);

  const bannerGap = isDay0
    ? Math.round(BANNER_GAP * 1.3)
    : isDay2 || isDay3 || isDay4 || isDay5 || isDay6
      ? Math.round(BANNER_GAP * 1.1)
      : BANNER_GAP;
  const bannerFirst = isDay0
    ? window.innerWidth < 768 ? 300 : 150
    : isDay2 || isDay3 || isDay4 || isDay5 || isDay6
      ? BANNER_FIRST + 100
      : isDay1 ? BANNER_FIRST + 130 : BANNER_FIRST;

  const { banners, worldWidth } = useMemo(
    () => ({
      banners: day.activities.map((_, i) => ({ x: bannerFirst + i * bannerGap, activityIndex: i })),
      worldWidth: Math.max(
        bannerFirst + day.activities.length * bannerGap +
          (isDay2 || isDay3 || isDay4 || isDay5 || isDay6 ? -280 : 150),
        window.innerWidth,
      ),
    }),
    [day.activities, bannerGap, bannerFirst, isDay0, isDay2, isDay3, isDay6],
  );

  const treesX = useMemo(() => {
    const positions: number[] = [];
    for (let x = 160; x < worldWidth; x += 220 + (x % 90)) positions.push(x);
    return positions.filter((x) => !banners.some((b) => Math.abs(x - b.x) < 120));
  }, [worldWidth, banners]);

  const clouds = useMemo(() => {
    const COUNT = isDay2 || isDay3 || isDay4 || isDay5 || isDay6 ? 12 : 20;
    return Array.from({ length: COUNT }, (_, i) => {
      const slotW = worldWidth / COUNT;
      const x = slotW * i + Math.random() * slotW * 0.9;
      return {
        src: CLOUD_SRCS[Math.floor(Math.random() * CLOUD_SRCS.length)],
        x: Math.round(x),
        topPct: Math.round(3 + Math.random() * 20),
        width: Math.round(55 + Math.random() * 110),
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

  // ── Bus menu handlers ──────────────────────────────────────────────────────
  function handleBusToMap() {
    setShowBusMenu(false);
    if (playerRef.current) playerRef.current.style.opacity = "0";
    setTimeout(() => {
      busFacingRef.current  = -1;
      busPhaseRef.current   = "leaving-left";
      busCallbackRef.current = () => onExitRef.current();
    }, 500);
  }

  function handleBusPrevDay() {
    setShowBusMenu(false);
    if (playerRef.current) playerRef.current.style.opacity = "0";
    setTimeout(() => {
      busFacingRef.current  = -1;
      busPhaseRef.current   = "leaving-left";
      busCallbackRef.current = () => onPrevDayRef.current?.();
    }, 500);
  }

  function handleBusNextDay() {
    setShowBusMenu(false);
    busFacingRef.current  = 1;
    busPhaseRef.current   = "leaving-right";
    busCallbackRef.current = () => onNextDayRef.current?.();
  }

  // ── Game loop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const player = playerRef.current as HTMLDivElement;
    const world  = worldRef.current  as HTMLDivElement;
    if (!player || !world) return;

    const groundY = () =>
      window.innerHeight - (showGamepadRef.current ? GAMEPAD_H : 0) - GROUND_H - PLAYER_H;

    phys.current.y = groundY();
    phys.current.onGround = true;
    if (hasBus) phys.current.x = 292;
    else {
      phys.current.x = 230;
      if (banners.length > 1) {
        planeXRef.current  = banners[1].x + 300;
        planePhaseRef.current = "idle";
        planeYRef.current  = 0;
        planeRotRef.current = -3;
      }
    }
    player.style.transform = `translate(${phys.current.x}px, ${phys.current.y}px)`;
    player.style.opacity   = hasBus ? "0" : "1";
    player.style.transition = "opacity 0.5s";

    function loop() {
      const p = phys.current;
      const k = keys.current;
      const a = anim.current;
      const sprite = spriteRef.current;
      const vp = window.innerWidth;
      const gy = groundY();

      if (openRef.current === null) {
        if (k.left)  { p.x -= MOVE_SPEED; p.facing = -1; }
        if (k.right) { p.x += MOVE_SPEED; p.facing =  1; }
        p.x = Math.max(0, Math.min(p.x, worldWidth - PLAYER_W));
        p.vy += GRAVITY;
        p.y  += p.vy;
        if (p.y >= gy) { p.y = gy; p.vy = 0; p.onGround = true; }
      }

      const moving    = k.left || k.right;
      const goBack    = k.up;
      const inAir     = !p.onGround;
      const justLanded = a.wasInAir && !inAir;

      if (inAir) {
        if (a.state !== "jumping") { a.state = "jumping"; a.frame = 0; a.timer = 0; }
      } else if (justLanded) {
        a.state = moving ? "idle-side" : "idle-front"; a.frame = 0; a.timer = 0;
      } else if (moving) {
        if (a.state === "idle-front" || a.state === "idle-back") { a.state = "idle-side"; a.frame = 0; a.timer = 0; }
      } else if (goBack && !inAir) {
        if (a.state !== "idle-back") { a.state = "idle-back"; a.frame = 0; a.timer = 0; }
      } else {
        if (a.state === "walking" || a.state === "idle-side") { a.state = "idle-front"; a.frame = 0; a.timer = 0; }
        else if (a.state !== "idle-front") { a.state = "idle-front"; a.frame = 0; a.timer = 0; }
      }
      a.wasInAir = inAir;

      const speed = a.state === "jumping" || a.state === "walking" ? 8 : a.state === "idle-side" ? 8 : 45;
      a.timer++;
      if (a.timer >= speed) {
        a.timer = 0;
        switch (a.state) {
          case "idle-front": case "idle-back": a.frame = (a.frame + 1) % 2; break;
          case "idle-side":
            if (moving) { a.state = "walking"; a.frame = 0; }
            else        { a.state = "idle-front"; a.frame = 0; }
            break;
          case "walking":  a.frame = (a.frame + 1) % 8; break;
          case "jumping":  a.frame = Math.min(a.frame + 1, 7); break;
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
        bgPos = a.state === "idle-front"
          ? `${-a.frame * PLAYER_W}px 0px`
          : a.state === "idle-side"
            ? `${-2 * PLAYER_W}px 0px`
            : `${-a.frame * PLAYER_W}px ${-(PLAYER_H + 1)}px`;
      }

      if (sprite) {
        sprite.style.backgroundImage    = bgImage;
        sprite.style.backgroundPosition = bgPos;
        sprite.style.transform = a.state === "idle-back" ? "scaleX(1)" : `scaleX(${p.facing})`;
      }

      player.style.transform = `translate(${p.x}px, ${p.y}px)`;

      const planePh = planePhaseRef.current;
      const camOffset =
        !hasBus && planePh !== "idle"
          ? camOffsetRef.current
          : hasBus && busPhaseRef.current === "leaving-right"
            ? Math.round(Math.max(0, Math.min(busXRef.current - vp * 0.35, worldWidth - vp)))
            : hasBus && busPhaseRef.current === "gone"
              ? camOffsetRef.current
              : Math.round(Math.max(0, Math.min(p.x - vp * 0.35, worldWidth - vp)));
      camOffsetRef.current = camOffset;
      world.style.transform = `translateX(${-camOffset}px)`;

      const cx = p.x + PLAYER_W / 2;
      let nb: number | null = null;
      for (const b of banners) {
        if (Math.abs(cx - b.x) < TRIGGER_R) { nb = b.activityIndex; break; }
      }
      if (nb !== prevNear.current) { prevNear.current = nb; setNearBanner(nb); }

      // ── Robot animation (Day 2) ──────────────────────────────────────
      if (isDay2 && robotRef.current) {
        const ra = robotAnimRef.current;
        ra.timer++;
        if (ra.timer >= 40) {
          ra.timer = 0;
          ra.frame = (ra.frame + 1) % 4;
          robotRef.current.src = `/sprites/hytech_robot_${ra.frame}.webp`;
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
            treseRef.current.src = `/sprites/trese_0${ta.frame === 0 ? "" : ta.frame}.webp`;
          }
        }
        if (batmanRef.current) {
          const ba = batmanAnimRef.current;
          ba.timer++;
          if (ba.timer >= 40) {
            ba.timer = 0;
            ba.frame = (ba.frame + 1) % 4;
            batmanRef.current.src = `/sprites/batman_0${ba.frame === 0 ? "" : ba.frame}.webp`;
          }
        }
      }

      // ── Bus animation ────────────────────────────────────────────────
      if (hasBus) {
        const bus    = busRef.current;
        const smoke  = busSmokeRef.current;
        const prompt = busPromptRef.current;
        const phase  = busPhaseRef.current;

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

          const isMoving = phase === "arriving" || phase === "leaving-right" || phase === "leaving-left";
          bus.style.left      = `${busXRef.current}px`;
          bus.style.transform = `scaleX(${busFacingRef.current})`;

          const targetOpacity = phase === "parked" ? "1" : phase === "leaving-right" ? "0" : "0";
          if (player.style.opacity !== targetOpacity) player.style.opacity = targetOpacity;

          if (smoke) {
            const exhaustX = busFacingRef.current === 1
              ? busXRef.current + 18
              : busXRef.current + BUS_W - 38;
            smoke.style.left    = `${exhaustX}px`;
            smoke.style.opacity = isMoving ? "1" : "0";
          }

          if (prompt) {
            const busRightEdge = busXRef.current + BUS_W;
            const isNearBus = phase === "parked" && !showBusMenuRef.current && Math.abs(cx - busRightEdge) < 150;
            if (isNearBus !== nearBusRef.current) nearBusRef.current = isNearBus;
            prompt.style.left    = `${busXRef.current + BUS_W / 2}px`;
            prompt.style.opacity = isNearBus ? "1" : "0";
          }
        }
      }

      // ── Plane animation (Day 0) ──────────────────────────────────────
      if (!hasBus) {
        const planeEl  = planeRef.current;
        const planePrmt = planePromptRef.current;
        const ph = planePhaseRef.current;
        const PLANE_W = 400;

        const planeCx = planeXRef.current + PLANE_W / 2;
        const isNear  = ph === "idle" && Math.abs(cx - planeCx) < 160;
        nearPlaneRef.current = isNear;
        if (planePrmt) {
          planePrmt.style.left    = `${planeCx}px`;
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
          planeEl.style.left      = `${planeXRef.current}px`;
          planeEl.style.bottom    = `${GROUND_H + planeYRef.current}px`;
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
      if (e.code === "ArrowLeft"  || e.code === "KeyA") keys.current.left  = true;
      if (e.code === "ArrowRight" || e.code === "KeyD") keys.current.right = true;
      if (e.code === "ArrowUp"    || e.code === "KeyW") keys.current.up    = true;
      if (e.code === "Space")  { e.preventDefault(); doJump(); }
      if (e.code === "Enter")  { handleInteract(); }
      if (e.code === "Escape") { if (openRef.current !== null) setOpenActivity(null); else onExitRef.current(); }
    }
    function up(e: KeyboardEvent) {
      if (e.code === "ArrowLeft"  || e.code === "KeyA") keys.current.left  = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") keys.current.right = false;
      if (e.code === "ArrowUp"    || e.code === "KeyW") keys.current.up    = false;
    }
    function preventScroll(e: KeyboardEvent) {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "Space"].includes(e.code)) e.preventDefault();
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
          top: 0, left: 0, right: 0,
          bottom: showGamepad ? GAMEPAD_H : 0,
          overflow: "hidden",
        }}
      >
        {/* ── Static background (doesn't scroll) ─────────────────────── */}
        {isDay0 ? (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${BG_DAY0})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", imageRendering: "pixelated" }} />
        ) : isDay1 ? (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${BG_DAY1})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", imageRendering: "pixelated" }} />
        ) : isDay5 ? (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${BG_DAY5})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", imageRendering: "pixelated" }} />
        ) : isDay6 ? (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${BG_DAY6})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", imageRendering: "pixelated" }} />
        ) : isDay2 || isDay3 || isDay4 ? (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${BG_DAY2})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", imageRendering: "pixelated" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `linear-gradient(to bottom, ${C_DARKER} 0%, #120E08 55%, ${C_DARK} 100%)` }} />
        )}

        {/* ── Scrolling world ─────────────────────────────────────────── */}
        <div
          ref={worldRef}
          style={{ position: "absolute", top: 0, left: 0, width: worldWidth, height: "100%", willChange: "transform", zIndex: 1 }}
        >
          {/* Clouds */}
          {(isDay1 || isDay2 || isDay3 || isDay4 || isDay5) &&
            clouds.map((c, i) => (
              <img key={i} src={c.src} style={{ position: "absolute", left: c.x, top: `${c.topPct}%`, width: c.width, imageRendering: "pixelated", pointerEvents: "none" }} />
            ))}

          {/* Decorative trees — hidden for days with bg image */}
          {!isDay0 && !isDay1 && !isDay2 && !isDay3 && !isDay4 && !isDay5 && !isDay6 &&
            treesX.map((x, i) => <BgTree key={i} x={x} />)}

          {/* Ground strip */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: GROUND_H,
              ...(isDay0
                ? { backgroundImage: `url(${GRASS_TILE})`, backgroundRepeat: "repeat-x", backgroundSize: `128px ${GROUND_H}px`, backgroundPosition: "0 0", imageRendering: "pixelated" as const }
                : isDay1
                  ? { backgroundImage: `url(${STONE_TILE})`, backgroundRepeat: "repeat-x", backgroundSize: "128px 128px", backgroundPosition: "0 bottom", imageRendering: "pixelated" as const }
                  : isDay2 || isDay3 || isDay4
                    ? { backgroundImage: `url(${ROAD_TILE})`, backgroundRepeat: "repeat-x", backgroundSize: `128px ${GROUND_H}px`, backgroundPosition: "0 0", imageRendering: "pixelated" as const }
                    : isDay5 || isDay6
                      ? { backgroundImage: `url(${SAND_TILE})`, backgroundRepeat: "repeat-x", backgroundSize: `128px ${GROUND_H}px`, backgroundPosition: "0 0", imageRendering: "pixelated" as const }
                      : { background: C_DARK, borderTop: `4px solid ${C_BORDER}` }),
            }}
          />

          {/* Surface highlight line (days without a tiled ground) */}
          {!isDay0 && !isDay1 && !isDay2 && !isDay3 && !isDay4 && !isDay5 && !isDay6 && (
            <div style={{ position: "absolute", bottom: GROUND_H, left: 0, right: 0, height: 2, background: C_ACCENT, opacity: 0.2 }} />
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

          {/* ── Per-day world scenery ──────────────────────────────────── */}
          {isDay0 && (
            <Day0Scenery
              banners={banners}
              worldWidth={worldWidth}
              planeRef={planeRef}
              planePromptRef={planePromptRef}
            />
          )}
          {isDay1 && <Day1Scenery banners={banners} />}
          {isDay2 && (
            <Day2Scenery
              banners={banners}
              worldWidth={worldWidth}
              robotRef={robotRef}
              robotPlacardRef={robotPlacardRef}
            />
          )}
          {isDay3 && (
            <Day3Scenery
              banners={banners}
              worldWidth={worldWidth}
              treseRef={treseRef}
              batmanRef={batmanRef}
            />
          )}
          {isDay4 && <Day4Scenery banners={banners} worldWidth={worldWidth} />}
          {isDay5 && <Day5Scenery banners={banners} worldWidth={worldWidth} />}
          {isDay6 && <Day6Scenery banners={banners} worldWidth={worldWidth} />}

          {/* Bus — rendered after all scenery so it's in front */}
          {hasBus && (
            <BusLayer
              busRef={busRef}
              busSmokeRef={busSmokeRef}
              busPromptRef={busPromptRef}
            />
          )}

          {/* Player */}
          <div
            ref={playerRef}
            style={{ position: "absolute", top: 0, left: 20, width: PLAYER_W, height: PLAYER_H, willChange: "transform" }}
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

        {/* HUD */}
        <GameHUD dayId={day.id} subtitle={day.subtitle} onExit={onExit} />

        {/* Stop modal */}
        {openActivity !== null && (
          <StopModal
            activity={day.activities[openActivity]}
            onClose={() => setOpenActivity(null)}
          />
        )}

        {/* Bus menu */}
        {showBusMenu && (
          <BusMenu
            dayId={day.id}
            onToMap={handleBusToMap}
            onPrevDay={handleBusPrevDay}
            onNextDay={handleBusNextDay}
            onClose={() => setShowBusMenu(false)}
          />
        )}
      </div>

      {/* ── Gamepad bar — below game viewport ─────────────────────────── */}
      {showGamepad && (
        <div
          style={{
            position: "fixed",
            bottom: 0, left: 0, right: 0,
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
            onLeftDown={() => { keys.current.left  = true;  }}
            onLeftUp={()   => { keys.current.left  = false; }}
            onRightDown={() => { keys.current.right = true;  }}
            onRightUp={()   => { keys.current.right = false; }}
            onUpDown={() => { keys.current.up = true;  }}
            onUpUp={()   => { keys.current.up = false; }}
            onJump={doJump}
            onInteract={handleInteract}
          />
        </div>
      )}

      {/* Asset loader overlay */}
      {!assetsLoaded && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.86)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 24, zIndex: 90, pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 36, height: 36,
              border: "3px solid rgba(255,255,255,0.15)",
              borderTopColor: "#fff",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: 7,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: 2,
              margin: 0,
            }}
          >
            LOADING GAME ASSETS...
          </p>
        </div>
      )}
    </>
  );
}
