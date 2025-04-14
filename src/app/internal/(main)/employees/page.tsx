import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmployeeTable } from "@/components/admin/employees/EmployeeTable"
import { Download, Plus, Search, Users } from "lucide-react"

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-0 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h1 className="text-xl lg:text-2xl font-semibold">Employee Management</h1>
            </div>
            <p className="text-gray-500">Manage employee information for the company.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="justify-center border-dashed hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 group"
            >
              <Download className="w-4 h-4 mr-2 group-hover:text-blue-600" />
              Export to Excel
            </Button>
            <Button className="justify-center bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input placeholder="Search employee..." className="pl-9 bg-gray-50 border-0 focus-visible:ring-blue-500" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full lg:w-[180px] bg-gray-50 border-0 focus:ring-blue-500">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <EmployeeTable />
    </div>
  )
}
