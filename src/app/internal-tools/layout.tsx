import React from "react"
import Sidebar from "@/components/tools/Sidebar"

export default function InternalToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  )
}
