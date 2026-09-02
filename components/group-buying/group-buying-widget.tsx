"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { generateShareLink } from "@/lib/utils"
import { Users } from "lucide-react"

export function GroupBuyingWidget({ product }: { product: Product }) {
  const [groupBuys, setGroupBuys] = useState<any[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchGroupBuys = async () => {
      try {
        const { data } = await supabase
          .from("group_buys")
          .select("*")
          .eq("product_id", product.id)
          .eq("status", "active")

        setGroupBuys(data || [])
      } catch (error) {
        console.error("Error fetching group buys:", error)
      }
    }

    fetchGroupBuys()
  }, [product.id])

  const handleCreateGroupBuy = async () => {
    setLoading(true)
    try {
      const shareCode = Math.random().toString(36).substring(7)
      const { data } = await supabase.from("group_buys").insert({
        product_id: product.id,
        initiator_user_id: "current-user-id", // Replace with actual user
        target_count: 4,
        joined_users: ["current-user-id"],
        discount_percent: 15,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "active",
        share_link: generateShareLink(shareCode),
      })
      setGroupBuys([...(groupBuys || []), data])
      setShowCreate(false)
    } catch (error) {
      console.error("Error creating group buy:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Group Buying
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {groupBuys && groupBuys.length > 0 ? (
          <div className="space-y-2">
            {groupBuys.map((gb) => (
              <div
                key={gb.id}
                className="p-3 bg-muted rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {gb.joined_users.length}/{gb.target_count} members
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {gb.discount_percent}% discount
                  </p>
                </div>
                <Button size="sm">Join</Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No active group buys. Start one!
          </p>
        )}

        {showCreate ? (
          <div className="space-y-2">
            <Input placeholder="Target number of buyers" type="number" />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleCreateGroupBuy}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Creating..." : "Create Group Buy"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => setShowCreate(true)}
          >
            Start Group Buy
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
