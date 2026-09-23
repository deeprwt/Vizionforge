import { writeBlog } from "@/lib/blog/service"
import type { Blog } from "@/lib/blog/types"
import { apiError, apiOk, createBlogSchema, readJson, serializeBlog, siteOrigin, withApiKey } from "@/lib/api/http"

/**
 * GET /api/v1/blogs — list posts (drafts included).
 * Query: status=draft|published, category, q (title search), limit (1–100, default 20), offset.
 */
export const GET = withApiKey(async (request, { client }) => {
  const params = request.nextUrl.searchParams
  const limit = Math.min(Math.max(Number(params.get("limit")) || 20, 1), 100)
  const offset = Math.max(Number(params.get("offset")) || 0, 0)
  const status = params.get("status")
  if (status && status !== "draft" && status !== "published") {
    return apiError("validation_error", "status must be 'draft' or 'published'.")
  }

  let query = client
    .from("blogs")
    .select("*", { count: "exact" })
    .order("updated_at", { ascending: false })
    .range(offset, offset + limit - 1)
  if (status) query = query.eq("status", status)
  if (params.get("category")) query = query.eq("category", params.get("category")!)
  const q = params.get("q")?.trim()
  if (q) query = query.ilike("title", `%${q.replace(/[%_\\]/g, "\\$&")}%`)

  const { data, error, count } = await query
  if (error) return apiError("internal_error", error.message)

  const origin = siteOrigin(request)
  return apiOk(
    (data as Blog[]).map((blog) => serializeBlog(blog, origin, { includeContent: false })),
    { extra: { pagination: { limit, offset, total: count ?? 0 } } }
  )
})

/** POST /api/v1/blogs — create a post. */
export const POST = withApiKey(async (request, { client, apiKey }) => {
  const { data: input, response } = await readJson(request, createBlogSchema)
  if (response) return response

  const blog = await writeBlog(client, {
    input,
    source: "api",
    apiKeyId: apiKey.id,
    autoSlug: !input.slug,
  })
  return apiOk(serializeBlog(blog, siteOrigin(request)), { status: 201 })
})
