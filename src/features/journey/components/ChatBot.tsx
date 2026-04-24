import { useState, useRef, useEffect } from "react";
import { playClick } from "@/lib/audio";

const PROFILE_ICON = "/sprites/profile_icon.png";

interface Message {
  role: "user" | "bot";
  text: string;
}

const SYSTEM_PROMPT = `You are Mohammad Aldrin Said, a 4th-year BS Information Technology student at Western Mindanao State University (WMSU) in Zamboanga City, Philippines. You recently completed the DJM Educational Tour and are happy to share your experiences. Answer in a friendly, enthusiastic student tone — like you're telling a friend about the trip.

**About You (Aldrin):**
- Name: Mohammad Aldrin Said
- Course: BS Information Technology, 4th Year
- School: Western Mindanao State University (WMSU), Zamboanga City
- Interests: Web & mobile development, game dev, UI/UX design
- Tech stack: React, Flutter, Unity, Firebase, Tailwind CSS

**DJM Educational Tour Itinerary:**
- Day 00 — The Journey Begins: Departed from Zamboanga City International Airport, flew to Manila. Excited and a bit nervous for the week ahead.
- Day 01 — Historical Manila: Toured Intramuros, Rizal Park, Fort Santiago, and other heritage sites. Eye-opening to see Philippine history up close.
- Day 02 — Corporate World: Company visits at HyTech Power Inc., OpenText, and MicroSourcing in BGC/Taguig. Got to see real industry workflows and talked to professionals.
- Day 03 — Creativity & Communication: Visited media and creative industry companies. Learned about design, branding, and content production in a professional setting.
- Day 04 — Public Service & Business: Toured government offices and business establishments. Gained perspective on public sector work and entrepreneurship.
- Day 05 — Tagaytay Free Day: Leisure day in Tagaytay. Saw the Taal Volcano view, enjoyed the cold breeze, and explored with friends. Best food day of the trip.
- Day 06 — City of Pines (Baguio): Visited Baguio City — strawberry farms, Burnham Park, session road, and more. Loved the cold weather. Headed home with a lot of memories.

**Rules:**
1. Speak as Aldrin in first person — enthusiastic, warm, student-like.
2. Share genuine reactions and personal highlights from each stop.
3. Keep answers conversational and not too long (2-4 sentences usually enough).
4. If asked about something outside the tour, relate it to your background or say you don't have that info.
5. Be relatable — mention missing Zamboanga, group bonding, food, or funny moments when relevant.`;

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hey! I'm Aldrin — I just got back from the DJM Educational Tour. Ask me anything about the trip, the places we visited, or the companies we toured!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  async function sendMessage() {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY ?? ""}`,
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        const errMsg = data.error?.message ?? `HTTP ${res.status}`;
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: `Error: ${errMsg}` },
        ]);
        return;
      }

      const reply: string =
        data.choices?.[0]?.message?.content ??
        "Hmm, connection issue. Try again!";
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Connection error: ${err instanceof Error ? err.message : "Try again later!"}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => { playClick(); setIsOpen((o) => !o); }}
        title="Chat with Aldrin"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          zIndex: 60,
          imageRendering: "pixelated",
          transform: isOpen ? "scale(0.88) translate(2px,2px)" : "scale(1)",
          filter: isOpen ? "brightness(0.7)" : "none",
          transition: "transform 0.1s, filter 0.1s",
        }}
      >
        <img
          src="/sprites/bot_button.png"
          alt="Chat"
          style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            ...(isMobile
              ? { left: "50%", transform: "translateX(-50%)" }
              : { right: 24 }),
            width: "min(92vw, 370px)",
            height: 480,
            background: "#000000ff",
            border: "3px solid rgba(255,255,255,0.85)",
            boxShadow: "4px 4px 0 rgba(255,255,255,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 60,
            imageRendering: "pixelated",
          }}
        >
          <div
            style={{
              background: "#1a1a1a",
              borderBottom: "2px solid rgba(255,255,255,0.15)",
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  border: "2px solid #7ABF3A",
                  overflow: "hidden",
                  flexShrink: 0,
                  imageRendering: "pixelated",
                  background: "#222",
                }}
              >
                <img
                  src={PROFILE_ICON}
                  style={{
                    width: "100%",
                    height: "100%",
                    imageRendering: "pixelated",
                    objectFit: "cover",
                  }}
                  alt="Aldrin"
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: 8,
                    color: "#fff",
                    margin: 0,
                    letterSpacing: 1,
                  }}
                >
                  ALDRIN
                </p>
                <p
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: 14,
                    color: "#7ABF3A",
                    margin: 0,
                    letterSpacing: 1,
                  }}
                >
                  ● ONLINE
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: 8,
                color: "#fff",
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.4)",
                padding: "5px 8px",
                cursor: "pointer",
                boxShadow: "2px 2px 0 rgba(255,255,255,0.2)",
              }}
            >
              ✕
            </button>
          </div>

          <div
            className="chatbot-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    background: msg.role === "user" ? "#fff" : "#222",
                    border: `1px solid ${msg.role === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.12)"}`,
                    padding: "8px 10px",
                    fontFamily: "'VT323', monospace",
                    fontSize: 17,
                    color: msg.role === "user" ? "#111" : "#fff",
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    background: "#222",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "8px 12px",
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: 6,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: 1,
                  }}
                >
                  THINKING...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              borderTop: "2px solid rgba(255,255,255,0.15)",
              padding: "10px",
              background: "#1a1a1a",
              display: "flex",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="ASK ALDRIN..."
              style={{
                flex: 1,
                background: "#111",
                border: "2px solid rgba(255,255,255,0.3)",
                color: "#fff",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: 7,
                padding: "9px 10px",
                outline: "none",
                letterSpacing: 1,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              style={{
                background: isLoading || !input.trim() ? "#474747ff" : "#fff",
                border: "2px solid rgba(255,255,255,0.4)",
                color:
                  isLoading || !input.trim()
                    ? "rgba(255,255,255,0.25)"
                    : "#111",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: 10,
                padding: "0 12px",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                boxShadow:
                  isLoading || !input.trim()
                    ? "none"
                    : "2px 2px 0 rgba(255,255,255,0.3)",
              }}
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </>
  );
}
