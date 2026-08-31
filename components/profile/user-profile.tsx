"use client"

import { useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signOut } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UserProfile() {
  const { user } = useAuthStore()
  const router = useRouter()

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
        <Button onClick={() => router.push("/auth/login")} size="lg">
          Go to Login
        </Button>
      </div>
    )
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-saffron to-india-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">SmartCoins</p>
              <p className="text-3xl font-bold text-saffron">{user.coins}</p>
            </div>
            <Button
              variant="outline"
              className="w-full mb-2"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No orders yet
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="addresses" className="space-y-4">
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No saved addresses
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Email</p>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Name</p>
                    <p className="text-muted-foreground">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Role</p>
                    <p className="text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
