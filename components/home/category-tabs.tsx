"use client"

export function CategoryTabs() {
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Books",
    "Sports",
    "Toys",
  ]

  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-6 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              className="whitespace-nowrap text-sm font-medium hover:text-primary pb-2 border-b-2 border-transparent hover:border-primary transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
