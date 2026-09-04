"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Store, Phone, Lock } from "lucide-react"

export default function SellerLoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("")

    if (!phone.trim() || !password) {
      setError("Please enter phone and password")
      return
    }

    setLoading(true)

    try {
      const pseudoEmail = `${phone.trim()}@smartbazaar.seller`

      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: pseudoEmail,
        password,
      })

      if (loginError) {
        setError("Invalid phone or password")
        setLoading(false)
        return
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("is_seller")
          .eq("id", data.user.id)
          .single()

        if (!profile?.is_seller) {
          setError("This account is not registered as a seller")
          await supabase.auth.signOut()
          setLoading(false)
          return
        }
      }

      router.push("/seller/dashboard")
    } catch (err) {
      console.error("Seller login error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-10 max-w-md mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-5">
        <Store className="h-7 w-7 text-white" />
      </div>
      <h1 className="text-2xl font-bold mb-1">Seller Login</h1>
      <p className="text-sm text-muted-foreground mb-7">Welcome back to SmartBazaar</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2 border rounded-xl px-3 py-1">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Phone number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-2 border rounded-xl px-3 py-1">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>
      </div>

      <Button
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full py-6 text-base font-semibold"
      >
        {loading ? "Logging in..." : "Log in"}
      </Button>

      <p className="text-center text-xs text-muted-foreground mt-4">
        New shop?{" "}
        <a href="/seller/signup" className="text-primary font-medium">
          Create an account
        </a>
      </p>
    </div>
  )
}
