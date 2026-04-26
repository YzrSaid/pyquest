import { useEffect, useRef, useState } from "react";
import {
  FaFacebook,
  FaTiktok,
  FaBriefcase,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

interface Props {
  onMainMenu: () => void;
}

const SCROLL_SPEED = 0.35;
const SCROLL_DELAY_MS = 2000;

function CreditSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "clamp(28px, 7vw, 48px)", width: "100%" }}>
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "clamp(6px, 1.8vw, 9px)",
          color: "#888",
          letterSpacing: 2,
          marginBottom: "clamp(8px, 2vw, 12px)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function CreditName({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'VT323', monospace",
        fontSize: "clamp(17px, 4.5vw, 22px)",
        color: "#fff",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

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
  const empty = !href;

  return (
    <a
      href={empty ? undefined : href}
      target={empty ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseEnter={() => !empty && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: "14px 6px",
        border: `2px solid ${hovered ? hoverColor : "rgba(255,255,255,0.2)"}`,
        background: hovered ? `${hoverColor}18` : "rgba(0,0,0,0.35)",
        cursor: empty ? "default" : "pointer",
        textDecoration: "none",
        transition:
          "border-color 0.15s, background 0.15s, transform 0.15s, box-shadow 0.15s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `3px 3px 0 ${hoverColor}55`
          : "3px 3px 0 rgba(0,0,0,0.4)",
        opacity: empty ? 0.38 : 1,
      }}
    >
      <div
        style={{
          color: hovered ? hoverColor : "rgba(255,255,255,0.85)",
          fontSize: 26,
          lineHeight: 1,
          transition: "color 0.15s",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 5,
          color: hovered ? hoverColor : "#999",
          letterSpacing: 1,
          transition: "color 0.15s",
          textAlign: "center",
          wordBreak: "break-word",
        }}
      >
        {label}
      </div>
    </a>
  );
}

