import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { GithubIcon } from "../ui/GithubIcon"
import { Magnetic } from "../ui/Magnetic"
import { WatermarkParallax } from "../ui/WatermarkParallax"
import { useAnimateInView } from "../../hooks/useAnimateInView"
import { fadeInUp, staggerContainer } from "../../animations/framerVariants"
import { projects } from "../../data/portfolio"
import type { Project } from "../../data/portfolio"
import { SectionHeader } from "../SectionHeader"

function ProjectGallery({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)
  const total = project.images.length
  const pad = (n: number) => String(n).padStart(2, "0")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setCanScroll(el.scrollWidth - el.clientWidth > 4)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [project.images])

  const scrollBy = (dir: number) => {
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: "smooth" })
  }

  return (
    <div className="mt-6">
      {/* Horizontal media rail */}
      <div className="relative">
        <div
          ref={ref}
          className="flex snap-x gap-4 overflow-x-auto pb-4 scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {project.images.map((src, i) => (
            <Link
              key={src}
              to={`/projects/${project.slug}`}
              className="group/tile block shrink-0 overflow-hidden rounded-xl border border-edge bg-raised transition-all duration-300 ease-out group-hover/tile:border-accent/35 group-hover/tile:shadow-[0_0_24px_rgba(125,211,252,0.10)]"
              aria-label={`Open ${project.title} case study`}
            >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-[190px] object-cover transition-all duration-300 ease-out group-hover/tile:scale-[1.02] group-hover/tile:brightness-[1.08] sm:w-[200px] lg:w-[210px] xl:w-[220px]"
                />
                <div className="flex items-center border-t border-edge/70 bg-raised px-3 py-[7px]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {pad(i + 1)} / {pad(total)}
                  </span>
                </div>
              </Link>
          ))}
        </div>

        {canScroll && (
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll to next screenshots"
            className="absolute top-1/2 right-3 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-edge bg-raised/90 text-muted backdrop-blur-sm transition-colors duration-300 hover:border-accent/40 hover:text-accent"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export function Projects() {
  const { ref, isInView } = useAnimateInView(0.1)

  return (
    <section id="projects" className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-36 md:pb-32">
      <div className="pointer-events-none absolute inset-0 z-0 select-none" aria-hidden>
        <div className="absolute top-0 left-0 md:left-4">
          <WatermarkParallax word="PROJECTS" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl md:ml-[10%] lg:ml-[12%]">
        <SectionHeader number="04" isInView={isInView} />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-28 md:space-y-36"
        >
          {projects.map((project, i) => {
            const rank = String(i + 1).padStart(2, "0")
            return (
              <motion.article key={project.slug} variants={fadeInUp}>
                {/* Project header */}
                <header className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      {rank} · {project.category} · {project.year}
                    </p>
                    <Link to={`/projects/${project.slug}`} className="mt-3 block">
                      <h3 className="text-3xl font-bold tracking-tight text-white/95 transition-colors duration-300 hover:text-white md:text-5xl">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="ml-auto flex flex-wrap items-center gap-2">
                    <Magnetic strength={7}>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 px-4 py-2 text-xs font-medium text-accent transition-colors duration-300 hover:bg-accent/10"
                      >
                        Case Study
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Magnetic>
                    {project.github && (
                      <Magnetic strength={7}>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-edge px-4 py-2 text-xs text-muted transition-colors duration-300 hover:border-edge-strong hover:text-white"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                          GitHub
                        </a>
                      </Magnetic>
                    )}
                    {project.liveDemo && (
                      <Magnetic strength={7}>
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-edge px-4 py-2 text-xs text-muted transition-colors duration-300 hover:border-edge-strong hover:text-white"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          Live Demo
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </header>

                {/* Horizontal screenshot gallery */}
                {project.images.length > 0 && <ProjectGallery project={project} />}
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}