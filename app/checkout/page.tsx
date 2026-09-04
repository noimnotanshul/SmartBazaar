"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { User, Phone, MapPin, Truck } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = async () => {
    setError("")

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill your name, phone and address")
      return
    }

    if (items.length === 0) {
      setError("Your cart is empty")
      return
    }

    setLoading(true)

    try {
      for (const item of items) {
        const { data: product } = await supabase
          .from("products")
          .select("id, name, seller_id, stock")
          .eq("id", item.product_id)
          .single()

        if (!product) continue

        const { error: orderError } = await supabase.from("orders").insert({
          seller_id: product.seller_id,
          product_id: item.product_id,
          product_name: product.name,
          quantity: item.quantity,
          price: item.price,
          selected_size: item.selected_size || null,
          selected_color: item.selected_color || null,
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          customer_address: address.trim(),
          payment_method: "COD",
          status: "pending",
        })

        if (orderError) {
          console.error("Order insert error:", orderError)
          continue
        }

        const newStock = Math.max(0, (product.stock || 0) - item.quantity)
        await supabase.from("products").update({ stock: newStock }).eq("id", product.id)
      }

      clearCart()
      router.push("/checkout/success")
    } catch (err) {
      console.error("Checkout error:", err)
      setError("Something went wrong placing your order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <p className="text-lg font-semibold mb-2">Your cart is empty</p>
        <Button onClick={() => router.push("/products")}>Browse Products</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <Card className="mb-4">
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center gap-2 border rounded-xl px-3 py-1">
            <User className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="border-0 focus-visible:ring-0" />
          </div>
          <div className="flex items-center gap-2 border rounded-xl px-3 py-1">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="border-0 focus-visible:ring-0" />
          </div>
          <div className="flex items-center gap-2 border rounded-xl px-3 py-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Full delivery address" value={address} onChange={(e) => setAddress(e.target.value)} className="border-0 focus-visible:ring-0" />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium">
            <Truck className="h-4 w-4" /> Cash on Delivery
          </div>
          <div className="space-y-2 text-sm">
            {items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between">
                <span className="text-muted-foreground">Qty {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-base mt-3 pt-3 border-t">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handlePlaceOrder} disabled={loading} className="w-full py-6 text-base font-semibold">
        {loading ? "Placing order..." : `Place Order (COD) — ₹${total}`}
      </Button>
    </div>
  )
}
