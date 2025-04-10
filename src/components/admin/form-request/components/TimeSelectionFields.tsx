import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { RangePicker } from "@/components/ui/range-picker"
import { UseFormReturn } from "react-hook-form"
import { FormValues } from "../constants"

interface TimeSelectionFieldsProps {
  form: UseFormReturn<FormValues>
  showSingleDatePicker: boolean
  showRangePicker: boolean
  showTimePicker: boolean
  calculateDuration: (type: "single" | "range", date?: Date, dateRange?: { from: Date; to: Date }) => void
}

export function TimeSelectionFields({
  form,
  showSingleDatePicker,
  showRangePicker,
  showTimePicker,
  calculateDuration,
}: TimeSelectionFieldsProps) {
  if (!showSingleDatePicker && !showRangePicker) return null

  return (
    <>
      {showSingleDatePicker && (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            rules={{ required: "Vui lòng chọn ngày" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày *</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    onSelect={(date) => {
                      field.onChange(date)
                      calculateDuration("single", date)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showTimePicker && (
            <FormField
              control={form.control}
              name="time"
              rules={{ required: "Vui lòng chọn giờ" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giờ *</FormLabel>
                  <FormControl>
                    <TimePicker
                      date={field.value}
                      setDate={(time) => {
                        field.onChange(time)
                        if (form.getValues("date") && time) {
                          const fullDate = new Date(form.getValues("date") as Date)
                          fullDate.setHours(time.getHours(), time.getMinutes())
                          calculateDuration("single", fullDate)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      )}

      {showRangePicker && (
        <FormField
          control={form.control}
          name="dateRange"
          rules={{ required: "Vui lòng chọn thời gian" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{showTimePicker ? "Thời gian (Giờ) *" : "Thời gian (Ngày) *"}</FormLabel>
              <FormControl>
                <RangePicker
                  showTime={showTimePicker}
                  dateRange={field.value}
                  onRangeChange={(range) => {
                    field.onChange(range)
                    calculateDuration("range", undefined, range)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  )
}
