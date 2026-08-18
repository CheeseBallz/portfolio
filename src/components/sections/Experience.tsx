import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, ExternalLink, MapPin } from "lucide-react"
import { useAnimateInView } from "../../hooks/useAnimateInView"
import { fadeInUp } from "../../animations/framerVariants"
import { experience, timeline } from "../../data/portfolio"
import { SectionHeader } from "../SectionHeader"
import Noise from "../ui/Noise"
import { WatermarkParallax } from "../ui/WatermarkParallax"

function Cell({ item }: { item: typeof experience[number] }) {
  const Tag = item.link ? "a" : "div"
  const linkProps = item.link
    ? { href: item.link, target: "_blank" as const, rel: "noopener noreferrer" as const }
    : {}

  return (
    <Tag
      {...linkProps}
      className="relative flex flex-col p-6 md:p-8 group/cell cursor-pointer transition-colors duration-[280ms] ease-out hover:bg-elevated"
    >
      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
            {item.category}
          </span>
          {item.link && (
            <ExternalLink className="h-3.5 w-3.5 text-muted opacity-0 transition-opacity duration-300 group-hover/cell:opacity-100" />
          )}
        </div>

        <h3 className="text-base font-semibold text-white md:text-lg">
          {item.company}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted">
          <span>{item.role}</span>
          <span className="text-edge-strong">·</span>
          <span className="font-mono text-xs">{item.period}</span>
        </div>
      </div>
    </Tag>
  )
}

function TimelineEntry({ item, index }: { item: typeof timeline[number]; index: number }) {
  const rank = String(index + 1).padStart(2, "0")
  const points = item.description.split(". ").filter(Boolean)

  return (
    <div className="relative pl-12 pb-14 last:pb-0 md:pl-16 group/timeline">
      {/* Node connected to the single main line */}
      <div className="absolute left-1 top-[5px] -translate-x-1/2">
        <motion.div
          className="h-[9px] w-[9px] rounded-full border-2 border-accent bg-canvas shadow-[0_0_8px_rgba(125,211,252,0.35)]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <div className="-m-3 rounded-lg border border-transparent p-3 transition-all duration-300 ease-out hover:border-white/[0.12] hover:bg-white/[0.02] hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]">
          {/* Row: number | divider | date pill */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-faint">{rank}</span>
            <div className="h-px flex-1 bg-edge" />
            <span className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-xs text-muted">
              {item.period}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
            <h3 className="text-[22px] leading-tight font-bold text-white md:text-2xl transition-colors duration-300 ease-out group-hover/timeline:text-accent">
              {item.role}
            </h3>
            <span className="text-[15px] text-muted md:text-base">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white underline underline-offset-4 decoration-edge-strong"
                >
                  {item.company}
                  <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-colors duration-300 group-hover/timeline:text-accent" />
                </a>
              ) : (
                item.company
              )}
            </span>
          </div>

          {item.location && (
            <div className="mt-2.5 flex items-center gap-1.5 text-[13px] text-faint">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{item.location}</span>
            </div>
          )}

          <ul className="mt-4 space-y-2.5">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-[1.75] text-muted md:text-[15px]">
                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(125,211,252,0.4)]" />
                <span>{point}{!point.endsWith(".") ? "." : ""}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export function Experience() {
  const { ref: certRef, isInView } = useAnimateInView(0.05)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.55"],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-36 md:pb-32">
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none"
        aria-hidden
      >
        <div className="absolute top-0 left-0 md:left-4">
          <WatermarkParallax word="EXPERIENCE" />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader number="03" isInView={isInView} />

        {/* Certification Matrix */}
        <motion.div
          ref={certRef}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative rounded-xl border border-white/[0.08] bg-elevated overflow-hidden"
        >
          <Noise patternSize={250} patternAlpha={10} />

          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full z-10 hidden md:block" aria-hidden>
            <div className="h-full w-full bg-white/[0.06]">
              <motion.div
                className="h-full w-full bg-gradient-to-b from-white/40 via-white/25 to-transparent"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top" }}
              />
            </div>
          </div>

          <div className="absolute left-0 top-1/2 w-full h-px bg-white/[0.06] hidden md:block" aria-hidden />

          <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-y-0">
            <div className="md:border-r border-white/[0.06]">
              <Cell item={experience[0]} />
            </div>
            <div>
              <Cell item={experience[1]} />
            </div>
            <div className="md:border-r border-white/[0.06]">
              <Cell item={experience[2]} />
            </div>
            <div>
              <Cell item={experience[3]} />
            </div>
          </div>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="mt-20 max-w-[60rem]">
          <div ref={timelineRef} className="relative">
            {/* Single main timeline line with glowing scroll progress */}
            <div className="absolute left-1 top-0 bottom-0 w-px" aria-hidden>
              <div className="h-full w-full bg-white/[0.06]" />
              <motion.div
                className="absolute inset-0 w-full bg-gradient-to-b from-accent to-accent/20 shadow-[0_0_4px_rgba(125,211,252,0.35),0_0_12px_rgba(125,211,252,0.18),0_0_24px_rgba(125,211,252,0.08)]"
                style={{ scaleY: lineScale, transformOrigin: "top" }}
              />
            </div>

            {timeline.map((item, i) => (
              <TimelineEntry key={item.company} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
