import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { getPublishedBlogBySlug, getRelatedBlogs } from "@/lib/blog/queries"
import { formatDate } from "@/lib/blog/utils"

export const revalidate = 300

// Rendered on first request, then cached until revalidated.
export function generateStaticParams() {
  return []
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blog = await getPublishedBlogBySlug(slug)
  if (!blog) return { title: "Post not found — VizionForge" }

  const title = blog.seo_title || blog.title
  const description = blog.seo_description || blog.excerpt || undefined
  return {
    title: `${title} — VizionForge`,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: blog.published_at ?? undefined,
      modifiedTime: blog.updated_at,
      authors: blog.author_name ? [blog.author_name] : undefined,
      tags: blog.tags,
      images: blog.cover_image_url ? [blog.cover_image_url] : undefined,
    },
    twitter: {
      card: blog.cover_image_url ? "summary_large_image" : "summary",
      title,
      description,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const blog = await getPublishedBlogBySlug(slug)
  if (!blog) notFound()

  const related = await getRelatedBlogs(blog)

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[45%]"
          style={{
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
            background: "linear-gradient(135deg, rgba(212,168,67,0.12) 0%, rgba(30,32,68,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[880px] px-5 pt-14 pb-14 sm:px-12 md:pt-20 md:pb-20">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ice/70 transition-colors hover:text-gold"
          >
            <ArrowLeft size={14} /> All articles
          </Link>
          {blog.category && (
            <div className="mb-4 flex items-center gap-3 animate-fade-up">
              <span className="block h-[2px] w-8 bg-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-gold">{blog.category}</span>
            </div>
          )}
          <h1
            className="font-display font-black text-white animate-fade-up-delay-1"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.12 }}
          >
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="mt-5 max-w-[680px] text-[1.1rem] leading-relaxed text-ice animate-fade-up-delay-2">
              {blog.excerpt}
            </p>
          )}
          <p className="mt-8 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ice/60 animate-fade-up-delay-3">
            {blog.author_name && <span className="text-white">{blog.author_name} · </span>}
            {formatDate(blog.published_at)} · {blog.reading_time} min read
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="bg-white">
        <div className="mx-auto max-w-[880px] px-5 py-12 sm:px-12 md:py-16">
          {blog.cover_image_url && (
            <div className="relative -mt-4 mb-12 aspect-[16/9] overflow-hidden rounded-sm shadow-md md:-mt-8">
              <Image
                src={blog.cover_image_url}
                alt={blog.title}
                fill
                priority
                sizes="(min-width: 880px) 784px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Content is authored by signed-in admins only (enforced by RLS). */}
          <div
            className="blog-content text-navy/85 [&_h2]:font-display [&_h2]:text-navy [&_h3]:text-navy [&_h4]:text-navy"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-navy/10 pt-8">
              {blog.tags.map((tag) => (
                <span key={tag} className="rounded-sm bg-navy/5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-navy/70">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-navy/10">
          <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-12 sm:py-20">
            <p className="mb-3 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold">Keep reading</p>
            <h2 className="mb-10 font-display font-bold text-navy" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
              More from the blog
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((post) => (
                <BlogCard key={post.id} blog={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t-[3px] border-gold bg-navy">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 px-5 py-14 sm:px-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Have a project in mind?</h2>
            <p className="mt-2 text-ice">Let&apos;s talk about how VizionForge can help you deliver faster.</p>
          </div>
          <Button asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
