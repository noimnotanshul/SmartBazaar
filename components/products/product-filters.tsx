"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown } from "lucide-react"

export function ProductFilters({
  onFiltersChange,
}: {
  onFiltersChange: (filters: any) => void
}) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const categories = {
    "Price Range": [
      "₹0 - ₹500",
      "₹500 - ₹1,000",
      "₹1,000 - ₹5,000",
      "₹5,000 - ₹10,000",
      "Above ₹10,000",
    ],
    "Rating": ["4★ & above", "3★ & above", "2★ & above", "1★ & above"],
    "Brand": ["Samsung", "iPhone", "OnePlus", "Xiaomi", "Realme"],
  }

  return (
    <div className="space-y-4">
      {Object.entries(categories).map(([category, items]) => (
        <Card key={category}>
          <CardHeader
            className="pb-3 cursor-pointer"
            onClick={() =>
              setExpandedCategory(
                expandedCategory === category ? null : category
              )
            }
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{category}</CardTitle>
              <ChevronDown
                className={`h-5 w-5 transition ${
                  expandedCategory === category ? "rotate-180" : ""
                }`}
              />
            </div>
          </CardHeader>
          {expandedCategory === category && (
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={item} />
                  <label
                    htmlFor={item}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
