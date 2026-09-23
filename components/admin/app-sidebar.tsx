"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Plus,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/admin/ui/button"
import { Avatar, AvatarFallback } from "@/components/admin/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/admin/ui/tooltip"
import { useSidebar } from "./sidebar-context"
import { useSignOut } from "./use-sign-out"
import { getInitials, type AdminProfile } from "./types"

type NavItem = { name: string; icon: LucideIcon; path: string }

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Blogs", icon: FileText, path: "/admin/blogs" },
]

export function AppSidebar({ admin }: { admin: AdminProfile }) {
  const pathname = usePathname()
  const signOut = useSignOut()
  const { isExpanded, isHovered, isMobileOpen, setIsHovered, closeMobileSidebar } = useSidebar()
  const open = isExpanded || isHovered || isMobileOpen

  const isActive = (path: string) =>
    path === "/admin"
      ? pathname === "/admin"
      : (pathname === path || pathname.startsWith(`${path}/`)) && pathname !== "/admin/blogs/new"

  return (
    <aside
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-gray-200/80 bg-white text-gray-900 transition-[width,translate] duration-200 ease-out",
        open ? "w-[260px]" : "w-[84px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}
    >
      {/* Brand */}
      <div className={cn("flex h-[72px] items-center px-5", !open && "lg:justify-center")}>
        <Link href="/admin" onClick={closeMobileSidebar} className="flex items-center gap-2">
          {open ? (
            <Image src="/assets/images/logo.png" alt="VizionForge" width={150} height={36} className="h-9 w-auto" priority />
          ) : (
            <Image src="/assets/images/favicon.png" alt="VizionForge" width={32} height={32} className="size-8" priority />
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-2 pb-4">
        <p
          className={cn(
            "mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400",
            !open && "text-center"
          )}
        >
          {open ? "Menu" : "•••"}
        </p>
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <SidebarLink item={item} open={open} active={isActive(item.path)} onNavigate={closeMobileSidebar} />
            </li>
          ))}
          <li>
            <SidebarLink
              item={{ name: "View Website", icon: ExternalLink, path: "/blog" }}
              open={open}
              active={false}
              external
            />
          </li>
        </ul>
      </nav>

      {/* Primary CTA */}
      <div className={cn("px-3 pb-2", !open && "flex justify-center")}>
        <SidebarTooltip label="New Blog" enabled={!open}>
          <Button
            asChild
            className={cn(
              "group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg hover:shadow-indigo-500/25",
              open ? "h-10 w-full justify-start gap-2 px-3 font-semibold" : "size-10 p-0"
            )}
          >
            <Link href="/admin/blogs/new" onClick={closeMobileSidebar}>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Plus className="size-4 transition-transform duration-200 group-hover:rotate-90" />
              {open && <span>New Blog</span>}
            </Link>
          </Button>
        </SidebarTooltip>
      </div>

      {/* Account */}
      <div className={cn("border-t border-gray-200/80 p-3", !open && "flex justify-center")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Account menu"
              className={cn(
                "flex items-center gap-3 rounded-xl text-left transition-colors",
                open ? "w-full bg-gray-50 p-2.5 hover:bg-gray-100" : "p-0"
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-semibold text-white">
                    {getInitials(admin.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              {open && (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">{admin.name}</p>
                    <p className="truncate text-[11px] font-medium uppercase tracking-wider text-indigo-600">
                      Admin
                    </p>
                  </div>
                  <MoreVertical className="size-4 text-gray-400" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side={open ? "top" : "right"} className="w-56">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-semibold text-gray-900">{admin.name}</p>
              <p className="truncate text-xs text-gray-500">{admin.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" target="_blank">
                <ExternalLink /> Open website
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={signOut}>
              <LogOut /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}

function SidebarTooltip({
  label,
  enabled,
  children,
}: {
  label: string
  enabled: boolean
  children: React.ReactNode
}) {
  if (!enabled) return <>{children}</>
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

function SidebarLink({
  item,
  open,
  active,
  external,
  onNavigate,
}: {
  item: NavItem
  open: boolean
  active: boolean
  external?: boolean
  onNavigate?: () => void
}) {
  const Icon = item.icon
  return (
    <SidebarTooltip label={item.name} enabled={!open}>
      <Link
        href={item.path}
        onClick={onNavigate}
        target={external ? "_blank" : undefined}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative flex items-center rounded-xl transition-all duration-150 ease-out",
          open ? "gap-3 px-3 py-2.5" : "mx-auto size-10 justify-center",
          active
            ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        )}
      >
        {active && (
          <span
            aria-hidden
            className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-indigo-500 to-purple-500"
          />
        )}
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg transition-all duration-150",
            active
              ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm shadow-indigo-500/30"
              : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
          )}
        >
          <Icon className="size-4" />
        </span>
        {open && (
          <span className={cn("flex-1 truncate text-sm font-medium", active && "font-semibold")}>
            {item.name}
          </span>
        )}
      </Link>
    </SidebarTooltip>
  )
}
