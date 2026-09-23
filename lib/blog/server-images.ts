import "server-only"
import { randomUUID } from "node:crypto"
import { lookup } from "node:dns/promises"
import { isIP } from "node:net"
import type { SupabaseClient } from "@supabase/supabase-js"
import { BLOG_IMAGES_BUCKET } from "@/lib/supabase/env"
import { storagePathFromUrl } from "./utils"

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const FETCH_TIMEOUT_MS = 15_000
const MAX_REDIRECTS = 3

export type ImageFolder = "covers" | "content" | "social"

export class ImageError extends Error {}

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
}

/** Detects the real image type from the file's magic bytes (never trusts headers). */
export function sniffImageType(bytes: Uint8Array): string | null {
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.subarray(start, end))
  if (bytes.length < 12) return null
  if (bytes[0] === 0x89 && ascii(1, 4) === "PNG") return "image/png"
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg"
  if (ascii(0, 4) === "GIF8") return "image/gif"
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp"
  if (ascii(4, 8) === "ftyp" && /^avi[fs]$/.test(ascii(8, 12))) return "image/avif"
  return null
}

/** Uploads raw image bytes to the blog-images bucket and returns the public URL. */
export async function uploadImageBytes(client: SupabaseClient, bytes: Uint8Array, folder: ImageFolder) {
  if (bytes.byteLength === 0) throw new ImageError("Image is empty.")
  if (bytes.byteLength > MAX_IMAGE_BYTES) throw new ImageError("Image must be 5 MB or smaller.")
  const type = sniffImageType(bytes)
  if (!type) throw new ImageError("Unsupported image. Use PNG, JPG, WEBP, GIF or AVIF.")

  const now = new Date()
  const path = `${folder}/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${randomUUID()}.${EXTENSIONS[type]}`
  const { error } = await client.storage.from(BLOG_IMAGES_BUCKET).upload(path, bytes, {
    contentType: type,
    cacheControl: "31536000",
    upsert: false,
  })
  if (error) throw new ImageError(`Image upload failed: ${error.message}`)
  return client.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl
}

function isPrivateAddress(ip: string) {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split(".").map(Number)
    return (
      a === 0 || a === 10 || a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    )
  }
  const v6 = ip.toLowerCase()
  if (v6.startsWith("::ffff:")) return isPrivateAddress(v6.slice(7))
  return v6 === "::" || v6 === "::1" || v6.startsWith("fc") || v6.startsWith("fd") || v6.startsWith("fe80")
}

/** Rejects URLs that are not public http(s) addresses (prevents SSRF). */
async function assertPublicUrl(raw: string) {
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    throw new ImageError(`Invalid image URL: ${raw}`)
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new ImageError(`Image URL must use http or https: ${raw}`)
  }
  const host = url.hostname.replace(/^\[|\]$/g, "")
  const addresses = isIP(host) ? [host] : (await lookup(host, { all: true }).catch(() => [])).map((a) => a.address)
  if (addresses.length === 0) throw new ImageError(`Could not resolve image host: ${url.hostname}`)
  if (addresses.some(isPrivateAddress)) throw new ImageError(`Image URL points to a private address: ${raw}`)
  return url
}

/** Downloads a remote image (max 5 MB, redirects re-checked) and returns its bytes. */
async function downloadImage(raw: string) {
  let url = await assertPublicUrl(raw)
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { "User-Agent": "VizionForge-Blog-Importer/1.0", Accept: "image/*" },
    }).catch((error: Error) => {
      throw new ImageError(`Could not download ${raw}: ${error.message}`)
    })

    if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
      url = await assertPublicUrl(new URL(response.headers.get("location")!, url).toString())
      continue
    }
    if (!response.ok || !response.body) {
      throw new ImageError(`Could not download ${raw} (HTTP ${response.status}).`)
    }
    if (Number(response.headers.get("content-length") ?? 0) > MAX_IMAGE_BYTES) {
      throw new ImageError(`Image at ${raw} is larger than 5 MB.`)
    }

    // Stream with a hard cap in case content-length is missing or wrong.
    const chunks: Uint8Array[] = []
    let size = 0
    for await (const chunk of response.body as unknown as AsyncIterable<Uint8Array>) {
      size += chunk.byteLength
      if (size > MAX_IMAGE_BYTES) throw new ImageError(`Image at ${raw} is larger than 5 MB.`)
      chunks.push(chunk)
    }
    return Buffer.concat(chunks)
  }
  throw new ImageError(`Too many redirects for ${raw}.`)
}

function decodeDataUri(value: string) {
  const match = /^data:image\/[\w.+-]+;base64,([A-Za-z0-9+/=\s]+)$/.exec(value)
  if (!match) throw new ImageError("Invalid base64 image. Expected data:image/<type>;base64,<data>.")
  return Buffer.from(match[1], "base64")
}

/**
 * Turns an image reference into a URL in our bucket:
 * - URL already in our bucket → kept as-is
 * - `data:image/...;base64,...` → uploaded
 * - any other http(s) URL → downloaded and re-hosted
 */
export async function resolveImage(client: SupabaseClient, value: string, folder: ImageFolder) {
  const trimmed = value.trim()
  if (storagePathFromUrl(trimmed)) return trimmed
  const bytes = trimmed.startsWith("data:") ? decodeDataUri(trimmed) : await downloadImage(trimmed)
  return uploadImageBytes(client, bytes, folder)
}

/** Re-hosts every <img src> in the HTML that is not already in our bucket. */
export async function rehostContentImages(client: SupabaseClient, html: string) {
  const sources = new Set<string>()
  for (const match of html.matchAll(/<img\b[^>]*?\ssrc\s*=\s*(["'])(.*?)\1/gi)) {
    const src = match[2].replace(/&amp;/g, "&")
    if (!storagePathFromUrl(src)) sources.add(src)
  }
  if (sources.size === 0) return html

  const replacements = new Map<string, string>()
  for (const src of sources) replacements.set(src, await resolveImage(client, src, "content"))

  return html.replace(/(<img\b[^>]*?\ssrc\s*=\s*)(["'])(.*?)\2/gi, (whole, before: string, quote: string, src: string) => {
    const next = replacements.get(src.replace(/&amp;/g, "&"))
    return next ? `${before}${quote}${next}${quote}` : whole
  })
}
