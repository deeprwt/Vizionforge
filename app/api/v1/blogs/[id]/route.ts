import { deleteBlogRecord, findBlog, writeBlog } from "@/lib/blog/service"
import { apiError, apiOk, readJson, serializeBlog, siteOrigin, updateBlogSchema, withApiKey } from "@/lib/api/http"

type Params = { id: string }

/** GET /api/v1/blogs/:idOrSlug — a single post with its content. */
export const GET = withApiKey<Params>(async (request, { client }, { id }) => {
  const blog = await findBlog(client, id)
  if (!blog) return apiError("not_found", "Blog post not found.")
  return apiOk(serializeBlog(blog, siteOrigin(request)))
})

/** PATCH /api/v1/blogs/:idOrSlug — update only the fields you send. */
export const PATCH = withApiKey<Params>(async (request, { client }, { id }) => {
  const { data: input, response } = await readJson(request, updateBlogSchema)
  if (response) return response

  const existing = await findBlog(client, id)
  if (!existing) return apiError("not_found", "Blog post not found.")

  const blog = await writeBlog(client, { id: existing.id, input })
  return apiOk(serializeBlog(blog, siteOrigin(request)))
})

/** DELETE /api/v1/blogs/:idOrSlug — delete a post and its images. */
export const DELETE = withApiKey<Params>(async (_request, { client }, { id }) => {
  const blog = await deleteBlogRecord(client, id)
  return apiOk({ id: blog.id, slug: blog.slug, deleted: true })
})
