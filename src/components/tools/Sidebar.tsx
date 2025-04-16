"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, LogOut, Send, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Home",
    href: "/internal",
    icon: LayoutDashboard,
  },
  {
    title: "Send Email",
    href: "/internal-tools/send-email",
    icon: Send,
  },
  {
    title: "Send Quote",
    href: "/internal-tools/send-quote",
    icon: Star,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("fullName")
    router.push("/internal/login")
  }

  return (
    <div className="lg:w-64 bg-background lg:border-r flex flex-col h-full shadow-xl">
      {/* Desktop Logo */}
      <div className="hidden lg:block p-6 border-b w-full">
        <Link href="/internal" className="items-center font-semibold text-xl">
          Internal Tools
        </Link>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
        <nav className="flex justify-around py-2 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg min-w-[64px]",
                  isActive ? "text-blue-600" : "text-muted-foreground hover:text-blue-600 hover:bg-gray-50"
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
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-black",
                    isActive && "bg-blue-50 text-black"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto pt-4 border-t">
          <Button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-muted-foreground bg-background hover:bg-gray-100 hover:text-black rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </nav>
    </div>
  )
}
