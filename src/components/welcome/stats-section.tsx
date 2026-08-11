import { useLanguage } from "@/components/common/language-provider"
import { STATS_DATA } from '@/lib/constants/welcome'

export function StatsSection() {
  const { t } = useLanguage()
  
  const stats = STATS_DATA.map((stat) => ({
    value: stat.value,
    label: t(stat.labelKey),
  }))

  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  )
}

interface StatCardProps {
  value: string
  label: string
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-card px-6 py-8 text-center">
      <p className="text-3xl font-bold text-accent md:text-4xl">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
