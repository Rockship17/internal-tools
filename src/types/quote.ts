import * as z from "zod"

export interface QuoteItem {
    no: number
    item: string
    mandays: number
    costMilVND: number
}

export interface Company {
    name: string
    address: string
}

export interface QuoteData {
    recipient: string
    company: Company
    quotationItems: QuoteItem[]
    totalMandays: number
    totalOneTimeCostMilVND: number
    monthlyOperatingCostMilVND: number
    notes: string[]
}

export const formSchema = z.object({
    projectName: z.string().min(2, "Project name must be at least 2 characters"),
    clientName: z.string().min(2, "Client name must be at least 2 characters"),
    projectDescription: z.string().min(10, "Description must be at least 10 characters"),
    platform: z.string().min(0, "Please provide platform"),
    expectedTimeline: z.string().min(1, "Please provide expected timeline"),
    budget: z.string().regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid budget"),
})

export type QuoteFormValues = z.infer<typeof formSchema> 