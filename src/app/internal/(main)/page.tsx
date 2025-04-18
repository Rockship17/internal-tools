"use client"

import { Card } from "@/components/ui/card"
import { Users, UserCheck, FileText, Calendar, Home } from "lucide-react"
import { RecentActivities } from "@/components/internal/dashboard/RecentActivities"
import { AttendanceChart } from "@/components/internal/dashboard/AttendanceChart"
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
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Home className="h-5 w-5" />
          </div>
          <h1 className="text-xl lg:text-2xl font-semibold text-foreground">Dashboard</h1>
        </div>
        <p className="text-muted-foreground mt-1">Hello Admin, this is the overview of the company.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden bg-card">
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-semibold mt-2 text-foreground">{stat.value}</h3>
                  {stat.change && (
                    <p
                      className={cn(
                        "text-sm mt-2 flex items-center gap-1",
                        stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {stat.change}
                      <span className="text-muted-foreground">{stat.description}</span>
                    </p>
                  )}
                  {!stat.change && <p className="text-sm mt-2 text-muted-foreground">{stat.description}</p>}
                </div>
                <div
                  className={cn("h-12 w-12 rounded-full flex items-center justify-center", {
                    "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400": stat.color === "blue",
                    "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400": stat.color === "green",
                    "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400": stat.color === "purple",
                    "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400": stat.color === "yellow",
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
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            Attendance Statistics by Day
          </h3>
          <AttendanceChart />
        </Card>
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
            Recent Activities
          </h3>
          <RecentActivities />
        </Card>
      </div>
    </div>
  )
}