export function EndCredits({ onMainMenu }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 500);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let pos = 0;
    let lastWritten = 0;
    let rafId = 0;
    let finished = false;
    let touching = false;

    function step() {
      if (finished) return;

      const actual = el!.scrollTop;
      const max = el!.scrollHeight - el!.clientHeight;

      if (Math.abs(actual - lastWritten) > SCROLL_SPEED * 3) {
        pos = actual;
        lastWritten = actual;
      }

      if (!touching && pos < max) {
        pos = Math.min(pos + SCROLL_SPEED, max);
        lastWritten = pos;
        el!.scrollTop = pos;
      }

      if (pos >= max) {
        finished = true;
        return;
      }

      rafId = requestAnimationFrame(step);
    }

    function onTouchStart() {
      touching = true;
      pos = el!.scrollTop;
      lastWritten = pos;
    }

    function onTouchEnd() {
      touching = false;
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    const timerId = setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, SCROLL_DELAY_MS);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(rafId);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundImage: 'url("/background/background_7.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.72)",
          pointerEvents: "none",
        }}
      />

      {/* Modal card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: isMobile ? "92%" : "95%",
          maxWidth: 640,
          maxHeight: isMobile ? "78vh" : "92vh",
          display: "flex",
          flexDirection: "column",
          background: "#1a1510",
          border: "3px solid #fffdd0",
          boxShadow: "6px 6px 0 rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: isMobile ? "24px 20px" : "28px 40px",
            borderBottom: "2px solid rgba(255,253,208,0.2)",
          }}
        >
          <div
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: isMobile ? 18 : 26,
              color: "#fffdd0",
              letterSpacing: 2,
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            GAME COMPLETE!
          </div>
        </div>

        {/* Scrollable body */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <div
            style={{
              padding: isMobile ? "14px 18px 0" : "28px 40px 0",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: "clamp(16px, 4.5vw, 20px)",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.75,
                margin: "0 0 48px",
              }}
            >
              This educational tour was so much more than just a trip. It felt
              like the perfect closing chapter to my four years as an IT
              student. It has been a once-in-a-lifetime experience that I will
              forever treasure and cherish as I step into the next chapter of my
              professional life.
              <br />
              <br />
              As I stand at this threshold, I realize that these four years were
              not just about earning a degree; they were about discovering who I
              am and what I can contribute to the world. The tech landscape is
              vast, and while the path ahead holds challenges, I feel ready to
              face them with the same curiosity and grit that got me here. I am
              excited to take everything I have learned, from the classroom to
              the field, and use it to build something meaningful. To everyone
              who walked this path with me, let’s continue to innovate, to grow,
              and to shape the future. Thank you for making this journey
              possible.
            </p>

            <div
              style={{
                width: "100%",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                marginBottom: 44,
              }}
            />

            <div
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "clamp(8px, 2.8vw, 13px)",
                color: "#fffdd0",
                letterSpacing: 2,
                marginBottom: "clamp(32px, 8vw, 48px)",
              }}
            >
              CREDITS
            </div>

            <CreditSection label="Game Design and Development">
              <CreditName>Mohammad Aldrin Said</CreditName>
            </CreditSection>

            <CreditSection label="Music and Sound Effects">
              <CreditName>Krzysztof Szymanski — Pixabay</CreditName>
              <CreditName>AShamaluevMusic — YouTube</CreditName>
              <CreditName>Sound Bytes — YouTube</CreditName>
              <CreditName>Royalty Free Sounds — YouTube</CreditName>
              <CreditName>Bink's Sake — One Piece (Toei Animation)</CreditName>
            </CreditSection>

            <CreditSection label="Institution">
              <CreditName>Western Mindanao State University</CreditName>
              <CreditName>College of Computing Studies</CreditName>
            </CreditSection>

            <CreditSection label="Advisers and Teachers">
              <CreditName>Mr. Jason Catadman</CreditName>
              <CreditName>Mr. Jaydee Ballaho</CreditName>
              <CreditName>Mr. Odon Maravillas Jr.</CreditName>
              <CreditName>Mr. Edwin Arip</CreditName>
            </CreditSection>

            <CreditSection label="Tour Organizers">
              <CreditName>DJM Travel and Tours Services</CreditName>
              <CreditName>Tour Guides: Kuya Jero and Ate Veron</CreditName>
              <CreditName>And to all the staff of DJM</CreditName>
            </CreditSection>

            <CreditSection label="Special Thanks to the Companies Visited">
              <CreditName>
                MicroSourcing · OpenText · Top Peg Animation · HyTech Power
                Inc. · Teleperformance
              </CreditName>
            </CreditSection>

            <div
              style={{
                width: "100%",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                margin: "8px 0 36px",
              }}
            />

            <div
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "clamp(7px, 2.3vw, 11px)",
                color: "#fffdd0",
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              CONNECT WITH ME
            </div>
            <p
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: "clamp(14px, 4vw, 17px)",
                color: "rgba(255,255,255,0.5)",
                margin: "0 0 24px",
              }}
            >
              If you enjoyed this journey, let's stay in touch!
            </p>

            {/* Social links — single row, equal width */}
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                gap: 6,
                width: "100%",
                marginBottom: 48,
              }}
            >
              <SocialLink
                icon={<FaFacebook />}
                label="FACEBOOK"
                href="https://www.facebook.com/iAmMA.Yazar/"
                hoverColor="#1877f2"
              />
              <SocialLink
                icon={<FaTiktok />}
                label="TIKTOK"
                href="https://www.tiktok.com/@yzrrr?lang=en-GB"
                hoverColor="#ff2d55"
              />
              <SocialLink
                icon={<FaBriefcase />}
                label="PORTFOLIO"
                href="https://ma-said-portfolio.vercel.app/"
                hoverColor="#f5c842"
              />
              <SocialLink
                icon={<FaLinkedinIn />}
                label="LINKEDIN"
                href="https://www.linkedin.com/in/mohammad-aldrin-said-308147386/"
                hoverColor="#0a66c2"
              />
              <SocialLink
                icon={<FaGithub />}
                label="GITHUB"
                href="https://github.com/YzrSaid/"
                hoverColor="#e6edf3"
              />
            </div>

            <div
              style={{
                width: "100%",
                borderTop: "1px solid rgba(255,255,255,0.2)",
                paddingTop: 32,
              }}
            >
              <div
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "clamp(10px, 2.8vw, 14px)",
                  color: "#fffdd0",
                  letterSpacing: 4,
                  marginBottom: 12,
                }}
              >
                PYQUEST
              </div>
              <p
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "clamp(14px, 4vw, 18px)",
                  color: "#888",
                  margin: "0 0 4px",
                }}
              >
                DJM Educational Tour 2026 | Zamboanga City, Philippines
              </p>
              <p
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "clamp(13px, 3.5vw, 15px)",
                  color: "#555",
                  margin: 0,
                }}
              >
                © 2026 All Rights Reserved.
              </p>
            </div>
          </div>

          <img
            src="/sprites/end_credit_banner.png"
            alt="End Credits"
            style={{
              display: "block",
              width: "100%",
              marginTop: 40,
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            flexShrink: 0,
            borderTop: "2px solid rgba(255,253,208,0.2)",
            padding: isMobile ? "18px 22px" : "24px 34px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onMainMenu}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "clamp(6px, 1.8vw, 8px)",
              color: btnHovered ? "#111" : "#fff",
              background: btnHovered ? "#fff" : "transparent",
              border: "2px solid rgba(255,255,255,0.75)",
              boxShadow: btnHovered
                ? "1px 1px 0 rgba(255,255,255,0.6)"
                : "4px 4px 0 rgba(255,255,255,0.55)",
              transform: btnHovered ? "translate(3px, 3px)" : "translate(0, 0)",
              padding: "clamp(10px, 2vw, 12px) clamp(16px, 5vw, 28px)",
              cursor: "pointer",
              letterSpacing: 2,
              transition:
                "box-shadow 0.1s, transform 0.1s, background 0.1s, color 0.1s",
              whiteSpace: "nowrap",
            }}
          >
            GO BACK TO MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
}
