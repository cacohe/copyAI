import { Zap, Target, BarChart3, type LucideIcon } from 'lucide-react'
import type { TranslationKey } from '@/messages'

export const STATS_DATA: ReadonlyArray<{
  value: string
  labelKey: TranslationKey
}> = [
  { value: '10M+', labelKey: 'stats.copies' },
  { value: '50K+', labelKey: 'stats.users' },
  { value: '98%', labelKey: 'stats.satisfaction' },
  { value: '3x', labelKey: 'stats.efficiency' },
]

export const FEATURES_DATA: ReadonlyArray<{
  icon: LucideIcon
  titleKey: TranslationKey
  descriptionKey: TranslationKey
}> = [
  {
    icon: Zap,
    titleKey: 'features.multiPlatform.title',
    descriptionKey: 'features.multiPlatform.description',
  },
  {
    icon: Target,
    titleKey: 'features.targeting.title',
    descriptionKey: 'features.targeting.description',
  },
  {
    icon: BarChart3,
    titleKey: 'features.history.title',
    descriptionKey: 'features.history.description',
  },
]
