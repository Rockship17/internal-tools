"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, FileText, UserCheck, LogOut, Send, Star } from "lucide-react"
import { Button } from "./ui/button"

const menuItems = [
  {
    title: "Dashboard",
    href: "/internal",
    icon: LayoutDashboard,
  },
  {
    title: "Employee",
    href: "/internal/employees",
    icon: Users,
  },
  {
    title: "Request",
    href: "/internal/requests",
    icon: FileText,
  },
  {
    title: "Attendance",
    href: "/internal/attendance",
    icon: UserCheck,
  },
  {
    title: "Submit",
    href: "/internal/submit-form",
    icon: Send,
  },
  {
    title: "Tools",
    href: "/internal-tools",
    icon: Star,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("fullName")
    localStorage.removeItem("id")
    router.push("/internal/login")
  }

  return (
    <div className="lg:w-64 bg-card lg:border-r border-border flex flex-col h-full">
      {/* Desktop Logo */}
      <div className="hidden lg:block p-6 border-b border-border">
        <Link href="/internal" className="flex items-center gap-2 font-semibold text-xl text-foreground">
          <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
            AC
          </span>
          Admin Center
        </Link>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card z-50">
        <nav className="flex justify-around py-2 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg min-w-[64px]",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary hover:bg-accent"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1 font-medium">{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground",
                    isActive && "bg-accent text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto pt-4 border-t border-border">
          <Button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-muted-foreground bg-card hover:bg-accent hover:text-foreground rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </nav>
    </div>
  )
}
