import { useRef } from "react"
import { Shield, Flag, Target } from "lucide-react"
import VariableProximity from "../ui/VariableProximity"
import { useGsap } from "../../lib/use-gsap"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useGsap<HTMLElement>(({ gsap, reduced }) => {
    if (reduced) return
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
    tl.from(".hero-chrome", { y: -12, opacity: 0, duration: 0.45 }, 0)
      .from(".hero-support", { y: 18, opacity: 0, duration: 0.5 }, 0.25)
      .from(".hero-proof", { y: 10, opacity: 0, duration: 0.4 }, 0.45)
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden px-6 pt-16 pb-20 select-none md:pt-20 md:pb-24"
    >
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)",
          backgroundSize: "100% 2px",
        }}
      />

      <div className="hero-chrome mb-4 flex items-center gap-4">
        <span className="font-mono text-sm text-accent">01</span>
        <div className="h-px flex-1 bg-edge" />
      </div>

      <div ref={containerRef} className="max-w-5xl">
        <h1 className="font-sans text-left text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          <VariableProximity
            label="The Best Defense is a Relentless Offense"
            fromFontVariationSettings="'wght' 500"
            toFontVariationSettings="'wght' 900"
            containerRef={containerRef}
            radiusScale={2.3}
            falloff="gaussian"
            highlights={{ 5: "var(--color-accent-bright)" }}
          />
        </h1>
      </div>

        <div className="hero-support mt-14 max-w-[600px] md:mt-14">
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Computer Science student building web applications, security tools,
            and automation scripts — from development to defense.
          </p>
        </div>

        <div className="mt-12 max-w-[600px] md:mt-12">
          <div className="flex gap-5 md:gap-6">
            <div className="w-px shrink-0 bg-edge-strong" />
            <div className="space-y-6">
              <p className="text-sm leading-[1.75] md:text-base">
                <span className="font-bold text-white">Building</span>
                <span className="text-muted">
                  {" "}— I design and develop full-stack web and system applications,
                  focused on clean architecture and scalable code.
                </span>
              </p>
              <p className="text-sm leading-[1.75] md:text-base">
                <span className="font-bold text-white">Breaking</span>
                <span className="text-muted">
                  {" "}— I explore offensive security through vulnerability testing,
                  automation, and hands-on practice, turning security gaps into
                  learning and improvement.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-xl md:mt-20">
          <div className="hero-proof flex flex-wrap items-center gap-x-3 gap-y-3 rounded-xl border border-edge bg-surface px-3 py-4 md:gap-x-6 md:px-5 md:py-5">
            <div className="group flex items-center gap-2 md:gap-3">
              <Shield className="h-3.5 w-3.5 shrink-0 text-accent transition-all duration-300 group-hover:-translate-y-0.5 md:h-4 md:w-4" />
              <span className="text-xs font-mono text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-white sm:text-sm sm:font-sans">
                Red Team Enthusiast
              </span>
            </div>
            <div className="hidden h-4 w-px bg-edge-strong sm:block" />
            <div className="group flex items-center gap-2 md:gap-3">
              <Flag className="h-3.5 w-3.5 shrink-0 text-accent transition-all duration-300 group-hover:-translate-y-0.5 md:h-4 md:w-4" />
              <span className="text-xs font-mono text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-white sm:text-sm sm:font-sans">
                CTF Player
              </span>
            </div>
            <div className="hidden h-4 w-px bg-edge-strong sm:block" />
            <div className="group flex items-center gap-2 md:gap-3">
              <Target className="h-3.5 w-3.5 shrink-0 text-accent transition-all duration-300 group-hover:-translate-y-0.5 md:h-4 md:w-4" />
              <span className="text-xs font-mono text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-white sm:text-sm sm:font-sans">
                Web Development
              </span>
            </div>
          </div>
        </div>
    </section>
  )
}