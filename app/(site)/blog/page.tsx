import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { BlogCard, FeaturedBlogCard } from "@/components/blog/blog-card"
import { getPublishedBlogs } from "@/lib/blog/queries"

// Regenerated at most every 5 minutes, and immediately when an admin saves.
export const revalidate = 300

export const metadata: Metadata = {
  title: "Blog — VizionForge",
  description:
    "Insights on low-code delivery, AI-first engineering, OutSystems, Microsoft 365 and ServiceNow from the VizionForge team.",
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs()
  const featured = blogs.find((b) => b.featured) ?? blogs[0]
  const rest = blogs.filter((b) => b.id !== featured?.id)

  return (
    <>
      <HeroSection
        size="compact"
        eyebrow="Insights"
        title={
          <>
            Ideas from the <span className="gold-gradient-text">forge</span>
          </>
        }
        subtitle="Perspectives on low-code, AI-first engineering and enterprise delivery from the people building it."
      />

      <SectionWrapper>
        {blogs.length === 0 ? (
          <div className="rounded-sm border-l-[3px] border-l-gold bg-white p-10 text-center shadow-sm">
            <p className="font-display text-2xl font-bold text-navy">New articles are on the way.</p>
            <p className="mt-2 text-navy/60">Check back soon for insights from the VizionForge team.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {featured && <FeaturedBlogCard blog={featured} />}
            {rest.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </div>
        )}
      </SectionWrapper>
    </>
  )
}
