import React from "react"
import { Sidebar } from "@/components/tools/Sidebar"
import { Header } from "@/components/Header"

export default function InternalToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <div className="max-lg:hidden block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-h-0 mb-3">
        <Header />
        <main className="flex-1 overflow-auto p-4 lg:p-6 pb-20 lg:pb-6">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
      <div className="hidden max-lg:block">
        <Sidebar />
      </div>
    </div>
  )
}
