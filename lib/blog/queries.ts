import { createPublicClient } from "@/lib/supabase/public"
import { BLOG_LIST_COLUMNS, type Blog, type BlogListItem } from "./types"

// Public (anonymous) reads. RLS only returns published posts; the explicit
// status filter keeps queries index-friendly. Every function degrades to an
// empty result so the site still builds and renders without Supabase.

export async function getPublishedBlogs(): Promise<BlogListItem[]> {
  const supabase = createPublicClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("blogs")
    .select(BLOG_LIST_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("getPublishedBlogs:", error.message)
    return []
  }
  return (data ?? []) as BlogListItem[]
}

export async function getPublishedBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = createPublicClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle()

  if (error) {
    console.error("getPublishedBlogBySlug:", error.message)
    return null
  }
  return data as Blog | null
}

export async function getRelatedBlogs(blog: Blog, limit = 3): Promise<BlogListItem[]> {
  const supabase = createPublicClient()
  if (!supabase) return []

  let query = supabase
    .from("blogs")
    .select(BLOG_LIST_COLUMNS)
    .eq("status", "published")
    .neq("id", blog.id)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (blog.category) query = query.eq("category", blog.category)

  const { data } = await query
  if (data && data.length > 0) return data as BlogListItem[]

  // No other posts in this category — fall back to the latest posts.
  const { data: latest } = await supabase
    .from("blogs")
    .select(BLOG_LIST_COLUMNS)
    .eq("status", "published")
    .neq("id", blog.id)
    .order("published_at", { ascending: false })
    .limit(limit)
  return (latest ?? []) as BlogListItem[]
}
