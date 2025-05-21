"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { motion } from "framer-motion"

export function HeroSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)

  // Floating animation for background elements
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createFloatingElement = () => {
      const element = document.createElement("div")
      element.className = "absolute rounded-full opacity-20 bg-primary"

      // Random size between 10px and 50px
      const size = Math.floor(Math.random() * 40) + 10
      element.style.width = `${size}px`
      element.style.height = `${size}px`

      // Random position
      element.style.left = `${Math.random() * 100}%`
      element.style.top = `${Math.random() * 100}%`

      // Animation duration and delay
      const duration = Math.floor(Math.random() * 10) + 10
      const delay = Math.floor(Math.random() * 5)

      element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`

      container.appendChild(element)

      // Remove element after some time to prevent too many elements
      setTimeout(() => {
        if (container.contains(element)) {
          container.removeChild(element)
        }
      }, 30000)
    }

    // Create initial elements
    for (let i = 0; i < 10; i++) {
      createFloatingElement()
    }

    // Add new elements periodically
    const interval = setInterval(createFloatingElement, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-20 md:py-28" ref={containerRef}>
      <div className="relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {t.hero.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">{t.hero.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <a href="#gpa-calculator">
              <Calculator className="mr-2 h-5 w-5" />
              {t.hero.gpaButton}
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#cgpa-calculator">
              {t.hero.cgpaButton}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* CSS for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(20px) translateX(-10px);
          }
        }
      `}</style>
    </section>
  )
}
