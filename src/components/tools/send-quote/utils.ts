export const cleanJsonResponse = (text: string): string => {
  return text
    .replace(/^```json\n?/, "")
    .replace(/\n?```$/, "")
    .trim()
} 