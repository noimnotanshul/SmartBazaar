"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuthStore, useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, ShoppingCart, User, Menu, X, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [search, setSearch] = useState("")
  const { user } = useAuthStore()
  const { getTotalItems } = useCartStore()

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      <div className="bg-gradient-to-r from-[#FF9933] via-[#FF8C00] to-[#FF6B00] text-white">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center gap-3">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <ShoppingBag className="h-7 w-7" />
              <span className="text-xl font-bold tracking-tight hidden sm:inline">
                SmartBazaar
              </span>
            </Link>

            <div className="flex-1 max-w-xl mx-2 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for products, brands and more..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 rounded-full border-0 bg-white/95 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 ml-auto">
              <ThemeToggle />

              <Link href="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {user ? (
                <Link href="/profile" className="p-2 hover:bg-white/10 rounded-full transition">
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <Link href="/auth/login">
                  <Button
                    size="sm"
                    className="bg-white text-[#FF6B00] hover:bg-white/90 font-semibold rounded-full px-4"
                  >
                    Login
                  </Button>
                </Link>
              )}

              <button
                className="md:hidden p-2 hover:bg-white/10 rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border-b">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex items-center gap-6 h-11 text-sm font-medium">
            <Link href="/products" className="hover:text-[#FF9933] transition">Shop</Link>
            <Link href="/live-shopping" className="hover:text-[#FF9933] transition">Live</Link>
            <Link href="/group-buy" className="hover:text-[#FF9933] transition">Group Buy</Link>
            <Link href="/try-on" className="hover:text-[#FF9933] transition">Try On</Link>
            <Link href="/seller/dashboard" className="hover:text-[#FF9933] transition">Sell</Link>
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-b p-4 space-y-3">
          <Link href="/products" className="block py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          <Link href="/live-shopping" className="block py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Live Shopping</Link>
          <Link href="/group-buy" className="block py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Group Buy</Link>
          <Link href="/try-on" className="block py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Try On</Link>
          <Link href="/seller/dashboard" className="block py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Sell</Link>
        </div>
      )}
    </header>
  )
}
