import { C_ACCENT, C_BORDER } from "../data/gameConstants";

export interface GamepadProps {
  onLeftDown: () => void;
  onLeftUp: () => void;
  onRightDown: () => void;
  onRightUp: () => void;
  onUpDown: () => void;
  onUpUp: () => void;
  onJump: () => void;
  onInteract: () => void;
}

export function MobileGamepad(props: GamepadProps) {
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
