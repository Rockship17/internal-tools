import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { REQUEST_TYPES, FormValues } from "../constants"

interface RequestTypeFieldProps {
  form: UseFormReturn<FormValues>
}

export function RequestTypeField({ form }: RequestTypeFieldProps) {
  return (
    <FormField
      control={form.control}
      name="requestType"
      rules={{ required: "Please select request type" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Request Type *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={REQUEST_TYPES.LEAVE}>Leave</SelectItem>
              <SelectItem value={REQUEST_TYPES.REMOTE}>Remote Work</SelectItem>
              <SelectItem value={REQUEST_TYPES.DELAYED_ARRIVAL}>Late Arrival</SelectItem>
              <SelectItem value={REQUEST_TYPES.EARLY_DISMISSAL}>Early Leave</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
} 