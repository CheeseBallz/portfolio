import { motion } from "framer-motion"
import { useAnimateInView } from "../../hooks/useAnimateInView"
import { fadeInUp, staggerContainer } from "../../animations/framerVariants"
import { stackCategories, techLogos } from "../../data/portfolio"
import { SectionHeader } from "../SectionHeader"
import DotField from "../ui/DotField"
import { LogoLoop } from "../ui/LogoLoop"
import { WatermarkParallax } from "../ui/WatermarkParallax"

export function Stack() {
  const { ref: inViewRef, isInView } = useAnimateInView(0.1)

  return (
    <section id="stack" className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-36 md:pb-32">
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none"
        aria-hidden
      >
        <div className="absolute top-0 left-0 md:left-4">
          <WatermarkParallax word="STACK" />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader number="05" isInView={isInView} />
      </div>

      <div className="relative z-10 mx-auto max-w-[88rem]">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl leading-relaxed text-muted md:text-lg"
        >
          The tools I reach for when shipping fast, scalable products.
        </motion.p>

        <div className="relative z-10 mt-14">
          <motion.div
            ref={inViewRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="absolute inset-0">
              <DotField
                dotRadius={1.8}
                dotSpacing={16}
                cursorRadius={420}
                bulgeStrength={65}
                glowRadius={180}
                gradientFrom="rgba(125,211,252, 0.26)"
                gradientTo="rgba(255, 255, 255, 0.1)"
                glowColor="#0E0F13"
              />
            </div>
            <div className="grid grid-cols-1 gap-px bg-white/[0.08] md:grid-cols-2">
              {stackCategories.map((category) => (
                <motion.div
                  key={category.category}
                  variants={fadeInUp}
                  className="bg-raised/60 p-8 md:p-10"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {category.category}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:[text-shadow:0_0_8px_rgba(125,211,252,0.5),0_0_20px_rgba(125,211,252,0.3)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Static noise overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              aria-hidden
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                backgroundSize: "256px 256px",
              }}
            />
          </motion.div>
        </div>

        <div className="relative z-10 mt-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs tracking-[0.18em] text-accent">
              TOOLS
            </span>
            <div className="h-px flex-1 bg-edge" />
          </div>
          <LogoLoop
            logos={techLogos}
            direction="left"
            speed={50}
            gap={44}
            logoHeight={40}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Tools and technologies I use"
          />
        </div>
      </div>
    </section>
  )
}