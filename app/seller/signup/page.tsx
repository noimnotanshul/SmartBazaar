"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSellerLang } from "@/lib/seller-language"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { toast } from "sonner"

export default function SellerSignupPage() {
  const { t } = useSellerLang()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    shopName: "",
    phone: "",
    city: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.shopName || !form.phone || !form.city || !form.password) {
      toast.error("Saari fields bharo")
      return
    }

    setLoading(true)
    try {
      // Simple local storage for now (later connect Supabase)
      const sellerData = {
        id: "seller_" + Date.now(),
        ...form,
        role: "seller",
      }
      localStorage.setItem("seller_data", JSON.stringify(sellerData))
      toast.success("Account ban gaya!")
      router.push("/seller")
    } catch (err) {
      toast.error("Kuch galat ho gaya")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">{t("signupTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">{t("shopName")}</label>
              <Input
                value={form.shopName}
                onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                placeholder="Jaise: Ram Kirana Store"
                className="h-12 text-base"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t("phone")}</label>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="98XXXXXXXX"
                className="h-12 text-base"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t("city")}</label>
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Jaipur / Sector 15"
                className="h-12 text-base"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t("password")}</label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="h-12 text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base bg-[#FF6B00] hover:bg-[#E65C00]"
            >
              {loading ? t("loading") : t("signup")}
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/seller/login" className="text-[#FF6B00] font-medium">
              {t("login")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
