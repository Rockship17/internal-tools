"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Request = {
  id: string
  type: string
  start_date: string
  full_name: string
  end_date: string
  duration: number
  reason: string
  status: string
  request_for: string
  user_id: string
  approver?: string
  approvedAt?: string
}

export function RequestHistory() {
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [requests, setRequests] = useState<Request[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const fetchRequests = async () => {
    try {
      console.log("Fetching updated request data...")

      const response = await fetch(`https://n8n.rockship.co/webhook/get-form-request`)
      const data = await response.json()
      console.log("API response:", data)

      let allRequests: Request[] = []
      if (data && !Array.isArray(data)) {
        allRequests = [data]
      } else if (Array.isArray(data)) {
        allRequests = data
      }

      if (userId) {
        console.log("Filtering requests for user ID:", userId)
        const userRequests = allRequests.filter((request) => request.user_id === userId)
        console.log("Filtered requests:", userRequests)
        setRequests(userRequests)
      } else {
        console.warn("No user ID in localStorage, showing all requests")
        setRequests(allRequests)
      }

      console.log("Request data updated successfully")
      return data
    } catch (error) {
      console.error("Error fetching requests:", error)
      setRequests([])
      return null
    }
  }

  useEffect(() => {
    const storedUserId = typeof window !== "undefined" ? localStorage.getItem("id") : null
    console.log("User id:", storedUserId)
    setUserId(storedUserId)
  }, [])

  useEffect(() => {
    if (userId) {
      console.log("Fetching requests with userId:", userId)
      fetchRequests()
    }
  }, [userId])
  const filteredRequests = requests.filter((request) => {
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
            className="pl-9 bg-input text-foreground"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-input text-foreground">
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
          <div key={request.id} className="rounded-lg border bg-card p-5 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-3 pb-3 border-b">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">{request.full_name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{request.type}</p>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "ml-2 whitespace-nowrap font-medium px-3 py-1.5 text-xs",
                  request.status === "Pending" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                  request.status === "Approve" && "bg-green-50 text-green-700 border-green-200",
                  request.status === "Reject" && "bg-red-50 text-red-700 border-red-200"
                )}
              >
                {request.status}
              </Badge>
            </div>

            <div className="mb-4">
              <Badge
                className={cn(
                  "h-7 px-3 text-xs font-normal",
                  request.request_for.includes("Time/Day off")
                    ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                    : request.request_for.includes("Remote work")
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                    : request.request_for.includes("Delayed arrival")
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                    : "bg-red-100 text-red-700 hover:bg-red-100"
                )}
              >
                {request.request_for}
              </Badge>
            </div>

            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="font-medium text-sm text-black">{request.start_date}</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs text-muted-foreground">To</p>
                  <p className="font-medium text-sm text-black">{request.end_date}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Duration</span>
                <span className="font-medium text-sm text-black">{request.duration} days</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">Reason</p>
              <p className="text-sm p-2 bg-gray-50 rounded border border-gray-100 text-black">{request.reason}</p>
            </div>

            <div className="mt-4 pt-3 border-t flex items-center justify-between text-sm">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Approver</p>
                <p className="font-medium text-sm">Huy Đặng</p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-xs text-muted-foreground">Approval Date</p>
                <p className="font-medium text-sm">09/05/2025</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border shadow-sm">
        <Table className="bg-card">
          <TableHeader className="bg-primary">
            <TableRow className="hover:bg-gray-50/50">
              <TableHead className="text-primary-foreground">Employee</TableHead>
              <TableHead className="text-primary-foreground">Request For</TableHead>
              <TableHead className="text-primary-foreground">Request Type</TableHead>
              <TableHead className="text-primary-foreground">Time Period</TableHead>
              <TableHead className="text-primary-foreground">Duration</TableHead>
              <TableHead className="text-primary-foreground">Reason</TableHead>
              <TableHead className="text-primary-foreground">Status</TableHead>
              <TableHead className="text-primary-foreground">Approver</TableHead>
              <TableHead className="text-primary-foreground">Approval Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id} className="hover:bg-gray-50/50">
                <TableCell>
                  <div>
                    <p className="font-medium">{request.full_name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "h-8 whitespace-nowrap",
                      request.request_for.includes("Time/Day off")
                        ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                        : request.request_for.includes("Remote work")
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        : request.request_for.includes("Delayed arrival")
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    )}
                  >
                    {request.request_for}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{request.type}</TableCell>
                <TableCell>
                  <p className="whitespace-nowrap">From: {request.start_date}</p>
                  <p className="whitespace-nowrap">To: {request.end_date}</p>
                </TableCell>
                <TableCell>{request.duration} days</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                  <Badge
                    variant="default"
                    className={cn(
                      request.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : request.status === "Approve"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    )}
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>Huy Đặng</TableCell>
                <TableCell>09/05/2025</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
