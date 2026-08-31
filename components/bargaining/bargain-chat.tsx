"use client"

import { useState } from "react"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { processUserOffer, calculateFloorPrice } from "@/lib/ai-bargaining"
import { MessageCircle } from "lucide-react"

export function BargainChat({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const [offer, setOffer] = useState("")
  const [chatLog, setChatLog] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: `Namaskar! 🙏 Main hoon Bhaiya Ji. Tum is ${product.name} ko bargain karna chahte ho? Dekho, normal price to ₹${product.mrp} hai, par hum dere rahe hain ₹${product.price} mein. Kya yeh price theek hai tumhare liye?`,
    },
  ])
  const [loading, setLoading] = useState(false)

  const handleBargain = async () => {
    if (!offer) return

    const userOffer = parseInt(offer)
    const floorPrice = calculateFloorPrice(product.price)

    setChatLog((prev) => [
      ...prev,
      { role: "user", content: `My offer: ₹${userOffer}` },
    ])
    setOffer("")
    setLoading(true)

    try {
      const response = processUserOffer(
        userOffer,
        product.price,
        floorPrice
      )

      setChatLog((prev) => [
        ...prev,
        { role: "assistant", content: response.message },
      ])
    } catch (error) {
      console.error("Bargaining error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button
        variant="outline"
        className="w-full mb-4"
        onClick={() => setOpen(!open)}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        {open ? "Close Bargain Chat" : "Start Bargaining"}
      </Button>

      {open && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bargain with Bhaiya Ji 🤝</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto mb-4 space-y-3 bg-muted/50 p-4 rounded">
              {chatLog.map((msg, idx) => (
                <div
                  key={idx}
                  className={`text-sm ${
                    msg.role === "user"
                      ? "text-right text-primary"
                      : "text-left text-muted-foreground"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-background border"
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Input
                type="number"
                placeholder={`Enter your offer (min: ₹${Math.round(product.price * 0.7)})`}
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                disabled={loading}
              />
              <Button
                onClick={handleBargain}
                disabled={!offer || loading}
                className="w-full"
              >
                {loading ? "Bargaining..." : "Make Offer"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
