import { BLOG_IMAGES_BUCKET, SUPABASE_URL } from "@/lib/supabase/env"

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96)
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function readingTime(html: string) {
  const words = stripHtml(html).split(" ").filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDate(value: string | null | undefined, style: "long" | "short" = "long") {
  if (!value) return "—"
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  })
}

const PUBLIC_URL_PREFIX = `${SUPABASE_URL.replace(/\/+$/, "")}/storage/v1/object/public/${BLOG_IMAGES_BUCKET}/`

/**
 * Storage object path for an image in this project's blog-images bucket,
 * or null for any other URL (including other Supabase projects).
 */
export function storagePathFromUrl(url: string | null | undefined) {
  if (!url || !SUPABASE_URL || !url.startsWith(PUBLIC_URL_PREFIX)) return null
  const path = decodeURIComponent(url.slice(PUBLIC_URL_PREFIX.length).split("?")[0])
  return path && !path.includes("..") ? path : null
}

/** Storage paths of every bucket image used by a post (cover/social images + inline). */
export function collectImagePaths(imageUrls: (string | null | undefined)[], html: string) {
  const paths = new Set<string>()
  for (const url of imageUrls) {
    const path = storagePathFromUrl(url)
    if (path) paths.add(path)
  }
  for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const path = storagePathFromUrl(match[1])
    if (path) paths.add(path)
  }
  return paths
}
