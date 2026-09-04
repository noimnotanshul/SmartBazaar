"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-md">
      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Order placed!</h1>
      <p className="text-muted-foreground mb-6">
        Your order has been sent to the seller. You'll pay cash on delivery.
      </p>
      <Button onClick={() => router.push("/products")} className="w-full">
        Continue Shopping
      </Button>
    </div>
  )
}
