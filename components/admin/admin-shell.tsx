"use client"

import { cn } from "@/lib/utils"
import { SidebarProvider, useSidebar } from "./sidebar-context"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"
import type { AdminProfile } from "./types"

export function AdminShell({ admin, children }: { admin: AdminProfile; children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ShellLayout admin={admin}>{children}</ShellLayout>
    </SidebarProvider>
  )
}

function ShellLayout({ admin, children }: { admin: AdminProfile; children: React.ReactNode }) {
  const { isExpanded, isMobileOpen, closeMobileSidebar } = useSidebar()

  return (
    <div className="min-h-screen">
      <AppSidebar admin={admin} />
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden" onClick={closeMobileSidebar} />
      )}
      <div
        className={cn(
          "flex min-h-screen flex-col overflow-x-clip transition-[margin] duration-200 ease-out",
          isExpanded ? "lg:ml-[260px]" : "lg:ml-[84px]"
        )}
      >
        <AppHeader admin={admin} />
        <main className="mx-auto w-full max-w-[1536px] flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
