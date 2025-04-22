"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AttendanceTable } from "@/components/internal/attendance/AttendanceTable"
import { Search, Calendar, Clock, CalendarDays } from "lucide-react"
import { Card } from "@/components/ui/card"
import CheckInButton from "@/components/internal/checkin-form/CheckInButton"
import CheckOutButton from "@/components/internal/checkin-form/CheckOutButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"

const stats = [
  {
    title: "Total Employees",
    value: "5",
    icon: "👥",
  },
  {
    title: "Present",
    value: "2",
    icon: "✅",
  },
  {
    title: "Remote Work",
    value: "1",
    icon: "💻",
  },
  {
    title: "Absent",
    value: "1",
    icon: "❌",
  },
  {
    title: "Leave",
    value: "1",
    icon: "📅",
  },
]

export default function AttendancePage() {
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null)

  const formatTime = (isoString: string | null) => {
    if (!isoString) return null
    const date = new Date(isoString)
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    })
  }

  const clearAttendanceDataIfNewDay = () => {
    const lastCheckInTime = localStorage.getItem("checkInTime")
    if (lastCheckInTime) {
      const lastCheckInDate = new Date(lastCheckInTime)
      const currentDate = new Date()

      if (lastCheckInDate.toDateString() !== currentDate.toDateString()) {
        localStorage.removeItem("checkInTime")
        localStorage.removeItem("checkOutTime")
        setCheckInTime(null)
        setCheckOutTime(null)
      }
    }
  }

  useEffect(() => {
    clearAttendanceDataIfNewDay()
    setCheckInTime(localStorage.getItem("checkInTime"))
    setCheckOutTime(localStorage.getItem("checkOutTime"))
  }, [])

  return (
    <div className="space-y-4 lg:space-y-6 bg-card rounded-lg border border-border p-0 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
            <h1 className="text-xl lg:text-2xl font-semibold text-foreground">Attendance Management</h1>
          </div>
          <p className="text-muted-foreground mt-1">Track and manage employee attendance and check-ins</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="w-full lg:w-auto border-border text-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date().toLocaleDateString()}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="checkin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 p-1 rounded-lg mb-4 bg-card border border-border">
          <TabsTrigger
            value="checkin"
            className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all duration-200 h-12"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Check-in/Check-out
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="attendance"
            className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all duration-200 h-12"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Attendance Overview
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Check-in Tab */}
        <TabsContent value="checkin" className="space-y-4">
          <div className="flex flex-col gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center min-h-[56px]">
                {!checkInTime && <CheckInButton onCheckIn={(time) => setCheckInTime(time)} />}
                {checkInTime && !checkOutTime && <CheckOutButton onCheckOut={(time) => setCheckOutTime(time)} />}
                {checkInTime && checkOutTime && (
                  <div className="text-center w-full text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-lg">✅</span>
                      You have completed check-in and check-out for today.
                    </span>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CalendarDays className="h-6 w-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-foreground">Today's Summary</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-green-50 p-4 text-center flex flex-col justify-between items-center">
                  <p className="text-sm text-green-600">Check-in Time</p>
                  <p className="mt-1 text-2xl font-bold text-green-700">{formatTime(checkInTime) || "--:--"}</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4 text-center flex flex-col justify-between items-center">
                  <p className="text-sm text-red-600">Check-out Time</p>
                  <p className="mt-1 text-2xl font-bold text-red-700">{formatTime(checkOutTime) || "--:--"}</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="p-3 lg:p-4 bg-card">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="text-xl lg:text-2xl text-primary">{stat.icon}</div>
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-lg lg:text-2xl font-semibold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-card rounded-lg border border-border p-6 flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search employee..." className="pl-9 bg-input text-foreground border-border" />
            </div>
            <div className="flex gap-3 overflow-x-auto py-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full lg:w-auto bg-background">
                  <SelectValue placeholder="All Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Department</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full lg:w-auto bg-background">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="remote">Remote Work</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="leave">Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-card rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
            <AttendanceTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
