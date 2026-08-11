import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/common/language-provider"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="border-t border-border bg-card/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
          {t("cta.title")}
        </h2>
        {/* <p className="mt-4 text-muted-foreground">
          {t("cta.description")}
        </p> */}
        <Button size="lg" asChild className="mt-8">
          <Link href="/dashboard">
            {t("cta.button")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
