"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuthStore, useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuthStore()
  const { getTotalItems } = useCartStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-saffron via-india-blue to-india-green bg-clip-text text-transparent">
            SmartBazaar
          </div>
        </Link>

        <nav className="hidden md:flex flex-1 items-center space-x-6">
          <Link href="/products" className="text-sm font-medium hover:text-primary">
            Shop
          </Link>
          <Link href="/live-shopping" className="text-sm font-medium hover:text-primary">
            Live Shopping
          </Link>
          <Link href="/seller/dashboard" className="text-sm font-medium hover:text-primary">
            Sell
          </Link>
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />

          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-saffron text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/auth/login">
              <Button>Sign In</Button>
            </Link>
          )}

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t p-4 space-y-2">
          <Link href="/products" className="block py-2 text-sm">
            Shop
          </Link>
          <Link href="/live-shopping" className="block py-2 text-sm">
            Live Shopping
          </Link>
          <Link href="/seller/dashboard" className="block py-2 text-sm">
            Sell
          </Link>
        </nav>
      )}
    </header>
  )
}
