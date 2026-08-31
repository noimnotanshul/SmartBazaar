"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Gift, Zap } from "lucide-react"

export function GamificationWidget() {
  const [coins, setCoins] = useState(0)
  const [dailyLoginDone, setDailyLoginDone] = useState(false)

  useEffect(() => {
    // Check if user has already claimed daily login today
    const lastLogin = localStorage.getItem("lastLoginDate")
    const today = new Date().toDateString()
    if (lastLogin !== today) {
      setDailyLoginDone(false)
    } else {
      setDailyLoginDone(true)
    }
  }, [])

  const handleDailyLogin = () => {
    setCoins(coins + 10)
    setDailyLoginDone(true)
    localStorage.setItem("lastLoginDate", new Date().toDateString())
  }

  const handleScratchCard = () => {
    const reward = Math.floor(Math.random() * 50) + 10
    setCoins(coins + reward)
  }

  const handleSpinWheel = () => {
    const reward = Math.floor(Math.random() * 100) + 20
    setCoins(coins + reward)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">🎮 Earn Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-saffron" />
              Daily Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Claim 10 coins every day!
            </p>
            <Button
              onClick={handleDailyLogin}
              disabled={dailyLoginDone}
              className="w-full"
            >
              {dailyLoginDone ? "Already Claimed" : "Claim Now"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-india-blue" />
              Scratch Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Win up to 50 coins!
            </p>
            <Button onClick={handleScratchCard} className="w-full">
              Scratch Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-india-green" />
              Spin Wheel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Win up to 100 coins!
            </p>
            <Button onClick={handleSpinWheel} className="w-full">
              Spin Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Your Total Coins</p>
            <p className="text-4xl font-bold text-saffron">{coins}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
