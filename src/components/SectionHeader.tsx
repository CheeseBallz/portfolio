import { motion } from "framer-motion"

interface SectionHeaderProps {
  number: string
  isInView?: boolean
}

export function SectionHeader({ number, isInView = true }: SectionHeaderProps) {
  return (
    <motion.div
      className="mb-14"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-accent">{number}</span>
        <div className="h-px flex-1 bg-edge" />
      </div>
    </motion.div>
  )
}
