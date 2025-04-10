"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, FileText, UserCheck, LogOut } from "lucide-react"
import { Button } from "../ui/button"

const menuItems = [
  {
    title: "Tổng quan",
    href: "/internal",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý nhân viên",
    href: "/internal/employees",
    icon: Users,
  },
  {
    title: "Duyệt đơn từ",
    href: "/internal/requests",
    icon: FileText,
  },
  {
    title: "Theo dõi chuyên cần",
    href: "/internal/attendance",
    icon: UserCheck,
  },
  {
    title: "Đơn từ",
    href: "/internal/submit-form",
    icon: FileText,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    router.push("/internal/login")
  }

  return (
    <div className="w-64 bg-white border-r flex flex-col h-full">
      <div className="p-6 border-b">
        <Link href="/internal" className="flex items-center gap-2 font-semibold text-xl">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">AC</span>
          Admin Center
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100",
                    isActive && "bg-blue-50 text-blue-600"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full text-gray-700 bg-gray-50  hover:bg-gray-100 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </Button>
      </div>
    </div>
  )
}
