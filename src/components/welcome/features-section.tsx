import { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/common/language-provider"
import { FEATURES_DATA } from '@/lib/constants/welcome'

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = FEATURES_DATA.map((feature) => ({
    icon: feature.icon,
    title: t(feature.titleKey),
    description: t(feature.descriptionKey),
  }))

  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader />
        <FeaturesGrid features={features} />
      </div>
    </section>
  )
}

function SectionHeader() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
        {t("features.title")}
      </h2>
      <p className="mt-4 text-muted-foreground">
        {t("features.description")}
      </p>
    </div>
  )
}

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeaturesGridProps {
  features: Feature[]
}

function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
