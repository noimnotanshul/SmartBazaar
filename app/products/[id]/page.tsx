"use client"

import { ProductDetail } from "@/components/products/product-detail"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail productId={productId} />
    </div>
  )
}
