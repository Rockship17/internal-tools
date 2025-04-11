"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Clock, Loader2 } from "lucide-react"

const COMPANY_LOCATION = {
  latitude: 10.790243599739648,
  longitude: 106.71172565253923,
}

const MAX_DISTANCE = 300

export default function CheckInButton() {
  const [isChecking, setIsChecking] = useState(false)

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  const handleCheckIn = async () => {
    setIsChecking(true)
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const { latitude, longitude } = position.coords

      const distance = calculateDistance(latitude, longitude, COMPANY_LOCATION.latitude, COMPANY_LOCATION.longitude)

      if (distance <= MAX_DISTANCE) {
        toast.success("Check-in successful! You are within the company area.")
      } else {
        toast.error("Cannot check-in! You are too far from the company.")
      }
    } catch (error) {
      console.error("Error getting location:", error)
      toast.error("Cannot get your location. Please check location permissions.")
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <Button
      onClick={handleCheckIn}
      disabled={isChecking}
      className="group relative flex h-16 w-full max-w-xs items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 disabled:from-green-400 disabled:to-green-500 sm:w-64"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
      {isChecking ? <Loader2 className="h-6 w-6 animate-spin" /> : <Clock className="h-6 w-6" />}
      {isChecking ? "Checking..." : "Check-in"}
    </Button>
  )
}
