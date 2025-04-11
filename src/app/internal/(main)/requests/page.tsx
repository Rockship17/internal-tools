import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RequestTable } from "@/components/admin/requests/RequestTable"
import { Search, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RequestsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <h1 className="text-xl lg:text-2xl font-semibold">Request Management</h1>
            </div>
            <p className="text-gray-500">Manage and approve leave and remote work requests.</p>
          </div>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <TabsList className="w-full lg:w-auto bg-gray-50 p-1 rounded-lg">
                <TabsTrigger
                  value="all"
                  className="flex-1 lg:flex-none data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="leave"
                  className="flex-1 lg:flex-none data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Leave
                </TabsTrigger>
                <TabsTrigger
                  value="remote"
                  className="flex-1 lg:flex-none data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Remote Work
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-[300px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input placeholder="Search by name..." className="pl-9 w-full bg-gray-50 border-0" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full lg:w-[180px] bg-gray-50 border-0">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="mt-6">
              <RequestTable />
            </TabsContent>
            <TabsContent value="leave" className="mt-6">
              <RequestTable type="leave" />
            </TabsContent>
            <TabsContent value="remote" className="mt-6">
              <RequestTable type="remote" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
