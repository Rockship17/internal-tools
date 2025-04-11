import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Request = {
  id: number
  employee: {
    name: string
    email: string
    avatar?: string
  }
  type: "leave" | "remote"
  period: string
  reason: string
  status: "pending" | "approved" | "rejected"
}

const requests: Request[] = [
  {
    id: 1,
    employee: {
      name: "Nguyen Hoai Nam",
      email: "nguyenhoainam@gmail.com",
    },
    type: "leave",
    period: "From: 15/04/2023\nTo: 17/04/2023",
    reason: "Có việc gia đình cần giải quyết.",
    status: "pending",
  },
  {
    id: 2,
    employee: {
      name: "Ngo Xuan Thiep",
      email: "ngoxuanthiep@gmail.com",
    },
    type: "remote",
    period: "From: 16/04/2023\nTo: 16/04/2023",
    reason: "Cần làm việc từ xa để chăm con bị ốm.",
    status: "approved",
  },
  {
    id: 3,
    employee: {
      name: "Le Van Bang",
      email: "levanbang@gmail.com",
    },
    type: "leave",
    period: "From: 20/04/2023\nTo: 25/04/2023",
    reason: "Đi du lịch cùng gia đình.",
    status: "rejected",
  },
  {
    id: 4,
    employee: {
      name: "Pham Minh Nhat",
      email: "phamminhnhat@gmail.com",
    },
    type: "remote",
    period: "From: 18/04/2023\nTo: 19/04/2023",
    reason: "Có cuộc họp khách hàng ở xa.",
    status: "pending",
  },
]

interface RequestTableProps {
  type?: "leave" | "remote"
}

export function RequestTable({ type }: RequestTableProps) {
  const filteredRequests = type ? requests.filter((request) => request.type === type) : requests

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:block rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50/50">
              <TableHead>Employee</TableHead>
              <TableHead>Request Type</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id} className="hover:bg-gray-50/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={request.employee.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {request.employee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.employee.name}</p>
                      <p className="text-sm text-gray-500">{request.employee.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={request.type === "leave" ? "default" : "secondary"}
                    className={cn(
                      "whitespace-nowrap",
                      request.type === "leave"
                        ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                    )}
                  >
                    {request.type === "leave" ? "Leave" : "Remote Work"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {request.period.split("\n").map((line, index) => (
                    <p key={index} className="text-sm">
                      {line}
                    </p>
                  ))}
                </TableCell>
                <TableCell>
                  <p className="max-w-[300px] truncate" title={request.reason}>
                    {request.reason}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "pending"
                        ? "default"
                        : request.status === "approved"
                        ? "outline"
                        : "destructive"
                    }
                    className={cn(
                      "whitespace-nowrap",
                      request.status === "pending"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : request.status === "approved"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    )}
                  >
                    {request.status === "pending" ? "Pending" : request.status === "approved" ? "Approved" : "Rejected"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {request.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg border p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={request.employee.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {request.employee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-base">{request.employee.name}</h3>
                  <p className="text-sm text-gray-500">{request.employee.email}</p>
                </div>
              </div>
              {request.status === "pending" && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant={request.type === "leave" ? "default" : "secondary"}
                className={cn(
                  request.type === "leave"
                    ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                )}
              >
                {request.type === "leave" ? "Leave" : "Remote Work"}
              </Badge>
              <Badge
                variant={
                  request.status === "pending" ? "default" : request.status === "approved" ? "outline" : "destructive"
                }
                className={cn(
                  request.status === "pending"
                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    : request.status === "approved"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-red-100 text-red-700 hover:bg-red-100"
                )}
              >
                {request.status === "pending" ? "Pending" : request.status === "approved" ? "Approved" : "Rejected"}
              </Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Period</p>
                <div className="mt-1 space-y-1">
                  {request.period.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-500">Reason</p>
                <p className="mt-1">{request.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
