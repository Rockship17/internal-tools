"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarItem {
  name: string
  path: string
  icon?: React.ReactNode
}

const sidebarItems: SidebarItem[] = [
  {
    name: "Send Email",
    path: "/internal-tools/send-email",
  },
  {
    name: "Send Quote",
    path: "/internal-tools/send-quote",
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Internal Tools</h1>
      </div>

      <nav>
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors
                  ${pathname === item.path ? "bg-blue-600 text-white" : "hover:bg-gray-800 text-gray-300"}`}
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
