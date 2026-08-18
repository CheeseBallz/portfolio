import { motion } from "framer-motion"
import { GraduationCap, Crosshair, BookOpen, Sword, Target } from "lucide-react"
import { useAnimateInView } from "../../hooks/useAnimateInView"
import { WatermarkParallax } from "../ui/WatermarkParallax"

const devTech = ["C++", "Python", "JavaScript", "React", "Node.js", "Git"]
const sysTech = ["Linux", "Kali Linux", "Burp Suite", "Nmap", "Wireshark", "OWASP"]

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    content: (
      <>
        <p className="text-sm font-medium text-white transition-all duration-300 group-hover:font-bold">B.S. Computer Science</p>
        <p className="mt-1 text-sm text-muted transition-all duration-300 group-hover:font-bold group-hover:text-white">SZABIST University</p>
        <p className="mt-1 text-xs text-faint transition-all duration-300 group-hover:font-bold group-hover:text-white">Expected Graduation: 2029</p>
      </>
    ),
  },
  {
    icon: Crosshair,
    title: "Focus",
    content: (
      <ul className="space-y-1.5">
        {["Web & System Applications", "Cybersecurity", "Backend Development", "Security Automation"].map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted">
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span className="transition-all duration-300 hover:font-bold hover:text-white">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: BookOpen,
    title: "Current Learning",
    content: (
      <ul className="space-y-1.5">
        {["Full-Stack Development", "Web Security", "Python Automation", "Linux & Networking"].map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted">
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span className="transition-all duration-300 hover:font-bold hover:text-white">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: Sword,
    title: "Approach",
    content: (
      <ul className="space-y-1.5">
        {["Secure Design Development", "Problem Solving", "Hands-On Building & Testing", "Continuous Learning"].map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted">
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span className="transition-all duration-300 hover:font-bold hover:text-white">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export function About() {
  const { ref, isInView } = useAnimateInView(0.05)

  return (
    <section id="about" className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-32 md:pb-36">
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none"
        aria-hidden
      >
        <div className="absolute top-0 left-0 md:left-4">
          <WatermarkParallax word="ABOUT" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex items-center gap-4">
          <span className="font-mono text-sm text-accent">02</span>
          <div className="h-px flex-1 bg-edge" />
        </div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16"
        >
          {/* Left column */}
          <motion.div variants={itemVariants} className="relative max-w-[640px]">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />

            <div className="pl-6">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                Developing software.
                <br />
                Exploring security.
              </h2>

              <div className="mt-6 space-y-4 md:mt-8">
                <p className="leading-relaxed text-muted md:text-base md:leading-[1.75]">
                  I&apos;m <span className="font-semibold text-white">Sumaid Ahmed</span>, a Computer
                  Science student focused on web and system application development with a strong
                  interest in cybersecurity. I enjoy building practical applications, exploring how
                  systems work, and understanding how they can be secured against real-world threats.
                </p>
                <p className="leading-relaxed text-muted md:text-base md:leading-[1.75]">
                  <span className="font-semibold text-white">Development</span> — building full-stack web
                  and system applications, and <span className="font-semibold text-white">Security</span> —
                  exploring web security, automation, and offensive security techniques. I enjoy
                  both writing solid, scalable code and understanding how systems can be broken
                  and secured.
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mt-8 space-y-4">
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-faint">
                    Development
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {devTech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-edge px-3 py-1 text-xs text-muted transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-faint">
                    Systems & Security
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sysTech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-edge px-3 py-1 text-xs text-muted transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mt-10 h-px w-16 bg-accent/30 md:mt-12" />
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* 2×2 cards grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              {cards.map((card) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={card.title}
                    variants={itemVariants}
                    className="group rounded-xl border border-edge bg-surface p-4 transition-all duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_0_24px_rgba(125,211,252,0.06)] md:p-5"
                  >
                    <div className="mb-3 flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 text-accent" />
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
                        {card.title}
                      </span>
                    </div>
                    {card.content}
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Career Objective card */}
            <motion.div
              variants={itemVariants}
              className="group rounded-xl border border-edge bg-surface p-4 transition-all duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_0_24px_rgba(125,211,252,0.06)] md:p-5"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <Target className="h-3.5 w-3.5 text-accent" />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
                  Career Objective
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                Building toward a career at the intersection of software engineering and
                cybersecurity, with a focus on developing secure web and system applications,
                security tools, and practical solutions for real-world problems.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
