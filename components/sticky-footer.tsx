"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function StickyFooter() {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const isNearBottom = scrollTop + windowHeight >= documentHeight - 100

          setIsAtBottom(isNearBottom)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isAtBottom && (
        <motion.div
          className="fixed z-50 bottom-0 left-0 w-full h-80 flex justify-center items-center"
          style={{ backgroundColor: "#e78a53" }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top edge glow */}
          <div className="absolute inset-x-0 -top-8 h-8 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(231,138,83,0.3), transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div
            className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12"
            style={{ color: "#121113" }}
          >
            {/* Noise texture */}
            <div className="absolute inset-0 noise-overlay opacity-[0.04]" />
            <motion.div
              className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ul className="space-y-2">
                <li
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: "#121113" }}
                  onMouseEnter={(e) => (e.target.style.color = "rgba(18, 17, 19, 0.8)")}
                  onMouseLeave={(e) => (e.target.style.color = "#121113")}
                >
                  Home
                </li>
                <li
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: "#121113" }}
                  onMouseEnter={(e) => (e.target.style.color = "rgba(18, 17, 19, 0.8)")}
                  onMouseLeave={(e) => (e.target.style.color = "#121113")}
                >
                  Services
                </li>
                <li
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: "#121113" }}
                  onMouseEnter={(e) => (e.target.style.color = "rgba(18, 17, 19, 0.8)")}
                  onMouseLeave={(e) => (e.target.style.color = "#121113")}
                >
                  Work
                </li>
              </ul>
              <ul className="space-y-2">
                <li
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: "#121113" }}
                  onMouseEnter={(e) => (e.target.style.color = "rgba(18, 17, 19, 0.8)")}
                  onMouseLeave={(e) => (e.target.style.color = "#121113")}
                >
                  Contact
                </li>
              </ul>
            </motion.div>
            <motion.h2
              className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] font-bold select-none"
              style={{ color: "#121113" }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              PIXECELATE
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
