"use client"

import React, { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UserOutlined } from "@ant-design/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  full_name: z.string().min(1, "Full name is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function FormRejectInterview() {
  const [loading, setLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      full_name: "",
    },
  })
  const onSubmit = async () => {
    setLoading(true)
    try {
      const formData = new FormData()

      const response = await fetch("https://n8n.rockship.co/webhook/send-email-reject", {
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
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
          <div className="bg-primary px-8 py-6 text-primary-foreground">
            <h1 className="text-3xl font-black tracking-tight">Reject Interview</h1>
            <p className="text-muted mt-1 text-sm">Complete the form below to reject an interview</p>
          </div>

          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <UserOutlined className="w-4 h-4" />
                  Candidate Information
                </h3>
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
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-primary text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Rejection"}
                </Button>
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
