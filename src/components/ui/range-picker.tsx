"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TimePicker } from "@/components/ui/time-picker"

export function RangePicker({
  className,
  showTime = false,
  dateRange,
  onRangeChange,
  disabled = false,
}: {
  className?: string
  showTime?: boolean
  dateRange: DateRange | undefined
  onRangeChange: (dateRange: DateRange) => void
  disabled?: boolean
}) {
  // Always sync state with prop
  const [dateRangeState, setDateRangeState] = React.useState<DateRange | undefined>(dateRange)
  React.useEffect(() => {
    setDateRangeState(dateRange)
  }, [dateRange])

  const handleFromTimeChange = (date: Date | undefined) => {
    if (date && dateRangeState) {
      const newRange = { ...dateRangeState, from: date }
      setDateRangeState(newRange)
      onRangeChange(newRange)
    }
  }

  const handleToTimeChange = (date: Date | undefined) => {
    if (date && dateRangeState) {
      const newRange = { ...dateRangeState, to: date }
      setDateRangeState(newRange)
      onRangeChange(newRange)
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
            disabled={disabled}
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
        <PopoverContent className="w-auto p-0 bg-card text-foreground" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRangeState?.from}
            selected={dateRangeState}
            onSelect={(range) => {
              setDateRangeState(range)
              // Always call onRangeChange for parent sync, even if only from is selected
              if (range) onRangeChange(range)
            }}
            numberOfMonths={2}
            disabled={disabled}
            fromDate={new Date()}
          />
          {showTime && (
            <div className="border-t p-3 space-y-3 grid grid-cols-2 bg-card text-foreground">
              <div>
                <div className="text-sm font-medium mb-2">Start Time</div>
                <TimePicker date={dateRangeState?.from} setDate={handleFromTimeChange} disabled={disabled} />
              </div>
              <div>
                <div className="text-sm font-medium mb-2">End Time</div>
                <TimePicker date={dateRangeState?.to} setDate={handleToTimeChange} disabled={disabled} />
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
