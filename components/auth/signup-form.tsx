"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { toast } from "sonner"

export function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signUp(email, password, name)
      toast.success("Account created! Please login.")
      router.push("/auth/login")
    } catch (err: any) {
      const message = err.message || "Signup failed"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#FF9933] to-[#FF6B00] bg-clip-text text-transparent">
          Create Account
        </CardTitle>
        <p className="text-sm text-muted-foreground">Join SmartBazaar today</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name</label>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <Input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="h-11"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-[#FF9933] to-[#FF6B00] hover:from-[#E67E00] hover:to-[#E65C00] text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#FF9933] font-medium hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
