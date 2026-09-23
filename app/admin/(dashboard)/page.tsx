import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CalendarCheck, FileText, Globe, PenSquare, type LucideIcon } from "lucide-react"
import { getAdminUser } from "@/lib/supabase/server"
import { BLOG_LIST_COLUMNS, type BlogListItem } from "@/lib/blog/types"
import { formatDate } from "@/lib/blog/utils"
import { cn } from "@/lib/utils"
import { Button } from "@/components/admin/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import { DashboardGreeting } from "@/components/admin/dashboard-greeting"
import { StatusBadge } from "@/components/admin/status-badge"
import { BlogThumb } from "@/components/admin/blog-thumb"

export const metadata: Metadata = { title: "Dashboard" }

const STAT_THEMES = [
  { icon: FileText, chip: "bg-indigo-50 text-indigo-600", ring: "hover:ring-indigo-200/60" },
  { icon: Globe, chip: "bg-emerald-50 text-emerald-600", ring: "hover:ring-emerald-200/60" },
  { icon: PenSquare, chip: "bg-amber-50 text-amber-600", ring: "hover:ring-amber-200/60" },
  { icon: CalendarCheck, chip: "bg-violet-50 text-violet-600", ring: "hover:ring-violet-200/60" },
] satisfies { icon: LucideIcon; chip: string; ring: string }[]

export default async function AdminDashboardPage() {
  const { supabase, user } = await getAdminUser()
  const { data, error } = await supabase
    .from("blogs")
    .select(BLOG_LIST_COLUMNS)
    .order("updated_at", { ascending: false })
  const blogs = (data ?? []) as BlogListItem[]

  const published = blogs.filter((b) => b.status === "published")
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const stats = [
    { label: "Total Posts", value: blogs.length, hint: "All posts in the CMS" },
    { label: "Published", value: published.length, hint: "Live on /blog" },
    { label: "Drafts", value: blogs.length - published.length, hint: "Not visible to visitors" },
    {
      label: "Published This Month",
      value: published.filter((b) => b.published_at && new Date(b.published_at) >= monthStart).length,
      hint: monthStart.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    },
  ]

  const categories = Object.entries(
    blogs.reduce<Record<string, number>>((acc, b) => {
      const key = b.category || "Uncategorized"
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1])

  const name =
    (user?.user_metadata?.full_name as string | undefined) || user?.email?.split("@")[0] || "Admin"

  return (
    <>
      <DashboardGreeting name={name} drafts={stats[2].value} />

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load posts: {error.message}. Did you run <code>supabase/schema.sql</code>?
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
        {stats.map((stat, index) => {
          const theme = STAT_THEMES[index]
          const Icon = theme.icon
          return (
            <div
              key={stat.label}
              className={cn(
                "group rounded-2xl border border-gray-200/70 bg-white p-5 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-200/60",
                theme.ring
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className={cn("flex size-9 items-center justify-center rounded-xl", theme.chip)}>
                  <Icon className="size-4" />
                </span>
                <p className="truncate text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
              <p className="mt-5 text-3xl font-bold leading-none tracking-tight tabular-nums text-gray-900">
                {stat.value.toLocaleString()}
              </p>
              <p className="mt-2 text-xs text-gray-500">{stat.hint}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <Card className="col-span-12 gap-0 rounded-2xl border-gray-200/70 py-0 shadow-sm xl:col-span-8">
          <CardHeader className="border-b border-gray-100 py-5">
            <CardTitle className="text-base">Recent Posts</CardTitle>
            <CardDescription>Latest edits across drafts and published posts</CardDescription>
            <CardAction>
              <Button asChild variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                <Link href="/admin/blogs">
                  View all <ArrowRight />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            {blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <FileText className="size-5" />
                </span>
                <p className="text-sm text-gray-500">No posts yet. Write your first one.</p>
                <Button asChild size="sm" className="rounded-lg bg-indigo-500 hover:bg-indigo-600">
                  <Link href="/admin/blogs/new">Create blog</Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/60 hover:bg-gray-50/60">
                    <TableHead className="pl-6">Post</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.slice(0, 6).map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="pl-6">
                        <Link href={`/admin/blogs/${blog.id}`} className="flex items-center gap-3">
                          <BlogThumb src={blog.cover_image_url} />
                          <div className="min-w-0">
                            <p className="max-w-[340px] truncate font-medium text-gray-900 hover:text-indigo-600">
                              {blog.title}
                            </p>
                            <p className="text-xs text-gray-500">{blog.category || "Uncategorized"}</p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={blog.status} />
                      </TableCell>
                      <TableCell className="pr-6 text-right text-gray-500">
                        {formatDate(blog.updated_at, "short")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-12 rounded-2xl border-gray-200/70 shadow-sm xl:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Categories</CardTitle>
            <CardDescription>How your posts are distributed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.length === 0 && <p className="text-sm text-gray-500">No categories yet.</p>}
            {categories.slice(0, 8).map(([category, count]) => (
              <div key={category}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{category}</span>
                  <span className="tabular-nums text-gray-500">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${(count / blogs.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
