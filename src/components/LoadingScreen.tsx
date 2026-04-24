import { useEffect, useRef, useState } from 'react'

const BAR_SEGMENTS = 14
const LOAD_DURATION = 1800 // ms

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [filled, setFilled]   = useState(0)
  const [dots, setDots]       = useState(1)
  const [fading, setFading]   = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min((now - start) / LOAD_DURATION, 1)
      setFilled(Math.floor(p * BAR_SEGMENTS))
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setFilled(BAR_SEGMENTS)
        setFading(true)
        setTimeout(onDone, 400)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onDone])

  // Animate the trailing dots: . .. ...
  useEffect(() => {
    const id = setInterval(() => setDots(d => (d % 3) + 1), 400)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        zIndex: 9999,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease',
        userSelect: 'none',
      }}
    >
      {/* LOADING text */}
      <p
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 18,
          color: '#111',
          letterSpacing: 4,
          margin: 0,
          minWidth: 220,
          textAlign: 'left',
        }}
      >
        {`LOADING${'.'.repeat(dots)}`}
      </p>

      {/* Pixel progress bar */}
      <div
        style={{
          border: '2px solid #111',
          padding: 4,
          display: 'flex',
          gap: 3,
          width: 220,
        }}
      >
        {Array.from({ length: BAR_SEGMENTS }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 14,
              background: i < filled ? '#111' : 'transparent',
              transition: 'background 0.05s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
