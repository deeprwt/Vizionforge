import "server-only"
import { revalidatePath } from "next/cache"
import type { SupabaseClient } from "@supabase/supabase-js"
import { BLOG_IMAGES_BUCKET } from "@/lib/supabase/env"
import type { Blog, BlogSource, BlogStatus } from "./types"
import { collectImagePaths, readingTime, slugify, stripHtml } from "./utils"
import { markdownToHtml, sanitizeContent } from "./sanitize"
import { ImageError, rehostContentImages, resolveImage } from "./server-images"

/**
 * Fields accepted when creating or updating a post. `undefined` means
 * "leave unchanged" on update; `null` clears optional fields.
 * Image fields accept a URL (re-hosted into Supabase Storage unless it is
 * already there) or a base64 data URI.
 */
export interface BlogWriteInput {
  title?: string
  slug?: string
  excerpt?: string | null
  content?: string
  content_format?: "html" | "markdown"
  cover_image?: string | null
  og_image?: string | null
  category?: string | null
  tags?: string[]
  author_name?: string | null
  status?: BlogStatus
  featured?: boolean
  seo_title?: string | null
  seo_description?: string | null
  canonical_url?: string | null
  published_at?: string | null
}

export type BlogErrorCode = "validation_error" | "not_found" | "conflict" | "image_error" | "internal_error"

