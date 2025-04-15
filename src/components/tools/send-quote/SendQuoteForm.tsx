"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const formSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientEmail: z.string().email("Please enter a valid email address"),
  projectDescription: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.string().min(10, "Requirements must be at least 10 characters"),
  expectedTimeline: z.string().min(1, "Please provide expected timeline"),
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid budget"),
  specialRequirements: z.string().optional(),
})

type QuoteFormValues = z.infer<typeof formSchema>

export default function SendQuoteForm() {
  const [quoteData, setQuoteData] = useState(null)

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      clientName: "",
      clientEmail: "",
      projectDescription: "",
      requirements: "",
      expectedTimeline: "",
      budget: "",
      specialRequirements: "",
    },
  })

  const onSubmit = (data: QuoteFormValues) => {
    const sampleQuoteData = {
      clientName: data.clientName,
      items: [
        {
          no: 0,
          item: "Requirement analysis & use case",
          mandays: 2,
          cost: 2,
        },
        {
          no: 1,
          item: "Conversation flow & prompt design",
          mandays: 4,
          cost: 4,
        },
        {
          no: 2,
          item: "Bot development & integration",
          mandays: 8,
          cost: 10,
        },
        {
          no: 3,
          item: "Knowledge base import & setup",
          mandays: 3,
          cost: 4,
        },
        {
          no: 4,
          item: "QA & Testing",
          mandays: 3,
          cost: 3,
        },
        {
          no: 5,
          item: "Deployment & onboarding",
          mandays: 2,
          cost: 2,
        },
      ],
      totalMandays: 22,
      totalCost: 25,
      monthlyOperatingCost: 3,
    }
  }

  return (
    <Card className="p-6 mt-6 bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="client@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Budget (VND)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter budget in VND" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedTimeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Timeline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1 month, 2 weeks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your project in detail" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List your technical requirements and specifications"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requirements (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requirements or additional notes"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Generate Quote
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
