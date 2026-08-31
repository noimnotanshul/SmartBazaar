"use client"

import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { Trash2 } from "lucide-react"
import Link from "next/link"

export function CartPage() {
  const { items, removeItem, updateItem, getTotalPrice, getTotalItems } =
    useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Add some products to get started!
        </p>
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product_id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold">Product ID: {item.product_id}</p>
                    {item.selected_size && (
                      <p className="text-sm text-muted-foreground">
                        Size: {item.selected_size}
                      </p>
                    )}
                    {item.selected_color && (
                      <p className="text-sm text-muted-foreground">
                        Color: {item.selected_color}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.product_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Quantity:</label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.product_id, {
                          quantity: parseInt(e.target.value),
                        })
                      }
                      className="w-20"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.bargained_price || item.price)} each
                    </p>
                    <p className="text-lg font-bold">
                      {formatCurrency(
                        (item.bargained_price || item.price) * item.quantity
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <aside>
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Items</p>
                <p className="text-2xl font-bold">{getTotalItems()}</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(getTotalPrice())}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full block">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
