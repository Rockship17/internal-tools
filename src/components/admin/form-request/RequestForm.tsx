"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { REQUEST_TYPES, TIME_OFF_TYPES, REMOTE_TYPES, FormValues } from "./constants"
import { useRequestDuration } from "./hooks/useRequestDuration"
import { RequestTypeField } from "./components/RequestTypeField"
import { TimeSelectionFields } from "./components/TimeSelectionFields"

export function RequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    defaultValues: {
      requestType: "",
      timeOffType: "",
      remoteType: "",
      reason: "",
      duration: 0,
    },
  })

  const { calculateDuration } = useRequestDuration(form)
  const requestType = form.watch("requestType")
  const timeOffType = form.watch("timeOffType")
  const remoteType = form.watch("remoteType")

  const showSingleDatePicker =
    [REQUEST_TYPES.DELAYED_ARRIVAL, REQUEST_TYPES.EARLY_DISMISSAL].includes(requestType as any) ||
    timeOffType === TIME_OFF_TYPES.MORNING ||
    timeOffType === TIME_OFF_TYPES.AFTERNOON ||
    remoteType === REMOTE_TYPES.MORNING ||
    remoteType === REMOTE_TYPES.AFTERNOON

  const showRangePicker =
    (requestType === REQUEST_TYPES.LEAVE && timeOffType === TIME_OFF_TYPES.BY_DAY) ||
    (requestType === REQUEST_TYPES.REMOTE && remoteType === REMOTE_TYPES.FULL_DAY) ||
    (requestType === REQUEST_TYPES.LEAVE && timeOffType === TIME_OFF_TYPES.BY_HOUR) ||
    (requestType === REQUEST_TYPES.REMOTE && remoteType === REMOTE_TYPES.BY_HOUR)

  const showTimePicker =
    [REQUEST_TYPES.DELAYED_ARRIVAL, REQUEST_TYPES.EARLY_DISMISSAL].includes(requestType as any) ||
    timeOffType === TIME_OFF_TYPES.BY_HOUR ||
    remoteType === REMOTE_TYPES.BY_HOUR

  // Reset fields when type changes
  useEffect(() => {
    form.setValue("timeOffType", "")
    form.setValue("remoteType", "")
    form.setValue("date", undefined)
    form.setValue("dateRange", undefined)
    form.setValue("time", undefined)
    form.setValue("duration", 0)
  }, [requestType, form])

  // Reset date/time fields when sub-type changes
  useEffect(() => {
    form.setValue("date", undefined)
    form.setValue("dateRange", undefined)
    form.setValue("time", undefined)
    form.setValue("duration", 0)
  }, [timeOffType, remoteType, form])

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement form submission
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <RequestTypeField form={form} />

          {requestType === REQUEST_TYPES.LEAVE && (
            <FormField
              control={form.control}
              name="timeOffType"
              rules={{ required: "Vui lòng chọn hình thức nghỉ" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình thức nghỉ *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hình thức nghỉ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TIME_OFF_TYPES.BY_DAY}>Nghỉ cả ngày</SelectItem>
                      <SelectItem value={TIME_OFF_TYPES.MORNING}>Nghỉ buổi sáng</SelectItem>
                      <SelectItem value={TIME_OFF_TYPES.AFTERNOON}>Nghỉ buổi chiều</SelectItem>
                      <SelectItem value={TIME_OFF_TYPES.BY_HOUR}>Nghỉ theo giờ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {requestType === REQUEST_TYPES.REMOTE && (
            <FormField
              control={form.control}
              name="remoteType"
              rules={{ required: "Vui lòng chọn hình thức làm việc từ xa" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình thức làm việc từ xa *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hình thức làm việc từ xa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={REMOTE_TYPES.FULL_DAY}>Cả ngày</SelectItem>
                      <SelectItem value={REMOTE_TYPES.MORNING}>Buổi sáng</SelectItem>
                      <SelectItem value={REMOTE_TYPES.AFTERNOON}>Buổi chiều</SelectItem>
                      <SelectItem value={REMOTE_TYPES.BY_HOUR}>Theo giờ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <TimeSelectionFields
            form={form}
            showSingleDatePicker={showSingleDatePicker}
            showRangePicker={showRangePicker}
            showTimePicker={showTimePicker}
            calculateDuration={calculateDuration}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{showTimePicker ? "Số giờ" : "Số ngày"}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    placeholder="Tự động tính"
                    value={field.value ? `${field.value} ${showTimePicker ? "giờ" : "ngày"}` : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            rules={{ required: "Vui lòng nhập lý do" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lý do *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Nhập lý do..." className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="reset">
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Gửi đơn"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
