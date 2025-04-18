"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { Edit2, Save, Upload, X } from "lucide-react"
import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { generateQuoteDoc } from "./QuoteDoc"
import { QuoteData, QuoteItem, formSchema, QuoteFormValues } from "@/types/quote"
import { quotePrompt } from "./quotePrompt"
import { cleanJsonResponse } from "@/utils/quote"
import { toast } from "sonner"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

export default function SendQuoteForm() {
  const [isEditing, setIsEditing] = useState(false)
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recipientName, setRecipientName] = useState("")
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      clientName: "",
      projectDescription: "",
      platform: "",
      expectedTimeline: "",
      budget: "",
    },
  })

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      setIsLoading(true)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

      const prompt = quotePrompt(data)
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        const cleanedText = cleanJsonResponse(text)
        const jsonResponse = JSON.parse(cleanedText)
        setQuoteData(jsonResponse)
        setRecipientName(jsonResponse.recipient)
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError)
        console.log("Raw response:", text)
        setQuoteData(null)
      }
      toast.success("Quote generated successfully")
    } catch (error) {
      console.error("Error generating quote:", error)
      setQuoteData(null)
      toast.error("Error generating quote")
    } finally {
      setIsLoading(false)
    }
  }

  const handleItemChange = (index: number, field: keyof QuoteItem, value: string | number) => {
    if (!quoteData) return

    const newQuoteItems = [...quoteData.quotationItems]
    newQuoteItems[index] = {
      ...newQuoteItems[index],
      [field]:
        field === "no"
          ? parseInt(value as string)
          : field === "mandays" || field === "costMilVND"
          ? parseFloat(value as string)
          : value,
    }

    const totalMandays = newQuoteItems.reduce((sum, item) => sum + (item.mandays || 0), 0)
    const totalOneTimeCostMilVND = newQuoteItems.reduce((sum, item) => sum + (item.costMilVND || 0), 0)

    setQuoteData({
      ...quoteData,
      quotationItems: newQuoteItems,
      totalMandays,
      totalOneTimeCostMilVND,
    })
  }

  const handleUpload = async () => {
    if (!quoteData) return

    try {
      setUploadStatus("loading")

      const htmlContent = generateQuoteDoc(quoteData, recipientName)
      const blob = new Blob([htmlContent], { type: "application/msword" })
      const formData = new FormData()
      const fileName = `QUOTATION - ${form.getValues().clientName}.doc`
      formData.append("file", blob, fileName)
      formData.append("format", "doc")

      const response = await fetch("https://n8n.rockship.co/webhook/send-quote", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      setUploadStatus("success")
      const result = await response.json()
      toast.success("Quote uploaded to Drive successfully")
      console.log("Upload successful:", result)
    } catch (error) {
      console.error("Error uploading quote:", error)
      setUploadStatus("error")
    } finally {
      setTimeout(() => setUploadStatus("idle"), 3000)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Card className="p-6 mt-6 bg-background flex-1">
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
                    <Textarea placeholder="Describe your project in detail" className="min-h-[400px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platform"
              render={() => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="text-black">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="chatbot">Chatbot</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {isLoading ? "Generating..." : "Generate Quote"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      {isLoading ? null : quoteData ? (
        <Card className="p-6 mt-6 bg-background relative ml-4 flex-1">
          <div className="absolute top-4 right-4 flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" /> Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" /> Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUpload}
                  disabled={uploadStatus === "loading"}
                  className={`flex items-center gap-2 ${
                    uploadStatus === "success" ? "text-green-500" : uploadStatus === "error" ? "text-red-500" : ""
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  {uploadStatus === "loading"
                    ? "Uploading..."
                    : uploadStatus === "success"
                    ? "Uploaded!"
                    : uploadStatus === "error"
                    ? "Failed!"
                    : "Upload"}
                </Button>
              </>
            )}
          </div>

          <div className="flex items-start justify-between mb-8">
            <div>
              <img
                src="https://internal-tools-rockship.s3.ap-southeast-1.amazonaws.com/rockship-logo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAW3MEALFEHZM4E23L%2F20250418%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250418T035803Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkcwRQIgHlMj8KSUS9wneosPxkUEFGD1t%2Fz1c9apw66fMitWbyMCIQDy0EHduMEwcEfQVJzWMvywQmqwZeKsw0y7k7HalCkTEir3AghtEAAaDDQ3MTExMjYzNjc0NCIMsulrHw2SLeWQZGqAKtQC3UJuNhtoRJY4nUaYQtrlleMIm%2BJforKV1UzxMTSjnQLwd42RKQsGg36Gqd5JLhGA7jnh2Q%2BMuqWWRK0K8ub0RzIRTsDRo61t2JjKPmfKiZrH8NGEivKuwPKVDhkbHBvKKG7qLropbZ7bAmC8rEld8%2FPZ5ymxha0EKcHGphK8utAf%2Bah3dEzBs1UhFZSwoctJVwyYMpmRsDd1wCUrk5mY0uXMuAcLYmfJwBMwNGJp9pg5%2B5Ml7mptG%2BHG4NHl%2BC68vyTWbhvkXdGba5%2FjkjQHvAAgqCyQC2pLlz9PBuxbAgc5VCpFcEvokDCzXYFj1IxNiBjKjHH70A9ga1Ni6kt5ZHVe%2Ffc2hfilEE7ACoUDAz9GWSZebVVD1tfEMahLJAvuV4GOPWkZxa17od%2FLZ%2BjLe8Pa6DUGvNqEnaywc6KwHPAFPOrnrZLnOs0phgqpdsebhj0JGTCJmIfABjqtAjg0p3T8v45uSYLPx5pNi930Tc86HA0aD4Hpxi9FyKxf4LGTJIEvVNQ8T5KtV7Aumpz%2FFHuRniNWGjwUt%2FIuk7VtzD0wPvLR2gygQmfcSWc87tfZknpVQjxqgoyad4tZsfMe1Fn3lBbICLfpGx9xVivuwpl4IWYVYBw59LgSm%2FqwhdzCJd7x1yaHGlmto3E42pAufZmR5F%2FBPblBmHwLM26atIVfzb3cz%2FA7r3lEr9rBPHbV6IYiocI72qbj4lJCSH5xTZQs5%2BBDk4HB2GP95KDRrMv6xlOzoUltGD%2B%2BPLaOXHBE%2FAH%2Bw6HBn086co3MilTYw0afWhBEykcvXOv5LbdL6N%2FevgUgaIHPxF3ESY566ntrk9FWx9TmTvJlwYD77f5R3%2BXT6j6SK4j768U%3D&X-Amz-Signature=9b6f639f75c0ed445738fd6326d869a91ba737a500a85b6ce3490591e0a88418&X-Amz-SignedHeaders=host&response-content-disposition=inline"
                alt="Rockship"
                className="w-16 h-16"
              />
              <h1 className="text-xl font-bold mb-2">Rockship Pte. Ltd.</h1>
              <p className="text-muted-foreground">OXLEY BIZHUB, 73 UBI ROAD 1, #08-54, Postal 408733</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold uppercase underline">QUOTATION</h2>
            </div>
          </div>

          <div className="mb-8">
            {isEditing ? (
              <Input
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-64"
                placeholder="Recipient Name"
              />
            ) : (
              <p className="font-semibold">To: {recipientName}</p>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-foreground text-background">
                  <th className="border p-3 text-left">No.</th>
                  <th className="border p-3 text-left">Item</th>
                  <th className="border p-3 text-left">Mandays</th>
                  <th className="border p-3 text-left">Cost (mil VND)</th>
                </tr>
              </thead>
              <tbody>
                {quoteData.quotationItems.map((item, index) => (
                  <tr key={item.no}>
                    <td className="border p-3">{item.no}</td>
                    <td className="border p-3">
                      {isEditing ? (
                        <Input
                          value={item.item}
                          onChange={(e) => handleItemChange(index, "item", e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        item.item
                      )}
                    </td>
                    <td className="border p-3">
                      {isEditing ? (
                        <Input
                          type="number"
                          value={item.mandays}
                          onChange={(e) => handleItemChange(index, "mandays", e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        item.mandays
                      )}
                    </td>
                    <td className="border p-3">
                      {isEditing ? (
                        <Input
                          type="number"
                          value={item.costMilVND}
                          onChange={(e) => handleItemChange(index, "costMilVND", e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        item.costMilVND
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-foreground text-background font-semibold">
                  <td colSpan={2} className="border p-3">
                    Total one-time cost
                  </td>
                  <td className="border p-3">{quoteData.totalMandays}</td>
                  <td className="border p-3">{quoteData.totalOneTimeCostMilVND}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Notes:</h3>
            <ul className="list-disc list-inside">
              {quoteData.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </Card>
      ) : null}
    </div>
  )
}
