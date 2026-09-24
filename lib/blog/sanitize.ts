import "server-only"
import sanitizeHtml from "sanitize-html"
import { marked } from "marked"

/**
 * Allow-list for article HTML. Everything the dashboard editor produces is
 * covered; anything else (scripts, iframes, inline styles, event handlers)
 * is removed. Applied to every save, from the dashboard and the API.
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "hr", "blockquote", "pre", "code",
    "strong", "b", "em", "i", "u", "s", "del", "mark", "sub", "sup", "span",
    "ul", "ol", "li",
    "a", "img", "figure", "figcaption",
    "table", "caption", "colgroup", "col", "thead", "tbody", "tfoot", "tr", "th", "td",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    code: ["class"],
    pre: ["class"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    ol: ["start"],
  },
  allowedClasses: { code: [/^language-[\w-]+$/], pre: [/^language-[\w-]+$/] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["https", "http"] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs:
        attribs.target === "_blank" ? { ...attribs, rel: "noopener noreferrer" } : attribs,
    }),
  },
}

export function sanitizeContent(html: string) {
  return sanitizeHtml(html, OPTIONS).trim()
}

export function markdownToHtml(markdown: string) {
  return marked.parse(markdown, { async: false, gfm: true, breaks: false }) as string
}
