"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "@/components/home/hero"
import Features from "@/components/features"
import { TestimonialsSection } from "@/components/testimonials"
import { NewReleasePromo } from "@/components/new-release-promo"
import { FAQSection } from "@/components/faq-section"
import { StickyFooter } from "@/components/sticky-footer"
import Link from "next/link"
import logoImg from "../logo.png"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  // Lock scroll during splash
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [showSplash])

  // Auto-dismiss splash after the animation completes
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        const headerOffset = 120 // Account for sticky header height + margin
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* ── Logo Splash Intro ── */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Warm radial glow behind logo */}
            <motion.div
              className="absolute w-[800px] h-[800px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(231,138,83,0.18) 0%, transparent 70%)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1.1], opacity: [0, 0.9, 0.6] }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            {/* Secondary softer ring */}
            <motion.div
              className="absolute w-[900px] h-[900px] rounded-full border border-[#e78a53]/15"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1.1], opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            />
            {/* Logo image */}
            <motion.img
              src={logoImg.src}
              alt="PIXECELATE"
              draggable={false}
              className="relative z-10 w-72 md:w-96 h-auto select-none"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(24px)" }}
              animate={{
                opacity: [0, 1, 1, 1, 0],
                scale: [0.5, 1.05, 1, 1, 1.2],
                filter: ["blur(24px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(16px)"],
              }}
              transition={{ duration: 3.8, times: [0, 0.25, 0.45, 0.75, 1], ease: "easeInOut" }}
            />
            {/* Particle bursts */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#e78a53]/60"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (60 + i * 25)],
                  y: [0, (i < 3 ? -1 : 1) * (40 + i * 15)],
                }}
                transition={{ duration: 1.4, delay: 2.6 + i * 0.1, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pearl Mist Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(231, 138, 83, 0.08), transparent 50%), radial-gradient(ellipse 40% 30% at 80% 20%, rgba(226, 232, 240, 0.06), transparent 50%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(231, 138, 83, 0.05), transparent 50%), #000000",
        }}
      />

      {/* Floating ambient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top-left warm orb */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full animate-float-drift"
          style={{ background: "radial-gradient(circle, rgba(231,138,83,0.08) 0%, transparent 70%)" }}
        />
        {/* Top-right cool orb */}
        <div
          className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full animate-float-drift-reverse"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
        />
        {/* Mid-left pulse ring */}
        <div
          className="absolute top-[35%] -left-20 w-72 h-72 rounded-full border border-[#e78a53]/10 animate-pulse-ring"
        />
        {/* Center breathe glow */}
        <div
          className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full animate-breathe"
          style={{ background: "radial-gradient(circle, rgba(231,138,83,0.04) 0%, transparent 60%)" }}
        />
        {/* Bottom-right orb */}
        <div
          className="absolute bottom-[10%] -right-20 w-80 h-80 rounded-full animate-float-drift"
          style={{ background: "radial-gradient(circle, rgba(231,138,83,0.06) 0%, transparent 70%)", animationDelay: "4s" }}
        />
        {/* Scattered star particles */}
        <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-[#e78a53]/40 animate-twinkle" />
        <div className="absolute top-[40%] right-[20%] w-1.5 h-1.5 rounded-full bg-white/20 animate-twinkle" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[60%] left-[70%] w-1 h-1 rounded-full bg-[#e78a53]/30 animate-twinkle" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[75%] left-[30%] w-1 h-1 rounded-full bg-white/15 animate-twinkle" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-[85%] right-[40%] w-1.5 h-1.5 rounded-full bg-[#e78a53]/25 animate-twinkle" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[15%] right-[35%] w-1 h-1 rounded-full bg-white/20 animate-twinkle" style={{ animationDelay: "2.5s" }} />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-[1] noise-overlay" />

      {/* Desktop Header */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-md border border-border/50 shadow-lg transition-all duration-500 ${
          isScrolled ? "max-w-3xl px-2 shadow-[0_0_20px_rgba(231,138,83,0.08)]" : "max-w-5xl px-4"
        } py-2`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        <a
          className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 ${
            isScrolled ? "ml-4" : ""
          }`}
          href="https://pixecelate.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logoImg.src}
            alt="PIXECELATE logo"
            className="h-9 w-auto object-contain"
            draggable={false}
          />
        </a>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("features")
              if (element) {
                const headerOffset = 120 // Account for sticky header height + margin
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20">Features</span>
          </a>

          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("testimonials")
              if (element) {
                const headerOffset = 120 // Account for sticky header height + margin
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20">Testimonials</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("faq")
              if (element) {
                const headerOffset = 120 // Account for sticky header height + margin
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20">FAQ</span>
          </a>
          <Link
            href="/works"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="relative z-20">Works</span>
          </Link>
        </div>


      </header>

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <a
          className="flex items-center justify-center gap-2"
          href="https://pixecelate.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logoImg.src}
            alt="PIXECELATE logo"
            className="h-8 w-auto object-contain"
            draggable={false}
          />
        </a>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavClick("features")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Features
              </button>
              <button
                onClick={() => handleMobileNavClick("testimonials")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Testimonials
              </button>
              <button
                onClick={() => handleMobileNavClick("faq")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                FAQ
              </button>
              <Link
                href="/works"
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Works
              </Link>

            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero />

      {/* ── Glow divider ── */}
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/20 to-transparent blur-sm" />
      </div>

      {/* Features Section */}
      <div id="features">
        <Features />
      </div>

      {/* ── Glow divider ── */}
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/15 to-transparent blur-md" />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* ── Glow divider ── */}
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/15 to-transparent blur-sm" />
      </div>

      <NewReleasePromo />

      {/* ── Glow divider ── */}
      <div className="relative h-px w-full mt-12">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/10 to-transparent blur-md" />
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* Sticky Footer */}
      <StickyFooter />
    </div>
  )
}
