import Link from "next/link"
import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { getAdminUser } from "@/lib/supabase/server"
import { BLOG_LIST_COLUMNS, type BlogListItem } from "@/lib/blog/types"
import { Button } from "@/components/admin/ui/button"
import { PageHeader } from "@/components/admin/page-header"
import { BlogsTable } from "@/components/admin/blogs-table"

export const metadata: Metadata = { title: "Blogs" }

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>
}) {
  const { q, status } = await searchParams
  const { supabase } = await getAdminUser()
  const { data, error } = await supabase
    .from("blogs")
    .select(BLOG_LIST_COLUMNS)
    .order("updated_at", { ascending: false })

  return (
    <>
      <PageHeader
        title="Blogs"
        description="Create, edit and publish articles for the VizionForge website."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Blogs" }]}
        actions={
          <Button asChild className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 font-semibold text-white shadow-md hover:from-indigo-600 hover:to-purple-600">
            <Link href="/admin/blogs/new">
              <Plus /> New Blog
            </Link>
          </Button>
        }
      />
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load posts: {error.message}
        </div>
      )}
      <BlogsTable
        // Remount when the header search changes the URL so filters reset to it.
        key={`${q ?? ""}|${status ?? ""}`}
        blogs={(data ?? []) as BlogListItem[]}
        initialQuery={q ?? ""}
        initialStatus={status === "published" || status === "draft" ? status : "all"}
      />
    </>
  )
}
