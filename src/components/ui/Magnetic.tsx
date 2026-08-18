import { useCallback, useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { prefersReducedMotion } from "../../lib/use-gsap"

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
  style?: CSSProperties
}

export function Magnetic({ children, strength = 7, className, style }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    const update = () => setEnabled(mq.matches && !prefersReducedMotion())
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el || !enabled) return
      const rect = el.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const dist = Math.hypot(dx, dy)
      const scale = dist > strength ? strength / dist : 1
      el.style.transform = `translate(${(dx * scale).toFixed(2)}px, ${(dy * scale).toFixed(2)}px)`
    },
    [enabled, strength]
  )

  const reset = useCallback(() => {
    const el = ref.current
    if (el) el.style.transform = "translate(0px, 0px)"
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "inline-flex",
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  )
}
