import { useEffect } from 'react'
import type { Activity } from '@/features/journey'

interface Props {
  activity: Activity
  onClose:  () => void
}

const GREEN   = '#2D5A1B'
const GREEN_B = '#4a8a25'
const TEXT    = '#1C1C1C'
const MUTED   = '#555555'
const BORDER  = '#c8dfc0'

export function StopModal({ activity, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Escape' || e.code === 'Space') { e.preventDefault(); onClose() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(5, 10, 5, 0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          border: `3px solid ${GREEN}`,
          width: '100%',
          maxWidth: 640,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '16px 20px',
            borderBottom: `2px solid ${BORDER}`,
            background: '#f5faf3',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 28 }}>{activity.emoji}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: 10,
                color: TEXT,
                lineHeight: 1.8,
              }}
            >
              {activity.title}
            </div>
            <div
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: 15,
                color: MUTED,
                marginTop: 2,
              }}
            >
              {activity.address}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: 18,
              color: MUTED,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = GREEN_B)}
            onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '20px' }}>

          {/* Description */}
          <p
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: 19,
              color: TEXT,
              lineHeight: 1.5,
              marginBottom: 20,
            }}
          >
            {activity.description}
          </p>

          {/* Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {activity.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: GREEN_B, flexShrink: 0, fontFamily: "'VT323', monospace", fontSize: 19 }}>
                  ▸
                </span>
                <span
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: 17,
                    color: MUTED,
                    lineHeight: 1.4,
                  }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>

          {/* Photos placeholder */}
          <div
            style={{
              border: `2px dashed ${BORDER}`,
              padding: '32px 20px',
              textAlign: 'center',
              background: '#f9fdf7',
            }}
          >
            {activity.images.length > 0 ? (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {activity.images.map((src, i) => (
                  <img
                    key={i} src={src} alt=""
                    style={{ width: 140, height: 100, objectFit: 'cover', imageRendering: 'auto' }}
                  />
                ))}
              </div>
            ) : (
              <span
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: 18,
                  color: MUTED,
                }}
              >
                📷 Photos coming soon
              </span>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            borderTop: `2px solid ${BORDER}`,
            padding: '10px 20px',
            textAlign: 'right',
            flexShrink: 0,
            background: '#f5faf3',
          }}
        >
          <span
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: 7,
              color: MUTED,
            }}
          >
            ESC · SPACE · click outside to close
          </span>
        </div>
      </div>
    </div>
  )
}
