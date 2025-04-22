"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import cn from "classnames"

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
}

export function TimePicker({ date, setDate, className, disabled = false }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  const hourValue = date ? date.getHours().toString() : "0"
  const minuteValue = date ? date.getMinutes().toString() : "0"

  const handleHourChange = (hour: string) => {
    if (!date) {
      const now = new Date()
      now.setHours(parseInt(hour))
      setDate(now)
    } else {
      const newDate = new Date(date)
      newDate.setHours(parseInt(hour))
      setDate(newDate)
    }
  }

  const handleMinuteChange = (minute: string) => {
    if (!date) {
      const now = new Date()
      now.setMinutes(parseInt(minute))
      setDate(now)
    } else {
      const newDate = new Date(date)
      newDate.setMinutes(parseInt(minute))
      setDate(newDate)
    }
  }

  return (
    <div className={cn("flex items-end gap-2 bg-card text-foreground", className)}>
      <div className="grid gap-1.5">
        <Label htmlFor="hours">Hour</Label>
        <Select onValueChange={handleHourChange} value={hourValue} disabled={disabled}>
          <SelectTrigger id="hours" className="w-[110px] bg-input text-foreground" disabled={disabled}>
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent position="popper">
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour.toString()} disabled={disabled}>
                {hour.toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="minutes">Minute</Label>
        <Select onValueChange={handleMinuteChange} value={minuteValue} disabled={disabled}>
          <SelectTrigger id="minutes" className="w-[110px] bg-input text-foreground" disabled={disabled}>
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent position="popper">
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute.toString()} disabled={disabled}>
                {minute.toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
