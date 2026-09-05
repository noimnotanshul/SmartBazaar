"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Store,
  Package,
  ClipboardList,
  Wallet,
  Plus,
  Minus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

interface LocalProduct {
  id: string
  name: string
  price: number
  mrp: number
  floor_price: number
  stock: number
  category: string
  images: string[]
}

export default function SellerDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [seller, setSeller] = useState<any>(null)
  const [tab, setTab] = useState<"orders" | "products" | "earnings">("products")
  const [products, setProducts] = useState<LocalProduct[]>([])
  const [addStep, setAddStep] = useState(0)
  const [formError, setFormError] = useState("")
  const [form, setForm] = useState({
    name: "",
    price: "",
    mrp: "",
    floorPrice: "",
    stock: "",
    imageUrl: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem("seller_data")
    if (!saved) {
      router.replace("/seller/login")
      return
    }
    try {
      const data = JSON.parse(saved)
      setSeller(data)
      const savedProducts = localStorage.getItem("seller_products_" + data.phone)
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts))
      }
    } catch {
      router.replace("/seller/login")
      return
    }
    setLoading(false)
  }, [router])

  const saveProducts = (list: LocalProduct[]) => {
    setProducts(list)
    if (seller?.phone) {
      localStorage.setItem("seller_products_" + seller.phone, JSON.stringify(list))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("seller_data")
    router.replace("/seller/login")
  }

  const updateStock = (id: string, delta: number) => {
    const next = products.map((p) =>
      p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
    )
    saveProducts(next)
  }

  const removeProduct = (id: string) => {
    saveProducts(products.filter((p) => p.id !== id))
  }

  const resetAddFlow = () => {
    setForm({ name: "", price: "", mrp: "", floorPrice: "", stock: "", imageUrl: "" })
    setAddStep(0)
    setFormError("")
  }

  const saveProduct = () => {
    setFormError("")
    if (!form.name.trim() || !form.price || !form.stock) {
      setFormError("Name, price aur stock zaroori hain")
      return
    }
    const price = Number(form.price)
    const floor = form.floorPrice ? Number(form.floorPrice) : Math.ceil(price * 0.7)
    const newProduct: LocalProduct = {
      id: "p_" + Date.now(),
      name: form.name.trim(),
      price,
      mrp: form.mrp ? Number(form.mrp) : price,
      floor_price: floor,
      stock: Number(form.stock),
      category: "General",
      images: form.imageUrl
        ? [form.imageUrl]
        : ["https://picsum.photos/seed/" + Date.now() + "/400/400"],
    }
    saveProducts([newProduct, ...products])
    resetAddFlow()
    setTab("products")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  if (!seller) return null

  return (
    <div className="min-h-screen max-w-md mx-auto pb-10 bg-gray-50">
      <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
            <Store className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm">{seller.shopName || "My Shop"}</p>
            <p className="text-[11px] text-muted-foreground">{seller.phone}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>

      <div className="flex px-4 pt-3 gap-2">
        <TabButton active={tab === "orders"} onClick={() => setTab("orders")} icon={<ClipboardList className="h-4 w-4" />} label="Orders" />
        <TabButton
          active={tab === "products"}
          onClick={() => {
            setTab("products")
            setAddStep(0)
          }}
          icon={<Package className="h-4 w-4" />}
          label="Products"
        />
        <TabButton active={tab === "earnings"} onClick={() => setTab("earnings")} icon={<Wallet className="h-4 w-4" />} label="Earnings" />
      </div>

      <div className="px-4 py-4">
        {tab === "orders" && (
          <div className="text-center py-16">
            <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold text-sm mb-1">No orders yet</p>
            <p className="text-xs text-muted-foreground">Orders yahan dikhenge</p>
          </div>
        )}

        {tab === "products" && addStep === 0 && (
          <div className="space-y-3">
            <Button onClick={() => setAddStep(1)} className="w-full bg-[#FF6B00] hover:bg-[#E65C00]">
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </Button>

            {products.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-semibold text-sm mb-1">No products yet</p>
                <p className="text-xs text-muted-foreground">Pehla product add karo</p>
              </div>
            ) : (
              products.map((p) => (
                <div key={p.id} className="rounded-xl border p-4 bg-white">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{p.name}</p>
                      <p className="font-bold text-sm mt-0.5">₹{p.price}</p>
                      <p className="text-[11px] text-muted-foreground">Min: ₹{p.floor_price}</p>
                    </div>
                    <button onClick={() => removeProduct(p.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <span className="text-xs font-medium">
                      Stock: {p.stock === 0 ? <span className="text-red-500">Out</span> : p.stock}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateStock(p.id, -1)} className="w-7 h-7 rounded-full border flex items-center justify-center">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{p.stock}</span>
                      <button onClick={() => updateStock(p.id, 1)} className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "products" && addStep > 0 && (
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-2 mb-5">
              {[1, 2].map((s) => (
                <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= addStep ? "bg-orange-500" : "bg-muted"}`} />
              ))}
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
                {formError}
              </div>
            )}

            {addStep === 1 && (
              <div className="space-y-3">
                <h3 className="font-bold text-base">Photo & Name</h3>
                <Input placeholder="Image URL (optional)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                <Input placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
            )}

            {addStep === 2 && (
              <div className="space-y-3">
                <h3 className="font-bold text-base">Price & Stock</h3>
                <Input placeholder="Selling price ₹" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                <Input placeholder="MRP ₹ (optional)" type="number" value={form.mrp} onChange={(e) => setForm({ ...form, mrp: e.target.value })} />
                <Input placeholder="Min bargain price ₹ (optional)" type="number" value={form.floorPrice} onChange={(e) => setForm({ ...form, floorPrice: e.target.value })} />
                <Input placeholder="Stock quantity" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => (addStep === 1 ? setAddStep(0) : setAddStep(addStep - 1))}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              {addStep < 2 ? (
                <Button className="flex-1 bg-[#FF6B00]" onClick={() => setAddStep(addStep + 1)}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button className="flex-1 bg-[#FF6B00]" onClick={saveProduct}>
                  Save Product
                </Button>
              )}
            </div>
          </div>
        )}

        {tab === "earnings" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border p-4 bg-white">
              <p className="text-xs text-muted-foreground">Total sales</p>
              <p className="text-xl font-bold mt-1">₹0</p>
            </div>
            <div className="rounded-xl border p-4 bg-white">
              <p className="text-xs text-muted-foreground">Commission</p>
              <p className="text-xl font-bold mt-1">₹0</p>
            </div>
            <div className="col-span-2 rounded-xl p-4 bg-green-700 text-white">
              <p className="text-xs opacity-80">Payable to you</p>
              <p className="text-2xl font-bold mt-1">₹0</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 rounded-lg flex flex-col items-center gap-1 text-[11px] font-semibold ${
        active ? "bg-orange-500 text-white" : "bg-white text-foreground border"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
