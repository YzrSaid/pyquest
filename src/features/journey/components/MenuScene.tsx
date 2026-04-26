import { useState, useRef, useEffect } from "react";
import {
  FaFacebook,
  FaTiktok,
  FaBriefcase,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { ChatBot } from "./ChatBot";
import { playClick } from "@/lib/audio";

function SocialLink({
  icon,
  label,
  href,
  hoverColor,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  hoverColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        padding: "12px 4px",
        border: `2px solid ${hovered ? hoverColor : "rgba(255,255,255,0.15)"}`,
        background: hovered ? `${hoverColor}18` : "rgba(0,0,0,0.3)",
        cursor: "pointer",
        textDecoration: "none",
        transition: "border-color 0.15s, background 0.15s, transform 0.15s, box-shadow 0.15s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `3px 3px 0 ${hoverColor}55` : "3px 3px 0 rgba(0,0,0,0.4)",
      }}
    >
      <div style={{ color: hovered ? hoverColor : "rgba(255,255,255,0.8)", fontSize: 22, lineHeight: 1, transition: "color 0.15s" }}>
        {icon}
      </div>
      <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 5, color: hovered ? hoverColor : "#888", letterSpacing: 1, transition: "color 0.15s", textAlign: "center", wordBreak: "break-word" }}>
        {label}
      </div>
    </a>
  );
}

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
  textAlign = "left",
  banner,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  textAlign?: React.CSSProperties["textAlign"];
  banner?: string;
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
          width: "92%",
          maxHeight: "82svh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(13px, 3.5vw, 20px)",
            color: "#fff",
            letterSpacing: 2,
            flexShrink: 0,
            textAlign: "center",
            padding: "clamp(16px, 4vw, 32px) clamp(20px, 5vw, 40px) clamp(12px, 3vw, 20px)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {title}
        </h2>
        <div
          className="chatbot-scroll"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(17px, 4.5vw, 24px)",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.6,
            overflowY: "auto",
            flex: 1,
          }}
        >
          <div style={{ padding: "clamp(14px, 3vw, 20px) clamp(20px, 5vw, 40px)", textAlign }}>
            {children}
          </div>
          {banner && (
            <img
              src={banner}
              alt=""
              style={{
                display: "block",
                width: "100%",
                imageRendering: "pixelated",
              }}
            />
          )}
        </div>
        <div
          style={{
            padding: "clamp(12px, 3vw, 16px) clamp(20px, 5vw, 40px) clamp(16px, 4vw, 24px)",
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
      src="/sprites/tileset2/bus_side_view.webp"
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
          'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("/background/background_7.webp")',
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
              src="/sprites/banner_ccs.webp"
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
              src="/sprites/banner_wmsu.webp"
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
              src="/sprites/banner_ccs.webp"
              style={{
                width: "auto",
                height: "clamp(100px, 24vw, 130px)",
                imageRendering: "pixelated",
              }}
              alt="CCS"
            />
            <img
              src="/sprites/banner_wmsu.webp"
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
        src="/sprites/ride_plane.webp"
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
        <Modal title="ABOUT" textAlign="justify" onClose={() => setAboutOpen(false)}>
          <p>
            PyQuest is an interactive retro-style blog that documents the
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
            The tour covered{" "}
            <span style={{ color: "#fff" }}>7 days</span> across{" "}
            <span style={{ color: "#fff" }}>Manila, Tagaytay,</span> and{" "}
            <span style={{ color: "#fff" }}>Baguio City</span>, giving students
            hands-on exposure to leading IT companies, government institutions,
            and creative industry professionals.
          </p>
          <p style={{ marginTop: 12 }}>
            The goal was to connect classroom learning with real industry
            practice by letting students experience firsthand how technology
            is built and applied in professional settings.
          </p>
          <p style={{ marginTop: 12 }}>
            This is an{" "}
            <span style={{ color: "#fff" }}>interactive blog</span>, not
            just a writeup. Explore each day like a game, walk through the
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
        <Modal title="CREDITS" textAlign="center" banner="/sprites/end_credit_banner.png" onClose={() => setCreditsOpen(false)}>
          <p style={{ color: "#aaa", fontSize: "0.85em" }}>Game Design &amp; Development</p>
          <p style={{ color: "#fff" }}>Mohammad Aldrin Said</p>

          <p style={{ color: "#aaa", fontSize: "0.85em", marginTop: 14 }}>Music &amp; Sound Effects</p>
          <p style={{ color: "#fff" }}>Krzysztof Szymanski — Pixabay</p>
          <p style={{ color: "#fff" }}>AShamaluevMusic — YouTube</p>
          <p style={{ color: "#fff" }}>Sound Bytes — YouTube</p>
          <p style={{ color: "#fff" }}>Royalty Free Sounds — YouTube</p>
          <p style={{ color: "#fff" }}>Bink's Sake — One Piece (Toei Animation)</p>

          <p style={{ color: "#aaa", fontSize: "0.85em", marginTop: 14 }}>Institution</p>
          <p style={{ color: "#fff" }}>Western Mindanao State University</p>
          <p style={{ color: "#fff" }}>College of Computing Studies</p>

          <p style={{ color: "#aaa", fontSize: "0.85em", marginTop: 14 }}>Advisers &amp; Teachers</p>
          <p style={{ color: "#fff" }}>Mr. Jason Catadman</p>
          <p style={{ color: "#fff" }}>Mr. Jaydee Ballaho</p>
          <p style={{ color: "#fff" }}>Mr. Odon Maravillas Jr.</p>
          <p style={{ color: "#fff" }}>Mr. Edwin Arip</p>

          <p style={{ color: "#aaa", fontSize: "0.85em", marginTop: 14 }}>Tour Organizer</p>
          <p style={{ color: "#fff" }}>DJM Travel and Tours Services</p>
          <p style={{ color: "#fff" }}>Tour Guides: Kuya Jero &amp; Ate Veron</p>
          <p style={{ color: "#fff" }}>And to all the staff of DJM</p>

          <p style={{ color: "#aaa", fontSize: "0.85em", marginTop: 14 }}>Companies Visited</p>
          <p style={{ color: "#fff" }}>MicroSourcing · OpenText · Top Peg Animation · HyTech Power Inc. · Teleperformance</p>

          <div style={{ marginTop: 20, borderTop: "1px solid #333", paddingTop: 16 }}>
            <p style={{ color: "#aaa", fontSize: "0.85em", marginBottom: 12 }}>Connect with the Developer</p>
            <div style={{ display: "flex", flexWrap: "nowrap", gap: 6, width: "100%" }}>
              <SocialLink icon={<FaFacebook />}  label="FACEBOOK"  href="https://www.facebook.com/iAmMA.Yazar/"                              hoverColor="#1877f2" />
              <SocialLink icon={<FaTiktok />}    label="TIKTOK"    href="https://www.tiktok.com/@yzrrr?lang=en-GB"                          hoverColor="#ff2d55" />
              <SocialLink icon={<FaBriefcase />} label="PORTFOLIO" href="https://ma-said-portfolio.vercel.app/"                              hoverColor="#f5c842" />
              <SocialLink icon={<FaLinkedinIn />}label="LINKEDIN"  href="https://www.linkedin.com/in/mohammad-aldrin-said-308147386/"        hoverColor="#0a66c2" />
              <SocialLink icon={<FaGithub />}    label="GITHUB"    href="https://github.com/YzrSaid/"                                        hoverColor="#e6edf3" />
            </div>
          </div>

          <div style={{ marginTop: 16, borderTop: "1px solid #333", paddingTop: 14, textAlign: "center" }}>
            <p style={{ color: "#fff", letterSpacing: 2 }}>PYQUEST</p>
            <p style={{ color: "#888", fontSize: "0.8em" }}>DJM Educational Tour 2026 · Zamboanga City, Philippines</p>
            <p style={{ color: "#555", fontSize: "0.75em" }}>&copy; 2026 All Rights Reserved.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
