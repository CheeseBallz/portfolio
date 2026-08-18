import { useLocation, useNavigate } from "react-router-dom"
import { Briefcase, Folder, IdCard, Layers, Mail, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useScrollProgress } from "../../hooks/useScrollProgress"

interface BottomNavItem {
  label: string
  icon: LucideIcon
  target: string
}

const bottomNavItems: BottomNavItem[] = [
  { label: "Intro", icon: User, target: "hero" },
  { label: "About", icon: IdCard, target: "about" },
  { label: "Exp", icon: Briefcase, target: "experience" },
  { label: "Work", icon: Folder, target: "projects" },
  { label: "Skills", icon: Layers, target: "stack" },
  { label: "Contact", icon: Mail, target: "contact" },
]

export function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { activeSection } = useScrollProgress()

  const handleClick = (target: string) => {
    if (pathname !== "/") {
      navigate("/", { state: { scrollTo: `#${target}` } })
      return
    }
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-4 z-40 flex items-stretch rounded-full border border-edge/50 bg-canvas/80 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
      style={{ bottom: "max(env(safe-area-inset-bottom), 1rem)" }}
    >
      {bottomNavItems.map((item) => {
        const isActive = pathname === "/" && activeSection === item.target
        const Icon = item.icon
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => handleClick(item.target)}
            aria-current={isActive ? "true" : undefined}
            className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 py-2 transition-[transform,opacity,color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 active:opacity-70 ${
              isActive
                ? "text-accent"
                : "text-faint active:text-muted"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                isActive
                  ? "drop-shadow-[0_0_6px_rgba(125,211,252,0.5)]"
                  : ""
              }`}
              strokeWidth={isActive ? 2 : 1.5}
              fill="none"
            />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}