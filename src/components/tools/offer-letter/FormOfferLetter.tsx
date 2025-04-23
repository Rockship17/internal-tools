"use client"

import React, { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { RangePicker } from "@/components/ui/range-picker"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  CalendarOutlined,
  UserOutlined,
  BankOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    full_name: z.string().min(1, "Full name is required"),
    start_day: z.date({
      required_error: "Please select a date and time",
    }),
    salary: z.string().min(1, "Salary is required"),
    salary_format: z.string().min(1, "Salary format is required"),
    holiday_days: z.string().optional(),
    office_address: z.string().min(1, "Office address is required"),
    probation_period: z
      .object({
        from: z.date().optional(),
        to: z.date().optional(),
      })
      .optional(),
    position: z.string().min(1, "Position is required"),
    intern: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.intern && (!data.holiday_days || data.holiday_days.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["holiday_days"],
        message: "Holiday days is required",
      })
    }
  })

type FormValues = z.infer<typeof formSchema>

export default function FormOfferLetter() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      full_name: "",
      position: "",
      salary: "",
      salary_format: "vnd",
      holiday_days: "",
      probation_period: undefined,
      office_address: "85/18 Pham Viet Chanh, Ward 19, Binh Thanh District, Ho Chi Minh City",
      start_day: new Date(),
      intern: false,
    },
  })
  const [loading, setLoading] = useState(false)
  const [rawSalary, setRawSalary] = useState("")
  const isIntern = form.watch("intern")

  function formatDate(date: Date) {
    return date
      ? `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}`
      : ""
  }

  const onSubmit = async (values: any) => {
    setLoading(true)
    try {
      const formData = new FormData()
      Object.keys(values).forEach((key) => {
        if (values[key]) {
          if (key === "probation_period" && values[key]?.from && values[key]?.to) {
            formData.append("probation_period[start]", formatDate(values[key].from))
            formData.append("probation_period[end]", formatDate(values[key].to))
          } else if (key === "start_day" && values[key] instanceof Date) {
            formData.append(key, formatDate(values[key]))
          } else if (key === "salary") {
            formData.append(key, rawSalary)
          } else if (key === "intern") {
            formData.append(key, values[key].toString())
          } else {
            formData.append(key, values[key])
          }
        }
      })

      const response = await fetch("https://n8n.rockship.co/webhook/f34eeb2c-cc23-44a7-984f-8dc97830dfc0", {
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
    <div className="py-12 bg-background">
      <div className="container mx-auto">
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
          <div className="bg-primary px-8 py-6 text-primary-foreground">
            <h1 className="text-3xl font-black tracking-tight">Offer Letter Details</h1>
            <p className="text-muted mt-1 text-sm">Complete the form below to generate a professional offer letter</p>
          </div>
          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                    <UserOutlined className="mr-2 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter email address"
                              className="rounded-lg bg-input text-foreground border-border"
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
                              className="rounded-lg bg-input text-foreground border-border"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                    <BankOutlined className="mr-2 text-primary" />
                    Position Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="position"
                      render={() => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => form.setValue("position", value)}
                              defaultValue={form.getValues("position")}
                            >
                              <SelectTrigger className="rounded-lg bg-input text-foreground border-border">
                                <SelectValue placeholder="Select a position" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Frontend Engineer">Frontend Engineer</SelectItem>
                                <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                                <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                                <SelectItem value="Data Engineer">Data Engineer</SelectItem>
                                <SelectItem value="Designer">Designer</SelectItem>
                                <SelectItem value="QA">QA</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end mb-2">
                      <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Salary</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter salary"
                                className="text-right rounded-lg bg-input text-foreground border-border"
                                value={field.value}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, "")
                                  setRawSalary(value)
                                  const formattedValue = value ? new Intl.NumberFormat().format(Number(value)) : ""
                                  form.setValue("salary", formattedValue)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="salary_format"
                        render={() => (
                          <FormItem className="w-20 mt-2">
                            <FormControl>
                              <Select
                                onValueChange={(value) => form.setValue("salary_format", value)}
                                defaultValue={form.getValues("salary_format")}
                              >
                                <SelectTrigger className="rounded-lg bg-input text-foreground border-border mb-0">
                                  <SelectValue placeholder="VND" />
                                </SelectTrigger>
                                <SelectContent className="w-10">
                                  <SelectItem value="vnd">VND</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="intern"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 mt-4">
                        <FormLabel className="mb-0">Intern Position</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="bg-white text-black border-border mb-0 size-5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                    <ClockCircleOutlined className="mr-2 text-primary" />
                    Probation Period
                  </h3>
                  <FormField
                    control={form.control}
                    name="probation_period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Period</FormLabel>
                        <FormControl>
                          <RangePicker
                            className="w-full rounded-lg bg-input text-foreground border-border"
                            dateRange={
                              field.value && field.value.from && field.value.to
                                ? { from: field.value.from, to: field.value.to }
                                : undefined
                            }
                            onRangeChange={field.onChange}
                            disabled={isIntern}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                    <CalendarOutlined className="mr-2 text-primary" />
                    Additional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="holiday_days"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Holidays (days per year)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter holidays"
                              className="rounded-lg bg-input text-foreground border-border"
                              disabled={isIntern}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="start_day"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <DatePicker
                              date={field.value}
                              onSelect={field.onChange}
                              className="rounded-lg bg-input text-foreground border-border"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                    <EnvironmentOutlined className="mr-2 text-primary" />
                    Office Address
                  </h3>
                  <FormField
                    control={form.control}
                    name="office_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="85/18 Pham Viet Chanh, Ward 19, Binh Thanh District, Ho Chi Minh City"
                            className="rounded-lg bg-input text-foreground border-border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-6 border-t border-border w-full flex justify-center">
                  <Button
                    type="submit"
                    className="w-full md:w-auto h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Generate Offer Letter"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="text-center mt-6 text-muted-foreground text-xs">
          {new Date().getFullYear()} Rockship. All rights reserved.
        </div>
      </div>
    </div>
  )
}
