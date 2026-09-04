"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSellerLang } from "@/lib/seller-language"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Package, ShoppingBag, Wallet, Plus } from "lucide-react"

export default function SellerPage() {
  const { t } = useSellerLang()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simple check - in real app use Supabase session
    const seller = localStorage.getItem("seller_data")
    setIsLoggedIn(!!seller)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center py-20">{t("loading")}</div>
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-10 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{t("loginTitle")}</h2>
          <p className="text-muted-foreground">Local shopkeepers ke liye simple portal</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <Link href="/seller/login">
              <Button className="w-full h-12 text-base bg-[#FF6B00] hover:bg-[#E65C00]">
                {t("login")}
              </Button>
            </Link>
            <Link href="/seller/signup">
              <Button variant="outline" className="w-full h-12 text-base">
                {t("signup")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t("dashboard")}</h2>

      <div className="grid grid-cols-1 gap-4">
        <Link href="/seller/orders">
          <Card className="hover:shadow-md transition">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-[#FF6B00]" />
              </div>
              <div>
                <p className="font-semibold text-lg">{t("todayOrders")}</p>
                <p className="text-sm text-muted-foreground">Dekho aaj ke orders</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/seller/products">
          <Card className="hover:shadow-md transition">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-lg">{t("yourProducts")}</p>
                <p className="text-sm text-muted-foreground">Apna maal manage karo</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/seller/earnings">
          <Card className="hover:shadow-md transition">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-lg">{t("earnings")}</p>
                <p className="text-sm text-muted-foreground">Hisab-kitab</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Link href="/seller/products/add">
        <Button className="w-full h-14 text-lg bg-[#FF6B00] hover:bg-[#E65C00] mt-4">
          <Plus className="h-5 w-5 mr-2" />
          {t("addProduct")}
        </Button>
      </Link>
    </div>
  )
}
