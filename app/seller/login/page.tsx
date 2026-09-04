"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSellerLang } from "@/lib/seller-language"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { toast } from "sonner"

export default function SellerLoginPage() {
  const { t } = useSellerLang()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const saved = localStorage.getItem("seller_data")
      if (!saved) {
        toast.error("Pehle signup karo")
        setLoading(false)
        return
      }

      const seller = JSON.parse(saved)
      if (seller.phone === phone && seller.password === password) {
        toast.success("Login successful!")
        router.push("/seller")
      } else {
        toast.error("Phone ya password galat hai")
      }
    } catch {
      toast.error("Error aaya")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">{t("loginTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">{t("phone")}</label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="h-12 text-base"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t("password")}</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base bg-[#FF6B00] hover:bg-[#E65C00]"
            >
              {loading ? t("loading") : t("login")}
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            {t("noAccount")}{" "}
            <Link href="/seller/signup" className="text-[#FF6B00] font-medium">
              {t("signup")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
