import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, MapPin } from "lucide-react"
import { useScrollProgress } from "../../hooks/useScrollProgress"
import { navItems, socialLinks, personal } from "../../data/portfolio"

export function Sidebar() {
  const { activeSection } = useScrollProgress()
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % personal.titles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <aside className="fixed top-0 left-0 z-40 hidden h-screen w-56 border-r border-edge bg-canvas md:flex md:flex-col md:justify-between md:px-7 md:py-12">
      <div>
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          className="block text-2xl font-semibold tracking-tight text-white transition-colors hover:text-accent"
        >
          {personal.name}
        </a>

        <div className="relative mt-2 h-5 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={titleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-muted"
            >
              {personal.titles[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-[13px] text-faint">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>Islamabad, Pakistan</span>
        </p>

        <nav className="mt-12 flex flex-col gap-1">
          {navItems.map((item, i) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-300"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-surface"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <motion.div
                  className={`relative z-10 h-full w-0.5 shrink-0 rounded-full transition-colors duration-300 ${
                    isActive
                      ? "bg-accent"
                      : "bg-transparent group-hover:bg-edge-strong"
                  }`}
                  layout={false}
                />
                <span
                  className={`relative z-10 font-mono text-xs transition-all duration-300 ${
                    isActive
                      ? "text-accent sidebar-glow"
                      : "text-faint group-hover:text-accent sidebar-glow"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`relative z-10 transition-all duration-300 ${
                    isActive
                      ? "font-bold text-white sidebar-glow"
                      : "font-normal text-muted group-hover:text-white sidebar-glow"
                  }`}
                >
                  {item.label}
                </span>
                <ArrowUpRight
                  className={`relative z-10 ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 ${
                    isActive
                      ? "text-accent"
                      : "text-faint group-hover:text-accent"
                  }`}
                />
              </a>
            )
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
          >
            {link.label}
            {link.label === "Website" && (
              <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-colors duration-300 group-hover:text-accent" />
            )}
          </a>
        ))}
      </div>
    </aside>
  )
}