export class BlogServiceError extends Error {
  constructor(
    public code: BlogErrorCode,
    message: string
  ) {
    super(message)
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function revalidateBlogPages(...slugs: (string | null | undefined)[]) {
  revalidatePath("/blog")
  for (const slug of new Set(slugs)) if (slug) revalidatePath(`/blog/${slug}`)
  revalidatePath("/admin", "layout")
}

/** Finds a post by UUID or slug. */
export async function findBlog(client: SupabaseClient, idOrSlug: string) {
  const column = UUID.test(idOrSlug) ? "id" : "slug"
  const { data, error } = await client.from("blogs").select("*").eq(column, idOrSlug).maybeSingle()
  if (error) throw new BlogServiceError("internal_error", error.message)
  return data as Blog | null
}

async function uniqueSlug(client: SupabaseClient, base: string) {
  const { data } = await client.from("blogs").select("slug").like("slug", `${base}%`)
  const taken = new Set((data ?? []).map((row) => row.slug as string))
  if (!taken.has(base)) return base
  for (let n = 2; ; n++) if (!taken.has(`${base}-${n}`)) return `${base}-${n}`
}

async function resolveOptionalImage(
  client: SupabaseClient,
  value: string | null | undefined,
  current: string | null,
  folder: "covers" | "social"
) {
  if (value === undefined) return current
  if (value === null || value.trim() === "") return null
  return resolveImage(client, value, folder)
}

function optionalText(value: string | null | undefined, current: string | null) {
  if (value === undefined) return current
  return value?.trim() || null
}

/**
 * Creates (no `id`) or updates a post. Runs with whatever client it is
 * given — the admin's session client (RLS enforced) or the service client
 * used by the public API after API-key verification.
 */
export async function writeBlog(
  client: SupabaseClient,
  {
    id,
    input,
    source = "dashboard",
    apiKeyId = null,
    autoSlug = false,
  }: {
    id?: string
    input: BlogWriteInput
    source?: BlogSource
    apiKeyId?: string | null
    /** When the slug is derived from the title, add -2, -3… instead of failing on duplicates. */
    autoSlug?: boolean
  }
): Promise<Blog> {
  const existing = id ? await findBlog(client, id) : null
  if (id && !existing) throw new BlogServiceError("not_found", "Blog post not found.")

  const title = (input.title ?? existing?.title ?? "").trim()
  if (!title) throw new BlogServiceError("validation_error", "Title is required.")

  let slug: string
  if (input.slug !== undefined && input.slug.trim()) slug = slugify(input.slug)
  else if (existing) slug = existing.slug
  else slug = autoSlug ? await uniqueSlug(client, slugify(title)) : slugify(title)
  if (!slug) throw new BlogServiceError("validation_error", "Slug is required.")

  const status = input.status ?? existing?.status ?? "draft"

  const canonicalUrl = optionalText(input.canonical_url, existing?.canonical_url ?? null)
  if (canonicalUrl && !/^https?:\/\/[^\s]+$/i.test(canonicalUrl)) {
    throw new BlogServiceError("validation_error", "Canonical URL must start with http:// or https://.")
  }

  let content = existing?.content ?? ""
  let coverImage: string | null
  let ogImage: string | null
  try {
    if (input.content !== undefined) {
      const html = input.content_format === "markdown" ? markdownToHtml(input.content) : input.content
      content = sanitizeContent(await rehostContentImages(client, html))
    }
    coverImage = await resolveOptionalImage(client, input.cover_image, existing?.cover_image_url ?? null, "covers")
    ogImage = await resolveOptionalImage(client, input.og_image, existing?.og_image_url ?? null, "social")
  } catch (error) {
    if (error instanceof ImageError) throw new BlogServiceError("image_error", error.message)
    throw error
  }

  const plain = stripHtml(content)
  if (status === "published" && !plain && !/<img\b/i.test(content)) {
    throw new BlogServiceError("validation_error", "Add some content before publishing.")
  }

  const excerpt =
    optionalText(input.excerpt, existing?.excerpt ?? null) ||
    (plain.length > 180 ? `${plain.slice(0, 177)}…` : plain) ||
    null

  let publishedAt = existing?.published_at ?? null
  if (input.published_at !== undefined) publishedAt = input.published_at
  if (status === "published" && !publishedAt) publishedAt = new Date().toISOString()

  const row = {
    title,
    slug,
    excerpt,
    content,
    cover_image_url: coverImage,
    og_image_url: ogImage,
    category: optionalText(input.category, existing?.category ?? null),
    tags:
      input.tags !== undefined
        ? [...new Set(input.tags.map((t) => t.trim()).filter(Boolean))]
        : existing?.tags ?? [],
    author_name: optionalText(input.author_name, existing?.author_name ?? null),
    status,
    featured: input.featured ?? existing?.featured ?? false,
    seo_title: optionalText(input.seo_title, existing?.seo_title ?? null),
    seo_description: optionalText(input.seo_description, existing?.seo_description ?? null),
    canonical_url: canonicalUrl,
    reading_time: readingTime(content),
    published_at: publishedAt,
  }

  const { data, error } = existing
    ? await client.from("blogs").update(row).eq("id", existing.id).select("*").single()
    : await client
        .from("blogs")
        .insert({ ...row, source, api_key_id: apiKeyId })
        .select("*")
        .single()

  if (error) {
    if (error.code === "23505") {
      throw new BlogServiceError("conflict", `The slug "${slug}" is already used by another post.`)
    }
    throw new BlogServiceError("internal_error", error.message)
  }

  // Delete images that are no longer used by this post.
  if (existing) {
    const kept = collectImagePaths([row.cover_image_url, row.og_image_url], row.content)
    const removed = [
      ...collectImagePaths([existing.cover_image_url, existing.og_image_url], existing.content),
    ].filter((path) => !kept.has(path))
    if (removed.length) await client.storage.from(BLOG_IMAGES_BUCKET).remove(removed)
  }

  revalidateBlogPages(existing?.slug, data.slug)
  return data as Blog
}

export async function deleteBlogRecord(client: SupabaseClient, idOrSlug: string) {
  const blog = await findBlog(client, idOrSlug)
  if (!blog) throw new BlogServiceError("not_found", "Blog post not found.")

  const { error } = await client.from("blogs").delete().eq("id", blog.id)
  if (error) throw new BlogServiceError("internal_error", error.message)

  const paths = [...collectImagePaths([blog.cover_image_url, blog.og_image_url], blog.content)]
  if (paths.length) await client.storage.from(BLOG_IMAGES_BUCKET).remove(paths)

  revalidateBlogPages(blog.slug)
  return blog
}
