"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Link from "next/link"
import logoImg from "../../logo.png"

/* ─── Project data ─── */
const projects = [
  {
    id: 1,
    title: "Virelia",
    category: "Software",
    description:
    "Virelia connects every call, chat, and meeting into a unified AI layer, delivering real-time insights, tone analysis, and team alignment across your favorite tools.",
    url: "https://virelia-iota.vercel.app/",
    color: "#e78a53",
    year: "2025",
  },
  {
    id: 2,
    title: "VIBE*STRAUNT",
    category: "Restraunt",
    description:
      "Serving 70s aesthetics with a modern twist. Locally sourced, highkey delicious, and strictly for the vibers.",
    url: "https://vibestraunt.vercel.app/",
    color: "#6ee7b7",
    year: "2025",
  },
  {
    id: 3,
    title: "Vesper Collective",
    category: "Collectibles Agency",
    description:
      "An exclusive collective for the discerning investor, curating extraordinary opportunities in alternative assets.",
    url: "https://vespercollective.vercel.app/",
    color: "#818cf8",
    year: "2024",
  },
  {
    id: 4,
    title: "AlphaForce",
    category: "Financial SaaS",
    description:
      "AlphaForce is a comprehensive sales intelligence and advisor copilot platform designed for financial advisors.",
    url: "https://alphaforce-nu.vercel.app/",
    color: "#f472b6",
    year: "2024",
  },
  {
    id: 5,
    title: "Arun Sharma Website",
    category: "Personal",
    description:
      "My name is Arjun Sharma. I am a Sr. Cloud & DevOps Engineer with experience of 7+ years located in Bengaluru, India",
    url: "https://arunsharma.vercel.app/",
    color: "#fbbf24",
    year: "2024",
  },
  {
    id: 6,
    title: "Devchat",
    category: "Software",
    description:
      "Devchat is a Real-time developer forum platform with instant messaging.",
    url: "https://devchat-neon.vercel.app/",
    color: "#38bdf8",
    year: "2023",
  },
]

/* ─── Embedded Preview Card ─── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isExpanded, setIsExpanded] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(231,138,83,0.08)]"
      >
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-4">
            {/* Browser dots */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-red-400/80 transition-colors duration-300" />
              <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-yellow-400/80 transition-colors duration-300" />
              <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-green-400/80 transition-colors duration-300" />
            </div>
            {/* URL bar */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-white/30 font-mono">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="truncate max-w-[200px]">{project.url.replace("https://", "")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full border"
              style={{ borderColor: `${project.color}40`, color: project.color }}
            >
              {project.category}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white/50 hover:text-white"
              aria-label={isExpanded ? "Collapse preview" : "Expand preview"}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isExpanded ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── iframe embed ── */}
        <div
          className="relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ height: isExpanded ? "80vh" : "420px" }}
        >
          {/* Loading state */}
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-white/20 border-t-[#e78a53] rounded-full animate-spin" />
                <span className="text-white/40 text-sm">Loading preview</span>
              </div>
            </div>
          )}

          {/* Top glow reflection */}
          <div
            className="absolute inset-x-0 top-0 h-20 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${project.color}08, transparent)`,
            }}
          />

          <iframe
            src={project.url}
            title={project.title}
            className="w-full h-full border-0 bg-black"
            onLoad={() => setIframeLoaded(true)}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
        </div>

        {/* ── Info bar ── */}
        <div className="px-6 py-5 border-t border-white/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-white tracking-tight">{project.title}</h3>
                <span className="text-white/20 text-xs font-mono">{project.year}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{project.description}</p>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
              style={{
                borderColor: `${project.color}30`,
                color: project.color,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget.style.backgroundColor = `${project.color}15`)
                ;(e.currentTarget.style.borderColor = `${project.color}60`)
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget.style.backgroundColor = "transparent")
                ;(e.currentTarget.style.borderColor = `${project.color}30`)
              }}
            >
              Visit
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Stats counter ─── */
function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1800
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        {count}
        <span className="text-[#e78a53]">+</span>
      </div>
      <div className="text-white/40 text-sm mt-1">{label}</div>
    </div>
  )
}

