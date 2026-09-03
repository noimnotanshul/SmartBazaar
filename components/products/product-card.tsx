"use client"

import Link from "next/link"
import Image from "next/image"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { toast } from "sonner"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const discount = calculateDiscount(product.mrp, product.price)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      product_id: product.id,
      quantity: 1,
      price: product.price,
    })
    toast.success("Added to cart!")
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white dark:bg-zinc-900 rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-[3/4] bg-muted overflow-hidden">
          <Image
            src={product.images?.[0] || `https://picsum.photos/seed/${product.id}/400/500`}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-[#388E3C] text-white text-xs font-bold px-2 py-1 rounded-md">
              -{discount}%
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toast.success("Added to wishlist")
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-zinc-800/90 rounded-full shadow"
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleAdd}
              className="w-full bg-[#FF9933] hover:bg-[#E67E00] text-white rounded-xl h-10"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-3 md:p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-medium text-sm md:text-base line-clamp-2 mb-2 min-h-[40px]">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating || 4.2}</span>
            <span className="text-xs text-muted-foreground">
              ({product.review_count || 0})
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
            {product.mrp > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.mrp)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
