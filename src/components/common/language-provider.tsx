"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import {
  messages,
  type Language,
  type TranslateFn,
  type TranslationKey,
} from "@/messages"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslateFn
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = "language"

function isLanguage(value: string): value is Language {
  return value === "zh" || value === "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh")

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && isLanguage(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  const t: TranslateFn = (key: TranslationKey) => messages[language][key]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
