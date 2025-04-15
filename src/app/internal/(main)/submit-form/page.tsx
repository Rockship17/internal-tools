"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestForm } from "@/components/internal/form-request/RequestForm"
import { RequestHistory } from "@/components/internal/form-request/RequestHistory"

export default function SubmitFormPage() {
  return (
    <div className="space-y-6 bg-background rounded-lg border p-0 lg:p-6">
      <div>
        <h1 className="text-2xl text-foreground font-semibold">Submit Form</h1>
        <p className="text-muted-foreground mt-1">Send leave request and view history of submitted requests.</p>
      </div>

      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger
            value="submit"
            className="flex-1 lg:flex-none data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Submit
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="flex-1 lg:flex-none data-[state=active]:bg-background data-[state=active]:shadow-sm"
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
