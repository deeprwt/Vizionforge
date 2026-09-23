import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { BlogListItem } from "@/lib/blog/types"
import { formatDate } from "@/lib/blog/utils"
import { cn } from "@/lib/utils"

export function BlogMeta({ blog, className }: { blog: BlogListItem; className?: string }) {
  return (
    <p className={cn("font-mono text-[0.72rem] uppercase tracking-[0.12em] text-navy/50", className)}>
      {formatDate(blog.published_at)} · {blog.reading_time} min read
    </p>
  )
}

function Cover({ blog, sizes, priority }: { blog: BlogListItem; sizes: string; priority?: boolean }) {
  return blog.cover_image_url ? (
    <Image
      src={blog.cover_image_url}
      alt={blog.title}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  ) : (
    <div className="absolute inset-0 bg-navy">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.25) 0%, rgba(30,32,68,0) 65%)" }}
      />
      <span className="absolute bottom-5 left-6 font-display text-3xl font-black text-white/15">VizionForge</span>
    </div>
  )
}

export function BlogCard({ blog }: { blog: BlogListItem }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Cover blog={blog} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col border-l-[3px] border-l-gold p-6">
        {blog.category && (
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-gold">{blog.category}</p>
        )}
        <h3 className="font-display text-xl font-bold leading-snug text-navy transition-colors group-hover:text-navy-mid">
          {blog.title}
        </h3>
        {blog.excerpt && <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-navy/60">{blog.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between pt-5">
          <BlogMeta blog={blog} />
          <ArrowRight size={16} className="text-gold transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export function FeaturedBlogCard({ blog }: { blog: BlogListItem }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group grid overflow-hidden rounded-sm bg-white shadow-sm transition-all hover:shadow-md lg:grid-cols-2"
    >
      <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[380px]">
        <Cover blog={blog} sizes="(min-width: 1024px) 600px, 100vw" priority />
      </div>
      <div className="flex flex-col justify-center border-l-[3px] border-l-gold p-8 sm:p-12">
        <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold">
          Featured{blog.category ? ` · ${blog.category}` : ""}
        </p>
        <h2
          className="font-display font-bold text-navy"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.15 }}
        >
          {blog.title}
        </h2>
        {blog.excerpt && <p className="mt-4 text-[1.05rem] leading-relaxed text-navy/60">{blog.excerpt}</p>}
        <BlogMeta blog={blog} className="mt-6" />
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-navy group-hover:text-gold">
          Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
