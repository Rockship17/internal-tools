"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Clock, Loader2 } from "lucide-react"

const COMPANY_LOCATION = {
  latitude: 10.790243599739648,
  longitude: 106.71172565253923,
}

const MAX_DISTANCE = 1300

const getAddressFromCoords = async (latitude: number, longitude: number): Promise<string> => {
  try {
    console.log("Fetching address for coordinates:", latitude, longitude)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=vi`
    )
    const data = await response.json()
    console.log("Geocoding API response:", data)
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address
    }
    return "Unknown location"
  } catch (error) {
    console.error("Error getting address:", error)
    return "Unknown location"
  }
}

interface CheckOutButtonProps {
  onCheckOut: (time: string) => void
}

export default function CheckOutButton({ onCheckOut }: CheckOutButtonProps) {
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

  const handleCheckOut = async () => {
    setIsChecking(true)
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const { latitude, longitude } = position.coords
      const address = await getAddressFromCoords(latitude, longitude)

      const distance = calculateDistance(latitude, longitude, COMPANY_LOCATION.latitude, COMPANY_LOCATION.longitude)

      if (distance <= MAX_DISTANCE) {
        const response = await fetch("https://n8n.rockship.co/webhook/v1/check-out", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: localStorage.getItem("fullName"),
            fullName: localStorage.getItem("userName"),
            check_out: new Date().toISOString(),
            date: new Date().toISOString(),
            location: address,
          }),
        })
        let data = null
        const text = await response.text()
        if (text) {
          try {
            data = JSON.parse(text)
          } catch (e) {
            console.warn("Response is not valid JSON", e)
          }
        }
        const currentTime = new Date().toISOString()
        localStorage.setItem("checkOutTime", currentTime)
        onCheckOut(currentTime)
        console.log("Check-out response:", data)
        toast.success("Check-out successful! You are within the company area.")
      } else {
        toast.error("Cannot check-out! You are too far from the company.")
      }
    } catch (error) {
      console.error("Error during check-out:", error)
      toast.error("Cannot get your location. Please check location permissions.")
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <Button
      onClick={handleCheckOut}
      disabled={isChecking}
      className="group relative flex h-16 w-full max-w-xs items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-red-600 hover:to-red-700 disabled:from-red-400 disabled:to-red-500 sm:w-64"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
      {isChecking ? <Loader2 className="h-6 w-6 animate-spin" /> : <Clock className="h-6 w-6" />}
      {isChecking ? "Checking..." : "Check-out"}
    </Button>
  )
}
