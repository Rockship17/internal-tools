"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TimePicker } from "@/components/ui/time-picker"

export function DatePicker({
  className,
  showTime = false,
  date,
  onSelect,
}: {
  className?: string
  showTime?: boolean
  date: Date | undefined
  onSelect: (date: Date) => void
}) {
  const [dateState, setDateState] = React.useState<Date>()

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, showTime ? "PPP HH:mm" : "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar 
            mode="single" 
            selected={dateState} 
            onSelect={(date) => {
              setDateState(date);
              if (date) onSelect(date);
            }} 
            initialFocus 
          />
          {showTime && (
            <div className="p-3 border-t">
              <TimePicker date={dateState} setDate={setDateState} />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
