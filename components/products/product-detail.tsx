"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { useCartStore } from "@/lib/store"
import { BargainChat } from "@/components/bargaining/bargain-chat"
import Image from "next/image"
import { Star } from "lucide-react"

export function ProductDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const { addItem } = useCartStore()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single()

        setProduct(data)
        if (data?.sizes?.length) setSelectedSize(data.sizes[0])
        if (data?.colors?.length) setSelectedColor(data.colors[0])
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (!product) return <div className="text-center py-8">Product not found</div>

  const discount = calculateDiscount(product.mrp, product.price)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="relative h-96 bg-muted mb-4">
          <Image
            src={product.images[0] || "https://picsum.photos/400/400"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, idx) => (
            <div key={idx} className="relative h-24 bg-muted">
              <Image src={image} alt={`${product.name} ${idx}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-4">{product.brand}</p>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-saffron text-saffron" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">({product.review_count} reviews)</span>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatCurrency(product.mrp)}
                  </span>
                  <span className="text-lg font-bold text-saffron">{discount}% OFF</span>
                </div>
              </div>

              {product.sizes && product.sizes.length > 0 &&
                <div>
                  <p className="text-sm font-medium mb-2">Size</p>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Color</p>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">
                  Stock: {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </p>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() =>
                  addItem({
                    product_id: product.id,
                    quantity: 1,
                    price: product.price,
                    selected_size: selectedSize,
                    selected_color: selectedColor,
                  })
                }
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>

        <BargainChat product={product} />
      </div>
    </div>
  )
}
