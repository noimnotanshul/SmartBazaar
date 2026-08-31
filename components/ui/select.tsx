import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Select.displayName = "Select"

export function SelectTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...props} />
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder || "Select..."}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-full left-0 right-0 border bg-background rounded-md shadow-md mt-1">{children}</div>
}

export function SelectItem(props: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return <option {...props} />
}
