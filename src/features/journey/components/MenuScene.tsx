import { useState, useRef, useEffect } from "react";
import { ChatBot } from "./ChatBot";
import { playClick } from "@/lib/audio";

interface Props {
  onStart: () => void;
}

function PixelButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span
          style={{
            position: "absolute",
            right: "calc(100% + 14px)",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 18,
            color: "#fff",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          ▶
        </span>
      )}
      <button
        onClick={() => {
          playClick();
          onClick();
        }}
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 10,
          color: hovered ? "#111" : "#fff",
          background: hovered ? "#fff" : "transparent",
          border: "2px solid rgba(255,255,255,0.75)",
          boxShadow: hovered
            ? "1px 1px 0 rgba(255,255,255,0.6)"
            : "4px 4px 0 rgba(255,255,255,0.55)",
          transform: hovered ? "translate(3px, 3px)" : "translate(0, 0)",
          padding: "12px 0",
          width: 260,
          cursor: "pointer",
          letterSpacing: 2,
          transition:
            "box-shadow 0.1s, transform 0.1s, background 0.1s, color 0.1s",
        }}
      >
        {label}
      </button>
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111",
          border: "2px solid rgba(255,255,255,0.3)",
          maxWidth: 480,
          width: "90%",
          maxHeight: "80svh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 13,
            color: "#fff",
            letterSpacing: 2,
            flexShrink: 0,
            padding: "32px 40px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {title}
        </h2>
        <div
          className="chatbot-scroll"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 24,
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.6,
            overflowY: "auto",
            padding: "20px 40px",
            flex: 1,
          }}
        >
          {children}
        </div>
        <div
          style={{
            padding: "16px 40px 24px",
            flexShrink: 0,
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <PixelButton label="CLOSE" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

function BusTour() {
  const busRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = busRef.current;
    if (!el) return;
    const img = el;

    let rafId: number;

    function run() {
      const BUS_W = img.offsetWidth;
      const BUS_H = img.offsetHeight;
      const SPEED = window.innerWidth < 768 ? 2 : 5;

      const xLeft = (BUS_H - BUS_W) / 2;

      let x = xLeft;
      let y = window.innerHeight - BUS_H;
      let phase = 0;

      const transforms = [
        "scaleX(1)", // right  — wheels on bottom
        "rotate(-90deg)", // up     — wheels on right wall
        "rotate(180deg)", // left   — wheels on ceiling
        "rotate(90deg)", // down   — wheels on left wall
      ];

      function tick() {
        const sw = window.innerWidth;
        const sh = window.innerHeight;
        const xRight = sw - (BUS_W + BUS_H) / 2;

        if (phase === 0) {
          x += SPEED;
          if (x + BUS_W >= sw) {
            x = xRight;
            phase = 1;
          }
        } else if (phase === 1) {
          y -= SPEED;
          if (y <= 0) {
            y = 0;
            x = sw - BUS_W;
            phase = 2;
          }
        } else if (phase === 2) {
          x -= SPEED;
          if (x <= 0) {
            x = xLeft;
            phase = 3;
          }
        } else {
          y += SPEED;
          if (y + BUS_H >= sh) {
            y = sh - BUS_H;
            phase = 0;
          }
        }

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = transforms[phase];
        rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);
    }

    if (img.complete && img.naturalWidth > 0) {
      run();
    } else {
      img.addEventListener("load", run, { once: true });
    }

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <img
      ref={busRef}
      src="/sprites/tileset2/bus_side_view.png"
      alt=""
      style={{
        position: "fixed",
        left: -160,
        top: "calc(100vh - 80px)",
        width: window.innerWidth < 768 ? 100 : 185,
        height: "auto",
        imageRendering: "pixelated",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 5,
      }}
    />
  );
}

export function MenuScene({ onStart }: Props) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100svh",
        overflow: "hidden",
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("/background/background_7.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        userSelect: "none",
      }}
    >
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          {!isMobile && (
            <img
              src="/sprites/banner_ccs.png"
              style={{
                width: "auto",
                height: "clamp(180px, 24vw, 300px)",
                imageRendering: "pixelated",
              }}
              alt="CCS"
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <h1
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: isMobile
                  ? "clamp(36px, 11vw, 56px)"
                  : "clamp(28px, 6vw, 56px)",
                color: "#fff",
                textShadow:
                  "0 0 30px rgba(255,255,255,0.35), 4px 4px 0 rgba(0,0,0,0.8)",
                letterSpacing: 4,
                lineHeight: 1.2,
                margin: 0,
                textAlign: "center",
              }}
            >
              PYQUEST
            </h1>
            <p
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: "clamp(18px, 3vw, 22px)",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: 3,
                margin: 0,
              }}
            >
              Interactive Educational Tour
            </p>
          </div>
          {!isMobile && (
            <img
              src="/sprites/banner_wmsu.png"
              style={{
                width: "auto",
                height: "clamp(180px, 24vw, 300px)",
                imageRendering: "pixelated",
              }}
              alt="WMSU"
            />
          )}
        </div>

        {isMobile && (
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <img
              src="/sprites/banner_ccs.png"
              style={{
                width: "auto",
                height: "clamp(100px, 24vw, 130px)",
                imageRendering: "pixelated",
              }}
              alt="CCS"
            />
            <img
              src="/sprites/banner_wmsu.png"
              style={{
                width: "auto",
                height: "clamp(105px, 24vw, 130px)",
                imageRendering: "pixelated",
              }}
              alt="WMSU"
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <PixelButton label="START JOURNEY" onClick={onStart} />
        <PixelButton label="ABOUT" onClick={() => setAboutOpen(true)} />
        <PixelButton label="CREDITS" onClick={() => setCreditsOpen(true)} />
      </div>

      <img
        src="/sprites/ride_plane.png"
        alt=""
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "clamp(340px, 42vw, 580px)",
          height: "auto",
          imageRendering: "pixelated",
          transform: "scaleX(-1)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <p
        style={{
          position: "absolute",
          bottom: 24,
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 7,
          color: "rgba(255,255,255,0.25)",
          letterSpacing: 1,
        }}
      >
        © 2025 DJM
      </p>

      <BusTour />
      <ChatBot />

      {aboutOpen && (
        <Modal title="ABOUT" onClose={() => setAboutOpen(false)}>
          <p>
            PyQuest is an interactive retro-style blog documenting the
            educational tour of IT students from the{" "}
            <span style={{ color: "#fff" }}>
              College of Computing Studies (CCS)
            </span>{" "}
            at{" "}
            <span style={{ color: "#fff" }}>
              Western Mindanao State University (WMSU)
            </span>
            , Zamboanga City, Philippines.
          </p>
          <p style={{ marginTop: 12 }}>
            The tour spanned <span style={{ color: "#fff" }}>7 days</span>{" "}
            across <span style={{ color: "#fff" }}>Manila, Tagaytay,</span> and{" "}
            <span style={{ color: "#fff" }}>Baguio City</span> — giving students
            real-world exposure to top IT companies, government institutions,
            and creative industry professionals.
          </p>
          <p style={{ marginTop: 12 }}>
            The aim was to bridge the gap between academic learning and industry
            practice — letting students see, firsthand, how technology is built
            and applied in professional environments.
          </p>
          <p style={{ marginTop: 12 }}>
            This is an <span style={{ color: "#fff" }}>interactive blog</span> —
            not just a writeup. Explore each day like a game, walk through the
            world, and relive every moment of the journey.
          </p>
          <p style={{ marginTop: 12 }}>
            Tour organized by{" "}
            <span style={{ color: "#fff" }}>
              DJM Travel and Tours Services.
            </span>
          </p>
        </Modal>
      )}
      {creditsOpen && (
        <Modal title="CREDITS" onClose={() => setCreditsOpen(false)}>
          {/* 1. Core Development */}
          <p style={{ color: "#aaa", fontSize: "0.9em" }}>
            Game Design &amp; Development
          </p>
          <p style={{ color: "#fff", fontWeight: "bold" }}>
            Mohammad Aldrin Said
          </p>

          {/* 2. Key Assets */}
          <p style={{ color: "#aaa", fontSize: "0.9em", marginTop: 16 }}>
            Music &amp; Sound Effects
          </p>
          <p style={{ color: "#fff" }}>Krzysztof Szymanski — Pixabay</p>
          <p style={{ color: "#fff" }}>AShamaluevMusic — YouTube</p>
          <p style={{ color: "#fff" }}>Sound Bytes — YouTube</p>
          <p style={{ color: "#fff" }}>Royalty Free Sounds — YouTube</p>

          {/* 3. Academic Affiliation */}
          <p style={{ color: "#aaa", fontSize: "0.9em", marginTop: 16 }}>
            Institution
          </p>
          <p style={{ color: "#fff" }}>Western Mindanao State University</p>
          <p style={{ color: "#fff" }}>College of Computing Studies</p>

          {/* 4. Mentors */}
          <p style={{ color: "#aaa", fontSize: "0.9em", marginTop: 16 }}>
            Advisers &amp; Teachers
          </p>
          <p style={{ color: "#fff" }}>Mr. Jason Catadman</p>
          <p style={{ color: "#fff" }}>Mr. Jaydee Ballaho</p>
          <p style={{ color: "#fff" }}>Mr. Odon Maravillas Jr.</p>
          <p style={{ color: "#fff" }}>Mr. Edwin Arip</p>

          {/* 5. Tour Organizers */}
          <p style={{ color: "#aaa", fontSize: "0.9em", marginTop: 16 }}>
            Tour Organizer
          </p>
          <p style={{ color: "#fff" }}>DJM Travel and Tours Services</p>
          <p style={{ color: "#fff" }}>
            Tour Guides: Kuya Jero &amp; Ate Veron
          </p>
          <p style={{ color: "#fff" }}>And to all the staff of DJM</p>

          {/* 6. Special Thanks */}
          <p style={{ color: "#aaa", fontSize: "0.9em", marginTop: 16 }}>
            Special Thanks to the Companies Visited
          </p>
          <p style={{ color: "#fff" }}>MicroSourcing</p>
          <p style={{ color: "#fff" }}>OpenText</p>
          <p style={{ color: "#fff" }}> Top Peg Animation</p>
          <p style={{ color: "#fff" }}>HyTech Power Inc.</p>
          <p style={{ color: "#fff" }}>Teleperformance</p>

          {/* 7. Footer Info */}
          <div
            style={{
              marginTop: 30,
              borderTop: "1px solid #444",
              paddingTop: 15,
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#ffffffff",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              PYQUEST
            </p>
            <p style={{ color: "#aaa", fontSize: "0.8em" }}>
              DJM Educational Tour 2026
            </p>
            <p style={{ color: "#aaa", fontSize: "0.8em" }}>
              Zamboanga City, Philippines
            </p>
            <p style={{ color: "#888", fontSize: "0.75em" }}>
              &copy; 2026 All Rights Reserved.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
