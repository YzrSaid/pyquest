interface Props {
  dayId: number;
  onToMap: () => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onClose: () => void;
}

export function BusMenu({ dayId, onToMap, onPrevDay, onNextDay, onClose }: Props) {
  return (
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
            onClick={onToMap}
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
            {dayId > 1 && (
              <button
                onClick={onPrevDay}
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
              onClick={onNextDay}
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
            onClick={onClose}
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
  );
}
