"use client"
import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react"
import {sideBarMenuItems} from "@/server/constants/constantdata"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"


export function AppSidebar() {
  const path = usePathname()
  return (
    <Sidebar className="bg-auth-gradient">
      <SidebarHeader >
         <Image src={"/sidebarlogo.png"} width={180} height={100} alt="logo" className="" />
         <Button><Plus/>Create New Interview</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideBarMenuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="p-1">
                  <SidebarMenuButton asChild className="p-5">
                    <a href={item.url}>
                      <item.icon className={`${path === item.url ? "text-primary":"text-white"}`} />
                      <span className={` text-[16px] ${path === item.url ? "text-primary":"text-white"}`}>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
