"use server"

import { revalidatePath } from "next/cache"
import { getAdminUser } from "@/lib/supabase/server"
import { BLOG_IMAGES_BUCKET } from "@/lib/supabase/env"
import { collectImagePaths, readingTime, slugify, stripHtml } from "@/lib/blog/utils"
import type { BlogInput, BlogStatus } from "@/lib/blog/types"

type ActionResult<T = object> = ({ ok: true } & T) | { ok: false; error: string }

async function requireAdmin() {
  const { supabase, isAdmin } = await getAdminUser()
  if (!isAdmin) throw new Error("You are not authorized to manage blogs.")
  return supabase
}

function revalidateBlog(...slugs: (string | null | undefined)[]) {
  revalidatePath("/blog")
  for (const slug of new Set(slugs)) if (slug) revalidatePath(`/blog/${slug}`)
  revalidatePath("/admin", "layout")
}

function toMessage(error: unknown) {
  if (error && typeof error === "object" && "code" in error && error.code === "23505") {
    return "Another post already uses this slug. Choose a different one."
  }
  if (error instanceof Error) return error.message
  if (error && typeof error === "object" && "message" in error) return String(error.message)
  return "Something went wrong."
}

export async function saveBlog(
  id: string | null,
  input: BlogInput
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    const supabase = await requireAdmin()

    const title = input.title.trim()
    const slug = slugify(input.slug || title)
    if (!title) return { ok: false, error: "Title is required." }
    if (!slug) return { ok: false, error: "Slug is required." }
    if (input.status === "published" && !stripHtml(input.content)) {
      return { ok: false, error: "Add some content before publishing." }
    }

    const existing = id
      ? (
          await supabase
            .from("blogs")
            .select("slug, published_at, cover_image_url, content")
            .eq("id", id)
            .single()
        ).data
      : null
    if (id && !existing) return { ok: false, error: "This post no longer exists." }

    const plain = stripHtml(input.content)
    const row = {
      title,
      slug,
      excerpt: input.excerpt.trim() || (plain.length > 180 ? `${plain.slice(0, 177)}…` : plain) || null,
      content: input.content,
      cover_image_url: input.cover_image_url || null,
      category: input.category.trim() || null,
      tags: [...new Set(input.tags.map((t) => t.trim()).filter(Boolean))],
      author_name: input.author_name.trim() || null,
      status: input.status,
      featured: input.featured,
      seo_title: input.seo_title.trim() || null,
      seo_description: input.seo_description.trim() || null,
      reading_time: readingTime(input.content),
      published_at:
        existing?.published_at ?? (input.status === "published" ? new Date().toISOString() : null),
    }

    const { data, error } = id
      ? await supabase.from("blogs").update(row).eq("id", id).select("id, slug").single()
      : await supabase.from("blogs").insert(row).select("id, slug").single()
    if (error) return { ok: false, error: toMessage(error) }

    // Delete images that were removed from the post while editing.
    if (existing) {
      const kept = collectImagePaths(row.cover_image_url, row.content)
      const removed = [...collectImagePaths(existing.cover_image_url, existing.content)].filter(
        (path) => !kept.has(path)
      )
      if (removed.length) await supabase.storage.from(BLOG_IMAGES_BUCKET).remove(removed)
    }

    revalidateBlog(existing?.slug, data.slug)
    return { ok: true, id: data.id, slug: data.slug }
  } catch (error) {
    return { ok: false, error: toMessage(error) }
  }
}

export async function setBlogStatus(id: string, status: BlogStatus): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin()

    const { data: blog } = await supabase
      .from("blogs")
      .select("slug, content, published_at")
      .eq("id", id)
      .single()
    if (!blog) return { ok: false, error: "This post no longer exists." }
    if (status === "published" && !stripHtml(blog.content)) {
      return { ok: false, error: "Add some content before publishing." }
    }

    const { error } = await supabase
      .from("blogs")
      .update({
        status,
        published_at: blog.published_at ?? (status === "published" ? new Date().toISOString() : null),
      })
      .eq("id", id)
    if (error) return { ok: false, error: toMessage(error) }

    revalidateBlog(blog.slug)
    return { ok: true }
  } catch (error) {
    return { ok: false, error: toMessage(error) }
  }
}

export async function deleteBlog(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin()

    const { data: blog } = await supabase
      .from("blogs")
      .select("slug, cover_image_url, content")
      .eq("id", id)
      .single()
    if (!blog) return { ok: false, error: "This post no longer exists." }

    const { error } = await supabase.from("blogs").delete().eq("id", id)
    if (error) return { ok: false, error: toMessage(error) }

    const paths = [...collectImagePaths(blog.cover_image_url, blog.content)]
    if (paths.length) await supabase.storage.from(BLOG_IMAGES_BUCKET).remove(paths)

    revalidateBlog(blog.slug)
    return { ok: true }
  } catch (error) {
    return { ok: false, error: toMessage(error) }
  }
}
