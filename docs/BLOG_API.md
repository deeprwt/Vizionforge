# VizionForge Blog API

Publish articles to the VizionForge blog (`https://www.vizionforge.com/blog`) from your own tools. You can create, update and delete posts, attach images, and set SEO metadata.

- **Base URL:** `https://www.vizionforge.com/api/v1`
- **Format:** JSON in, JSON out (image uploads may also use `multipart/form-data`)
- **Rate limit:** 120 requests per minute per API key

## Authentication

Every request needs the API key you were given, in the `Authorization` header:

```
Authorization: Bearer vf_live_xxxxxxxxxxxxxxxxxxxxxxxx
```

`X-API-Key: vf_live_…` is also accepted. Keep the key secret and use it only from a server, never from browser code. If a key leaks, ask the VizionForge team to revoke it and issue a new one.

## Quick start

Create and publish a post:

```bash
curl -X POST https://www.vizionforge.com/api/v1/blogs \
  -H "Authorization: Bearer $VIZIONFORGE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "How Agentic AI Is Reshaping IT Operations",
    "content_format": "markdown",
    "content": "## Why it matters\n\nSelf-healing infrastructure is here.\n\n![Architecture](https://example.com/diagram.png)",
    "excerpt": "Self-healing infrastructure is no longer science fiction.",
    "cover_image": "https://example.com/cover.jpg",
    "category": "Agentic AI",
    "tags": ["ai", "itops"],
    "author_name": "Jane Doe",
    "status": "published",
    "seo_title": "Agentic AI for IT Operations | VizionForge",
    "seo_description": "How AI agents triage incidents before humans notice."
  }'
```

Response `201 Created`:

```json
{
  "data": {
    "id": "5b0e3c1e-2f7a-4a36-9a4e-1c2d3e4f5a6b",
    "slug": "how-agentic-ai-is-reshaping-it-operations",
    "url": "https://www.vizionforge.com/blog/how-agentic-ai-is-reshaping-it-operations",
    "status": "published",
    "cover_image": "https://<project>.supabase.co/storage/v1/object/public/blog-images/covers/2026/09/….jpg",
    "...": "all other post fields"
  }
}
```

Save `id` (or `slug`) to update or delete the post later.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/blogs` | List posts, drafts included |
| `POST` | `/blogs` | Create a post |
| `GET` | `/blogs/{id or slug}` | Get one post, including its content |
| `PATCH` | `/blogs/{id or slug}` | Update a post. Send only the fields you want to change |
| `DELETE` | `/blogs/{id or slug}` | Delete a post and its images |
| `POST` | `/images` | Upload an image and get its URL |

### List posts

`GET /blogs?status=published&category=Agentic%20AI&q=agentic&limit=20&offset=0`

| Query | Description |
| --- | --- |
| `status` | `draft` or `published` |
| `category` | Exact category name |
| `q` | Search in titles |
| `limit` | 1–100, default 20 |
| `offset` | For pagination, default 0 |

List results leave out `content`. The response includes `pagination: { limit, offset, total }`.

### Update a post

```bash
curl -X PATCH https://www.vizionforge.com/api/v1/blogs/how-agentic-ai-is-reshaping-it-operations \
  -H "Authorization: Bearer $VIZIONFORGE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "seo_description": "Updated description", "tags": ["ai", "aiops"] }'
```

Fields you leave out stay unchanged. Send `null` to clear an optional field. To take a post offline without deleting it, send `{ "status": "draft" }`.

### Delete a post

```bash
curl -X DELETE https://www.vizionforge.com/api/v1/blogs/5b0e3c1e-2f7a-4a36-9a4e-1c2d3e4f5a6b \
  -H "Authorization: Bearer $VIZIONFORGE_API_KEY"
