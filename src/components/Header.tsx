"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, LogOut, Menu, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/ui/dark-mode-button"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Header() {
  const [userName, setUserName] = useState<string>("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userNameFromStorage = localStorage.getItem("userName") || ""
    setUserName(userNameFromStorage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("fullName")
    localStorage.removeItem("id")
    router.push("/internal/login")
  }

  return (
    <header className="sticky top-0 z-50 h-16 px-4 lg:px-6 border-b border-border bg-card text-foreground flex items-center justify-between">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center">
        <Link href="/internal" className="flex items-center gap-2 font-semibold text-xl text-foreground">
          <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold">
            RS
          </span>
        </Link>
      </div>

      {/* Desktop Brand Name */}
      <div className="hidden lg:flex items-center">
        <h1 className="text-xl font-semibold">Rockship Admin</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-primary text-primary-foreground">
              1
            </Badge>
          </Button>
        </div>

        {/* Dark Mode Toggle */}
        <ModeToggle />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="px-2 flex items-center gap-2 cursor-pointer hover:bg-accent focus:ring-0 focus:ring-offset-0"
            >
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src="/rockship.png" className="object-cover" />
                <AvatarFallback className="bg-muted text-muted-foreground text-sm">RS</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block flex-col text-left">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">Staff</p>
              </div>
              <ChevronDown className="hidden lg:block w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card">
            <div className="lg:hidden px-2 py-1.5">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">Staff</p>
            </div>
            <DropdownMenuSeparator className="lg:hidden" />
            {/* <DropdownMenuItem className="cursor-default focus:bg-background">
              <Link href="/internal/profile" className="flex items-center w-full hover:text-foreground">
                Profile Settings
              </Link>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
