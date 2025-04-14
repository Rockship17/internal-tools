"use client"

import { Sidebar } from "@/components/admin/Sidebar"
import { Header } from "@/components/admin/Header"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const userName = localStorage.getItem("userName")
    if (!userName) {
      router.push("/internal/login")
    }
  }, [])

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white  lg:bg-gray-50">
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
