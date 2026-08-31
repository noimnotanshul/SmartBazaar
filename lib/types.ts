export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar_url?: string
  coins: number
  referral_code: string
  role: "customer" | "seller" | "admin"
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  seller_id: string
  name: string
  description?: string
  category: string
  brand?: string
  mrp: number
  price: number
  floor_price: number
  images: string[]
  sizes?: string[]
  colors?: string[]
  stock: number
  rating: number
  review_count: number
  approved: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  product_id: string
  quantity: number
  price: number
  bargained_price?: number
  selected_size?: string
  selected_color?: string
}

export interface Order {
  id: string
  user_id: string
  items: any[]
  total: number
  address: any
  payment_method: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment?: string
  created_at: string
}

export interface Bargain {
  id: string
  user_id: string
  product_id: string
  chat_log: Array<{ role: string; content: string }>
  final_price?: number
  original_price: number
  status: "active" | "accepted" | "rejected"
  created_at: string
}

export interface GroupBuy {
  id: string
  product_id: string
  initiator_user_id: string
  target_count: number
  joined_users: string[]
  discount_percent: number
  expires_at: string
  status: "active" | "completed" | "expired"
  share_link: string
  created_at: string
}
