import { useEffect, useRef, useState } from "react"
import { Link, useParams, Navigate, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { GithubIcon } from "../ui/GithubIcon"
import type { ReactNode } from "react"
import { projects } from "../../data/portfolio"
import { fadeInUp } from "../../animations/framerVariants"

function StackedDeck({ images, title }: { images: string[]; title: string }) {
  const [front, setFront] = useState(0)
  const [outgoing, setOutgoing] = useState(-1)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef(0)
  const total = images.length
  const pad = (n: number) => String(n).padStart(2, "0")

  const STEP_X = 16
  const STEP_Y = 14
  const SCALE_STEP = 0.04
  const OPACITY_STEP = 0.06
  const ROTATE_STEP = 1
  const DIP_Y = 100

  useEffect(() => {
    setFront(0)
    setOutgoing(-1)
  }, [images])

  useEffect(() => {
    frontRef.current = front
  }, [front])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (outgoing === -1) return
    const t = setTimeout(() => setOutgoing(-1), 1100)
    return () => clearTimeout(t)
  }, [outgoing])

  useEffect(() => {
    if (!inView || paused || total < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => {
      const cur = frontRef.current
      setOutgoing(cur)
      setFront((cur + 1) % total)
    }, 4000)
    return () => clearInterval(id)
  }, [inView, paused, total])

  const backX = (total - 1) * STEP_X
  const backY = -(total - 1) * STEP_Y
  const backScale = 1 - (total - 1) * SCALE_STEP
  const backOpacity = Math.max(0.75, 1 - (total - 1) * OPACITY_STEP)

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative aspect-[4/3] w-full select-none"
    >
      <div
        className="pointer-events-none absolute -inset-[12%] z-0 opacity-[0.08] blur-2xl"
        style={{
          background: "radial-gradient(circle at center, #7DD3FC 0%, rgba(125,211,252,0) 70%)",
        }}
        aria-hidden
      />

      {images.map((src, i) => {
        const offset = (i - front + total) % total
        const isOutgoing = i === outgoing

        const animate = isOutgoing
          ? {
              x: [0, -12, backX],
              y: [0, DIP_Y, backY],
              scale: [1, 0.96, backScale],
              opacity: [1, 0.8, backOpacity],
              rotate: [0, -1.5, -(total - 1) * ROTATE_STEP],
            }
          : {
              x: offset * STEP_X,
              y: -offset * STEP_Y,
              scale: 1 - offset * SCALE_STEP,
              opacity: Math.max(0.75, 1 - offset * OPACITY_STEP),
              rotate: -offset * ROTATE_STEP,
            }

        return (
          <motion.div
            key={src}
            className="absolute inset-0 z-10 overflow-hidden rounded-2xl border border-edge bg-raised shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            style={{ zIndex: 100 - offset }}
            animate={animate}
            transition={{ duration: 0.9, ease: [0.6, 0, 0.4, 1] }}
          >
            <img
              src={src}
              alt={`${title} screenshot ${offset + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )
      })}

      <span className="absolute bottom-3 left-3 z-[200] rounded bg-canvas/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted backdrop-blur-sm">
        {pad(front + 1)} / {pad(total)}
      </span>
    </div>
  )
}

function ShowcaseSection({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: ReactNode
}) {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="border-t border-edge/70 py-12 md:py-14"
    >
      <div className="mb-7 flex items-center gap-4">
        <span className="font-mono text-xs text-accent">{index}</span>
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
        <div className="h-px flex-1 self-center bg-edge" />
      </div>
      {children}
    </motion.section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-[1.7] text-muted md:text-base">
          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function InfoRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="border-b border-edge/70 py-4 first:pt-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

export function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const index = projects.findIndex((p) => p.slug === slug)

  if (index === -1) return <Navigate to="/" replace />

  const project = projects[index]
  const length = projects.length
  const prev = projects[(index - 1 + length) % length]
  const next = projects[(index + 1) % length]

  const showScreens = project.images.length > 0

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate("/", { state: { scrollTo: "#projects" } })
    }
  }

  return (
    <div className="relative">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 border-b border-edge bg-canvas">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            to="/"
            state={{ scrollTo: "#projects" }}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Link>
          <Link
            to="/"
            className="font-satoshi text-sm font-bold tracking-tight text-white transition-colors hover:text-accent"
          >
            SA
          </Link>
        </div>
      </header>

      {/* Floating go-back (mobile only) */}
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className="fixed left-4 top-20 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-raised/90 text-muted backdrop-blur-sm transition-all duration-300 hover:border-edge-strong hover:text-white active:scale-95 md:hidden"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <div className="mx-auto max-w-6xl px-6 pb-28 pt-16 md:pt-24">
        {/* Hero */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,46%)]"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              {project.category} · {project.year}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-muted md:text-lg">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Live Demo in a new tab"
                  className="inline-flex h-[36px] items-center gap-[6px] rounded-lg border border-edge-strong bg-transparent px-4 text-[13px] font-medium text-white transition-colors duration-150 hover:border-edge-strong hover:bg-elevated hover:text-white"
                >
                  Live demo
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-edge px-5 py-2.5 text-sm text-white transition-colors duration-300 hover:border-edge-strong"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {showScreens && <StackedDeck images={project.images} title={project.title} />}
        </motion.section>

        {/* Narrative + sidebar */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_minmax(0,300px)] lg:gap-16">
          <div>
            <ShowcaseSection index="01" title="Overview">
              <p className="max-w-3xl leading-[1.8] text-muted md:text-base">
                {project.overview}
              </p>
            </ShowcaseSection>

            <ShowcaseSection index="02" title="Problem">
              <p className="max-w-3xl leading-[1.8] text-muted md:text-base">
                {project.problem}
              </p>
            </ShowcaseSection>

            <ShowcaseSection index="03" title="Solution">
              <p className="max-w-3xl leading-[1.8] text-muted md:text-base">
                {project.solution}
              </p>
            </ShowcaseSection>

            <ShowcaseSection index="04" title="My Role">
              <p className="max-w-3xl leading-[1.8] text-muted md:text-base">
                {project.role}
              </p>
            </ShowcaseSection>

            <ShowcaseSection index="05" title="Features">
              <div className="max-w-3xl">
                <BulletList items={project.features} />
              </div>
            </ShowcaseSection>

            <ShowcaseSection index="06" title="Technology Stack">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-edge px-4 py-1.5 text-xs text-muted transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </ShowcaseSection>

            <ShowcaseSection index="07" title="Result">
              <div className="max-w-3xl">
                <BulletList items={project.results} />
              </div>
            </ShowcaseSection>
          </div>

          {/* Project info sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-edge bg-raised p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                Project Info
              </p>

              <div className="mt-4">
                <InfoRow label="Built">
                  <p className="text-sm text-white">
                    {project.year} · {project.category}
                  </p>
                </InfoRow>

                <InfoRow label="Role">
                  <p className="text-sm text-white">{project.role}</p>
                </InfoRow>

                <InfoRow label="Stack">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-edge px-2.5 py-1 text-[10px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </InfoRow>

                <div className="pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                    Links
                  </p>
                  <div className="mt-2 flex flex-col gap-2.5">
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Live Demo in a new tab"
                        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom navigation */}
        <nav className="mt-16 flex items-center justify-between border-t border-edge pt-8">
          <Link
            to={`/projects/${prev.slug}`}
            className="group inline-flex max-w-[45%] items-center gap-3"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
            <span className="truncate">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-faint">
                Previous
              </span>
              <span className="block truncate text-sm text-white transition-colors group-hover:text-accent">
                {prev.title}
              </span>
            </span>
          </Link>

          <Link
            to={`/projects/${next.slug}`}
            className="group inline-flex max-w-[45%] items-center gap-3 text-right"
          >
            <span className="truncate">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-faint">
                Next
              </span>
              <span className="block truncate text-sm text-white transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
          </Link>
        </nav>
      </div>
    </div>
  )
}