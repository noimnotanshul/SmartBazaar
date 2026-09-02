"use client"

import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

interface SelectContextType {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextType | undefined>(undefined)

function useSelectContext() {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select")
  }
  return context
}

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = useState(false)

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSelectContext()

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = useSelectContext()
  return <span>{value || placeholder || "Select..."}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const { open } = useSelectContext()

  if (!open) return null

  return (
    <div className="absolute z-50 top-full left-0 right-0 border bg-background rounded-md shadow-md mt-1 max-h-60 overflow-auto">
      {children}
    </div>
  )
}

export function SelectItem({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  const { onValueChange, setOpen } = useSelectContext()

  return (
    <div
      onClick={() => {
        onValueChange(value)
        setOpen(false)
      }}
      className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
    >
      {children}
    </div>
  )
}
