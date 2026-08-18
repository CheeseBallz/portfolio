import { useCallback, useEffect, useRef } from "react"

const SIZE = 520

export function CursorSpotlight() {
  const glowRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  const apply = useCallback(() => {
    const el = glowRef.current
    if (!el) return
    const { x, y } = posRef.current
    el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`
    el.style.opacity = "1"
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null
          apply()
        })
      }
    },
    [apply]
  )

  const handleMouseLeave = useCallback(() => {
    const el = glowRef.current
    if (el) el.style.opacity = "0"
  }, [])

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden overflow-hidden md:block">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{
          width: SIZE,
          height: SIZE,
          opacity: 0,
          transition: "opacity 0.3s ease",
          background:
            "radial-gradient(circle at center, rgba(125,211,252,0.07) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}
