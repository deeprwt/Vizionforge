"use client"

import { createClient } from "@/lib/supabase/client"
import { BLOG_IMAGES_BUCKET } from "@/lib/supabase/env"

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"]

/**
 * Uploads an image straight from the browser to Supabase Storage (the
 * admin's session + storage RLS authorize it) and returns its public URL.
 */
export async function uploadBlogImage(file: File, folder: "covers" | "content") {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Use a PNG, JPG, WEBP, GIF or AVIF image.")
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.")
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || file.type.split("/")[1]
  const now = new Date()
  const path = `${folder}/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}.${ext}`

  const supabase = createClient()
  const { error } = await supabase.storage.from(BLOG_IMAGES_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  })
  if (error) throw new Error(error.message)

  const {
    data: { publicUrl },
  } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path)
  return publicUrl
}
