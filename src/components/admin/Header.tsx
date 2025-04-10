import { Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"

export function Header() {
  return (
    <header className="h-16 px-4 lg:px-6 border-b bg-white flex items-center justify-between">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 flex items-center justify-end lg:justify-start">
        <div className="relative w-full max-w-[300px] lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-700" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center">
            1
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <p className="text-sm font-medium">Admin User</p>
          </div>
        </div>
      </div>
    </header>
  )
} 