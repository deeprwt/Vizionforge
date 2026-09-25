import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { getPublishedBlogs } from "@/lib/blog/queries"

// Rebuilt hourly, and immediately whenever a post is saved or deleted
// (see revalidateBlogPages in lib/blog/service.ts).
export const revalidate = 3600

type Entry = MetadataRoute.Sitemap[number]

const STATIC_PAGES: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/outsystems", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/microsoft-365", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/servicenow", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products/expense-genie", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/safeops360", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/sentio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/los-lms", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/loan-covenant", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products/mbo", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
  { path: "/case-studies", priority: 0.7, changeFrequency: "monthly" },
  { path: "/why-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/engagement", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getPublishedBlogs()

  const pages: MetadataRoute.Sitemap = STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency,
    priority,
  }))

  const posts: MetadataRoute.Sitemap = blogs
    // A post whose canonical URL is on another site belongs in that site's sitemap.
    .filter((blog) => !blog.canonical_url || blog.canonical_url.startsWith(SITE_URL))
    .map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.updated_at),
      changeFrequency: "monthly",
      priority: blog.featured ? 0.8 : 0.7,
      images: blog.cover_image_url ? [blog.cover_image_url] : undefined,
    }))

  const newestPost = posts[0]?.lastModified
  return pages
    .map((page) => (page.url.endsWith("/blog") && newestPost ? { ...page, lastModified: newestPost } : page))
    .concat(posts)
}
