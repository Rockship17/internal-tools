import React, { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar, User } from "lucide-react"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  full_name: z.string().min(1, "Full name is required"),
  start_day: z.date({
    required_error: "Please select a date and time",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function FormInviteInterview() {
  const [loading, setLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      full_name: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      const formData = new FormData()
      Object.keys(values).forEach((key) => {
        if (values[key as keyof FormValues]) {
          if (key === "start_day") {
            const date = new Date(values[key])
            date.setHours(date.getHours() + 7)
            formData.append(key, date.toISOString())
          } else {
            formData.append(key, values[key as keyof FormValues]?.toString() || "")
          }
        }
      })

      const response = await fetch("https://n8n.rockship.co/webhook/send-email-invitation", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Submission failed")
      toast.success("Form submitted successfully!")
      form.reset()
    } catch (error) {
      toast.error("An error occurred. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto">
        <div className="rounded-2xl shadow-lg overflow-hidden bg-card">
          <div className="bg-primary px-8 py-6 text-primary-foreground">
            <h1 className="text-3xl font-black tracking-tight">Invite Interview</h1>
            <p className="mt-1 text-sm">Complete the form below to invite an interview</p>
          </div>

          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Candidate Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter email address"
                            className="rounded-lg bg-input text-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter full name"
                            className="rounded-lg bg-input text-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Interview Date
                </h3>
                <FormField
                  control={form.control}
                  name="start_day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          className="rounded-lg bg-input text-foreground w-full"
                          showTime
                          date={field.value}
                          onSelect={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-10 border-t border-border w-full flex justify-center">
                  <Button
                    type="submit"
                    className="w-full md:w-1/3 mx-auto flex justify-center items-center h-12 px-8 cursor-pointer bg-primary text-primary-foreground font-bold rounded-full"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Invitation"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="text-center mt-6 text-muted-foreground text-xs">
          © {new Date().getFullYear()} Rockship. All rights reserved.
        </div>
      </div>
    </div>
  )
}
