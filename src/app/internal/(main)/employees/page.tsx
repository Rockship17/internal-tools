import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmployeeTable } from "@/components/internal/employees/EmployeeTable"
import { Download, Plus, Search, Users } from "lucide-react"

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h1 className="text-xl lg:text-2xl font-semibold text-foreground">Employee Management</h1>
            </div>
            <p className="text-muted-foreground">Manage and track all employees in the company.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Employee
            </Button>
            <Button variant="outline" className="border-border text-foreground">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search employee..."
              className="pl-9 bg-input text-foreground border-border focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full lg:w-[180px] bg-input border-border">
              <SelectValue placeholder="All" className="text-foreground" />
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
