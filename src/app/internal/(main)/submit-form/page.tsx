"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestForm } from "@/components/internal/form-request/RequestForm"
import { RequestHistory } from "@/components/internal/form-request/RequestHistory"
import { Send } from "lucide-react"
export default function SubmitFormPage() {
  return (
    <div className="space-y-6 bg-background rounded-lg border p-0 lg:p-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Send className="h-5 w-5" />
          </div>
          <h1 className="text-xl lg:text-2xl font-semibold text-foreground">Submit Form</h1>
        </div>
        <p className="text-muted-foreground mt-1">Send leave request and view history of submitted requests.</p>
      </div>

      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList className="w-full bg-background">
          <TabsTrigger
            value="submit"
            className="flex-1 lg:flex-none data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground"
          >
            Submit
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="flex-1 lg:flex-none data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground"
          >
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submit">
          <RequestForm />
        </TabsContent>

        <TabsContent value="history">
          <RequestHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
