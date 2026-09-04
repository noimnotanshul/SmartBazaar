"use client"

import { SellerLanguageProvider } from "@/lib/seller-language"
import { useSellerLang } from "@/lib/seller-language"
import { Button } from "@/components/ui/button"

function LanguageToggle() {
  const { lang, setLang, t } = useSellerLang()

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full font-medium"
      onClick={() => setLang(lang === "en" ? "hi" : "en")}
    >
      {lang === "en" ? t("switchToHindi") : t("switchToEnglish")}
    </Button>
  )
}

function SellerHeader() {
  const { t } = useSellerLang()

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="font-bold text-lg text-[#FF6B00]">{t("appName")}</h1>
        <LanguageToggle />
      </div>
    </header>
  )
}

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SellerLanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <SellerHeader />
        <main className="container mx-auto px-4 py-6 pb-24">{children}</main>
      </div>
    </SellerLanguageProvider>
  )
}
