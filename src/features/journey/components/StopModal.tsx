import { useEffect } from 'react'
import type { Activity } from '@/features/journey'

interface Props {
  activity: Activity
  onClose: () => void
}

const GREEN   = '#2D5A1B'
const GREEN_B = '#4a8a25'
const TEXT    = '#1C1C1C'
const MUTED   = '#555555'
const BORDER  = '#c8dfc0'
const BG_SECTION = '#f5faf3'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 7,
        color: GREEN,
        letterSpacing: 1,
        marginBottom: 10,
        paddingBottom: 6,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      {children}
    </div>
  )
}

function PhotoCard({ src, caption }: { src: string; caption: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          maxHeight: 280,
          objectFit: 'cover',
          border: `1px solid ${BORDER}`,
          display: 'block',
        }}
      />
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <span
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 7,
            color: GREEN_B,
            flexShrink: 0,
            lineHeight: 2,
          }}
        >
          ℹ
        </span>
        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 17,
            color: MUTED,
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          {caption}
        </p>
      </div>
    </div>
  )
}

export function StopModal({ activity, onClose }: Props) {
  const hasRichContent = !!(activity.story || activity.feelings || activity.realizations?.length)

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
        background: 'rgba(5, 10, 5, 0.75)',
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
          maxHeight: '85vh',
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
            background: BG_SECTION,
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
        <div
          style={{
            overflowY: 'auto',
            flex: 1,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {hasRichContent ? (
            <>
              {/* Story / What Happened */}
              {activity.story && (
                <section>
                  <SectionLabel>What Happened</SectionLabel>
                  {activity.story.split('\n\n').map((para, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: "'VT323', monospace",
                        fontSize: 19,
                        color: TEXT,
                        lineHeight: 1.55,
                        margin: i > 0 ? '10px 0 0' : '0',
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </section>
              )}

              {/* What I Felt */}
              {activity.feelings && (
                <section>
                  <SectionLabel>What I Felt</SectionLabel>
                  <p
                    style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: 19,
                      color: TEXT,
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {activity.feelings}
                  </p>
                </section>
              )}

              {/* Photos with captions */}
              {activity.photos && activity.photos.length > 0 && (
                <section>
                  <SectionLabel>Photos</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {activity.photos.map((photo, i) => (
                      <PhotoCard key={i} src={photo.src} caption={photo.caption} />
                    ))}
                  </div>
                </section>
              )}

              {/* Realizations */}
              {activity.realizations && activity.realizations.length > 0 && (
                <section>
                  <SectionLabel>Realizations</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {activity.realizations.map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span
                          style={{
                            color: GREEN_B,
                            flexShrink: 0,
                            fontFamily: "'VT323', monospace",
                            fontSize: 20,
                            lineHeight: 1.3,
                          }}
                        >
                          ★
                        </span>
                        <span
                          style={{
                            fontFamily: "'VT323', monospace",
                            fontSize: 18,
                            color: TEXT,
                            lineHeight: 1.45,
                          }}
                        >
                          {r}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Keywords */}
              {activity.keywords && activity.keywords.length > 0 && (
                <section>
                  <SectionLabel>Keywords</SectionLabel>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {activity.keywords.map((kw, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: "'Press Start 2P', cursive",
                          fontSize: 6,
                          color: GREEN,
                          background: '#e8f5e0',
                          border: `1px solid ${GREEN_B}`,
                          padding: '5px 9px',
                          letterSpacing: 0.5,
                        }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <>
              {/* Fallback: original simple layout for banners not yet enriched */}
              <p
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: 19,
                  color: TEXT,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {activity.description}
              </p>

              {activity.highlights.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activity.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span
                        style={{
                          color: GREEN_B,
                          flexShrink: 0,
                          fontFamily: "'VT323', monospace",
                          fontSize: 19,
                        }}
                      >
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
              )}

              {activity.images.length > 0 && (
                <div
                  style={{
                    border: `2px dashed ${BORDER}`,
                    padding: '20px',
                    textAlign: 'center',
                    background: BG_SECTION,
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {activity.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        style={{ width: 140, height: 100, objectFit: 'cover' }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activity.images.length === 0 && (
                <div
                  style={{
                    border: `2px dashed ${BORDER}`,
                    padding: '32px 20px',
                    textAlign: 'center',
                    background: BG_SECTION,
                  }}
                >
                  <span style={{ fontFamily: "'VT323', monospace", fontSize: 18, color: MUTED }}>
                    📷 Photos coming soon
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            borderTop: `2px solid ${BORDER}`,
            padding: '10px 20px',
            textAlign: 'right',
            flexShrink: 0,
            background: BG_SECTION,
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
