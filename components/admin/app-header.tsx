"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronDown, ExternalLink, LogOut, Menu, PanelLeft, Search, X } from "lucide-react"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Avatar, AvatarFallback } from "@/components/admin/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"
import { useSidebar } from "./sidebar-context"
import { useSignOut } from "./use-sign-out"
import { getInitials, type AdminProfile } from "./types"

export function AppHeader({ admin }: { admin: AdminProfile }) {
  const router = useRouter()
  const signOut = useSignOut()
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar()
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)

  // ⌘K / Ctrl+K focuses the search box.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar()
    else toggleMobileSidebar()
  }

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const q = query.trim()
    router.push(q ? `/admin/blogs?q=${encodeURIComponent(q)}` : "/admin/blogs")
  }

  return (
    <header className="sticky top-0 z-30 flex w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="flex w-full items-center gap-3 px-4 py-3 lg:px-6 lg:py-4">
        <Button
          variant="outline"
          size="icon-lg"
          onClick={handleToggle}
          aria-label="Toggle sidebar"
          className="rounded-lg text-gray-500"
        >
          {isMobileOpen ? <X className="size-5" /> : (
            <>
              <Menu className="size-5 lg:hidden" />
              <PanelLeft className="hidden size-5 lg:block" />
            </>
          )}
        </Button>

        <Link href="/admin" className="lg:hidden">
          <Image src="/assets/images/logo.png" alt="VizionForge" width={130} height={32} className="h-8 w-auto" />
        </Link>

        <form onSubmit={onSearch} className="relative hidden lg:block xl:w-[430px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blogs…"
            className="h-11 rounded-lg border-gray-200 bg-gray-50/60 pl-10 pr-14 shadow-none"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-gray-500">
            ⌘K
          </kbd>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <Avatar className="size-10">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white">
                    {getInitials(admin.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:block">{admin.name}</span>
                <ChevronDown className="hidden size-4 text-gray-400 sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-semibold text-gray-900">{admin.name}</p>
                <p className="truncate text-xs text-gray-500">{admin.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/blog" target="_blank">
                  <ExternalLink /> View public blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={signOut}>
                <LogOut /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
