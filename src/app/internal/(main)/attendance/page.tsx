import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AttendanceTable } from "@/components/admin/attendance/AttendanceTable"
import { Search, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

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
            <h1 className="text-xl lg:text-2xl font-semibold">Attendance Tracking</h1>
            <p className="text-gray-500 mt-1">Manage and track employee attendance.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="w-full lg:w-auto">
              <Calendar className="w-4 h-4 mr-2" />
              09/04/2025
            </Button>
          </div>
        </div>

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
      </div>

      <div className="bg-white rounded-lg border p-6 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input placeholder="Search employee..." className="pl-9" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
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

      <AttendanceTable />
    </div>
  )
}
