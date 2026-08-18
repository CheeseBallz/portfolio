import { useGsap } from "../../lib/use-gsap"

interface WatermarkParallaxProps {
  word: string
  drift?: number
}

export function WatermarkParallax({ word, drift = 18 }: WatermarkParallaxProps) {
  const ref = useGsap<HTMLDivElement>(({ gsap, reduced }) => {
    if (reduced) return
    gsap.to(ref.current, {
      yPercent: drift,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  }, [])

  return (
    <div
      ref={ref}
      className="text-[clamp(3.75rem,11vw,9rem)] font-satoshi leading-[0.85] tracking-[-0.05em] text-white/10"
    >
      {word}
    </div>
  )
}
