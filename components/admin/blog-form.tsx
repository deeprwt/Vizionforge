"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ExternalLink, ImagePlus, Loader2, RefreshCw, Save, Send, Trash2, Upload, X } from "lucide-react"
import { saveBlog } from "@/app/admin/actions"
import type { Blog, BlogInput, BlogStatus } from "@/lib/blog/types"
import { formatDate, readingTime, slugify } from "@/lib/blog/utils"
import { ACCEPTED_IMAGE_TYPES, uploadBlogImage } from "@/lib/blog/upload"
import { cn } from "@/lib/utils"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { Textarea } from "@/components/admin/ui/textarea"
import { Switch } from "@/components/admin/ui/switch"
import { Badge } from "@/components/admin/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { PageHeader } from "./page-header"
import { StatusBadge } from "./status-badge"
import { RichTextEditor } from "./rich-text-editor"

function toInput(blog?: Blog, defaultAuthor = ""): BlogInput {
  return {
    title: blog?.title ?? "",
    slug: blog?.slug ?? "",
    excerpt: blog?.excerpt ?? "",
    content: blog?.content ?? "",
    cover_image_url: blog?.cover_image_url ?? null,
    category: blog?.category ?? "",
    tags: blog?.tags ?? [],
    author_name: blog?.author_name ?? defaultAuthor,
    status: blog?.status ?? "draft",
    featured: blog?.featured ?? false,
    seo_title: blog?.seo_title ?? "",
    seo_description: blog?.seo_description ?? "",
    canonical_url: blog?.canonical_url ?? "",
    og_image_url: blog?.og_image_url ?? null,
  }
}

