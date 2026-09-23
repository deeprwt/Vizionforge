import { Badge } from "@/components/admin/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

const ENDPOINTS = [
  { method: "GET", path: "/api/v1/blogs", description: "List posts (drafts included). Query: status, category, q, limit, offset" },
  { method: "POST", path: "/api/v1/blogs", description: "Create a post" },
  { method: "GET", path: "/api/v1/blogs/{id | slug}", description: "Get one post with its content" },
  { method: "PATCH", path: "/api/v1/blogs/{id | slug}", description: "Update only the fields you send" },
  { method: "DELETE", path: "/api/v1/blogs/{id | slug}", description: "Delete a post and its images" },
  { method: "POST", path: "/api/v1/images", description: "Upload an image (file, URL or base64); returns its URL" },
]

const FIELDS = [
  ["title", "string", "Required on create."],
  ["content", "string", "Required on create. HTML, or Markdown with content_format."],
  ["content_format", "\"html\" | \"markdown\"", "Default html. Content is sanitized."],
  ["slug", "string", "Optional. Generated from the title (made unique) if omitted."],
  ["excerpt", "string", "Summary for listings. Generated from content if omitted."],
  ["status", "\"draft\" | \"published\"", "Default draft. Published posts go live immediately."],
  ["cover_image", "URL or data URI", "Re-hosted in our storage. null removes it."],
  ["og_image", "URL or data URI", "Social share image (1200×630). Falls back to cover."],
  ["category, author_name", "string", ""],
  ["tags", "string[]", "Max 20. Also used as meta keywords."],
  ["featured", "boolean", "Highlight at the top of the blog page."],
  ["seo_title, seo_description", "string", "Meta title / description. Fall back to title / excerpt."],
  ["canonical_url", "URL", "Set when the article was first published elsewhere."],
  ["published_at", "ISO 8601 datetime", "Optional. Defaults to the time it is first published."],
]

const METHOD_STYLES: Record<string, string> = {
  GET: "border-sky-200 bg-sky-50 text-sky-700",
  POST: "border-emerald-200 bg-emerald-50 text-emerald-700",
  PATCH: "border-amber-200 bg-amber-50 text-amber-700",
  DELETE: "border-red-200 bg-red-50 text-red-700",
}

export function ApiQuickStart({ origin }: { origin: string }) {
  const body = {
    title: "How Agentic AI Is Reshaping IT Operations",
    content_format: "markdown",
    content: "## Why it matters\n\nSelf-healing infrastructure is here.\n\n![Diagram](https://example.com/diagram.png)",
    excerpt: "Self-healing infrastructure is no longer science fiction.",
    cover_image: "https://example.com/cover.jpg",
    category: "Agentic AI",
    tags: ["ai", "itops"],
    author_name: "Jane Doe",
    status: "published",
    seo_title: "Agentic AI for IT Operations | VizionForge",
    seo_description: "How AI agents triage incidents before humans notice.",
  }
  const json = JSON.stringify(body, null, 2)

  const curl = `curl -X POST ${origin}/api/v1/blogs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${json.replace(/'/g, "'\\''")}'`

  const js = `const response = await fetch("${origin}/api/v1/blogs", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.VIZIONFORGE_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(${json.replace(/\n/g, "\n  ")}),
})
const { data, error } = await response.json()
console.log(data?.url ?? error)`

  const upload = `curl -X POST ${origin}/api/v1/images \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@./photo.jpg"`

  return (
    <Card className="rounded-2xl border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Quick start</CardTitle>
        <CardDescription>
          Base URL <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-800">{origin}/api/v1</code> · send the key as{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-800">Authorization: Bearer &lt;key&gt;</code> · 120 requests/minute
          per key · full reference in <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-800">docs/BLOG_API.md</code>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60 hover:bg-gray-50/60">
                <TableHead className="w-24 pl-4">Method</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ENDPOINTS.map((endpoint) => (
                <TableRow key={`${endpoint.method} ${endpoint.path}`}>
                  <TableCell className="pl-4">
                    <Badge variant="outline" className={cn("font-mono font-semibold", METHOD_STYLES[endpoint.method])}>
                      {endpoint.method}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-gray-800">{endpoint.path}</TableCell>
                  <TableCell className="hidden whitespace-normal text-gray-500 md:table-cell">{endpoint.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Tabs defaultValue="curl">
          <div className="flex items-center justify-between gap-2">
            <TabsList className="rounded-xl bg-gray-100">
              <TabsTrigger value="curl" className="rounded-lg">Create post · cURL</TabsTrigger>
              <TabsTrigger value="js" className="rounded-lg">JavaScript</TabsTrigger>
              <TabsTrigger value="upload" className="rounded-lg">Upload image</TabsTrigger>
            </TabsList>
          </div>
          {[
            ["curl", curl],
            ["js", js],
            ["upload", upload],
          ].map(([value, code]) => (
            <TabsContent key={value} value={value} className="relative mt-3">
              <pre className="max-h-[420px] overflow-auto rounded-xl bg-[#161950] p-4 pr-28 text-xs leading-relaxed text-indigo-50">
                <code>{code}</code>
              </pre>
              <CopyButton value={code} className="absolute right-3 top-3 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
            </TabsContent>
          ))}
        </Tabs>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-900">Post fields</h3>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <Table>
              <TableBody>
                {FIELDS.map(([field, type, note]) => (
                  <TableRow key={field}>
                    <TableCell className="w-56 pl-4 align-top font-mono text-xs text-gray-900">{field}</TableCell>
                    <TableCell className="w-44 align-top font-mono text-xs text-indigo-600">{type}</TableCell>
                    <TableCell className="whitespace-normal text-gray-500">{note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Images inside the content (<code>&lt;img src&gt;</code> or Markdown <code>![]()</code>) are downloaded and stored in
            Supabase Storage automatically. Max 5 MB each; PNG, JPG, WEBP, GIF or AVIF.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
