import { enMessages } from './en'
import { zhMessages, type TranslationKey } from './zh'

export type Language = 'zh' | 'en'

export type TranslateFn = (key: TranslationKey) => string

export const messages: Record<Language, Record<TranslationKey, string>> = {
  zh: zhMessages,
  en: enMessages,
}

export type { TranslationKey } from './zh'
