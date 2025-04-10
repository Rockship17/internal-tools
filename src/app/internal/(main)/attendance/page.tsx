import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AttendanceTable } from "@/components/admin/attendance/AttendanceTable"
import { Search, Calendar, Clock, CalendarDays } from "lucide-react"
import { Card } from "@/components/ui/card"
import CheckInButton from "@/components/admin/checkin-form/CheckInButton"
import CheckOutButton from "@/components/admin/checkin-form/CheckOutButton"
import CheckInTable from "@/components/admin/checkin-form/CheckInTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="space-y-4 lg:space-y-6 bg-white rounded-lg border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold">Attendance Management</h1>
            <p className="text-gray-500 mt-1">Track and manage employee attendance and check-ins</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="w-full lg:w-auto">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date().toLocaleDateString()}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 p-1 rounded-lg mb-4">
            <TabsTrigger
              value="attendance"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md transition-all duration-200 h-12"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Attendance Overview
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="checkin"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md transition-all duration-200 h-12"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Check-in/Check-out
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="p-3 lg:p-4">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="text-xl lg:text-2xl">{stat.icon}</div>
                    <div>
                      <p className="text-xs lg:text-sm text-gray-500">{stat.title}</p>
                      <p className="text-lg lg:text-2xl font-semibold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-white rounded-lg border p-6 flex flex-col lg:flex-row gap-3 lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input placeholder="Search employee..." className="pl-9" />
              </div>
              <div className="flex gap-3 overflow-x-auto py-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full lg:w-auto">
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
                  <SelectTrigger className="w-full lg:w-auto">
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

            <div className="bg-white rounded-lg border">
              <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
              <AttendanceTable />
            </div>
          </TabsContent>

          {/* Check-in Tab */}
          <TabsContent value="checkin" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h2 className="text-lg font-semibold">Quick Actions</h2>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                  <CheckInButton />
                  <CheckOutButton />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CalendarDays className="h-6 w-6 text-blue-600" />
                  <h2 className="text-lg font-semibold">Today's Summary</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <p className="text-sm text-green-600">Check-in Time</p>
                    <p className="mt-1 text-2xl font-bold text-green-700">--:--</p>
                  </div>
                  <div className="rounded-lg bg-red-50 p-4 text-center">
                    <p className="text-sm text-red-600">Check-out Time</p>
                    <p className="mt-1 text-2xl font-bold text-red-700">--:--</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-white rounded-lg border">
              <h2 className="text-lg font-semibold mb-4">Today's Check-ins</h2>
              <CheckInTable />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
