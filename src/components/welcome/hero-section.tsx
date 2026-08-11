import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/common/language-provider"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <BackgroundGradient />
      
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <Badge />
          <Title />
          <Description />
          <CTAButtons />
        </div>
      </div>
    </section>
  )
}

function BackgroundGradient() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
    </div>
  )
}

function Badge() {
  const { t } = useLanguage()
  
  return (
    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
      <Sparkles className="h-4 w-4 text-accent" />
      {t("hero.badge")}
    </p>
  )
}

function Title() {
  const { t } = useLanguage()
  
  return (
    <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
      {t("hero.title1")}
      <br />
      <span className="text-accent">{t("hero.title2")}</span>
      {t("hero.title3")}
    </h1>
  )
}

function Description() {
  const { t } = useLanguage()
  
  return (
    <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
      {t("hero.description")}
    </p>
  )
}

function CTAButtons() {
  const { t } = useLanguage()
  
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button size="lg" asChild className="w-full sm:w-auto">
        <Link href="/dashboard">
          {t("hero.cta")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        asChild 
        className="w-full sm:w-auto bg-transparent"
      >
        <Link href="/login">{t("hero.loginCta")}</Link>
      </Button>
    </div>
  )
}
