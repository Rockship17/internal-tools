"use client"

import { useRouter } from "next/navigation"

export default function ToolsPage() {
  const router = useRouter()
  router.push("/internal-tools/send-email")
}