```

## Post fields

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string, max 200 | **Required** when creating |
| `content` | string | **Required** when creating. HTML by default |
| `content_format` | `"html"` \| `"markdown"` | How to read `content`. Default `html` |
| `slug` | string | URL part: `/blog/{slug}`. If omitted, it is generated from the title and made unique. If you send one that is taken, you get `409` |
| `excerpt` | string, max 500 | Summary on the blog listing. If omitted, taken from the start of the content |
| `status` | `"draft"` \| `"published"` | Default `draft`. `published` posts appear on the site within seconds |
| `published_at` | ISO 8601 datetime | Optional publish date, e.g. `2026-09-01T10:00:00Z`. Defaults to the moment the post is first published |
| `cover_image` | image (see below) | Shown on the listing and at the top of the article. 16:9 recommended |
| `og_image` | image (see below) | Social share image for LinkedIn, X and WhatsApp. 1200×630 recommended. Falls back to `cover_image` |
| `category` | string, max 80 | |
| `tags` | string[], max 20 | Shown on the article and used as meta keywords |
| `author_name` | string | |
| `featured` | boolean | Highlights the post at the top of the blog page |
| `seo_title` | string | `<title>` and social title. Falls back to `title` |
| `seo_description` | string | Meta description and social description. Falls back to `excerpt` |
| `canonical_url` | http(s) URL | Set this when the article was first published elsewhere, so search engines credit the original |

Unknown fields are rejected with `400`, so typos don't fail silently.

**Response-only fields:** `id`, `url`, `reading_time` (minutes, calculated), `source` (`api` or `dashboard`), `created_at`, `updated_at`.

## Images

Anywhere an image is accepted (`cover_image`, `og_image`, and images inside `content`), you can use:

1. **A public URL** such as `https://example.com/photo.jpg`. The image is downloaded and stored on VizionForge's storage, so it keeps working even if the original goes away.
2. **A base64 data URI** such as `data:image/png;base64,iVBORw0KGgo…`
3. **A URL returned by `POST /images`**, which is used as-is.

Images inside `content` work the same way, both `<img src="…">` in HTML and `![alt](…)` in Markdown.

Limits: PNG, JPG, WEBP, GIF or AVIF, up to **5 MB** each. The file type is checked from the file itself, and SVG is not accepted. URLs must be publicly reachable.

### Upload an image directly

```bash
# From a file
curl -X POST https://www.vizionforge.com/api/v1/images \
  -H "Authorization: Bearer $VIZIONFORGE_API_KEY" \
  -F "file=@./photo.jpg"

# From a URL or base64
curl -X POST https://www.vizionforge.com/api/v1/images \
  -H "Authorization: Bearer $VIZIONFORGE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://example.com/photo.jpg" }'
```

Response `201`: `{ "data": { "url": "https://…/blog-images/content/2026/09/….jpg" } }`

## Allowed content

Content is cleaned before it is saved. The following are kept:

- headings (`h1`–`h6`), paragraphs, bold/italic/underline/strikethrough
- links, lists, blockquotes, code blocks (with a `language-*` class)
- images, tables, `figure`/`figcaption`, horizontal rules

Scripts, iframes/embeds, forms, inline styles and event handlers are removed.

## Errors

Errors use a standard HTTP status and this body:

```json
{
  "error": {
    "code": "validation_error",
    "message": "Request body is invalid.",
    "details": [{ "field": "title", "message": "Title is required." }]
  }
}
```

| Status | `code` | Meaning |
| --- | --- | --- |
| 400 | `validation_error` | Missing or invalid fields. See `details` |
| 401 | `unauthorized` | Missing, invalid, revoked or expired API key |
| 404 | `not_found` | No post with that id or slug |
| 409 | `conflict` | The `slug` is already used by another post |
| 413 | `payload_too_large` | Body over 25 MB, or image over 5 MB |
| 422 | `image_error` | An image couldn't be downloaded or isn't a supported type |
| 429 | `rate_limited` | Over 120 requests/minute. Wait the number of seconds in `Retry-After` |
| 500 | `internal_error` | Unexpected error. Retry later |
| 503 | `not_configured` | The API is temporarily unavailable |

## JavaScript example

```js
const response = await fetch("https://www.vizionforge.com/api/v1/blogs", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.VIZIONFORGE_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Hello from the API",
    content: "<p>My first post.</p>",
    status: "draft",
  }),
})

const { data, error } = await response.json()
if (!response.ok) throw new Error(`${error.code}: ${error.message}`)
console.log("Created", data.url)
```

## Python example

```python
import os, requests

response = requests.post(
    "https://www.vizionforge.com/api/v1/blogs",
    headers={"Authorization": f"Bearer {os.environ['VIZIONFORGE_API_KEY']}"},
    json={
        "title": "Hello from Python",
        "content_format": "markdown",
        "content": "Some **Markdown** content.",
        "status": "draft",
    },
    timeout=60,
)
response.raise_for_status()
print(response.json()["data"]["url"])
```
