"use client"

import { Card } from "@/components/ui/card"
import { Users, UserCheck, FileText, Calendar } from "lucide-react"
import { RecentActivities } from "@/components/dashboard/RecentActivities"
import { AttendanceChart } from "@/components/dashboard/AttendanceChart"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Employees",
    value: "50",
    change: "+5%",
    changeType: "increase",
    icon: Users,
    description: "compared to last month",
    color: "blue",
  },
  {
    title: "Presence Rate",
    value: "90%",
    change: "-2%",
    changeType: "decrease",
    icon: UserCheck,
    description: "compared to last month",
    color: "green",
  },
  {
    title: "Pending Requests",
    value: "12",
    change: "+22%",
    changeType: "increase",
    icon: FileText,
    description: "compared to last month",
    color: "purple",
  },
  {
    title: "Days Worked in Month",
    value: "22",
    description: "Remaining 7 days",
    icon: Calendar,
    color: "yellow",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Hello Admin, this is the overview of the company.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-semibold mt-2">{stat.value}</h3>
                  {stat.change && (
                    <p
                      className={cn(
                        "text-sm mt-2 flex items-center gap-1",
                        stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {stat.change}
                      <span className="text-gray-500">{stat.description}</span>
                    </p>
                  )}
                  {!stat.change && <p className="text-sm mt-2 text-gray-500">{stat.description}</p>}
                </div>
                <div
                  className={cn("h-12 w-12 rounded-full flex items-center justify-center", {
                    "bg-blue-50 text-blue-600": stat.color === "blue",
                    "bg-green-50 text-green-600": stat.color === "green",
                    "bg-purple-50 text-purple-600": stat.color === "purple",
                    "bg-yellow-50 text-yellow-600": stat.color === "yellow",
                  })}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div
              className={cn("absolute bottom-0 left-0 right-0 h-1", {
                "bg-blue-500": stat.color === "blue",
                "bg-green-500": stat.color === "green",
                "bg-purple-500": stat.color === "purple",
                "bg-yellow-500": stat.color === "yellow",
              })}
            />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            Attendance Statistics by Day
          </h3>
          <AttendanceChart />
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
            Recent Activities
          </h3>
          <RecentActivities />
        </Card>
      </div>
    </div>
  )
}
