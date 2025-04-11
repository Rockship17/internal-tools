"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { message } from "antd"

const COMPANY_LOCATION = {
  latitude: 10.790243599739648,
  longitude: 106.71172565253923,
}

const MAX_DISTANCE = 300

export default function CheckInPage() {
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

      console.log("Your current location:", {
        latitude,
        longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date(position.timestamp).toLocaleString(),
      })

      const distance = calculateDistance(latitude, longitude, COMPANY_LOCATION.latitude, COMPANY_LOCATION.longitude)
      console.log("Distance to company:", Math.round(distance), "meters")

      if (distance <= MAX_DISTANCE) {
        message.success("Check-in successful! You are within the company area.")
      } else {
        message.error("Cannot check-in! You are too far from the company.")
      }
    } catch (error) {
      console.error("Error getting location:", error)
      message.error("Cannot get your location. Please check location permissions.")
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Check-in</h1>
        <div className="flex justify-center">
          <Button onClick={handleCheckIn} disabled={isChecking} className="w-full max-w-xs">
            {isChecking ? "Checking..." : "Check-in"}
          </Button>
        </div>
      </div>
    </div>
  )
}
