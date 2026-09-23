import { z } from "zod"
import { ImageError, MAX_IMAGE_BYTES, resolveImage, uploadImageBytes } from "@/lib/blog/server-images"
import { apiError, apiOk, readJson, withApiKey } from "@/lib/api/http"

const jsonSchema = z
  .object({
    url: z.string().optional(),
    data: z.string().max(7_200_000).optional(),
    folder: z.enum(["content", "covers", "social"]).optional(),
  })
  .strict()
  .refine((v) => Boolean(v.url) !== Boolean(v.data), "Send exactly one of 'url' or 'data'.")

/**
 * POST /api/v1/images — upload an image to Supabase Storage.
 *   multipart/form-data: file=<image>, folder?=content|covers|social
 *   application/json:    { "url": "https://…" } or { "data": "data:image/png;base64,…" }
 * Returns { data: { url } } — use the URL in a post's content or image fields.
 */
export const POST = withApiKey(async (request, { client }) => {
  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const form = await request.formData().catch(() => null)
      const file = form?.get("file")
      if (!(file instanceof File)) return apiError("validation_error", "Send the image in a 'file' form field.")
      if (file.size > MAX_IMAGE_BYTES) return apiError("payload_too_large", "Image must be 5 MB or smaller.")

      const folder = jsonSchema.shape.folder.safeParse(form?.get("folder") ?? undefined)
      const url = await uploadImageBytes(
        client,
        new Uint8Array(await file.arrayBuffer()),
        (folder.success && folder.data) || "content"
      )
      return apiOk({ url }, { status: 201 })
    }

    const { data: body, response } = await readJson(request, jsonSchema)
    if (response) return response
    const url = await resolveImage(client, (body.url ?? body.data)!, body.folder ?? "content")
    return apiOk({ url }, { status: 201 })
  } catch (error) {
    if (error instanceof ImageError) return apiError("image_error", error.message)
    throw error
  }
})
