"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarDays, Clock, Timer } from "lucide-react"

interface CheckInRecord {
  id: string
  checkInTime: Date
  checkOutTime: Date | null
  workingHours: number | null
}

export default function CheckInTable() {
  const [records, setRecords] = useState<CheckInRecord[]>([])

  useEffect(() => {
    // TODO: Fetch records from API
    // For now, using mock data
    const mockRecords: CheckInRecord[] = [
      {
        id: "1",
        checkInTime: new Date("2024-03-20T08:00:00"),
        checkOutTime: new Date("2024-03-20T17:30:00"),
        workingHours: 9.5,
      },
      {
        id: "2",
        checkInTime: new Date("2024-03-19T08:30:00"),
        checkOutTime: new Date("2024-03-19T16:00:00"),
        workingHours: 7.5,
      },
    ]
    setRecords(mockRecords)
  }, [])

  const formatTime = (date: Date) => {
    return format(date, "HH:mm", { locale: vi })
  }

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy", { locale: vi })
  }

  const getWorkingHoursDisplay = (hours: number | null) => {
    if (hours === null) return "-"
    const diff = hours - 8
    const formattedDiff = Math.abs(diff).toFixed(1)
    const color = diff >= 0 ? "text-green-600" : "text-red-600"
    const sign = diff >= 0 ? "+" : "-"
    return <span className={color}>{`${sign}${formattedDiff} hours`}</span>
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {records.map((record) => (
          <div key={record.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                <span className="text-gray-500">Date</span>
                <span className="ml-auto font-medium text-gray-900">{formatDate(record.checkInTime)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-gray-500">Check-in</span>
                <span className="ml-auto font-medium text-green-600">{formatTime(record.checkInTime)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-gray-500">Check-out</span>
                <span className="ml-auto font-medium text-blue-600">
                  {record.checkOutTime ? formatTime(record.checkOutTime) : "---"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Timer className="h-4 w-4 text-purple-500" />
                <span className="text-gray-500">Working Hours</span>
                <span className="ml-auto font-medium">{getWorkingHoursDisplay(record.workingHours)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-hidden rounded-xl border bg-white shadow-sm lg:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50/50">
              <TableHead>Date</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Working Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id} className="hover:bg-gray-50/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{formatDate(record.checkInTime)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-600">{formatTime(record.checkInTime)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-blue-600">
                      {record.checkOutTime ? formatTime(record.checkOutTime) : "---"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">{getWorkingHoursDisplay(record.workingHours)}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
