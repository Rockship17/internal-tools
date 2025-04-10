import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RequestTable } from "@/components/admin/requests/RequestTable"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Duyệt đơn từ</h1>
        <p className="text-gray-500 mt-1">Quản lý và duyệt các yêu cầu nghỉ phép và làm việc từ xa.</p>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="leave">Nghỉ phép</TabsTrigger>
            <TabsTrigger value="remote">Làm từ xa</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3">
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input placeholder="Tìm theo tên..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tất cả trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Đang chờ</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Đã từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <RequestTable />
        </TabsContent>
        <TabsContent value="leave" className="mt-6">
          <RequestTable type="leave" />
        </TabsContent>
        <TabsContent value="remote" className="mt-6">
          <RequestTable type="remote" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
