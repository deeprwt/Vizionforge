import "server-only"
import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import type { SupabaseClient } from "@supabase/supabase-js"
import { createServiceClient, isServiceRoleConfigured } from "@/lib/supabase/admin"
import { BlogServiceError, type BlogErrorCode } from "@/lib/blog/service"
import type { Blog } from "@/lib/blog/types"
import { SITE_URL } from "@/lib/site"
import { verifyApiKey, type ApiKeyRecord } from "./keys"

export type ApiErrorCode =
  | BlogErrorCode
  | "unauthorized"
  | "rate_limited"
  | "payload_too_large"
  | "not_configured"

const STATUS: Record<ApiErrorCode, number> = {
  validation_error: 400,
  unauthorized: 401,
  not_found: 404,
  conflict: 409,
  payload_too_large: 413,
  image_error: 422,
  rate_limited: 429,
  internal_error: 500,
  not_configured: 503,
}

export function apiError(code: ApiErrorCode, message: string, details?: unknown, headers?: HeadersInit) {
  return NextResponse.json(
    { error: { code, message, ...(details ? { details } : {}) } },
    { status: STATUS[code], headers }
  )
}

export function apiOk(data: unknown, init?: { status?: number; extra?: Record<string, unknown> }) {
  return NextResponse.json({ data, ...init?.extra }, { status: init?.status ?? 200 })
}

// ---------------------------------------------------------------------------
//  Rate limiting — in memory, per API key (the app runs as a single server).
// ---------------------------------------------------------------------------
const RATE_LIMIT = 120 // requests
const RATE_WINDOW_MS = 60_000
const buckets = new Map<string, { count: number; resetAt: number }>()

function rateLimit(keyId: string) {
  const now = Date.now()
  const bucket = buckets.get(keyId)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(keyId, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }
  bucket.count++
  return { allowed: bucket.count <= RATE_LIMIT, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
}

// ---------------------------------------------------------------------------
//  Auth wrapper
// ---------------------------------------------------------------------------
type ApiContext = { client: SupabaseClient; apiKey: ApiKeyRecord }
type RouteParams<P> = { params: Promise<P> }

const AUTH_MESSAGES = {
  missing: "Missing API key. Send it as 'Authorization: Bearer <key>'.",
  invalid: "Invalid API key.",
  revoked: "This API key has been revoked.",
  expired: "This API key has expired.",
}

export function withApiKey<P = Record<string, never>>(
  handler: (request: NextRequest, context: ApiContext, params: P) => Promise<Response>
) {
  return async (request: NextRequest, route: RouteParams<P>) => {
    if (!isServiceRoleConfigured) {
      return apiError("not_configured", "The blog API is not configured on this server.")
    }
    try {
      const client = createServiceClient()
      const check = await verifyApiKey(client, request.headers)
      if (!check.ok) {
        return apiError("unauthorized", AUTH_MESSAGES[check.reason], undefined, {
          "WWW-Authenticate": 'Bearer realm="blog-api"',
        })
      }

      const limit = rateLimit(check.key.id)
      if (!limit.allowed) {
        return apiError("rate_limited", `Too many requests. Limit is ${RATE_LIMIT} per minute.`, undefined, {
          "Retry-After": String(limit.retryAfter),
        })
      }

      return await handler(request, { client, apiKey: check.key }, await route.params)
    } catch (error) {
      if (error instanceof BlogServiceError) return apiError(error.code, error.message)
      console.error("Blog API error:", error)
      return apiError("internal_error", "Unexpected server error.")
    }
  }
}

// ---------------------------------------------------------------------------
//  Request parsing & validation
// ---------------------------------------------------------------------------
const MAX_JSON_BYTES = 25 * 1024 * 1024

export async function readJson<T extends z.ZodType>(request: NextRequest, schema: T) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_JSON_BYTES) {
    return { response: apiError("payload_too_large", "Request body must be 25 MB or smaller.") }
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return { response: apiError("validation_error", "Request body must be valid JSON.") }
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return {
      response: apiError(
        "validation_error",
        "Request body is invalid.",
        parsed.error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message }))
      ),
    }
  }
  return { data: parsed.data as z.infer<T> }
}

const text = (max: number) => z.string().max(max).nullable().optional()
// Base64 data URIs are ~4/3 of the file size (5 MB images).
const image = z.string().max(7_200_000).nullable().optional()

const blogFields = {
  title: z.string().trim().min(1, "Title is required.").max(200),
  slug: z.string().max(120).optional(),
  excerpt: text(500),
  content: z.string().max(2_000_000),
  content_format: z.enum(["html", "markdown"]).optional(),
  cover_image: image,
  og_image: image,
  category: text(80),
  tags: z.array(z.string().trim().min(1).max(50)).max(20).optional(),
  author_name: text(120),
  status: z.enum(["draft", "published"]).optional(),
  featured: z.boolean().optional(),
  seo_title: text(200),
  seo_description: text(500),
  canonical_url: z.url({ protocol: /^https?$/ }).max(2000).nullable().optional(),
  published_at: z.iso.datetime({ offset: true }).nullable().optional(),
}

export const createBlogSchema = z.object(blogFields).strict()
export const updateBlogSchema = z
  .object(blogFields)
  .partial()
  .strict()
  .refine((value) => Object.keys(value).length > 0, "Send at least one field to update.")

// ---------------------------------------------------------------------------
//  Output
// ---------------------------------------------------------------------------
export function siteOrigin(_request: NextRequest) {
  return SITE_URL
}

export function serializeBlog(blog: Blog, origin: string, { includeContent = true } = {}) {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    url: `${origin}/blog/${blog.slug}`,
    status: blog.status,
    excerpt: blog.excerpt,
    ...(includeContent ? { content: blog.content } : {}),
    cover_image: blog.cover_image_url,
    og_image: blog.og_image_url,
    category: blog.category,
    tags: blog.tags,
    author_name: blog.author_name,
    featured: blog.featured,
    seo_title: blog.seo_title,
    seo_description: blog.seo_description,
    canonical_url: blog.canonical_url,
    reading_time: blog.reading_time,
    source: blog.source,
    published_at: blog.published_at,
    created_at: blog.created_at,
    updated_at: blog.updated_at,
  }
}
