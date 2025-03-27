"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { LogOut, User, Settings, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function UserNav() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            "relative h-12 w-full justify-between px-3 transition-all duration-200",
            isOpen ? "bg-accent" : "hover:bg-accent"
          )}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border-2 border-primary/10">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
              <AvatarFallback className="bg-primary/10 font-medium">AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">admin@example.com</span>
            </div>
          </div>
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 rounded-lg shadow-lg border border-border/50" 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Admin User</p>
            <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={() => handleNavigation("/profile")}
            className="cursor-pointer p-2 focus:bg-accent"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Mon profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleNavigation("/parametres")}
            className="cursor-pointer p-2 focus:bg-accent"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem 
          onClick={() => handleNavigation("/login")}
          className="cursor-pointer p-2 text-red-600 focus:bg-red-50 focus:text-red-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}