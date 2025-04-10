import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Employee = {
  id: number
  name: string
  email: string
  department: string
  position: string
  startDate: string
  status: "active" | "inactive"
}

const employees: Employee[] = [
  {
    id: 1,
    name: "Nguyễn Hoài Nam",
    email: "nguyenhoainam@gmail.com",
    department: "Lập trình viên",
    position: "Lập trình viên Frontend",
    startDate: "01/01/2023",
    status: "active",
  },
  {
    id: 2,
    name: "Ngô Xuân Thiệp",
    email: "ngoxuanthiep@gmail.com",
    department: "Lập trình viên",
    position: "Lập trình viên Mobile",
    startDate: "01/01/2023",
    status: "active",
  },
  {
    id: 3,
    name: "Lê Văn Bằng",
    email: "levanbang@gmail.com",
    department: "Lập trình viên",
    position: "Lập trình viên Frontend",
    startDate: "10/05/2023",
    status: "active",
  },
  {
    id: 4,
    name: "Phạm Minh Nhật",
    email: "phamminhnhat@gmail.com",
    department: "Lập trình viên",
    position: "Lập trình viên Fullstack",
    startDate: "20/06/2023",
    status: "inactive",
  },
  {
    id: 5,
    name: "Nguyễn Minh Duy",
    email: "nguyenminhduy@gmail.com",
    department: "Lập trình viên",
    position: "Lập trình viên Backend",
    startDate: "05/09/2023",
    status: "active",
  },
]

export function EmployeeTable() {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50/50">
            <TableHead>Nhân viên</TableHead>
            <TableHead>Phòng ban</TableHead>
            <TableHead>Chức vụ</TableHead>
            <TableHead>Ngày vào làm</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[100px]">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} className="hover:bg-gray-50/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/avatars/${employee.id}.png`} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">{employee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {employee.department}
                </div>
              </TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.startDate}</TableCell>
              <TableCell>
                <Badge
                  variant={employee.status === "active" ? "default" : "secondary"}
                  className={cn(
                    "capitalize",
                    employee.status === "active"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {employee.status === "active" ? "Đang làm việc" : "Đã nghỉ việc"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:bg-gray-100 p-1 rounded-md">
                    <MoreHorizontal className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-blue-600">Xem chi tiết</DropdownMenuItem>
                    <DropdownMenuItem className="text-yellow-600">Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
