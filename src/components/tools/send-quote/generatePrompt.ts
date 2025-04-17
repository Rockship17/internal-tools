import { QuoteFormValues } from "./types"

export const generatePrompt = (data: QuoteFormValues): string => {
  return `You are a software project estimator. Based on the provided project description, platform type, timeline, and budget, return a quotation table in JSON format using the following structure:

Input:
- Project Name: ${data.projectName}
- Client Name: ${data.clientName}
- Project Description: ${data.projectDescription}
- Platform: ${data.platform}
- Timeline: ${data.expectedTimeline}
- Budget: ${data.budget} VND

- Each item should include: number (index), item name, estimated mandays, and cost in million VND.
- Also include the total mandays, total one-time cost, and estimated monthly operating cost.
- Add a note on estimated development timeline in weeks.

Please return only a valid JSON object using this schema:

{
  "recipient": "Client name (placeholder)",
  "company": {
    "name": "Rockship Pte. Ltd.",
    "address": "OXLEY BIZHUB, 73 UBI ROAD 1, #08-54, Postal 408733"
  },
  "quotationItems": [
    {
      "no": number,
      "item": "Task or phase description",
      "mandays": number,
      "costMilVND": number
    }
    ...
  ],
  "totalMandays": number,
  "totalOneTimeCostMilVND": number,
  "monthlyOperatingCostMilVND": number,
  "notes": [
    "Estimated development timeline is around X weeks"
  ]
}
`
} 