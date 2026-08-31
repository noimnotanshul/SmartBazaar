"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"
import { ProductCard } from "@/components/products/product-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ProductListing({
  filters,
  sortBy,
  onSortChange,
}: {
  filters: any
  sortBy: string
  onSortChange: (sort: string) => void
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = supabase
          .from("products")
          .select("*")
          .eq("approved", true)

        // Apply sorting
        switch (sortBy) {
          case "price_low":
            query = query.order("price", { ascending: true })
            break
          case "price_high":
            query = query.order("price", { ascending: false })
            break
          case "rating":
            query = query.order("rating", { ascending: false })
            break
          default:
            query = query.order("created_at", { ascending: false })
        }

        const { data } = await query
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [sortBy])

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} products
        </p>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
