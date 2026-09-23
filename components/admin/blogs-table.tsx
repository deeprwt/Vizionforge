"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Eye,
  EyeOff,
  FileText,
  Loader2,
  MoreHorizontal,
  Pencil,
  Search,
  Star,
  Trash2,
} from "lucide-react"
import { deleteBlog, setBlogStatus } from "@/app/admin/actions"
import type { BlogListItem, BlogStatus } from "@/lib/blog/types"
import { formatDate } from "@/lib/blog/utils"
import { Input } from "@/components/admin/ui/input"
import { Button } from "@/components/admin/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/admin/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/admin/ui/alert-dialog"
import { StatusBadge } from "./status-badge"
import { BlogThumb } from "./blog-thumb"

type StatusFilter = "all" | BlogStatus
const ALL_CATEGORIES = "__all__"

export function BlogsTable({
  blogs,
  initialQuery,
  initialStatus,
}: {
  blogs: BlogListItem[]
  initialQuery: string
  initialStatus: StatusFilter
}) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [status, setStatus] = useState<StatusFilter>(initialStatus)
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [toDelete, setToDelete] = useState<BlogListItem | null>(null)
  const [isPending, startTransition] = useTransition()

  const categories = useMemo(
    () => [...new Set(blogs.map((b) => b.category).filter(Boolean) as string[])].sort(),
    [blogs]
  )

  const counts = useMemo(
    () => ({
      all: blogs.length,
      published: blogs.filter((b) => b.status === "published").length,
      draft: blogs.filter((b) => b.status === "draft").length,
    }),
    [blogs]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return blogs.filter(
      (b) =>
        (status === "all" || b.status === status) &&
        (category === ALL_CATEGORIES || b.category === category) &&
        (!q ||
          b.title.toLowerCase().includes(q) ||
          b.slug.includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)))
    )
  }, [blogs, query, status, category])

  const runAction = (id: string, action: () => Promise<{ ok: boolean; error?: string }>, success: string) => {
    setPendingId(id)
    startTransition(async () => {
      const result = await action()
      if (result.ok) {
        toast.success(success)
        router.refresh()
      } else {
        toast.error(result.error)
      }
      setPendingId(null)
    })
  }

  const toggleStatus = (blog: BlogListItem) => {
    const next: BlogStatus = blog.status === "published" ? "draft" : "published"
    runAction(
      blog.id,
      () => setBlogStatus(blog.id, next),
      next === "published" ? "Post published" : "Post moved to drafts"
    )
  }

  const confirmDelete = () => {
    if (!toDelete) return
    const blog = toDelete
    setToDelete(null)
    runAction(blog.id, () => deleteBlog(blog.id), "Post deleted")
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row lg:items-center lg:justify-between">
        <Tabs value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
          <TabsList className="h-10 rounded-xl bg-gray-100 p-1">
            {(["all", "published", "draft"] as const).map((value) => (
              <TabsTrigger key={value} value={value} className="rounded-lg px-3 capitalize">
                {value === "all" ? "All" : value === "draft" ? "Drafts" : "Published"}
                <span className="ml-1 rounded-full bg-gray-200/80 px-1.5 text-[11px] tabular-nums text-gray-600">
                  {counts[value]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, slug or tag…"
              className="h-10 rounded-lg pl-9"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-10! w-full rounded-lg sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FileText className="size-5" />
          </span>
          <p className="font-medium text-gray-900">{blogs.length === 0 ? "No blogs yet" : "No matching blogs"}</p>
          <p className="text-sm text-gray-500">
            {blogs.length === 0 ? "Create your first post to see it here." : "Try a different search or filter."}
          </p>
          {blogs.length === 0 && (
            <Button asChild size="sm" className="rounded-lg bg-indigo-500 hover:bg-indigo-600">
              <Link href="/admin/blogs/new">Create blog</Link>
            </Button>
          )}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/60 hover:bg-gray-50/60">
              <TableHead className="pl-5">Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Published</TableHead>
              <TableHead className="hidden lg:table-cell">Updated</TableHead>
              <TableHead className="w-12 pr-5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((blog) => (
              <TableRow key={blog.id} className={pendingId === blog.id ? "opacity-60" : undefined}>
                <TableCell className="pl-5">
                  <Link href={`/admin/blogs/${blog.id}`} className="group flex items-center gap-3">
                    <BlogThumb src={blog.cover_image_url} />
                    <div className="min-w-0">
                      <p className="flex max-w-[380px] items-center gap-1.5 truncate font-medium text-gray-900 group-hover:text-indigo-600">
                        {blog.featured && <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />}
                        <span className="truncate">{blog.title}</span>
                      </p>
                      <p className="max-w-[380px] truncate text-xs text-gray-500">/blog/{blog.slug}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="hidden text-gray-600 md:table-cell">{blog.category || "—"}</TableCell>
                <TableCell>
                  <StatusBadge status={blog.status} />
                </TableCell>
                <TableCell className="hidden text-gray-500 lg:table-cell">
                  {blog.status === "published" ? formatDate(blog.published_at, "short") : "—"}
                </TableCell>
                <TableCell className="hidden text-gray-500 lg:table-cell">
                  {formatDate(blog.updated_at, "short")}
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label="Post actions" disabled={isPending && pendingId === blog.id}>
                        {pendingId === blog.id ? <Loader2 className="animate-spin" /> : <MoreHorizontal />}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/blogs/${blog.id}`}>
                          <Pencil /> Edit
                        </Link>
                      </DropdownMenuItem>
                      {blog.status === "published" && (
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${blog.slug}`} target="_blank">
                            <Eye /> View live
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onSelect={() => toggleStatus(blog)}>
                        {blog.status === "published" ? (
                          <>
                            <EyeOff /> Unpublish
                          </>
                        ) : (
                          <>
                            <Eye /> Publish
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive" onSelect={() => setToDelete(blog)}>
                        <Trash2 /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
        Showing {filtered.length} of {blogs.length} posts
      </div>

      <AlertDialog open={toDelete !== null} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{toDelete?.title}&rdquo; and its uploaded images will be permanently deleted. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
