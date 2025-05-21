"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Calculator, Home, Info, Mail, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  // Close sidebar on navigation for mobile
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, setIsOpen])

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link href="/" className="flex items-center space-x-2" onClick={handleNavClick}>
              <Calculator className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">GPA & CGPA</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="lg:hidden">
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/#"
              onClick={handleNavClick}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>{t.sidebar.home}</span>
            </Link>
            <Link
              href="/#gpa-calculator"
              onClick={handleNavClick}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Calculator className="h-5 w-5" />
              <span>{t.sidebar.gpaCalculator}</span>
            </Link>
            <Link
              href="/#cgpa-calculator"
              onClick={handleNavClick}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Calculator className="h-5 w-5" />
              <span>{t.sidebar.cgpaCalculator}</span>
            </Link>
            <Link
              href="/#about"
              onClick={handleNavClick}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Info className="h-5 w-5" />
              <span>{t.sidebar.about}</span>
            </Link>
            <Link
              href="/#contact"
              onClick={handleNavClick}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>{t.sidebar.contact}</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t.sidebar.theme}</span>
              <div className="flex space-x-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setTheme("light")}
                  className="h-8 w-8"
                >
                  <Sun className="h-4 w-4" />
                  <span className="sr-only">Light mode</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setTheme("dark")}
                  className="h-8 w-8"
                >
                  <Moon className="h-4 w-4" />
                  <span className="sr-only">Dark mode</span>
                </Button>
                <Button
                  variant={theme === "engineer" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setTheme("engineer")}
                  className="h-8 w-8 bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                >
                  <Calculator className="h-4 w-4" />
                  <span className="sr-only">Engineer theme</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t.sidebar.language}</span>
              <div className="flex space-x-2">
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("en")}
                  className="h-8"
                >
                  EN
                </Button>
                <Button
                  variant={language === "hi" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("hi")}
                  className="h-8"
                >
                  HI
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
