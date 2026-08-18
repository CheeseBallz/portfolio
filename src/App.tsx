import { useEffect } from "react"
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Background } from "./components/Background"
import { CursorSpotlight } from "./components/CursorSpotlight"
import { Sidebar } from "./components/layout/Sidebar"
import { MobileNav } from "./components/layout/MobileNav"
import { BottomNav } from "./components/layout/BottomNav"
import { Footer } from "./components/layout/Footer"
import { Hero } from "./components/sections/Hero"
import { About } from "./components/sections/About"
import { Experience } from "./components/sections/Experience"
import { Projects } from "./components/sections/Projects"
import { Stack } from "./components/sections/Stack"
import { Contact } from "./components/sections/Contact"
import { ProjectCaseStudy } from "./components/pages/ProjectCaseStudy"
import { ScrollToTop } from "./components/ScrollToTop"
import { Analytics } from "@vercel/analytics/react"

gsap.registerPlugin(ScrollTrigger)

function Home() {
  const location = useLocation()

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!target) return
    const el = document.getElementById(target.replace("#", ""))
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [location])

  return (
    <>
      <Sidebar />
      <MobileNav />
      <div className="md:ml-56 pb-24 pt-14 md:pb-0 md:pt-0">
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Stack />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

let isInitialLoad = true

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false
      if (location.pathname !== "/") {
        navigate("/", { replace: true })
      }
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time: number) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.lagSmoothing(1)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-canvas text-white">
      <CursorSpotlight />
      <Background />
      <Analytics />
      <BottomNav />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}