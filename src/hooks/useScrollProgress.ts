import { useEffect, useSyncExternalStore } from "react"

let activeSection = "hero"
const listeners = new Set<() => void>()
let observer: IntersectionObserver | null = null

function emit() {
  for (const listener of listeners) listener()
}

function setupObserver() {
  if (observer) return

  activeSection = "hero"

  const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"))
  if (sections.length === 0) return

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !entry.target.id) continue
        if (entry.target.id !== activeSection) {
          activeSection = entry.target.id
          emit()
        }
      }
    },
    { rootMargin: "-300px 0px -50% 0px", threshold: 0 }
  )

  sections.forEach((el) => observer!.observe(el))
  emit()
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function getSnapshot() {
  return activeSection
}

export function useScrollProgress() {
  useEffect(() => {
    setupObserver()
  }, [])

  const active = useSyncExternalStore(subscribe, getSnapshot)
  return { activeSection: active }
}