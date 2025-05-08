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
import { toast } from "sonner"

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

  useEffect(() => {
    form.setValue("timeOffType", "")
    form.setValue("remoteType", "")
    form.setValue("date", undefined)
    form.setValue("dateRange", undefined)
    form.setValue("time", undefined)
    form.setValue("duration", 0)
  }, [requestType, form])

  useEffect(() => {
    form.setValue("date", undefined)
    form.setValue("dateRange", undefined)
    form.setValue("time", undefined)
    form.setValue("duration", 0)
  }, [timeOffType, remoteType, form])

  const formatDate = (date: Date | undefined): string => {
    if (!date) return ""

    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }

  const calculateDaysDuration = (from: Date | undefined, to: Date | undefined): number => {
    if (!from || !to) return 0

    const diffTime = Math.abs(to.getTime() - from.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  const calculateHoursDuration = (from: Date | undefined, to: Date | undefined): number => {
    if (!from || !to) return 0

    const diffHours = (to.getTime() - from.getTime()) / (1000 * 60 * 60)
    return parseFloat(diffHours.toFixed(1))
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      const userId = localStorage.getItem("fullName") || ""
      const fullName = localStorage.getItem("userName") || ""

      const formData: Record<string, any> = {
        userId,
        fullName,
        permissionType: "",
        byType: "",
        reason: data.reason,
        durationDays: "",
        durationHours: "",
        implementationDate: "",
        startDate: "",
        endDate: "",
        startDateTime: "",
        endDateTime: "",
        implementationDateTime: "",
      }

      switch (data.requestType) {
        case REQUEST_TYPES.LEAVE:
          formData.permissionType = "Time/Day off"
          break
        case REQUEST_TYPES.REMOTE:
          formData.permissionType = "Remote work"
          break
        case REQUEST_TYPES.DELAYED_ARRIVAL:
          formData.permissionType = "Delayed arrival"
          break
        case REQUEST_TYPES.EARLY_DISMISSAL:
          formData.permissionType = "Early Dismissal"
          break
      }

      if (data.requestType === REQUEST_TYPES.LEAVE || data.requestType === REQUEST_TYPES.REMOTE) {
        const typeValue = data.requestType === REQUEST_TYPES.LEAVE ? data.timeOffType : data.remoteType

        switch (typeValue) {
          case TIME_OFF_TYPES.BY_DAY:
          case REMOTE_TYPES.FULL_DAY:
            formData.byType = "By days"
            break
          case TIME_OFF_TYPES.BY_HOUR:
          case REMOTE_TYPES.BY_HOUR:
            formData.byType = "By hours"
            break
          case TIME_OFF_TYPES.MORNING:
          case REMOTE_TYPES.MORNING:
            formData.byType = "By morning"
            break
          case TIME_OFF_TYPES.AFTERNOON:
          case REMOTE_TYPES.AFTERNOON:
            formData.byType = "By afternoon"
            break
        }

        if (typeValue === TIME_OFF_TYPES.BY_HOUR || typeValue === REMOTE_TYPES.BY_HOUR) {
          if (data.dateRange?.from && data.dateRange?.to && data.time) {
            const startDate = formatDate(data.dateRange.from)
            const endDate = formatDate(data.dateRange.to)
            const time = data.time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })

            formData.startDateTime = `${startDate} ${time}`
            formData.endDateTime = `${endDate} ${time}`
            formData.durationHours = String(calculateHoursDuration(data.dateRange.from, data.dateRange.to))
          }
        } else {
          if (data.dateRange?.from && data.dateRange?.to) {
            formData.startDate = formatDate(data.dateRange.from)
            formData.endDate = formatDate(data.dateRange.to)
            formData.durationDays = String(calculateDaysDuration(data.dateRange.from, data.dateRange.to))
          } else if (data.date) {
            const formattedDate = formatDate(data.date)
            formData.startDate = formattedDate
            formData.endDate = formattedDate
            formData.durationDays = "1"
          }
        }
      } else {
        if (data.date && data.time) {
          const formattedDate = formatDate(data.date)
          const formattedTime = data.time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })

          formData.implementationDate = formattedDate
          formData.implementationDateTime = `${formattedDate} ${formattedTime}`
        }
      }

      const response = await fetch("https://n8n.rockship.co/webhook/a5abc709-fe3f-4bbc-b0e4-fc78af64f23e", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Request submitted successfully!")
        form.reset()
      } else {
        toast.error("Error submitting request. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error submitting request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6 bg-card">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <RequestTypeField form={form} />

          {requestType === REQUEST_TYPES.LEAVE && (
            <FormField
              control={form.control}
              name="timeOffType"
              rules={{ required: "Please select time off type" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Off Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input text-foreground">
                        <SelectValue placeholder="Select time off type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TIME_OFF_TYPES.BY_DAY}>Full Day</SelectItem>
                      <SelectItem value={TIME_OFF_TYPES.MORNING}>Morning</SelectItem>
                      <SelectItem value={TIME_OFF_TYPES.AFTERNOON}>Afternoon</SelectItem>
                      <SelectItem value={TIME_OFF_TYPES.BY_HOUR}>By Hour</SelectItem>
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
              rules={{ required: "Please select remote work type" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remote Work Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-black">
                        <SelectValue placeholder="Select remote work type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={REMOTE_TYPES.FULL_DAY}>Full Day</SelectItem>
                      <SelectItem value={REMOTE_TYPES.MORNING}>Morning</SelectItem>
                      <SelectItem value={REMOTE_TYPES.AFTERNOON}>Afternoon</SelectItem>
                      <SelectItem value={REMOTE_TYPES.BY_HOUR}>By Hour</SelectItem>
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
                <FormLabel>{showTimePicker ? "Hours" : "Days"}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    placeholder="Auto-calculated"
                    value={field.value ? `${field.value} ${showTimePicker ? "hours" : "days"}` : ""}
                    className="bg-input text-foreground"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            rules={{ required: "Please enter reason" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter reason..." className="resize-none bg-input text-foreground" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="reset" className="bg-background text-foreground">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
