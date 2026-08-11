"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/common/language-provider"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme, resolvedTheme } = useTheme()
  const { t } = useLanguage()

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
          {resolvedTheme === "dark" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
          <Sun className="h-4 w-4" />
          {t("theme.light")}
          {theme === "light" && <span className="ml-auto text-accent">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
          <Moon className="h-4 w-4" />
          {t("theme.dark")}
          {theme === "dark" && <span className="ml-auto text-accent">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2">
          <Monitor className="h-4 w-4" />
          {t("theme.system")}
          {theme === "system" && <span className="ml-auto text-accent">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
