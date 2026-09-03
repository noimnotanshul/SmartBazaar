"use client"

import { useState, useRef, useEffect } from "react"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { processUserOffer, calculateFloorPrice } from "@/lib/ai-bargaining"
import { useCartStore } from "@/lib/store"
import { MessageCircle, X, Send } from "lucide-react"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"

export function BargainChat({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const [offer, setOffer] = useState("")
  const [chatLog, setChatLog] = useState([
    {
      role: "assistant",
      content: `Namaste ji 🙏 Main hoon Bhaiya Ji. Aap \( {product.name} dekh rahe hain. Iska price ₹ \){product.price} hai. Kya aap isme bargain karna chahte hain?`,
    },
  ])
  const [loading, setLoading] = useState(false)
  const [dealDone, setDealDone] = useState(false)
  const [finalPrice, setFinalPrice] = useState<number | null>(null)
  const { addItem } = useCartStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatLog, loading])

  const handleBargain = async () => {
    if (!offer || dealDone) return

    const userOffer = parseInt(offer)
    if (isNaN(userOffer) || userOffer <= 0) {
      toast.error("Sahi price daaliye")
      return
    }

    setChatLog((prev) => [...prev, { role: "user", content: `Mera offer: ₹${userOffer}` }])
    setOffer("")
    setLoading(true)

    // Thoda delay (typing effect)
    await new Promise((r) => setTimeout(r, 1000))

    const floor = calculateFloorPrice(product.price)
    const response = processUserOffer(userOffer, product.price, floor)

    setChatLog((prev) => [...prev, { role: "assistant", content: response.message }])

    if (response.accepted && response.newPrice) {
      setDealDone(true)
      setFinalPrice(response.newPrice)

      addItem({
        product_id: product.id,
        quantity: 1,
        price: product.price,
        bargained_price: response.newPrice,
      })

      toast.success(`Deal lock! ${formatCurrency(response.newPrice)}`)
    }

    setLoading(false)
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-full h-12 border-2 border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933] hover:text-white font-semibold"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="h-5 w-5 mr-2" />
        Bargain with Bhaiya Ji
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50">
          <div className="bg-background w-full sm:max-w-md sm:rounded-2xl shadow-2xl flex flex-col h-[85vh] sm:h-[600px]">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF9933] to-[#FF6B00] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                  🙏
                </div>
                <div>
                  <p className="font-semibold">Bhaiya Ji</p>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatLog.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-[#FF9933] text-white"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-3 rounded-2xl text-sm">
                    Bhaiya Ji typing...
                  </div>
                </div>
              )}

              {dealDone && finalPrice && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-sm text-green-700 mb-1">Deal Confirmed!</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(finalPrice)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Cart mein add ho gaya</p>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {!dealDone && (
              <div className="p-3 border-t flex gap-2">
                <Input
                  type="number"
                  placeholder="Apna offer likhiye (₹)"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleBargain()
                  }}
                  className="h-11"
                  disabled={loading}
                />
                <Button
                  onClick={handleBargain}
                  disabled={!offer || loading}
                  className="h-11 px-4 bg-[#FF9933] hover:bg-[#E67E00]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
