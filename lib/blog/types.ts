export type BlogStatus = "draft" | "published"
export type BlogSource = "dashboard" | "api"

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  category: string | null
  tags: string[]
  author_name: string | null
  status: BlogStatus
  featured: boolean
  seo_title: string | null
  seo_description: string | null
  canonical_url: string | null
  og_image_url: string | null
  source: BlogSource
  api_key_id: string | null
  reading_time: number
  published_at: string | null
  created_at: string
  updated_at: string
}

/** Columns needed for listings — skips the (large) content column. */
export const BLOG_LIST_COLUMNS =
  "id, title, slug, excerpt, cover_image_url, category, tags, author_name, status, featured, source, reading_time, published_at, created_at, updated_at"

export type BlogListItem = Omit<
  Blog,
  "content" | "seo_title" | "seo_description" | "canonical_url" | "og_image_url" | "api_key_id"
>

/** What the admin editor submits. */
export interface BlogInput {
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string | null
  category: string
  tags: string[]
  author_name: string
  status: BlogStatus
  featured: boolean
  seo_title: string
  seo_description: string
  canonical_url: string
  og_image_url: string | null
}
