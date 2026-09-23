"use server"

import { revalidatePath } from "next/cache"
import { getAdminUser } from "@/lib/supabase/server"
import { BlogServiceError, deleteBlogRecord, writeBlog } from "@/lib/blog/service"
import { generateApiKey } from "@/lib/api/keys"
import type { BlogInput, BlogStatus } from "@/lib/blog/types"

type ActionResult<T = object> = ({ ok: true } & T) | { ok: false; error: string }

async function requireAdmin() {
  const { supabase, isAdmin } = await getAdminUser()
  if (!isAdmin) throw new Error("You are not authorized to perform this action.")
  return supabase
}

function toMessage(error: unknown) {
  if (error instanceof BlogServiceError || error instanceof Error) return error.message
  return "Something went wrong."
}

export async function saveBlog(
  id: string | null,
  input: BlogInput
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    const supabase = await requireAdmin()
    const blog = await writeBlog(supabase, {
      id: id ?? undefined,
      input: {
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content: input.content,
        cover_image: input.cover_image_url,
        og_image: input.og_image_url,
        category: input.category,
        tags: input.tags,
        author_name: input.author_name,
        status: input.status,
        featured: input.featured,
        seo_title: input.seo_title,
        seo_description: input.seo_description,
        canonical_url: input.canonical_url,
      },
    })
    return { ok: true, id: blog.id, slug: blog.slug }
  } catch (error) {
    return { ok: false, error: toMessage(error) }
  }
}

export async function setBlogStatus(id: string, status: BlogStatus): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin()
    await writeBlog(supabase, { id, input: { status } })
    return { ok: true }
  } catch (error) {
    return { ok: false, error: toMessage(error) }
  }
}

export async function deleteBlog(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin()
    await deleteBlogRecord(supabase, id)
    return { ok: true }
  } catch (error) {
    return { ok: false, error: toMessage(error) }
  }
}

// ---------------------------------------------------------------------------
//  API keys
// ---------------------------------------------------------------------------

export async function createApiKey(
  name: string,
  expiresInDays: number | null
): Promise<ActionResult<{ key: string }>> {
  try {
    const supabase = await requireAdmin()
    const trimmed = name.trim()
    if (!trimmed) return { ok: false, error: "Give the key a name so you know who uses it." }

    const { key, prefix, hash } = generateApiKey()
    const expiresAt = expiresInDays ? new Date(Date.now() + expiresInDays * 86_400_000).toISOString() : null

    const { error } = await supabase
      .from("api_keys")
      .insert({ name: trimmed.slice(0, 100), key_prefix: prefix, key_hash: hash, expires_at: expiresAt })
    if (error) return { ok: false, error: error.message }

    revalidatePath("/admin/api-keys")
    // The plain key is returned exactly once; only its hash is stored.
    return { ok: true, key }
  } catch (error) {
    return { ok: false, error: toMessage(error) }
  }
}

export async function revokeApiKey(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin()
    const { error } = await supabase
      .from("api_keys")
      .update({ revoked_at: new Date().toISOString() })
      .eq("id", id)
      .is("revoked_at", null)
    if (error) return { ok: false, error: error.message }

    revalidatePath("/admin/api-keys")
    return { ok: true }
  } catch (error) {
    return { ok: false, error: toMessage(error) }
  }
}
