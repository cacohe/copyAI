"use client"

import { useEffect, useState } from "react"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/common/language-provider"


export function LanguageToggle() {
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by rendering a placeholder with fixed dimensions
  if (!mounted) {
    return (
      <div className="h-9 w-9" />
    )
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("zh")} className="gap-2">
          <span>中</span>
          {t("language.zh")}
          {language === "zh" && <span className="ml-auto text-accent">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")} className="gap-2">
          <span>En</span>
          {t("language.en")}
          {language === "en" && <span className="ml-auto text-accent">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