export function BlogForm({
  blog,
  categories,
  defaultAuthor,
}: {
  blog?: Blog
  categories: string[]
  defaultAuthor: string
}) {
  const router = useRouter()
  const [form, setForm] = useState<BlogInput>(() => toInput(blog, defaultAuthor))
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(toInput(blog, defaultAuthor)))
  // Keep the slug in sync with the title until the admin edits it by hand.
  const [slugTouched, setSlugTouched] = useState(Boolean(blog))
  const [tagDraft, setTagDraft] = useState("")
  const [savingAs, setSavingAs] = useState<BlogStatus | null>(null)
  const [isPending, startTransition] = useTransition()

  const isNew = !blog
  const isDirty = JSON.stringify(form) !== savedSnapshot
  const isPublished = blog?.status === "published"

  const update = <K extends keyof BlogInput>(key: K, value: BlogInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!isDirty) return
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener("beforeunload", onBeforeUnload)
    return () => window.removeEventListener("beforeunload", onBeforeUnload)
  }, [isDirty])

  const save = (status: BlogStatus) => {
    if (isPending) return
    setSavingAs(status)
    startTransition(async () => {
      const input = { ...form, status }
      const result = await saveBlog(blog?.id ?? null, input)
      setSavingAs(null)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      const saved = { ...input, slug: result.slug }
      setForm(saved)
      setSavedSnapshot(JSON.stringify(saved))
      toast.success(
        status === "published"
          ? isPublished ? "Post updated" : "Post published"
          : isPublished ? "Post moved to drafts" : "Draft saved"
      )
      if (isNew) router.replace(`/admin/blogs/${result.id}`)
      else router.refresh()
    })
  }

  // Ctrl/⌘+S saves without changing the status.
  const saveRef = useRef(save)
  saveRef.current = save
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault()
        saveRef.current(blog?.status ?? "draft")
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [blog?.status])

  const addTags = (raw: string) => {
    const next = raw.split(",").map((t) => t.trim()).filter(Boolean)
    if (next.length) update("tags", [...new Set([...form.tags, ...next])])
    setTagDraft("")
  }

  const minutes = readingTime(form.content)
  const seoTitle = form.seo_title || form.title || "Post title"
  const seoDescription = form.seo_description || form.excerpt || "Add an excerpt or meta description to control this snippet."

  return (
    <>
      <PageHeader
        title={isNew ? "New Blog" : "Edit Blog"}
        description={isNew ? "Write a new article for the website." : `Last updated ${formatDate(blog.updated_at)}`}
        crumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Blogs", href: "/admin/blogs" },
          { label: isNew ? "New" : "Edit" },
        ]}
        actions={
          <>
            {isPublished && (
              <Button asChild variant="outline" className="h-10 rounded-xl">
                <Link href={`/blog/${blog.slug}`} target="_blank">
                  <ExternalLink /> View live
                </Link>
              </Button>
            )}
            <Button
              variant="outline"
              className="h-10 rounded-xl"
              disabled={isPending}
              onClick={() => save("draft")}
            >
              {savingAs === "draft" ? <Loader2 className="animate-spin" /> : <Save />}
              {isPublished ? "Unpublish" : "Save draft"}
            </Button>
            <Button
              className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 font-semibold text-white shadow-md hover:from-indigo-600 hover:to-purple-600"
              disabled={isPending}
              onClick={() => save("published")}
            >
              {savingAs === "published" ? <Loader2 className="animate-spin" /> : <Send />}
              {isPublished ? "Update" : "Publish"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Main column */}
        <div className="col-span-12 space-y-4 md:space-y-6 xl:col-span-8">
          <Card className="rounded-2xl border-gray-200/70 shadow-sm">
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setForm((prev) => ({ ...prev, title, slug: slugTouched ? prev.slug : slugify(title) }))
                  }}
                  placeholder="An engaging headline"
                  className="h-12 rounded-lg text-lg font-semibold md:text-lg"
                  autoFocus={isNew}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL slug</Label>
                <div className="flex rounded-lg border border-input shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
                  <span className="flex items-center rounded-l-lg border-r border-input bg-gray-50 px-3 text-sm text-gray-500">
                    /blog/
                  </span>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => {
                      setSlugTouched(true)
                      update("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))
                    }}
                    onBlur={() => update("slug", slugify(form.slug))}
                    placeholder="my-post-url"
                    className="border-0 shadow-none focus-visible:ring-0"
                  />
                  {slugTouched && form.title && slugify(form.title) !== form.slug && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="m-1 text-xs text-indigo-600"
                      onClick={() => {
                        update("slug", slugify(form.title))
                        setSlugTouched(false)
                      }}
                    >
                      <RefreshCw /> From title
                    </Button>
                  )}
                </div>
                {isPublished && blog.slug !== form.slug && (
                  <p className="text-xs text-amber-600">Changing the slug of a published post breaks existing links to it.</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <span className={cn("text-xs tabular-nums", form.excerpt.length > 200 ? "text-amber-600" : "text-gray-400")}>
                    {form.excerpt.length}/200
                  </span>
                </div>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => update("excerpt", e.target.value)}
                  placeholder="A short summary shown on the blog listing. Leave empty to use the opening of the post."
                  className="min-h-20 rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Content</Label>
              <span className="text-xs text-gray-400">
                {minutes} min read · paste or drop images to upload
              </span>
            </div>
            <RichTextEditor value={form.content} onChange={(html) => update("content", html)} />
          </div>
        </div>

        {/* Sidebar column */}
        <div className="col-span-12 space-y-4 md:space-y-6 xl:col-span-4">
          <Card className="rounded-2xl border-gray-200/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <Row label="Status">
                <StatusBadge status={blog?.status ?? "draft"} />
              </Row>
              {blog?.published_at && <Row label="Published">{formatDate(blog.published_at)}</Row>}
              <Row label="Unsaved changes">
                <span className={isDirty ? "font-medium text-amber-600" : "text-gray-500"}>{isDirty ? "Yes" : "No"}</span>
              </Row>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                <div>
                  <Label htmlFor="featured">Featured post</Label>
                  <p className="mt-0.5 text-xs text-gray-500">Highlighted at the top of the blog page.</p>
                </div>
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(checked) => update("featured", checked)}
                  className="data-[state=checked]:bg-indigo-500"
                />
              </div>
            </CardContent>
          </Card>

          <ImageUploadCard
            title="Cover image"
            description="Shown on the blog listing and at the top of the post. 16:9 works best."
            folder="covers"
            value={form.cover_image_url}
            onChange={(url) => update("cover_image_url", url)}
          />

          <Card className="rounded-2xl border-gray-200/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Organize</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  list="blog-categories"
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  placeholder="e.g. Low-Code"
                />
                <datalist id="blog-categories">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tagDraft}
                  onChange={(e) => setTagDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault()
                      addTags(tagDraft)
                    } else if (e.key === "Backspace" && !tagDraft && form.tags.length) {
                      update("tags", form.tags.slice(0, -1))
                    }
                  }}
                  onBlur={() => tagDraft && addTags(tagDraft)}
                  placeholder="Type a tag and press Enter"
                />
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 rounded-full bg-indigo-50 pr-1 text-indigo-700">
                        {tag}
                        <button
                          type="button"
                          aria-label={`Remove ${tag}`}
                          onClick={() => update("tags", form.tags.filter((t) => t !== tag))}
                          className="rounded-full p-0.5 hover:bg-indigo-100"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={form.author_name}
                  onChange={(e) => update("author_name", e.target.value)}
                  placeholder="Author name"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">SEO</CardTitle>
              <CardDescription>Optional — falls back to the title and excerpt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="seo-title">Meta title</Label>
                  <span className={cn("text-xs tabular-nums", form.seo_title.length > 60 ? "text-amber-600" : "text-gray-400")}>
                    {form.seo_title.length}/60
                  </span>
                </div>
                <Input id="seo-title" value={form.seo_title} onChange={(e) => update("seo_title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="seo-description">Meta description</Label>
                  <span className={cn("text-xs tabular-nums", form.seo_description.length > 160 ? "text-amber-600" : "text-gray-400")}>
                    {form.seo_description.length}/160
                  </span>
                </div>
                <Textarea
                  id="seo-description"
                  value={form.seo_description}
                  onChange={(e) => update("seo_description", e.target.value)}
                  className="min-h-20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canonical-url">Canonical URL</Label>
                <Input
                  id="canonical-url"
                  type="url"
                  value={form.canonical_url}
                  onChange={(e) => update("canonical_url", e.target.value)}
                  placeholder="https://… (only if first published elsewhere)"
                />
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-3">
                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Search preview</p>
                <p className="mt-1.5 truncate text-xs text-gray-500">vizionforge.com › blog › {form.slug || "…"}</p>
                <p className="truncate text-[15px] font-medium text-[#1a0dab]">{seoTitle}</p>
                <p className="line-clamp-2 text-xs text-gray-600">{seoDescription}</p>
              </div>
            </CardContent>
          </Card>

          <ImageUploadCard
            title="Social share image"
            description="Used for link previews on LinkedIn, X and WhatsApp. Defaults to the cover image. 1200×630 works best."
            folder="social"
            value={form.og_image_url}
            onChange={(url) => update("og_image_url", url)}
          />
        </div>
      </div>
    </>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900">{children}</span>
    </div>
  )
}

