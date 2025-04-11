"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestForm } from "@/components/admin/form-request/RequestForm"
import { RequestHistory } from "@/components/admin/form-request/RequestHistory"

export default function SubmitFormPage() {
  return (
    <div className="space-y-6 bg-white rounded-lg border p-6">
      <div>
        <h1 className="text-2xl font-semibold">Submit Form</h1>
        <p className="text-gray-500 mt-1">Send leave request and view history of submitted requests.</p>
      </div>

      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger
            value="submit"
            className="flex-1 lg:flex-none data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Submit
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="flex-1 lg:flex-none data-[state=active]:bg-white data-[state=active]:shadow-sm"
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
