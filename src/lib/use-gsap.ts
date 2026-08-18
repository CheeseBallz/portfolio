import { useLayoutEffect, useRef } from "react"
import type { DependencyList } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export interface GsapSetupContext {
  gsap: typeof gsap
  ScrollTrigger: typeof ScrollTrigger
  reduced: boolean
}

export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: GsapSetupContext) => void,
  deps: DependencyList = []
) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = prefersReducedMotion()
    const context = gsap.context((self) => {
      if (reduced) {
        gsap.set(self.selector?.("*") ?? el, { clearProps: "opacity,transform" })
      }
      setup({ gsap, ScrollTrigger, reduced })
    }, el)

    return () => {
      context.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
