"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart, Calendar, FileText, Home, MessageSquare, Settings, BookOpen, Users, UserCog } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { UserNav } from "@/components/user-nav"

export function AppSidebar() {
  const pathname = usePathname()

  const mainMenuItems = [
    {
      title: "Tableau de bord",
      icon: Home,
      href: "/dashboard",
      color: "text-blue-500"
    },
    {
      title: "Formations",
      icon: BookOpen,
      href: "/formations",
      color: "text-purple-500"
    },
    {
      title: "Formateurs",
      icon: UserCog,
      href: "/formateurs",
      color: "text-amber-500"
    },
    {
      title: "Participants",
      icon: Users,
      href: "/participants",
      color: "text-emerald-500"
    },
    {
      title: "Calendrier",
      icon: Calendar,
      href: "/calendrier",
      color: "text-red-500"
    },
    {
      title: "Messagerie",
      icon: MessageSquare,
      href: "/messagerie",
      color: "text-cyan-500"
    },
    {
      title: "Documents",
      icon: FileText,
      href: "/documents",
      color: "text-indigo-500"
    },
    {
      title: "Rapports",
      icon: BarChart,
      href: "/rapports",
      color: "text-green-500"
    },
  ]

  return (
    <div className="animate-fade-in h-full">
      <Sidebar className="bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/90 dark:to-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm">
        <SidebarHeader className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex h-16 items-center px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold group transition-all duration-200 hover:scale-[1.02]">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Formation Manager
              </span>
            </Link>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-2 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 px-4 mb-2">
              Menu Principal
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainMenuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === item.href}
                      className="group relative overflow-hidden transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                    >
                      <Link href={item.href}>
                        <div className={`${item.color} relative z-10 transition-transform duration-200 group-hover:scale-110`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="relative z-10">
                          {item.title}
                        </span>
                        {pathname === item.href && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 border-r-4 border-blue-500" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarSeparator className="my-2 bg-gray-200 dark:bg-gray-800" />
          
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 px-4 mb-2">
              Paramètres
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === "/parametres"}
                    className="group relative overflow-hidden transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  >
                    <Link href="/parametres">
                      <div className="text-gray-500 dark:text-gray-400 relative z-10 transition-transform duration-200 group-hover:scale-110">
                        <Settings className="h-5 w-5" />
                      </div>
                      <span className="relative z-10">
                        Paramètres
                      </span>
                      {pathname === "/parametres" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 border-r-4 border-blue-500" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="transition-transform duration-200 hover:scale-[1.02]">
            <UserNav />
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}