"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  // Generate hours (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Generate minutes (0-59)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  const handleHourChange = (hour: string) => {
    if (!date) {
      const newDate = new Date()
      newDate.setHours(parseInt(hour))
      newDate.setMinutes(0)
      setDate(newDate)
    } else {
      const newDate = new Date(date)
      newDate.setHours(parseInt(hour))
      setDate(newDate)
    }
  }

  const handleMinuteChange = (minute: string) => {
    if (!date) {
      const newDate = new Date()
      newDate.setMinutes(parseInt(minute))
      setDate(newDate)
    } else {
      const newDate = new Date(date)
      newDate.setMinutes(parseInt(minute))
      setDate(newDate)
    }
  }

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1.5">
        <Label htmlFor="hours">Hour</Label>
        <Select onValueChange={handleHourChange} value={date ? date.getHours().toString() : undefined}>
          <SelectTrigger id="hours" className="w-[110px]">
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent position="popper">
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour.toString()}>
                {hour.toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="minutes">Minute</Label>
        <Select onValueChange={handleMinuteChange} value={date ? date.getMinutes().toString() : undefined}>
          <SelectTrigger id="minutes" className="w-[110px]">
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent position="popper">
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute.toString()}>
                {minute.toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
