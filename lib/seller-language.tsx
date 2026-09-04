"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { Lang, translations, TranslationKey } from "./seller-i18n"

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function SellerLanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  useEffect(() => {
    const saved = localStorage.getItem("seller_lang") as Lang
    if (saved === "hi" || saved === "en") {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem("seller_lang", newLang)
  }

  const t = (key: TranslationKey) => {
    return translations[lang][key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useSellerLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useSellerLang must be used inside SellerLanguageProvider")
  return ctx
}
