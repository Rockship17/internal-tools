"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestForm } from "@/components/admin/form-request/RequestForm"
import { RequestHistory } from "@/components/admin/form-request/RequestHistory"

export default function SubmitFormPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Đơn từ</h1>
        <p className="text-gray-500 mt-1">Gửi yêu cầu nghỉ phép và xem lịch sử các đơn đã gửi.</p>
      </div>

      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList>
          <TabsTrigger value="submit">Gửi đơn</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
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
