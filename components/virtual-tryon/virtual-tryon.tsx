"use client"

import { useState } from "react"
import { Product } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

export function VirtualTryOn({ product }: { product: Product }) {
  const [showTryOn, setShowTryOn] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)

  const handleStartTryOn = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      setCameraActive(true)
      setShowTryOn(true)
    } catch (error) {
      console.error("Camera access denied:", error)
      alert("Please allow camera access to use virtual try-on")
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Virtual Try-On
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showTryOn && cameraActive ? (
          <div className="space-y-4">
            <div className="bg-black rounded-lg overflow-hidden h-96 flex items-center justify-center">
              <video
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setCameraActive(false)
                  setShowTryOn(false)
                }}
              >
                Close
              </Button>
              <Button className="flex-1">
                Save Photo
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            See how {product.name} looks on you using your camera!
          </p>
        )}
        {!showTryOn && (
          <Button
            className="w-full"
            onClick={handleStartTryOn}
            variant={showTryOn ? "outline" : "default"}
          >
            {showTryOn ? "Close" : "Try On"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
