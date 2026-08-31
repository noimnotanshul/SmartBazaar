export type UserRole = "customer" | "seller" | "admin"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  coins: number
  referral_code: string
  role: UserRole
  avatar_url?: string
  created_at: string
}

export interface Product {
  id: string
  seller_id: string
  name: string
  description: string
  category: string
  brand: string
  mrp: number
  price: number
  floor_price: number
  images: string[]
  sizes: string[]
  colors: string[]
  stock: number
  rating: number
  review_count: number
  approved: boolean
  created_at: string
}

export interface CartItem {
  product_id: string
  quantity: number
  price: number
  selected_size?: string
  selected_color?: string
  bargained_price?: number
}

export interface Cart {
  id: string
  user_id: string
  items: CartItem[]
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  items: OrderItem[]
  total: number
  address: Address
  payment_method: "upi" | "card" | "cod"
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  created_at: string
}

export interface OrderItem {
  product_id: string
  quantity: number
  price_paid: number
  final_price?: number
}

export interface Address {
  id?: string
  user_id?: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  phone: string
  is_default?: boolean
}

export interface BargainChat {
  id: string
  user_id: string
  product_id: string
  chat_log: ChatMessage[]
  final_price: number
  original_price: number
  status: "active" | "accepted" | "rejected"
  created_at: string
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
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
  created_at: string
  share_link: string
}

export interface PriceAlert {
  id: string
  user_id: string
  product_id: string
  threshold_price: number
  notified: boolean
  created_at: string
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
}

export interface SellerProfile {
  id: string
  user_id: string
  store_name: string
  phone: string
  address: string
  verified: boolean
  rating: number
  total_sales: number
  created_at: string
}

export interface CoinTransaction {
  id: string
  user_id: string
  amount: number
  reason: "purchase" | "referral" | "bargain_win" | "daily_login" | "scratch_card"
  product_id?: string
  created_at: string
}

export interface LiveStream {
  id: string
  title: string
  description: string
  youtube_url: string
  status: "upcoming" | "live" | "ended"
  start_time: string
  end_time?: string
  host_id: string
  products: string[]
  created_at: string
}
