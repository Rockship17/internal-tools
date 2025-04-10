"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TimePicker } from "@/components/ui/time-picker"

export function RangePicker({ className, showTime = false }: { className?: string; showTime?: boolean }) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const handleFromTimeChange = (date: Date | undefined) => {
    if (date && dateRange) {
      setDateRange({
        ...dateRange,
        from: date,
      })
    }
  }

  const handleToTimeChange = (date: Date | undefined) => {
    if (date && dateRange) {
      setDateRange({
        ...dateRange,
        to: date,
      })
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, showTime ? "PPP HH:mm" : "PPP")} -{" "}
                  {format(dateRange.to, showTime ? "PPP HH:mm" : "PPP")}
                </>
              ) : (
                format(dateRange.from, showTime ? "PPP HH:mm" : "PPP")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
          {showTime && (
            <div className="border-t p-3 space-y-3">
              <div>
                <div className="text-sm font-medium mb-2">Start Time</div>
                <TimePicker date={dateRange?.from} setDate={handleFromTimeChange} />
              </div>
              <div>
                <div className="text-sm font-medium mb-2">End Time</div>
                <TimePicker date={dateRange?.to} setDate={handleToTimeChange} />
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
