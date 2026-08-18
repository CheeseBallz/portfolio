import { personal } from "../../data/portfolio"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-edge">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-12 text-center md:py-16">
        <p className="font-mono text-sm leading-relaxed tracking-wide text-muted">
          Securing Systems, Automating Infrastructure, Protecting Networks{" "}
          <span className="inline-block" role="img" aria-label="shield">
            🛡️
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-faint">
          <span>
            Designed &amp; Engineered by{" "}
            <span className="font-semibold text-white">{personal.name}</span>
          </span>
          <span className="hidden h-3 w-px bg-edge-strong sm:block" aria-hidden />
          <span>© {year} {personal.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}