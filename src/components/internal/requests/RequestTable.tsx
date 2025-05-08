"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Request = {
  id: string
  user_id: number
  user_name: string
  full_name: string
  request_for: string
  type: string
  start_date: string
  end_date: string
  time_action: string
  reason: string
  status: string
}

interface RequestTableProps {
  type?: "leave" | "remote"
  status?: string
}

export function RequestTable({ type, status }: RequestTableProps) {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; action: string; request: Request | null }>({
    isOpen: false,
    action: "",
    request: null,
  })

  const filteredRequests = requests.filter((request) => {
    // Filter by type if specified
    const typeMatches = type
      ? type === "leave"
        ? request.request_for.toLowerCase().includes("time/day off")
        : type === "remote"
        ? request.request_for.toLowerCase().includes("remote work")
        : true
      : true

    // Filter by status, default to Pending if not specified
    const statusMatches = status ? request.status === status : request.status === "Pending"

    return typeMatches && statusMatches
  })

  const handleUpdateStatus = async (status: string, userId: number, userName: string, id: string) => {
    try {
      setLoading(true)
      setConfirmDialog({ isOpen: false, action: "", request: null })

      const response = await fetch("https://n8n.rockship.co/webhook/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          user_id: userId,
          status: status,
        }),
      })

      const data = await response.json()
      console.log("Status update response:", data)

      if (status === "Approve") {
        toast.success(`Approved ${userName} form request successfully`)
      } else if (status === "Reject") {
        toast.success(`Rejected ${userName} form request successfully`)
      }

      await fetchRequests()
      console.log("Data reloaded after status update")
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const openConfirmDialog = (action: string, request: Request) => {
    setConfirmDialog({
      isOpen: true,
      action,
      request,
    })
  }

  const fetchRequests = async () => {
    try {
      console.log("Fetching updated request data...")
      const response = await fetch("https://n8n.rockship.co/webhook/get-form-request")
      const data = await response.json()
      console.log("API response:", data)

      if (data && !Array.isArray(data)) {
        setRequests([data])
      } else if (Array.isArray(data)) {
        setRequests(data)
      } else {
        setRequests([])
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
    fetchRequests()
  }, [])
  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:block rounded-lg border shadow-sm">
        <Table className="bg-card">
          <TableHeader className="bg-primary">
            <TableRow className="hover:bg-muted-foreground/50">
              <TableHead className="text-primary-foreground">Employee</TableHead>
              <TableHead className="text-primary-foreground">Request For</TableHead>
              <TableHead className="text-primary-foreground">Request Type</TableHead>
              <TableHead className="text-primary-foreground">Period</TableHead>
              <TableHead className="text-primary-foreground">Reason</TableHead>
              <TableHead className="text-primary-foreground">Status</TableHead>
              <TableHead className="text-primary-foreground w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request, index) => (
              <TableRow key={`${request.user_name}-${index}`} className="hover:bg-gray-50/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {request.full_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.full_name}</p>
                    </div>
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
                <TableCell>{request.type}</TableCell>
                <TableCell>
                  <p className="whitespace-nowrap">From: {request.start_date}</p>
                  <p className="whitespace-nowrap">To: {request.end_date}</p>
                </TableCell>
                <TableCell>
                  <p className="max-w-[300px] truncate" title={request.reason}>
                    {request.reason}
                  </p>
                </TableCell>
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
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 cursor-pointer"
                      onClick={() => openConfirmDialog("Approve", request)}
                      disabled={loading}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 cursor-pointer"
                      onClick={() => openConfirmDialog("Reject", request)}
                      disabled={loading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {filteredRequests.map((request, index) => (
          <Card key={`${request.user_name}-${index}`} className="bg-card rounded-lg border p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {request.full_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-base">{request.full_name}</h3>
                </div>
              </div>
              {request.status !== "Approve" && request.status !== "Reject" && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleUpdateStatus("Approve", request.user_id, request.full_name, request.id)}
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 cursor-pointer"
                    disabled={loading}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleUpdateStatus("Reject", request.user_id, request.full_name, request.id)}
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 cursor-pointer"
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                className={cn(
                  "whitespace-nowrap",
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
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Period</p>
                <p className="mt-1">
                  {request.start_date} - {request.end_date}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Reason</p>
                <p className="mt-1">{request.reason}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.isOpen}
        onOpenChange={(open) => !open && setConfirmDialog({ ...confirmDialog, isOpen: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmDialog.action === "Approve" ? "Approve request" : "Reject request"}</DialogTitle>
            <DialogDescription>
              {confirmDialog.action === "Approve"
                ? `Are you sure you want to approve the request of ${confirmDialog.request?.full_name}?`
                : `Are you sure you want to reject the request of ${confirmDialog.request?.full_name}?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-card text-card-foreground cursor-pointer"
              variant="outline"
              onClick={() => setConfirmDialog({ isOpen: false, action: "", request: null })}
            >
              Cancel
            </Button>
            <Button
              variant={confirmDialog.action === "Approve" ? "default" : "destructive"}
              className="bg-card text-card-foreground cursor-pointer"
              onClick={() =>
                confirmDialog.request &&
                handleUpdateStatus(
                  confirmDialog.action,
                  confirmDialog.request.user_id,
                  confirmDialog.request.full_name,
                  confirmDialog.request.id
                )
              }
              disabled={loading}
            >
              {confirmDialog.action === "Approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
