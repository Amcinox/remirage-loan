"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTransition } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Paths } from "@/routes/paths"
import { useRouter } from "next/navigation"

export function ProjectSwitcher() {
  const { isMobile } = useSidebar()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isPending ? <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Skeleton className="size-8 rounded-lg bg-slate-600" />
              <div className="grid flex-1 gap-1">
                <Skeleton className="h-4 w-24  bg-slate-600" />
                <Skeleton className="h-3 w-16  bg-slate-600" />
              </div>
              <ChevronsUpDown className="ml-auto text-muted-foreground/50" />
            </SidebarMenuButton>
              :
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="logo" alt="Logo" />

                  </Avatar>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            }
          </DropdownMenuTrigger>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}


