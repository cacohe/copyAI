import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useLanguage } from "@/components/common/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <FooterLogo />
          <Copyright />
        </div>
      </div>
    </footer>
  )
}

function FooterLogo() {
  const { t } = useLanguage()

  return (
    <Link href="/" className="flex items-center gap-2">
      <Sparkles className="h-5 w-5 text-accent" />
      <span className="font-semibold">{t("app.name")}</span>
    </Link>
  )
}

function Copyright() {
  const { t } = useLanguage()

  return (
    <p className="text-sm text-muted-foreground">
      {t("footer.rights")}
    </p>
  )
}
