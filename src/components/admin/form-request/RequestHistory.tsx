"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { format } from "date-fns"

type RequestStatus = "pending" | "approved" | "rejected"

type Request = {
  id: string
  type: string
  startDate: Date
  endDate: Date
  duration: number
  reason: string
  status: RequestStatus
  approver?: string
  approvedAt?: Date
}

const mockRequests: Request[] = [
  {
    id: "1",
    type: "leave",
    startDate: new Date("2024-03-20"),
    endDate: new Date("2024-03-22"),
    duration: 3,
    reason: "Nghỉ phép năm",
    status: "approved",
    approver: "Nguyễn Văn A",
    approvedAt: new Date("2024-03-18"),
  },
  {
    id: "2",
    type: "remote",
    startDate: new Date("2024-03-25"),
    endDate: new Date("2024-03-25"),
    duration: 1,
    reason: "Làm việc từ xa",
    status: "pending",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

const statusText = {
  pending: "Đang chờ",
  approved: "Đã duyệt",
  rejected: "Từ chối",
}

const requestTypes = {
  leave: "Nghỉ phép",
  remote: "Làm việc từ xa",
}

export function RequestHistory() {
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.reason.toLowerCase().includes(searchText.toLowerCase()) ||
      request.approver?.toLowerCase().includes(searchText.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-9"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="pending">Đang chờ</SelectItem>
            <SelectItem value="approved">Đã duyệt</SelectItem>
            <SelectItem value="rejected">Từ chối</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loại đơn</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Số ngày</TableHead>
              <TableHead>Lý do</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Người duyệt</TableHead>
              <TableHead>Ngày duyệt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{requestTypes[request.type]}</TableCell>
                <TableCell>
                  {format(request.startDate, "dd/MM/yyyy")}
                  {" - "}
                  {format(request.endDate, "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{request.duration}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[request.status]
                    }`}
                  >
                    {statusText[request.status]}
                  </span>
                </TableCell>
                <TableCell>{request.approver || "-"}</TableCell>
                <TableCell>{request.approvedAt ? format(request.approvedAt, "dd/MM/yyyy") : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
