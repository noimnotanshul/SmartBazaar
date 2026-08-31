"use client"

import Link from "next/link"
import Image from "next/image"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { Heart, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/store"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const discount = calculateDiscount(product.mrp, product.price)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48 bg-muted">
        <Image
          src={product.images[0] || "https://picsum.photos/200/300"}
          alt={product.name}
          fill
          className="object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-saffron text-white px-2 py-1 rounded text-sm font-bold">
            {discount}% OFF
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-primary mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3">{product.brand}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">
            {formatCurrency(product.mrp)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.review_count})</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              addItem({
                product_id: product.id,
                quantity: 1,
                price: product.price,
              })
            }
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
