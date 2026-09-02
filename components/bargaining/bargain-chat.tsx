"use client"

import { useState } from "react"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { processUserOffer, calculateFloorPrice, extractOfferFromText } from "@/lib/ai-bargaining"
import { MessageCircle, CheckCircle } from "lucide-react"

export function BargainChat({
  product,
  onPriceAgreed,
}: {
  product: Product
  onPriceAgreed?: (price: number) => void
}) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatLog, setChatLog] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: `Namaskar! 🙏 Main hoon Bhaiya Ji. Is ${product.name} ka listed price ₹${product.price} hai (MRP ₹${product.mrp}). Aap apna offer bataiye, milkar deal karte hain!`,
    },
  ])
  const [loading, setLoading] = useState(false)
  const [agreedPrice, setAgreedPrice] = useState<number | null>(null)

  const handleBargain = async () => {
    if (!message.trim() || agreedPrice !== null) return

    const userOffer = extractOfferFromText(message)

    if (userOffer === null) {
      setChatLog((prev) => [
        ...prev,
        { role: "user", content: message },
        {
          role: "assistant",
          content: `Maaf kijiye, mujhe aapka offer wala amount samajh nahi aaya. Kripya ek number ke sath bataiye, jaise "800 mein de do".`,
        },
      ])
      setMessage("")
      return
    }

    const floorPrice = calculateFloorPrice(product.price)

    setChatLog((prev) => [...prev, { role: "user", content: message }])
    setMessage("")
    setLoading(true)

    try {
      const response = processUserOffer(userOffer, product.price, floorPrice)

      setChatLog((prev) => [
        ...prev,
        { role: "assistant", content: response.message },
      ])

      if (response.accepted && response.newPrice) {
        setAgreedPrice(response.newPrice)
        onPriceAgreed?.(response.newPrice)
      }
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
            {agreedPrice !== null && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-700 dark:text-green-400">
                  Deal fix ho gaya! Final price: ₹{agreedPrice}
                </span>
              </div>
            )}

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

            {agreedPrice === null ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Apna offer likhiye, jaise: 800 mein de do"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleBargain()
                  }}
                  disabled={loading}
                />
                <Button
                  onClick={handleBargain}
                  disabled={!message.trim() || loading}
                  className="w-full"
                >
                  {loading ? "Bargaining..." : "Send Offer"}
                </Button>
              </div>
            ) : (
              <p className="text-sm text-center text-muted-foreground">
                Deal ho chuki hai! Ab "Add to Cart" par is final price ke sath order kar sakte hain.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