/* ─── Page ─── */
export default function WorksPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen w-full relative bg-black text-white">
      {/* ── Ambient background ── */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(231,138,83,0.07), transparent 50%), radial-gradient(ellipse 40% 30% at 80% 60%, rgba(255,255,255,0.03), transparent 50%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(231,138,83,0.04), transparent 50%), #000",
        }}
      />
      <div className="fixed inset-0 z-0 noise-overlay" />

      {/* Floating orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full animate-float-drift"
          style={{ background: "radial-gradient(circle, rgba(231,138,83,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[40%] -right-20 w-80 h-80 rounded-full animate-float-drift-reverse"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[15%] left-[10%] w-64 h-64 rounded-full animate-breathe"
          style={{ background: "radial-gradient(circle, rgba(231,138,83,0.04) 0%, transparent 70%)" }}
        />
        <div className="absolute top-[25%] right-[20%] w-1 h-1 rounded-full bg-[#e78a53]/30 animate-twinkle" />
        <div className="absolute top-[55%] left-[15%] w-1.5 h-1.5 rounded-full bg-white/15 animate-twinkle" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[80%] right-[35%] w-1 h-1 rounded-full bg-[#e78a53]/25 animate-twinkle" style={{ animationDelay: "2s" }} />
      </div>

      {/* ── Header ── */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-md border border-border/50 shadow-lg transition-all duration-500 ${
          isScrolled ? "max-w-3xl px-2 shadow-[0_0_20px_rgba(231,138,83,0.08)]" : "max-w-5xl px-4"
        } py-2`}
      >
        <Link
          href="/"
          className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 ${isScrolled ? "ml-4" : ""}`}
        >
          <img src={logoImg.src} alt="PIXECELATE logo" className="h-9 w-auto object-contain" draggable={false} />
        </Link>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground md:flex md:space-x-2">
          <Link href="/" className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="relative z-20">Home</span>
          </Link>
          <span className="relative px-4 py-2 text-foreground cursor-default">
            <span className="relative z-20">Works</span>
            <div className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-[#e78a53] to-transparent" />
          </span>
        </div>
      </header>

      {/* Mobile header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg md:hidden px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src={logoImg.src} alt="PIXECELATE logo" className="h-8 w-auto object-contain" draggable={false} />
        </Link>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1 rounded-full border border-white/10 hover:border-white/20"
        >
          Home
        </Link>
      </header>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="group relative rounded-full border border-white/20 bg-white/5 px-6 py-1.5 text-xs backdrop-blur transition-all duration-300 hover:scale-105">
              <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-[#e78a53] to-transparent transition-all duration-500 group-hover:w-3/4" />
              <span className="text-white/80">Portfolio</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
          >
            Sites that{" "}
            <span className="bg-gradient-to-r from-[#e78a53] to-[#f4a574] bg-clip-text text-transparent">
              close deals
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-lg text-white/50 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Real projects. Real results. Every site below was designed, written, and shipped by PIXECELATE. Scroll through and see the work live.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex justify-center gap-12 md:gap-20 mt-14"
          >
            <AnimatedCounter target={250} label="Websites launched" />
            <AnimatedCounter target={18} label="Industries served" />
            <AnimatedCounter target={98} label="Client satisfaction" />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px w-full max-w-5xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/15 to-transparent blur-sm" />
      </div>

      {/* ── Projects grid ── */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col gap-10">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px w-full max-w-5xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/20 to-transparent" />
      </div>

      {/* ── Bottom CTA ── */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
          >
            Your site could be next
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/40 mt-4 text-lg"
          >
            Let us build something your audience cannot ignore.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-b from-[#e78a53] to-[#d4773f] text-black font-semibold text-sm shadow-[0_0_20px_rgba(231,138,83,0.25)] hover:shadow-[0_0_35px_rgba(231,138,83,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              Start your project with PIXECELATE
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer bar */}
      <div className="relative z-10 border-t border-white/5 py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <span>PIXECELATE</span>
          <span>Websites that close deals</span>
        </div>
      </div>
    </div>
  )
}
