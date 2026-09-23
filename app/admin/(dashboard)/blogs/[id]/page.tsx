import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAdminUser } from "@/lib/supabase/server"
import type { Blog } from "@/lib/blog/types"
import { BlogForm } from "@/components/admin/blog-form"
import { getCategories } from "../categories"

export const metadata: Metadata = { title: "Edit Blog" }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!UUID.test(id)) notFound()

  const { supabase } = await getAdminUser()
  const [{ data: blog }, categories] = await Promise.all([
    supabase.from("blogs").select("*").eq("id", id).maybeSingle(),
    getCategories(supabase),
  ])
  if (!blog) notFound()

  // Keyed by id + updated_at so the form resets to fresh data after a save.
  return <BlogForm key={`${blog.id}-${blog.updated_at}`} blog={blog as Blog} categories={categories} defaultAuthor="" />
}
