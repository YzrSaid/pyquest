import { useState, useEffect } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { Activity } from '@/features/journey'

interface Props {
  activity: Activity
  onClose: () => void
}

const GREEN      = '#2D5A1B'
const GREEN_B    = '#4a8a25'
const TEXT       = '#1C1C1C'
const MUTED      = '#555555'
const BORDER     = '#c8dfc0'
const BG_SECTION = '#f5faf3'

const THUMB_PAGE = 5

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

function PhotoGroup({ srcs, caption }: { srcs: string[]; caption: string }) {
  const [activeIdx, setActiveIdx]   = useState(0)
  const [thumbPage, setThumbPage]   = useState(0)
  const [lightboxOpen, setLightbox] = useState(false)

  if (srcs.length === 0) return null

  const totalPages   = Math.ceil(srcs.length / THUMB_PAGE)
  const thumbStart   = thumbPage * THUMB_PAGE
  const visibleThumbs = srcs.slice(thumbStart, thumbStart + THUMB_PAGE)
  const showPaging   = srcs.length > THUMB_PAGE
  const slides       = srcs.map(src => ({ src }))

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    background: disabled ? '#ccc' : GREEN,
    color: '#fff',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    fontFamily: "'Press Start 2P', cursive",
    fontSize: 8,
    padding: '8px 10px',
    flexShrink: 0,
    opacity: disabled ? 0.35 : 1,
  })

  return (
    <div>
      {/* ── Main frame ── */}
      <div
        onClick={() => setLightbox(true)}
        style={{
          width: '100%',
          height: 240,
          overflow: 'hidden',
          cursor: 'zoom-in',
          position: 'relative',
          border: `1px solid ${BORDER}`,
          background: '#111',
        }}
      >
        <img
          src={srcs[activeIdx]}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            padding: '4px 7px',
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 7,
            lineHeight: 1.6,
            pointerEvents: 'none',
          }}
        >
          🔍
        </div>
        {srcs.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              background: 'rgba(0,0,0,0.55)',
              color: '#fff',
              padding: '3px 7px',
              fontFamily: "'Press Start 2P', cursive",
              fontSize: 6,
              lineHeight: 1.8,
              pointerEvents: 'none',
            }}
          >
            {activeIdx + 1} / {srcs.length}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {srcs.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          {showPaging && (
            <button
              onClick={() => setThumbPage(p => p - 1)}
              disabled={thumbPage === 0}
              style={btnStyle(thumbPage === 0)}
            >
              ◀
            </button>
          )}

          <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center' }}>
            {visibleThumbs.map((src, i) => {
              const realIdx = thumbStart + i
              const active  = realIdx === activeIdx
              return (
                <img
                  key={realIdx}
                  src={src}
                  alt=""
                  onClick={() => setActiveIdx(realIdx)}
                  style={{
                    width: 64,
                    height: 48,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: `2px solid ${active ? GREEN : 'transparent'}`,
                    outline: active ? `1px solid ${GREEN_B}` : 'none',
                    opacity: active ? 1 : 0.55,
                  }}
                />
              )
            })}
          </div>

          {showPaging && (
            <button
              onClick={() => setThumbPage(p => p + 1)}
              disabled={thumbPage >= totalPages - 1}
              style={btnStyle(thumbPage >= totalPages - 1)}
            >
              ▶
            </button>
          )}
        </div>
      )}

      {/* ── Caption ── */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 10 }}>
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

      {/* ── Lightbox ── */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightbox(false)}
        index={activeIdx}
        slides={slides}
        on={{ view: ({ index }) => setActiveIdx(index) }}
      />
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
              {/* What Happened */}
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

              {/* Did You Know? */}
              {activity.quick_facts && activity.quick_facts.length > 0 && (
                <section>
                  <SectionLabel>Did You Know?</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {activity.quick_facts.map((fact, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span
                          style={{
                            flexShrink: 0,
                            fontFamily: "'VT323', monospace",
                            fontSize: 20,
                            lineHeight: 1.3,
                            color: GREEN_B,
                          }}
                        >
                          💡
                        </span>
                        <span
                          style={{
                            fontFamily: "'VT323', monospace",
                            fontSize: 18,
                            color: TEXT,
                            lineHeight: 1.45,
                          }}
                        >
                          {fact}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Photos */}
              {activity.photos && activity.photos.length > 0 && (
                <section>
                  <SectionLabel>Photos</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {activity.photos.map((photo, i) => {
                      const srcs = Array.isArray(photo.src) ? photo.src : [photo.src]
                      return <PhotoGroup key={i} srcs={srcs} caption={photo.caption} />
                    })}
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
              {/* Fallback: simple layout for banners not yet enriched */}
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

              {activity.quick_facts && activity.quick_facts.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {activity.quick_facts.map((fact, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span
                        style={{
                          flexShrink: 0,
                          fontFamily: "'VT323', monospace",
                          fontSize: 20,
                          lineHeight: 1.3,
                          color: GREEN_B,
                        }}
                      >
                        💡
                      </span>
                      <span
                        style={{
                          fontFamily: "'VT323', monospace",
                          fontSize: 18,
                          color: TEXT,
                          lineHeight: 1.45,
                        }}
                      >
                        {fact}
                      </span>
                    </div>
                  ))}
                </div>
              )}

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
