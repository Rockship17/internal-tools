import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AttendanceTable } from "@/components/admin/attendance/AttendanceTable"
import { Search, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    title: "Tổng nhân viên",
    value: "5",
    icon: "👥"
  },
  {
    title: "Có mặt",
    value: "2",
    icon: "✅"
  },
  {
    title: "Làm từ xa",
    value: "1",
    icon: "💻"
  },
  {
    title: "Vắng mặt",
    value: "1",
    icon: "❌"
  },
  {
    title: "Nghỉ phép",
    value: "1",
    icon: "📅"
  }
]

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Theo dõi chuyên cần</h1>
          <p className="text-gray-500 mt-1">
            Quản lý và theo dõi chuyên cần của nhân viên.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            09/04/2025
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Tìm nhân viên..."
            className="pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tất cả phòng ban" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả phòng ban</SelectItem>
            <SelectItem value="tech">Kỹ thuật</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="hr">Nhân sự</SelectItem>
            <SelectItem value="business">Kinh doanh</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="present">Có mặt</SelectItem>
            <SelectItem value="remote">Làm từ xa</SelectItem>
            <SelectItem value="absent">Vắng mặt</SelectItem>
            <SelectItem value="leave">Nghỉ phép</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AttendanceTable />
    </div>
  )
} 