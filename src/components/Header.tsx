import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/ui/dark-mode-button"

export function Header() {
  return (
    <header className="h-16 px-4 lg:px-6 border-b bg-background text-foreground flex items-center justify-between">
      <div className="flex items-center gap-4 ml-auto">
        <div className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center">1</Badge>
        </div>
        <ModeToggle />
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/rockship.png" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <p className="text-sm font-medium">Admin User</p>
          </div>
        </div>
      </div>
    </header>
  )
}
