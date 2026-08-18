import { useRef, useEffect } from "react"

interface NoiseProps {
  patternSize?: number
  patternScaleX?: number
  patternScaleY?: number
  patternRefreshInterval?: number
  patternAlpha?: number
}

const Noise = ({
  patternSize = 128,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 15,
}: NoiseProps) => {
  const grainRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let frame = 0
    let animationId = 0
    let isVisible = true

    const size = Math.max(64, patternSize)
    const w = Math.round(size * patternScaleX)
    const h = Math.round(size * patternScaleY)

    const drawGrain = () => {
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = patternAlpha
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const loop = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(loop)
        return
      }
      if (frame % patternRefreshInterval === 0) drawGrain()
      frame++
      animationId = requestAnimationFrame(loop)
    }

    canvas.width = w
    canvas.height = h

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { rootMargin: "100px" }
    )
    observer.observe(canvas)

    loop()

    return () => {
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha])

  return (
    <canvas
      ref={grainRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ imageRendering: "pixelated" }}
    />
  )
}

export default Noise
