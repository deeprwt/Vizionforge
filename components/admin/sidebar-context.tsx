"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

type SidebarContextValue = {
  /** Desktop: pinned open (true) or collapsed to icons (false). */
  isExpanded: boolean
  /** Desktop: collapsed sidebar temporarily expanded on hover. */
  isHovered: boolean
  /** Mobile: drawer open. */
  isMobileOpen: boolean
  toggleSidebar: () => void
  toggleMobileSidebar: () => void
  closeMobileSidebar: () => void
  setIsHovered: (hovered: boolean) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within SidebarProvider")
  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const toggleSidebar = useCallback(() => setIsExpanded((v) => !v), [])
  const toggleMobileSidebar = useCallback(() => setIsMobileOpen((v) => !v), [])
  const closeMobileSidebar = useCallback(() => setIsMobileOpen(false), [])

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        isHovered,
        isMobileOpen,
        toggleSidebar,
        toggleMobileSidebar,
        closeMobileSidebar,
        setIsHovered,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
