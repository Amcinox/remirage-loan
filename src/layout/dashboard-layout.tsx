"use client"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import { usePathname } from "next/navigation";

// Define excluded paths
const EXCLUDED_PATHS = [
  '/dashboard/new',
  '/error',
  '/404',
  '/500'
] as const

//  advanced exclusion patterns
const EXCLUDED_PATTERNS = [
  /^\/auth\/reset-password/, // All password reset routes
] as const



interface LayoutProps {
  children: React.ReactNode
}
export default function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname()

  const shouldHideSidebar = React.useCallback(() => {
    // Check exact path matches
    if (EXCLUDED_PATHS.includes(pathname as any)) {
      return true
    }
    // Check pattern matches
    if (EXCLUDED_PATTERNS.some(pattern => pattern.test(pathname))) {
      return true
    }
    return false
  }, [pathname])


  return (
    <SidebarProvider>
      {shouldHideSidebar() ? null : <AppSidebar />}

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          {shouldHideSidebar() ? null :
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          }
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
