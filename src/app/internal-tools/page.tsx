"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ToolsPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/internal-tools/send-email")
  }, [router])

  return null
}
