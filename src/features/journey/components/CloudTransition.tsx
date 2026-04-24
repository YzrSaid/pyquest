import { useEffect, useMemo, useRef } from 'react'

interface Props {
  active:   boolean
  onSwitch: () => void   // called when clouds fully cover — swap the scene here
  onDone:   () => void   // called when clouds fully exit — safe to hide overlay
}

function buildStrips(count: number) {
  const h = Math.ceil(100 / count) + 4 // +4 % overlap so no gaps
  return Array.from({ length: count }, (_, i) => ({
    top: `${Math.floor((i * 100) / count)}%`,
    height: `${h}%`,
    delay: `${(i * 0.09 / (count - 1)).toFixed(3)}s`,
  }))
}

export function CloudTransition({ active, onSwitch, onDone }: Props) {
  const strips = useMemo(
    () => buildStrips(window.innerWidth < 768 ? 8 : 3),
    [],
  )
  const onSwitchRef = useRef(onSwitch)
  const onDoneRef   = useRef(onDone)

  useEffect(() => { onSwitchRef.current = onSwitch }, [onSwitch])
  useEffect(() => { onDoneRef.current   = onDone   }, [onDone])

  useEffect(() => {
    if (!active) return
    const t1 = setTimeout(() => onSwitchRef.current(), 620)   // midpoint of 1.3 s
    const t2 = setTimeout(() => onDoneRef.current(),   1300)  // animation end
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [active])

  if (!active) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        zIndex: 100,
        overflow: 'hidden',
        pointerEvents: 'all',
      }}
    >
      {strips.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: s.top, left: 0, right: 0,
            height: s.height,
            background: '#F0F0E8',
            animationName: 'cloud-sweep',
            animationDuration: '1.3s',
            animationDelay: s.delay,
            animationTimingFunction: 'ease-in-out',
            animationFillMode: 'both',
          }}
        />
      ))}
    </div>
  )
}
