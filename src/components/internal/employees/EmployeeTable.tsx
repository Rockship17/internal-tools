import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
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
    name: "Nguyen Hoai Nam",
    email: "nguyenhoainam@gmail.com",
    department: "Developer",
    position: "Frontend Developer",
    startDate: "01/01/2023",
    status: "active",
  },
  {
    id: 2,
    name: "Ngô Xuân Thiệp",
    email: "ngoxuanthiep@gmail.com",
    department: "Developer",
    position: "Mobile Developer",
    startDate: "01/01/2023",
    status: "active",
  },
  {
    id: 3,
    name: "Le Van Bang",
    email: "levanbang@gmail.com",
    department: "Developer",
    position: "Frontend Developer",
    startDate: "10/05/2023",
    status: "active",
  },
  {
    id: 4,
    name: "Pham Minh Nhat",
    email: "phamminhnhat@gmail.com",
    department: "Developer",
    position: "Fullstack Developer",
    startDate: "20/06/2023",
    status: "inactive",
  },
  {
    id: 5,
    name: "Nguyen Minh Duy",
    email: "nguyenminhduy@gmail.com",
    department: "Developer",
    position: "Backend Developer",
    startDate: "05/09/2023",
    status: "active",
  },
]

export function EmployeeTable() {
  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:block rounded-lg border bg-card shadow-sm">
        <Table className="bg-card-foreground">
          <TableHeader>
            <TableRow className="hover:bg-muted-foreground/50">
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} className="hover:bg-muted-foreground/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/avatars/${employee.id}.png`} />
                      <AvatarFallback className="bg-muted-foreground text-muted-foreground">
                        {employee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                    {employee.department}
                  </div>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.startDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={employee.status === "active" ? "default" : "secondary"}
                    className={cn(
                      "capitalize whitespace-nowrap",
                      employee.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {employee.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-muted-foreground p-1 rounded-md">
                      <MoreHorizontal className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card-foreground">
                      <DropdownMenuItem className="text-blue-600">View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-yellow-600">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {employees.map((employee) => (
          <Card key={employee.id} className="bg-card-foreground rounded-lg border p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/avatars/${employee.id}.png`} />
                  <AvatarFallback className="bg-muted-foreground text-muted-foreground text-lg">
                    {employee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-base">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">{employee.email}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-muted-foreground p-1 rounded-md">
                  <MoreHorizontal className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-blue-600">View Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-yellow-600">Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Department</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                  <p>{employee.department}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Position</p>
                <p className="mt-1">{employee.position}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="mt-1">{employee.startDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <div className="mt-1">
                  <Badge
                    variant={employee.status === "active" ? "default" : "secondary"}
                    className={cn(
                      "capitalize",
                      employee.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {employee.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
