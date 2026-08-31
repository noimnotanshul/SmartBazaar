import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function calculateDiscount(mrp: number, price: number): number {
  if (mrp === 0) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}

export function generateShareLink(code: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}/join/${code}`
}
