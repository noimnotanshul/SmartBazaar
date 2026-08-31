import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User, CartItem, Cart } from "./types"

interface AuthStore {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateItem: (productId: string, item: Partial<CartItem>) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface UIStore {
  isDarkMode: boolean
  toggleDarkMode: () => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))

export const useCartStore = create<CartStore>(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.product_id === item.product_id
          )
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product_id !== productId),
        })),
      updateItem: (productId, updates) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product_id === productId ? { ...i, ...updates } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => {
          const price = item.bargained_price || item.price
          return sum + price * item.quantity
        }, 0)
      },
    }),
    {
      name: "cart-storage",
    }
  )
)

export const useUIStore = create<UIStore>(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
    }),
    {
      name: "ui-storage",
    }
  )
)
