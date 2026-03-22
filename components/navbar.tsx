"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback, useRef } from "react"
import { Menu, X, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Navigation data                                                    */
/* ------------------------------------------------------------------ */

interface SubLink {
  href: string
  label: string
  description?: string
}

interface NavItem {
  label: string
  href?: string
  children?: SubLink[]
  tagline?: string
  explore?: string
}

const navItems: NavItem[] = [
  {
    label: "Services",
    tagline: "Enterprise Solutions That Deliver",
    explore: "/services",
    children: [
      { href: "/services", label: "OutSystems Practice", description: "Rapid Low-Code Application Delivery." },
      { href: "/services", label: "Microsoft 365", description: "Modern Workplace & Power Platform." },
      { href: "/services", label: "ServiceNow", description: "IT Workflow Automation at Scale." },
      { href: "/services", label: "Agentic AI", description: "Intelligent Automation with AI Agents." },
    ],
  },
  {
    label: "Products",
    tagline: "Products Built for Enterprise",
    explore: "/products",
    children: [
      { href: "/products/expense-genie", label: "ExpenseGenie", description: "AI-Powered Expense Management." },
      { href: "/products/safeops360", label: "SafeOps360", description: "Enterprise QHSE & Safety Intelligence." },
      { href: "/products/sentio", label: "SENTIO", description: "The Living Bowtie Platform." },
      { href: "/products/los-lms", label: "LOS / LMS", description: "Integrated Loan Origination & Management." },
    ],
  },
  {
    label: "Company",
    tagline: "Get to Know VizionForge",
    explore: "/about",
    children: [
      { href: "/about", label: "About Us", description: "Our Story, Mission & Values." },
      { href: "/case-studies", label: "Case Studies", description: "Real Results for Real Enterprises." },
      { href: "/engagement", label: "Engagement Model", description: "Flexible Delivery Partnerships." },
      { href: "/why-us", label: "Why Us", description: "What Sets VizionForge Apart." },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ---- Mobile ---- */
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null)

  const isHome = pathname === "/"
  const isTransparent = isHome && !scrolled && !openMenu && !mobileOpen

  /* Open with small delay to avoid flicker */
  const handleOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }

  /* Close with delay so mouse can travel to panel / between items */
  const handleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150)
  }

  /* Cancel close when mouse enters panel */
  const handlePanelEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
    setMobileSubMenu(null)
  }, [pathname])

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpenMenu(null)
      setMobileOpen(false)
      setMobileSubMenu(null)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onKey])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setMobileSubMenu(null)
  }, [])

  const isChildActive = (item: NavItem) =>
    item.children?.some((c) => pathname === c.href)

  return (
    <>
      {/* ============================================================== */}
      {/*  Top bar                                                        */}
      {/* ============================================================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full">
        <div
          className={cn(
            "transition-all duration-300",
            isTransparent
              ? "bg-transparent border-b-2 border-transparent"
              : "bg-navy/[0.97] backdrop-blur-md border-b-2 border-gold"
          )}
        >
          <div className="flex items-center justify-between px-6 lg:px-12 h-[68px] max-w-[1400px] mx-auto">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0"
              onClick={() => setOpenMenu(null)}
            >
              <Image
                src="/assets/images/logo.png"
                alt="VizionForge"
                width={180}
                height={40}
                className="h-10 w-auto transition-all duration-300"
                style={{ filter: isTransparent ? "none" : "brightness(0) invert(1)" }}
                priority
              />
            </Link>

            {/* ---- Desktop nav ---- */}
            <ul className="hidden lg:flex items-center">
              <li>
                <Link
                  href="/"
                  onMouseEnter={() => { handleOpen(""); setOpenMenu(null) }}
                  className={cn(
                    "relative px-5 h-[68px] inline-flex items-center text-[0.8rem] font-medium uppercase tracking-[0.04em] transition-colors",
                    pathname === "/" ? "text-gold" : "text-white hover:text-gold"
                  )}
                >
                  Home
                  <span
                    className={cn(
                      "absolute bottom-0 left-5 right-5 h-[2px] bg-gold transition-transform origin-left duration-300",
                      pathname === "/" ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              </li>

              {navItems.map((item) => (
                <li
                  key={item.label}
                  onMouseEnter={() => handleOpen(item.label)}
                  onMouseLeave={handleClose}
                >
                  <button
                    className={cn(
                      "relative px-5 h-[68px] text-[0.8rem] font-medium uppercase tracking-[0.04em] inline-flex items-center gap-1.5",
                      "transition-colors duration-150",
                      isChildActive(item) || openMenu === item.label
                        ? "text-gold"
                        : "text-white hover:text-gold"
                    )}
                  >
                    {item.label}
                    <ChevronRight
                      size={11}
                      className={cn(
                        "transition-transform duration-200",
                        openMenu === item.label ? "rotate-90" : ""
                      )}
                    />
                    <span
                      className={cn(
                        "absolute bottom-0 left-5 right-5 h-[2px] bg-gold transition-transform origin-left duration-300",
                        openMenu === item.label || isChildActive(item)
                          ? "scale-x-100"
                          : "scale-x-0"
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div
              className="hidden lg:block shrink-0"
              onMouseEnter={() => setOpenMenu(null)}
            >
              <Button asChild size="sm">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white p-2 -mr-2"
              onClick={() => {
                setMobileOpen(!mobileOpen)
                setMobileSubMenu(null)
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  Mega panel — Xebia-style slide down with top gold line       */}
        {/* ============================================================ */}
        <div
          className="hidden lg:block"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handleClose}
          style={{
            display: undefined,
            overflow: "hidden",
            maxHeight: openMenu ? 500 : 0,
            transition: openMenu
              ? "max-height 800ms cubic-bezier(0.22, 0.61, 0.36, 1)"
              : "max-height 500ms cubic-bezier(0.4, 0, 0.6, 1)",
          }}
        >
          {/* Thin gold line at top like Xebia */}
          <div className="h-[3px] bg-gold" />

          {navItems.map((item) => {
            const isActive = openMenu === item.label
            return (
              <div
                key={item.label}
                style={{
                  display: isActive ? "block" : "none",
                }}
              >
                <div className="bg-white shadow-xl">
                  <div className="max-w-[1400px] mx-auto px-12 py-10">
                    {/* Header row */}
                    {/* <div
                      key={`header-${openMenu}`}
                      className="flex items-start justify-between mb-8 mega-header-animate"
                    >
                      <div>
                        <h3 className="font-display text-xl font-bold text-navy">
                          {item.label}
                        </h3>
                        {item.tagline && (
                          <p className="text-sm text-muted mt-1">{item.tagline}</p>
                        )}
                      </div>
                      {item.explore && (
                        <Link
                          href={item.explore}
                          onClick={() => setOpenMenu(null)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-navy border border-navy/20 rounded-full px-5 py-2 hover:bg-navy hover:text-white transition-all duration-200 shrink-0"
                        >
                          Explore more
                        </Link>
                      )}
                    </div> */}

                    {/* 3-col sub-links — staggered fade-up */}
                    <div
                      key={`grid-${openMenu}`}
                      className="grid grid-cols-3 gap-x-16 gap-y-8"
                    >
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpenMenu(null)}
                          className="group block mega-item-animate"
                        >
                          <span className="text-[0.95rem] font-bold text-navy group-hover:text-gold transition-colors duration-150">
                            {child.label}
                          </span>
                          {child.description && (
                            <p className="text-[0.8rem] text-muted mt-1 leading-relaxed">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Desktop backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 hidden lg:block transition-opacity duration-300",
          openMenu
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
        onClick={() => setOpenMenu(null)}
      />

      {/* ================================================================ */}
      {/*  Mobile menu                                                      */}
      {/* ================================================================ */}

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-black/40 lg:hidden transition-opacity duration-200",
          mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
        onClick={closeMobile}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full max-w-[420px] z-[60] bg-white lg:hidden",
          "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "shadow-[-8px_0_30px_rgba(0,0,0,0.1)]",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 h-[68px] border-b border-gray-100">
          <Link
            href="/"
            onClick={closeMobile}
            className="shrink-0"
          >
            <Image
              src="/assets/images/logo.png"
              alt="VizionForge"
              width={160}
              height={36}
              className="h-9 w-auto"
            />
          </Link>
          <button
            onClick={closeMobile}
            className="p-2 -mr-2 text-navy/60 hover:text-navy transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable content with sliding panels */}
        <div className="relative h-[calc(100%-68px)] overflow-hidden">
          {/* Main level */}
          <div
            className={cn(
              "absolute inset-0 overflow-y-auto",
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              mobileSubMenu ? "-translate-x-full" : "translate-x-0"
            )}
          >
            <div className="py-4">
              <Link
                href="/"
                onClick={closeMobile}
                className={cn(
                  "flex items-center px-6 py-4 text-[1.05rem] font-medium transition-colors border-b border-gray-50",
                  pathname === "/" ? "text-gold" : "text-navy hover:text-gold"
                )}
              >
                Home
              </Link>

              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setMobileSubMenu(item.label)}
                  className={cn(
                    "flex items-center justify-between w-full px-6 py-4 text-[1.05rem] font-semibold border-b border-gray-50 text-left",
                    "transition-colors duration-150",
                    isChildActive(item) ? "text-gold" : "text-navy hover:text-gold"
                  )}
                >
                  {item.label}
                  <ChevronRight size={18} className="text-navy/30 shrink-0" />
                </button>
              ))}

              <Link
                href="/contact"
                onClick={closeMobile}
                className={cn(
                  "flex items-center px-6 py-4 text-[1.05rem] font-medium transition-colors border-b border-gray-50",
                  pathname === "/contact" ? "text-gold" : "text-navy hover:text-gold"
                )}
              >
                Contact
              </Link>

              <div className="px-6 pt-6">
                <Button asChild size="sm" className="w-full">
                  <Link href="/contact" onClick={closeMobile}>
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Sub-level panels */}
          {navItems.map((item) => (
            <div
              key={item.label}
              className={cn(
                "absolute inset-0 overflow-y-auto bg-white",
                "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                mobileSubMenu === item.label ? "translate-x-0" : "translate-x-full"
              )}
            >
              <div className="py-4">
                <button
                  onClick={() => setMobileSubMenu(null)}
                  className="flex items-center gap-2 px-6 py-3 text-navy/50 hover:text-navy transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="px-6 pb-4 mb-2 border-b border-gray-100">
                  <h3 className="text-[1.05rem] font-bold text-navy">
                    {item.label}
                  </h3>
                  {item.tagline && (
                    <p className="text-sm text-muted mt-0.5">{item.tagline}</p>
                  )}
                </div>

                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={closeMobile}
                    className={cn(
                      "block px-6 py-4 border-b border-gray-50",
                      "transition-colors duration-150",
                      pathname === child.href ? "text-gold" : "text-navy hover:text-gold"
                    )}
                  >
                    <span className="text-[1.05rem] font-medium block">{child.label}</span>
                    {child.description && (
                      <span className="text-[0.8rem] text-muted block mt-0.5">{child.description}</span>
                    )}
                  </Link>
                ))}

                {item.explore && (
                  <Link
                    href={item.explore}
                    onClick={closeMobile}
                    className="flex items-center gap-1 px-6 py-4 text-sm font-bold text-gold hover:text-gold-light transition-colors"
                  >
                    Explore All {item.label}
                    <ChevronRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
