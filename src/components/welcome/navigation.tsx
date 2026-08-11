import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { LanguageToggle } from "@/components/common/language-toggle"
import { useLanguage } from "@/components/common/language-provider"


export function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />
        {/* <NavLinks /> */}
        <NavActions />
      </nav>
    </header>
  )
}

function Logo() {
  const { t } = useLanguage()
  
  return (
    <Link href="/" className="flex items-center gap-2">
      <Sparkles className="h-6 w-6 text-accent" />
      <span className="text-xl font-semibold tracking-tight">
        {t("app.name")}
      </span>
    </Link>
  )
}

// function NavLinks() {
//   const { t } = useLanguage()
  
//   const links = [
//     { href: "#features", label: t("nav.features") },
//     { href: "#pricing", label: t("nav.pricing") },
//     { href: "#about", label: t("nav.about") },
//   ]

//   return (
//     <div className="hidden items-center gap-8 md:flex">
//       {links.map((link) => (
//         <Link
//           key={link.href}
//           href={link.href}
//           className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//         >
//           {link.label}
//         </Link>
//       ))}
//     </div>
//   )
// }

function NavActions() {
  const { t } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <LanguageToggle />
      <ThemeToggle />
      {/* <Button variant="ghost" asChild>
        <Link href="/login">{t("nav.login")}</Link>
      </Button>
      <Button asChild>
        <Link href="/dashboard">{t("nav.freeTrial")}</Link>
      </Button> */}
    </div>
  )
}
