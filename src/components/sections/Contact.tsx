import { motion } from "framer-motion"
import { ArrowUpRight, Download } from "lucide-react"
import { useAnimateInView } from "../../hooks/useAnimateInView"
import { fadeInUp } from "../../animations/framerVariants"
import { contact, contactChannels } from "../../data/portfolio"
import { SectionHeader } from "../SectionHeader"
import { Magnetic } from "../ui/Magnetic"
import { WatermarkParallax } from "../ui/WatermarkParallax"

export function Contact() {
  const { ref, isInView } = useAnimateInView(0.1)

  return (
    <section id="contact" className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-36 md:pb-32">
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none"
        aria-hidden
      >
        <div className="absolute top-0 left-0 md:left-4">
          <WatermarkParallax word="CONTACT" />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader number="06" isInView={isInView} />

        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Let&apos;s build something
          </h2>
          <p className="mt-4 leading-relaxed text-muted md:text-lg">
            {contact.subheading}
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mt-14 overflow-hidden rounded-2xl border border-white/10"
        >
          <div className="grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2">
            {contactChannels.map((channel) => {
              const isExternal = channel.url.startsWith("http")
              return (
                <a
                  key={channel.label}
                  href={channel.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-start justify-between gap-4 bg-raised/60 p-8 transition-colors duration-300 hover:bg-elevated md:p-10"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      {channel.label}
                    </p>
                    <p className="mt-2 text-sm font-bold text-white md:text-base">
                      {channel.value}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent" />
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-8"
        >
          <Magnetic strength={5}>
            <a
              href="/Sumaid%20Ahmed%20-%20Resume.pdf"
              download="Sumaid Ahmed - Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg border border-edge px-4 py-2 text-xs text-muted transition-colors duration-300 hover:border-edge-strong hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              Download Resume
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}