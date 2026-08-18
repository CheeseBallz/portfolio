import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type Orb = {
  size: number
  x: string
  y: string
  rgb: [number, number, number]
  opacity: number
  duration: number
}

const orbs: Orb[] = [
  { size: 520, x: "8%", y: "18%", rgb: [125, 211, 252], opacity: 0.05, duration: 70 },
  { size: 420, x: "72%", y: "28%", rgb: [186, 230, 253], opacity: 0.04, duration: 90 },
  { size: 380, x: "46%", y: "74%", rgb: [96, 165, 250], opacity: 0.045, duration: 80 },
  { size: 460, x: "84%", y: "82%", rgb: [186, 230, 253], opacity: 0.035, duration: 100 },
]

function orbGradient([r, g, b]: [number, number, number], opacity: number) {
  const o = (factor: number) => `rgba(${r},${g},${b},${(opacity * factor).toFixed(3)})`
  return `radial-gradient(circle at center, ${o(1)} 0%, ${o(0.5)} 45%, ${o(0.22)} 62%, transparent 72%)`
}

const STATIC_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const SPECKLE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='speckle'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.22' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23speckle)'/%3E%3C/svg%3E\")"

export function Background() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-canvas">
      {/* Cool blue-black atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-canvas-soft) 0%, var(--color-canvas) 55%, #060810 100%)",
        }}
      />

      {/* Faint blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Fine static grain — living, textured paper */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-screen"
        style={{
          backgroundImage: STATIC_GRAIN,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Coarser speckle — texture depth */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-screen"
        style={{
          backgroundImage: SPECKLE,
          backgroundSize: "160px 160px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 32%, var(--color-canvas) 100%)",
        }}
      />

      {/* Floating orbs (pre-blurred gradients — no CSS filter, compositor-only motion) */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            background: orbGradient(orb.rgb, orb.opacity),
          }}
          animate={
            visible
              ? {
                  x: ["0%", "5%", "-3%", "2%", "0%"],
                  y: ["0%", "-4%", "6%", "-2%", "0%"],
                }
              : { x: "0%", y: "0%" }
          }
          transition={{
            duration: orb.duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  )
}