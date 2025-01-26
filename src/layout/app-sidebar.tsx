"use client"

import * as React from "react"
import Image from "next/image"
import {
  BadgeAlert,
  Bell,
  BookOpen,
  Server,
  ServerCrash,
  Settings2,
  SquareTerminal,
  Store,
  Workflow,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { ProjectSwitcher } from "./project-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Paths } from "@/routes/paths"







const navMain = [
  {
    title: "Dashboard",
    url: Paths.dashboard.root,
    icon: SquareTerminal,
    isActive: false,

  },
  {
    title: "Loans",
    url: Paths.dashboard.loans.root,
    icon: Server,
  },
  {
    title: "Settings",
    url: Paths.dashboard.settings.root,
    icon: Settings2,
    items: [
      {
        title: "General",
        url: Paths.dashboard.settings.root
      }
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 justify-center">
          <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
