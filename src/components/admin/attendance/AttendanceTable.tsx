import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Employee = {
  id: number
  name: string
  email: string
  department: string
  checkIn: string | null
  checkOut: string | null
  workingHours: string | null
  status: "present" | "remote" | "absent" | "leave"
}

const employees: Employee[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    department: "Kỹ thuật",
    checkIn: "08:45",
    checkOut: "17:30",
    workingHours: "8.75 giờ",
    status: "present"
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    department: "Marketing",
    checkIn: "09:10",
    checkOut: "18:05",
    workingHours: "8.92 giờ",
    status: "present"
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    department: "Kỹ thuật",
    checkIn: null,
    checkOut: null,
    workingHours: null,
    status: "absent"
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    department: "Nhân sự",
    checkIn: null,
    checkOut: null,
    workingHours: null,
    status: "leave"
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    department: "Kinh doanh",
    checkIn: "08:30",
    checkOut: "17:45",
    workingHours: "9.25 giờ",
    status: "remote"
  }
]

export function AttendanceTable() {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50/50">
            <TableHead>Nhân viên</TableHead>
            <TableHead>Phòng ban</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Số giờ làm</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} className="hover:bg-gray-50/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/avatars/${employee.id}.png`} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {employee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    {
                      "bg-blue-500": employee.department === "Kỹ thuật",
                      "bg-purple-500": employee.department === "Marketing",
                      "bg-yellow-500": employee.department === "Nhân sự",
                      "bg-green-500": employee.department === "Kinh doanh"
                    }
                  )}></span>
                  {employee.department}
                </div>
              </TableCell>
              <TableCell>
                {employee.checkIn ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-green-600 font-medium">{employee.checkIn}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">---</span>
                )}
              </TableCell>
              <TableCell>
                {employee.checkOut ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-blue-600 font-medium">{employee.checkOut}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">---</span>
                )}
              </TableCell>
              <TableCell>
                {employee.workingHours ? (
                  <span className="font-medium">{employee.workingHours}</span>
                ) : (
                  <span className="text-gray-400">---</span>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    employee.status === "present"
                      ? "default"
                      : employee.status === "remote"
                      ? "secondary"
                      : employee.status === "leave"
                      ? "outline"
                      : "destructive"
                  }
                  className={cn(
                    employee.status === "present"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : employee.status === "remote"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      : employee.status === "leave"
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                  )}
                >
                  {employee.status === "present"
                    ? "Có mặt"
                    : employee.status === "remote"
                    ? "Làm từ xa"
                    : employee.status === "leave"
                    ? "Nghỉ phép"
                    : "Vắng mặt"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 