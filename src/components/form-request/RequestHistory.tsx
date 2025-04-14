"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
    reason: "Annual Leave",
    status: "approved",
    approver: "Nguyen Van A",
    approvedAt: new Date("2024-03-18"),
  },
  {
    id: "2",
    type: "remote",
    startDate: new Date("2024-03-25"),
    endDate: new Date("2024-03-25"),
    duration: 1,
    reason: "Remote Work",
    status: "pending",
  },
]

const statusText = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
}

const requestTypes = {
  leave: "Leave",
  remote: "Remote Work",
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
            placeholder="Search..."
            className="pl-9"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredRequests.map((request) => (
          <div key={request.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{requestTypes[request.type as keyof typeof requestTypes]}</p>
                <p className="text-sm text-gray-500">
                  {format(request.startDate, "dd/MM/yyyy")} - {format(request.endDate, "dd/MM/yyyy")}
                </p>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "whitespace-nowrap font-medium",
                  request.status === "approved" && "bg-green-50 text-green-700 border-green-200",
                  request.status === "pending" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                  request.status === "rejected" && "bg-red-50 text-red-700 border-red-200"
                )}
              >
                {statusText[request.status]}
              </Badge>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium text-gray-900">{request.duration} days</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Reason</span>
                <span className="font-medium text-gray-900">{request.reason}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Approver</span>
                <span className="font-medium text-gray-900">{request.approver || "-"}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Approval Date</span>
                <span className="font-medium text-gray-900">
                  {request.approvedAt ? format(request.approvedAt, "dd/MM/yyyy") : "-"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50/50">
              <TableHead>Request Type</TableHead>
              <TableHead>Time Period</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approver</TableHead>
              <TableHead>Approval Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">{requestTypes[request.type as keyof typeof requestTypes]}</TableCell>
                <TableCell>
                  {format(request.startDate, "dd/MM/yyyy")} - {format(request.endDate, "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{request.duration} days</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "whitespace-nowrap font-medium",
                      request.status === "approved" && "bg-green-50 text-green-700 border-green-200",
                      request.status === "pending" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                      request.status === "rejected" && "bg-red-50 text-red-700 border-red-200"
                    )}
                  >
                    {statusText[request.status]}
                  </Badge>
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
