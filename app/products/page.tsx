"use client"

import { useState } from "react"
import { ProductListing } from "@/components/products/product-listing"
import { ProductFilters } from "@/components/products/product-filters"

export default function ProductsPage() {
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState("popularity")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Bharatiya Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="col-span-1">
          <ProductFilters onFiltersChange={setFilters} />
        </aside>
        <main className="col-span-1 md:col-span-3">
          <ProductListing filters={filters} sortBy={sortBy} onSortChange={setSortBy} />
        </main>
      </div>
    </div>
  )
}
