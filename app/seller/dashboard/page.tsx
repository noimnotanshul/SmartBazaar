"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
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
  Truck,
} from "lucide-react"

interface SellerProduct {
  id: string
  name: string
  price: number
  floor_price: number | null
  stock: number
  category: string | null
  images: string[] | null
}

interface SellerOrder {
  id: string
  product_name: string
  quantity: number
  price: number
  customer_name: string
  customer_phone: string
  customer_address: string
  status: string
  created_at: string
}

const categoryKeywords: Record<string, string[]> = {
  Fashion: ["shirt", "kurta", "saree", "jeans", "dress", "shoes", "sandal"],
  Electronics: ["phone", "charger", "earbuds", "watch", "cable", "speaker"],
  "Home & Kitchen": ["cooker", "mixer", "container", "plate", "bottle"],
  Grocery: ["rice", "atta", "oil", "masala", "dal", "sugar"],
}

function guessCategory(name: string) {
  const lower = name.toLowerCase()
  for (const [cat, words] of Object.entries(categoryKeywords)) {
    if (words.some((w) => lower.includes(w))) return cat
  }
  return "General"
}

export default function SellerDashboardPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [sellerId, setSellerId] = useState("")
  const [shopName, setShopName] = useState("")
  const [tab, setTab] = useState<"orders" | "products" | "earnings">("products")

  const [products, setProducts] = useState<SellerProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  const [orders, setOrders] = useState<SellerOrder[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  const [addStep, setAddStep] = useState(0)
  const [saving, setSaving] = useState(false)
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
    const checkAuthAndLoad = async () => {
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        router.push("/seller/login")
        return
      }

      const { data: profile } = await supabase
        .from("users")
        .select("shop_name, is_seller")
        .eq("id", userData.user.id)
        .single()

      if (!profile?.is_seller) {
        router.push("/seller/login")
        return
      }

      setSellerId(userData.user.id)
      setShopName(profile.shop_name || "Your Shop")
      setCheckingAuth(false)
      fetchProducts(userData.user.id)
      fetchOrders(userData.user.id)
    }

    checkAuthAndLoad()
  }, [router])

  const fetchProducts = async (id: string) => {
    setLoadingProducts(true)
    try {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, floor_price, stock, category, images")
        .eq("seller_id", id)
        .order("created_at", { ascending: false })

      setProducts(data || [])
    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
      setLoadingProducts(false)
    }
  }

  const fetchOrders = async (id: string) => {
    setLoadingOrders(true)
    try {
      const { data } = await supabase
        .from("orders")
        .select("id, product_name, quantity, price, customer_name, customer_phone, customer_address, status, created_at")
        .eq("seller_id", id)
        .order("created_at", { ascending: false })

      setOrders(data || [])
    } catch (err) {
      console.error("Error fetching orders:", err)
    } finally {
      setLoadingOrders(false)
    }
  }

  const markDelivered = async (orderId: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "delivered" } : o)))
    await supabase.from("orders").update({ status: "delivered" }).eq("id", orderId)
  }

  const updateStock = async (id: string, delta: number) => {
    const product = products.find((p) => p.id === id)
    if (!product) return
    const newStock = Math.max(0, product.stock + delta)

    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p)))

    await supabase.from("products").update({ stock: newStock }).eq("id", id)
  }

  const removeProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    await supabase.from("products").delete().eq("id", id)
  }

  const resetAddFlow = () => {
    setForm({ name: "", price: "", mrp: "", floorPrice: "", stock: "", imageUrl: "" })
    setAddStep(0)
    setFormError("")
  }

  const saveProduct = async () => {
    setFormError("")

    if (!form.name.trim() || !form.price || !form.stock) {
      setFormError("Please fill product name, price and stock")
      return
    }

    setSaving(true)

    try {
      const sellingPrice = Number(form.price)
      const floor = form.floorPrice ? Number(form.floorPrice) : Math.ceil(sellingPrice * 0.65)

      const { error } = await supabase.from("products").insert({
        seller_id: sellerId,
        name: form.name.trim(),
        price: sellingPrice,
        mrp: form.mrp ? Number(form.mrp) : sellingPrice,
        floor_price: floor,
        stock: Number(form.stock),
        category: guessCategory(form.name),
        images: form.imageUrl ? [form.imageUrl] : ["https://picsum.photos/400/400"],
        approved: true,
      })

      if (error) {
        setFormError(error.message)
        setSaving(false)
        return
      }

      resetAddFlow()
      setTab("products")
      fetchProducts(sellerId)
    } catch (err) {
      console.error("Error saving product:", err)
      setFormError("Something went wrong. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const weeklyTotal = orders.reduce((sum, o) => sum + o.price * o.quantity, 0)
  const commission = Math.round(weeklyTotal * 0.1)
  const payable = weeklyTotal - commission

  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading...</div>
  }

  return (
    <div className="min-h-screen max-w-md mx-auto pb-10">
      <div className="flex items-center gap-2 px-5 py-4 border-b">
        <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
          <Store className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-sm">{shopName}</span>
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
          <div className="space-y-3">
            {loadingOrders ? (
              <p className="text-center text-sm text-muted-foreground py-8">Loading...</p>
            ) : orders.length === 0 ? (
              <div className="text-center py-16">
                <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-semibold text-sm mb-1">No orders yet</p>
                <p className="text-xs text-muted-foreground">New orders will show up here</p>
              </div>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="rounded-xl border p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-sm">{o.customer_name}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                      <Truck className="h-3 w-3" /> COD
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{o.customer_phone}</p>
                  <p className="text-xs text-muted-foreground mb-2">{o.customer_address}</p>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm">{o.product_name} × {o.quantity}</span>
                    <span className="font-bold text-sm">₹{o.price * o.quantity}</span>
                  </div>
                  {o.status !== "delivered" ? (
                    <Button size="sm" variant="outline" className="w-full mt-3" onClick={() => markDelivered(o.id)}>
                      Mark as Delivered
                    </Button>
                  ) : (
                    <p className="text-xs text-green-600 font-medium mt-3 text-center">Delivered</p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "products" && addStep === 0 && (
          <div className="space-y-3">
            <Button onClick={() => setAddStep(1)} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </Button>

            {loadingProducts ? (
              <p className="text-center text-sm text-muted-foreground py-8">Loading...</p>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-semibold text-sm mb-1">No products yet</p>
                <p className="text-xs text-muted-foreground">Add your first product to start selling</p>
              </div>
            ) : (
              products.map((p) => (
                <div key={p.id} className="rounded-xl border p-4">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                      {p.images?.[0] ? (
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                      <p className="font-bold text-sm mt-0.5">₹{p.price}</p>
                      {p.floor_price && (
                        <p className="text-[11px] text-muted-foreground">Min bargain: ₹{p.floor_price}</p>
                      )}
                    </div>
                    <button onClick={() => removeProduct(p.id)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <span className="text-xs font-medium">
                      Stock: {p.stock === 0 ? <span className="text-red-500">Out of stock</span> : p.stock}
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
          <div>
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
                <h3 className="font-bold text-base mb-1">Photo & Name</h3>
                <Input placeholder="Image URL (optional)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                <Input placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
            )}

            {addStep === 2 && (
              <div className="space-y-3">
                <h3 className="font-bold text-base mb-1">Price & Stock</h3>
                <Input placeholder="Selling price ₹" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                <Input placeholder="MRP ₹ (optional)" type="number" value={form.mrp} onChange={(e) => setForm({ ...form, mrp: e.target.value })} />
                <div>
                  <Input placeholder="Minimum bargaining price ₹ (optional)" type="number" value={form.floorPrice} onChange={(e) => setForm({ ...form, floorPrice: e.target.value })} />
                  <p className="text-[11px] text-muted-foreground mt-1">Customers can't bargain below this. Leave blank to auto-set.</p>
                </div>
                <Input placeholder="Stock quantity" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => (addStep === 1 ? setAddStep(0) : setAddStep(addStep - 1))}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              {addStep < 2 ? (
                <Button className="flex-1" onClick={() => setAddStep(addStep + 1)}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button className="flex-1" onClick={saveProduct} disabled={saving}>
                  {saving ? "Saving..." : "Save Product"}
                </Button>
              )}
            </div>
          </div>
        )}

        {tab === "earnings" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">Total sales</p>
              <p className="text-xl font-bold mt-1">₹{weeklyTotal}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">Commission (10%)</p>
              <p className="text-xl font-bold mt-1">₹{commission}</p>
            </div>
            <div className="col-span-2 rounded-xl p-4 bg-green-700 text-white">
              <p className="text-xs opacity-80">Amount payable to you</p>
              <p className="text-2xl font-bold mt-1">₹{payable}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 rounded-lg flex flex-col items-center gap-1 text-[11px] font-semibold ${
        active ? "bg-orange-500 text-white" : "text-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
