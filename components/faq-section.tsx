"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "What is PIXECELATE exactly?",
      answer:
        "PIXECELATE is a website development studio. We handle strategy, design, copy, and engineering to launch conversion-focused sites for businesses and ambitious individuals.",
    },
    {
      question: "Who do you build for?",
      answer:
        "Founders, small teams, and established brands that need marketing sites, product pages, or personal brands that actually close deals—without hiring a full in-house crew.",
    },
    {
      question: "Do you handle design, copy, and development?",
      answer:
        "Yes. We run the full stack: brand-aligned design, persuasive copywriting, clean code, analytics, and launch support. You stay in approvals and strategy; we ship the work.",
    },
    {
      question: "How fast can we launch?",
      answer:
        "Single-page launches ship in days. Full sites land in a few weeks. We timebox milestones, share previews early, and keep the calendar clear so you can plan campaigns with confidence.",
    },
    {
      question: "Will my site be fast, secure, and accessible?",
      answer:
        "Every build ships performance-tuned, responsive, accessible, and production-tested. We handle SEO basics, tracking, and best practices so nothing slows down your results.",
    },
  ]

  return (
    <section id="faq" className="relative overflow-hidden pb-120 pt-24">
      {/* Background blur effects */}
      <div className="bg-primary/20 absolute top-1/2 -right-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>
      <div className="bg-primary/20 absolute top-1/2 -left-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>

      {/* Extra ambient glow behind FAQ cards */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full z-[-1] animate-breathe pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(231,138,83,0.04) 0%, transparent 60%)" }}
      />

      {/* Floating particles */}
      <div className="absolute top-[30%] right-[15%] w-1 h-1 rounded-full bg-[#e78a53]/30 animate-twinkle pointer-events-none" />
      <div className="absolute top-[50%] left-[10%] w-1.5 h-1.5 rounded-full bg-white/15 animate-twinkle pointer-events-none" style={{ animationDelay: "1.2s" }} />
      <div className="absolute bottom-[20%] right-[25%] w-1 h-1 rounded-full bg-[#e78a53]/25 animate-twinkle pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="z-10 container mx-auto px-4">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="border-primary/40 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 uppercase">
            <span>✶</span>
            <span className="text-sm">Faqs</span>
          </div>
        </motion.div>

        <motion.h2
          className="mx-auto mt-6 max-w-xl text-center text-4xl font-medium md:text-[54px] md:leading-[60px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Questions? We've got{" "}
          <span className="bg-gradient-to-b from-foreground via-rose-200 to-primary bg-clip-text text-transparent">
            answers
          </span>
        </motion.h2>

        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="from-secondary/40 to-secondary/10 rounded-2xl border border-white/10 bg-gradient-to-b p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-all duration-300 hover:border-[#e78a53]/30 hover:shadow-[0_0_25px_rgba(231,138,83,0.08)] cursor-pointer relative overflow-hidden group/faq"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleItem(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleItem(index)
                }
              }}
              {...(index === faqs.length - 1 && { "data-faq": faq.question })}
            >
              {/* Top edge glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e78a53]/0 to-transparent group-hover/faq:via-[#e78a53]/40 transition-all duration-500" />
              <div className="flex items-start justify-between">
                <h3 className="m-0 font-medium pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className=""
                >
                  {openItems.includes(index) ? (
                    <Minus className="text-primary flex-shrink-0 transition duration-300" size={24} />
                  ) : (
                    <Plus className="text-primary flex-shrink-0 transition duration-300" size={24} />
                  )}
                </motion.div>
              </div>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    className="mt-4 text-muted-foreground leading-relaxed overflow-hidden"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
