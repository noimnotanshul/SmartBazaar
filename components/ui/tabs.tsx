import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full", className)}
      data-default-value={defaultValue}
      {...props}
    />
  )
)
Tabs.displayName = "Tabs"

export function TabsList(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
      {...props}
    />
  )
}

export function TabsTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
      {...props}
    />
  )
}

export function TabsContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      {...props}
    />
  )
}
