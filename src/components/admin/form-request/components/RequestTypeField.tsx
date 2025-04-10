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
      rules={{ required: "Vui lòng chọn loại đơn" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Loại đơn *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại đơn" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={REQUEST_TYPES.LEAVE}>Nghỉ phép</SelectItem>
              <SelectItem value={REQUEST_TYPES.REMOTE}>Làm việc từ xa</SelectItem>
              <SelectItem value={REQUEST_TYPES.DELAYED_ARRIVAL}>Đến muộn</SelectItem>
              <SelectItem value={REQUEST_TYPES.EARLY_DISMISSAL}>Về sớm</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
} 