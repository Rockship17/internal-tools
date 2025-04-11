import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
    name: "Nguyen Hoai Nam",
    email: "nguyenhoainam@gmail.com",
    department: "Tech",
    checkIn: "08:45",
    checkOut: "17:30",
    workingHours: "8.75 hours",
    status: "present",
  },
  {
    id: 2,
    name: "Ngo Xuan Thiep",
    email: "ngoxuanthiep@gmail.com",
    department: "Marketing",
    checkIn: "09:10",
    checkOut: "18:05",
    workingHours: "8.92 hours",
    status: "present",
  },
  {
    id: 3,
    name: "Le Van Bang",
    email: "levanbang@gmail.com",
    department: "Tech",
    checkIn: null,
    checkOut: null,
    workingHours: null,
    status: "absent",
  },
  {
    id: 4,
    name: "Pham Minh Nhat",
    email: "phamminhnhat@gmail.com",
    department: "HR",
    checkIn: null,
    checkOut: null,
    workingHours: null,
    status: "leave",
  },
  {
    id: 5,
    name: "Nguyen Minh Duy",
    email: "nguyenminhduy@gmail.com",
    department: "Business",
    checkIn: "08:30",
    checkOut: "17:45",
    workingHours: "9.25 hours",
    status: "remote",
  },
]

export function AttendanceTable() {
  return (
    <div className="space-y-4">
      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {employees.map((employee) => (
          <div key={employee.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`/avatars/${employee.id}.png`} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "whitespace-nowrap font-medium",
                  employee.status === "present" && "bg-green-50 text-green-700 border-green-200",
                  employee.status === "remote" && "bg-blue-50 text-blue-700 border-blue-200",
                  employee.status === "leave" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                  employee.status === "absent" && "bg-red-50 text-red-700 border-red-200"
                )}
              >
                {employee.status === "present"
                  ? "Present"
                  : employee.status === "remote"
                  ? "Remote Work"
                  : employee.status === "leave"
                  ? "On Leave"
                  : "Absent"}
              </Badge>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Department</span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn("w-2 h-2 rounded-full", {
                      "bg-blue-500": employee.department === "Engineering",
                      "bg-purple-500": employee.department === "Marketing",
                      "bg-yellow-500": employee.department === "Human Resources",
                      "bg-green-500": employee.department === "Business",
                    })}
                  />
                  <span className="font-medium text-gray-900">{employee.department}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Check-in</span>
                <span className="font-medium text-green-600">{employee.checkIn || "---"}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Check-out</span>
                <span className="font-medium text-blue-600">{employee.checkOut || "---"}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Working Hours</span>
                <span className="font-medium text-gray-900">{employee.workingHours || "---"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50/50">
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Working Hours</TableHead>
              <TableHead>Status</TableHead>
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
                    <span
                      className={cn("w-2 h-2 rounded-full", {
                        "bg-blue-500": employee.department === "Engineering",
                        "bg-purple-500": employee.department === "Marketing",
                        "bg-yellow-500": employee.department === "Human Resources",
                        "bg-green-500": employee.department === "Business",
                      })}
                    />
                    <span className="font-medium">{employee.department}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-green-600">{employee.checkIn || "---"}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-blue-600">{employee.checkOut || "---"}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{employee.workingHours || "---"}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "whitespace-nowrap font-medium",
                      employee.status === "present" && "bg-green-50 text-green-700 border-green-200",
                      employee.status === "remote" && "bg-blue-50 text-blue-700 border-blue-200",
                      employee.status === "leave" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                      employee.status === "absent" && "bg-red-50 text-red-700 border-red-200"
                    )}
                  >
                    {employee.status === "present"
                      ? "Present"
                      : employee.status === "remote"
                      ? "Remote Work"
                      : employee.status === "leave"
                      ? "On Leave"
                      : "Absent"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
