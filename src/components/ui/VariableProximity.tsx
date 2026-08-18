import {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react"

function useAnimationFrame(callback: () => void, active: boolean) {
  const savedCallback = useRef(callback)
  savedCallback.current = callback

  useEffect(() => {
    if (!active) return
    let frameId: number
    const loop = () => {
      savedCallback.current()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [active])
}

function useViewportMouseRef() {
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (ev: MouseEvent) => {
      posRef.current = { x: ev.clientX, y: ev.clientY }
    }
    const onTouch = (ev: TouchEvent) => {
      const t = ev.touches[0]
      posRef.current = { x: t.clientX, y: t.clientY }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onTouch)
    }
  }, [])

  return posRef
}

interface VariableProximityProps {
  label: string
  fromFontVariationSettings: string
  toFontVariationSettings: string
  containerRef: React.RefObject<HTMLDivElement | null>
  radiusScale?: number
  falloff?: "linear" | "exponential" | "gaussian"
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
  highlights?: Record<number, string>
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radiusScale = 1,
    falloff = "linear",
    className = "",
    onClick,
    style,
    highlights,
  } = props

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const letterPositions = useRef<{ x: number; y: number }[]>([])
  const rectRef = useRef<DOMRect | null>(null)
  const radiusRef = useRef(50)
  const lastWritten = useRef<string[]>([])
  const mouseRef = useViewportMouseRef()
  const [active, setActive] = useState(true)

  useEffect(() => {
    const el = typeof ref === "function" ? null : ref?.current
    if (!el) return

    setActive(true)
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "150px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(" ")
            return [name.replace(/['"]/g, ""), parseFloat(value)]
          })
      )

    const fromSettings = parseSettings(fromFontVariationSettings)
    const toSettings = parseSettings(toFontVariationSettings)

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }))
  }, [fromFontVariationSettings, toFontVariationSettings])

  const { axis, fromValue, toValue } = parsedSettings[0] ?? {
    axis: "wght",
    fromValue: 300,
    toValue: 700,
  }

  const measureRadius = useCallback(() => {
    const firstLetter = letterRefs.current[0]
    const el = firstLetter ?? containerRef?.current
    if (!el) return
    const fs = parseFloat(getComputedStyle(el).fontSize)
    radiusRef.current = Number.isFinite(fs) ? fs * radiusScale : 50
  }, [containerRef, radiusScale])

  const updateRect = useCallback(() => {
    if (containerRef?.current) {
      rectRef.current = containerRef.current.getBoundingClientRect()
    }
  }, [containerRef])

  const updatePositions = useCallback(() => {
    if (!containerRef?.current) return
    const cr = containerRef.current.getBoundingClientRect()
    letterRefs.current.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      letterPositions.current[i] = {
        x: r.left + r.width / 2 - cr.left,
        y: r.top + r.height / 2 - cr.top,
      }
    })
  }, [containerRef])

  useEffect(() => {
    measureRadius()
    updateRect()
    updatePositions()
    const onResize = () => {
      measureRadius()
      updateRect()
      updatePositions()
    }
    const onScroll = () => updateRect()
    window.addEventListener("resize", onResize)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", onScroll)
    }
  }, [measureRadius, updatePositions, updateRect])

  const setLetterRef = useCallback(
    (index: number) => (el: HTMLSpanElement | null) => {
      letterRefs.current[index] = el
    },
    []
  )

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  const calculateFalloff = (distance: number) => {
    const radius = radiusRef.current
    switch (falloff) {
      case "exponential":
        return Math.exp(-((distance / radius) ** 2) * 2.5)
      case "gaussian":
        return Math.exp(-((distance / radius) ** 2) * 2.5)
      case "linear":
      default:
        return Math.min(Math.max(1 - distance / radius, 0), 1)
    }
  }

  useAnimationFrame(
    () => {
      const cr = rectRef.current
      if (!cr) return

      const { x: mx, y: my } = mouseRef.current
      const radius = radiusRef.current
      const positions = letterPositions.current

      // Fast bail: cursor far outside the heading's bounding area — reset + skip.
      const inZone =
        mx >= cr.left - radius &&
        mx <= cr.right + radius &&
        my >= cr.top - radius &&
        my <= cr.bottom + radius

      const baseSettings = fromFontVariationSettings
      const reset = () => {
        for (let i = 0; i < letterRefs.current.length; i++) {
          const el = letterRefs.current[i]
          if (el && lastWritten.current[i] !== baseSettings) {
            lastWritten.current[i] = baseSettings
            el.style.fontVariationSettings = baseSettings
          }
        }
      }

      if (!inZone) {
        reset()
        return
      }

      const cx = mx - cr.left
      const cy = my - cr.top

      for (let i = 0; i < letterRefs.current.length; i++) {
        const el = letterRefs.current[i]
        const pos = positions[i]
        if (!el || !pos) continue

        const distance = calculateDistance(cx, cy, pos.x, pos.y)
        let weight = fromValue
        if (distance < radius) {
          weight = fromValue + (toValue - fromValue) * calculateFalloff(distance)
        }

        const settings = `'${axis}' ${Math.round(weight)}`
        if (lastWritten.current[i] !== settings) {
          lastWritten.current[i] = settings
          el.style.fontVariationSettings = settings
        }
      }
    },
    active
  )

  const words = label.split(" ")
  let letterIndex = 0

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: "inline", ...style }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            color: highlights?.[wordIndex],
          }}
        >
          {word.split("").map((letter) => {
            const currentLetterIndex = letterIndex++
            return (
              <span
                key={currentLetterIndex}
                ref={setLetterRef(currentLetterIndex)}
                style={{
                  display: "inline-block",
                  willChange: "font-variation-settings",
                  fontVariationSettings: fromFontVariationSettings,
                  fontKerning: "normal",
                  fontOpticalSizing: "auto",
                  fontVariantLigatures: "common-ligatures",
                  lineHeight: "inherit",
                  verticalAlign: "baseline",
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            )
          })}
          {wordIndex < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
})

VariableProximity.displayName = "VariableProximity"
export default VariableProximity