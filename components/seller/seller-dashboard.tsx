"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function SellerDashboard() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/seller")
  }, [router])
  return <div className="p-10 text-center">Redirecting...</div>
}
