"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>{t.languageToggle.english}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("hi")}>{t.languageToggle.hindi}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
