import { useScrollProgress } from "../../hooks/useScrollProgress"
import { navItems, personal } from "../../data/portfolio"

export function MobileNav() {
  const { activeSection } = useScrollProgress()
  const activeNav = navItems.find((item) => item.href.slice(1) === activeSection)

  return (
    <div className="fixed top-0 left-0 right-0 z-40 border-b border-edge bg-canvas md:hidden">
      <div className="flex h-14 items-center justify-between px-6">
        <span className="text-sm font-medium text-white">{personal.name}</span>
        <span
          key={activeNav?.label ?? "Home"}
          className="animate-in fade-in slide-in-from-bottom-1 duration-300 text-sm font-medium text-muted"
        >
          {activeNav?.label ?? "Home"}
        </span>
      </div>
    </div>
  )
}