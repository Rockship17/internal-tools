import { QuoteFormValues } from "@/types/quote"

export const quotePrompt = (data: QuoteFormValues): string => {
  return `You are a software project estimator from Rockship Pte. Ltd. Your task is to provide a professional project quotation based on the following client and project data.

Please analyze the project scope, platform type, budget, and timeline. Break the project down into realistic development items (e.g., requirement analysis, UI/UX design, frontend, backend, testing, deployment, etc.) and assign appropriate mandays and cost estimation per item.

IMPORTANT:
Estimate mandays and cost based on real-world market rates by referencing freelance platforms and job boards such as Upwork, ITviec, TopDev, Freelancer.com, and similar. Use a standard market rate range (typically 2M–4M VND per manday depending on complexity and role type).

Return the result in valid JSON format only using this schema:

{
  "recipient": "${data.clientName}",
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
Input parameters:

Project Name: ${data.projectName}

Client Name: ${data.clientName}

Project Description: ${data.projectDescription}

Platform: ${data.platform}

Timeline: ${data.expectedTimeline}

Budget: ${data.budget} VND

Guidelines:

Use realistic and justifiable estimates.

Adjust effort and price according to the platform complexity (e.g., Web, iOS, Android, Cross-platform, Backend only).

Include standard items like PM, QA, DevOps, and buffer time if applicable.

Ensure total cost does not exceed the provided budget, but still reflects realistic quality output.

Return the output as a clean JSON response, with no extra explanation or markdown.
`
} 