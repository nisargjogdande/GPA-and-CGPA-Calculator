"use client"

import { Menu, Calculator, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { exportToPdf } from "@/lib/pdf-export"

interface NavbarProps {
  toggleSidebar: () => void
}

export function Navbar({ toggleSidebar }: NavbarProps) {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex items-center space-x-2 lg:hidden">
            <Calculator className="h-5 w-5 text-primary" />
            <span className="font-bold">GPA & CGPA</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" asChild>
            <a href="#gpa-calculator">{t.navbar.gpaCalculator}</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#cgpa-calculator">{t.navbar.cgpaCalculator}</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#about">{t.navbar.about}</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#contact">{t.navbar.contact}</a>
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={exportToPdf}>
            <Download className="h-4 w-4 mr-2" />
            {t.navbar.exportPdf}
          </Button>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
