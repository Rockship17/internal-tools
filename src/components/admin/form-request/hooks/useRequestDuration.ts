import { UseFormReturn } from "react-hook-form"
import { REQUEST_TYPES, TIME_OFF_TYPES, REMOTE_TYPES, FormValues } from "../constants"

export const useRequestDuration = (form: UseFormReturn<FormValues>) => {
  const calculateDuration = (type: "single" | "range", date?: Date, dateRange?: { from: Date; to: Date }) => {
    if (type === "single") {
      const timeOffType = form.getValues("timeOffType")
      const remoteType = form.getValues("remoteType")
      const requestType = form.getValues("requestType")

      if (
        timeOffType === TIME_OFF_TYPES.MORNING ||
        remoteType === REMOTE_TYPES.MORNING ||
        timeOffType === TIME_OFF_TYPES.AFTERNOON ||
        remoteType === REMOTE_TYPES.AFTERNOON
      ) {
        form.setValue("duration", 0.5)
      } else if (date) {
        const workStartTime = new Date(date).setHours(8, 30, 0)
        const workEndTime = new Date(date).setHours(17, 30, 0)
        const requestTime = date.getTime()

        if (requestType === REQUEST_TYPES.DELAYED_ARRIVAL) {
          const diffHours = (requestTime - workStartTime) / (1000 * 60 * 60)
          form.setValue("duration", Math.round(diffHours * 10) / 10)
        } else {
          const diffHours = (workEndTime - requestTime) / (1000 * 60 * 60)
          form.setValue("duration", Math.round(diffHours * 10) / 10)
        }
      }
    } else if (dateRange?.from && dateRange?.to) {
      const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime())
      const showTimePicker = form.getValues("timeOffType") === TIME_OFF_TYPES.BY_HOUR || 
                            form.getValues("remoteType") === REMOTE_TYPES.BY_HOUR

      if (showTimePicker) {
        const duration = Math.ceil((diffTime / (1000 * 60 * 60)) * 10) / 10
        form.setValue("duration", duration)
      } else {
        const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        form.setValue("duration", duration)
      }
    }
  }

  return { calculateDuration }
} 