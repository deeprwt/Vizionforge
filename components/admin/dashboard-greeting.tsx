"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PenSquare, Plus } from "lucide-react"
import { Button } from "@/components/admin/ui/button"
import { Avatar, AvatarFallback } from "@/components/admin/ui/avatar"
import { getInitials } from "./types"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 5) return { greeting: "Working late", emoji: "🌙" }
  if (hour < 12) return { greeting: "Good morning", emoji: "☀️" }
  if (hour < 17) return { greeting: "Good afternoon", emoji: "🌤️" }
  if (hour < 21) return { greeting: "Good evening", emoji: "🌆" }
  return { greeting: "Good night", emoji: "✨" }
}

export function DashboardGreeting({ name, drafts }: { name: string; drafts: number }) {
  // Computed after mount so the server's timezone never causes a mismatch.
  const [info, setInfo] = useState<{ greeting: string; emoji: string; today: string } | null>(null)

  useEffect(() => {
    const update = () =>
      setInfo({
        ...getGreeting(),
        today: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
      })
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  const firstName = name.split(/[\s._-]+/)[0] || name

  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <Avatar className="size-12 shadow-md ring-4 ring-white sm:size-14">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white sm:text-base">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0.5 right-0.5 flex size-3 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </span>
          </div>

          <div className="min-w-0">
            <p className="h-4 text-[11px] font-medium text-gray-500">{info?.today}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {info?.greeting ?? "Welcome back"},{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent capitalize">
                {firstName}
              </span>{" "}
              {info?.emoji}
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 sm:text-[15px]">
              {drafts > 0
                ? `You have ${drafts} draft${drafts === 1 ? "" : "s"} waiting to be published.`
                : "Here's how your blog is doing."}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button asChild variant="outline" className="h-11 rounded-xl border-gray-200 bg-white px-4">
            <Link href="/admin/blogs?status=draft">
              <PenSquare /> Drafts
            </Link>
          </Button>
          <Button
            asChild
            className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            <Link href="/admin/blogs/new">
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Plus className="transition-transform duration-200 group-hover:rotate-90" />
              New Blog
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