function ImageUploadCard({
  title,
  description,
  folder,
  value,
  onChange,
}: {
  title: string
  description: string
  folder: "covers" | "social"
  value: string | null
  onChange: (url: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const upload = async (file: File | undefined) => {
    if (!file) return
    setUploading(true)
    try {
      onChange(await uploadBlogImage(file, folder))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={(e) => {
            void upload(e.target.files?.[0])
            e.target.value = ""
          }}
        />
        {value ? (
          <div className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <Image src={value} alt={title} fill sizes="400px" className="object-cover" />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                  <Loader2 className="size-6 animate-spin text-indigo-600" />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" className="flex-1" disabled={uploading} onClick={() => inputRef.current?.click()}>
                <Upload /> Replace
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                disabled={uploading}
                onClick={() => onChange(null)}
              >
                <Trash2 /> Remove
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              void upload(e.dataTransfer.files?.[0])
            }}
            disabled={uploading}
            className={cn(
              "flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-center transition-colors",
              dragOver ? "border-indigo-400 bg-indigo-50" : "border-gray-300 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40"
            )}
          >
            {uploading ? (
              <Loader2 className="size-6 animate-spin text-indigo-600" />
            ) : (
              <>
                <span className="flex size-11 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                  <ImagePlus className="size-5" />
                </span>
                <span className="text-sm font-medium text-gray-700">Click or drop an image</span>
                <span className="text-xs text-gray-500">PNG, JPG, WEBP, GIF · up to 5 MB</span>
              </>
            )}
          </button>
        )}
      </CardContent>
    </Card>
  )
}
