"use client"

import Link from "next/link"
import { Sparkles, LogOut, Settings, User, Mail } from "lucide-react"
import { useUser, useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { LanguageToggle } from "@/components/common/language-toggle"
import { useLanguage } from "@/components/common/language-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dashboard 页面头部
export function DashboardHeader() {
  const { t } = useLanguage()
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6">
      <Link href="/" className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-accent" />
        <span className="text-lg font-semibold">{t("app.name")}</span>
      </Link>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.fullName || user?.primaryEmailAddress?.emailAddress || t("user.profile")}
                </p>
                <p className="text-xs leading-none text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {user?.primaryEmailAddress?.emailAddress || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <Settings className="h-4 w-4" />
              {t("user.settings")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ redirectUrl: "/login" })}
              className="gap-2 text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              {t("user.signOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
