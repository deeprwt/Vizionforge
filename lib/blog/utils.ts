import { BLOG_IMAGES_BUCKET } from "@/lib/supabase/env"

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

const PUBLIC_PATH_MARKER = `/storage/v1/object/public/${BLOG_IMAGES_BUCKET}/`

/** Storage object path for a public blog-images URL, or null for other URLs. */
export function storagePathFromUrl(url: string | null | undefined) {
  if (!url) return null
  const index = url.indexOf(PUBLIC_PATH_MARKER)
  if (index === -1) return null
  return decodeURIComponent(url.slice(index + PUBLIC_PATH_MARKER.length).split("?")[0])
}

/** Storage paths of every bucket image used by a post (cover + inline). */
export function collectImagePaths(coverUrl: string | null | undefined, html: string) {
  const paths = new Set<string>()
  const cover = storagePathFromUrl(coverUrl)
  if (cover) paths.add(cover)
  for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const path = storagePathFromUrl(match[1])
    if (path) paths.add(path)
  }
  return paths
}
