"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { Copy, Edit2, Share, Plus, Trash2, Save } from "lucide-react"
import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { generateQuoteDoc } from "./QuoteDoc"
import { QuoteData, QuoteItem, formSchema, QuoteFormValues } from "@/types/quote"
import { quotePrompt } from "./quotePrompt"
import { cleanJsonResponse } from "@/utils/quote"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

export default function SendQuoteForm() {
  const [isEditing, setIsEditing] = useState(false)
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recipientName, setRecipientName] = useState("")
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [docLink, setDocLink] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newNote, setNewNote] = useState("")

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
      // Reset upload status and document link when generating new quote
      setUploadStatus("idle")
      setDocLink("")

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

      const result = await response.json()
      setDocLink(result.link)
      setUploadStatus("success")
      toast.success("Quote uploaded to Drive successfully")
    } catch (error) {
      console.error("Error uploading quote:", error)
      setUploadStatus("error")
    } finally {
      setTimeout(() => setUploadStatus("idle"), 3000)
    }
  }

  const handleAddItem = () => {
    if (!quoteData) return

    const newItem: QuoteItem = {
      no: quoteData.quotationItems.length + 1,
      item: "",
      mandays: 0,
      costMilVND: 0,
    }

    const newQuoteItems = [...quoteData.quotationItems, newItem]

    setQuoteData({
      ...quoteData,
      quotationItems: newQuoteItems,
    })
  }

  const handleDeleteItem = (index: number) => {
    if (!quoteData) return

    const newQuoteItems = quoteData.quotationItems.filter((_, i) => i !== index)
    // Renumber the items
    newQuoteItems.forEach((item, i) => {
      item.no = i + 1
    })

    const totalMandays = newQuoteItems.reduce((sum, item) => sum + (item.mandays || 0), 0)
    const totalOneTimeCostMilVND = newQuoteItems.reduce((sum, item) => sum + (item.costMilVND || 0), 0)

    setQuoteData({
      ...quoteData,
      quotationItems: newQuoteItems,
      totalMandays,
      totalOneTimeCostMilVND,
    })
  }

  const handleAddNote = () => {
    if (!quoteData || !newNote.trim()) return

    setQuoteData({
      ...quoteData,
      notes: [...quoteData.notes, newNote.trim()],
    })
    setNewNote("")
  }

  const handleDeleteNote = (index: number) => {
    if (!quoteData) return

    const newNotes = quoteData.notes.filter((_, i) => i !== index)
    setQuoteData({
      ...quoteData,
      notes: newNotes,
    })
  }

  const handleEditNote = (index: number, value: string) => {
    if (!quoteData) return

    const newNotes = [...quoteData.notes]
    newNotes[index] = value
    setQuoteData({
      ...quoteData,
      notes: newNotes,
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Card className="p-6 mt-6 bg-card border-border flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Project Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter project name"
                        className="bg-input text-foreground border-border"
                        {...field}
                      />
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
                    <FormLabel className="text-foreground">Client Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter client name"
                        className="bg-input text-foreground border-border"
                        {...field}
                      />
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
                    <FormLabel className="text-foreground">Expected Budget (VND)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter budget in VND"
                        className="bg-input text-foreground border-border"
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          const formattedValue = value ? new Intl.NumberFormat().format(Number(value)) : ""
                          field.onChange(formattedValue)
                        }}
                      />
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
                    <FormLabel className="text-foreground">Expected Timeline</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 1 month, 2 weeks"
                        className="bg-input text-foreground border-border"
                        {...field}
                      />
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
                  <FormLabel className="text-foreground">Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project in detail"
                      className="min-h-[400px] bg-input text-foreground border-border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Platform</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input text-foreground border-border">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="web">Web Application</SelectItem>
                      <SelectItem value="mobile">Mobile Application</SelectItem>
                      <SelectItem value="chatbot">Chatbot</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full md:w-1/3 h-12 mx-auto flex justify-center items-center bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Quote"}
            </Button>
          </form>
        </Form>
      </Card>

      {quoteData && (
        <Card className="p-6 mt-6 bg-card border-border flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 ml-auto">
              <Button
                variant="outline"
                size="icon"
                className="border-border text-foreground hover:bg-accent w-26 h-10 shadow-gray-500 rounded-full"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border text-foreground hover:bg-accent w-26 h-10 shadow-gray-500 rounded-full"
                    onClick={async (e) => {
                      e.preventDefault()
                      setIsDialogOpen(true)
                      if (!docLink) {
                        await handleUpload()
                      }
                    }}
                  >
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] min-h-[300px] bg-dialog text-dialog-foreground border-dialog-border">
                  <DialogHeader className="flex flex-col py-12 gap-8 px-8">
                    <DialogTitle className="text-2xl font-bold">Share Quote URL</DialogTitle>
                    <DialogDescription className="w-full">
                      {uploadStatus === "loading" ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin text-2xl">...</div>
                          <span className="ml-3 text-lg">Uploading document...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-3">
                          <Input
                            type="text"
                            value={docLink || ""}
                            readOnly
                            className="w-3/4 h-14 rounded-full text-lg px-6 bg-transparent !border-1 !border-gray-500 text-foreground"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-border text-foreground hover:bg-accent w-1/4 h-14 shadow-gray-500 rounded-full bg-primary text-primary-foreground"
                            onClick={() => {
                              navigator.clipboard.writeText(docLink || "")
                              toast.success("Copied to clipboard")
                            }}
                          >
                            <Copy className="h-4 w-4" /> Copy
                          </Button>
                        </div>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between mb-8">
              <div>
                <img
                  src="https://glenvill-bucket.s3.ap-southeast-1.amazonaws.com/rockship-logo.jpg"
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
                          <div className="flex gap-2">
                            <Input
                              value={item.item}
                              onChange={(e) => handleItemChange(index, "item", e.target.value)}
                              className="w-full"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 text-destructive"
                              onClick={() => handleDeleteItem(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
              {isEditing && (
                <Button
                  variant="outline"
                  className="mt-4 border-border text-foreground hover:bg-accent"
                  onClick={handleAddItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              )}
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-2">Notes:</h3>
              <ul className="list-disc list-inside space-y-2">
                {quoteData.notes.map((note, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Input
                          value={note}
                          onChange={(e) => handleEditNote(index, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteNote(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      note
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <div className="mt-4 flex flex-col gap-2">
                  <Input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-accent"
                    onClick={handleAddNote}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
