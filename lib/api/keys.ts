import "server-only"
import { createHash, randomBytes } from "node:crypto"
import type { SupabaseClient } from "@supabase/supabase-js"

const KEY_PREFIX = "vf_live_"

export interface ApiKeyRecord {
  id: string
  name: string
  key_prefix: string
  last_used_at: string | null
  expires_at: string | null
  revoked_at: string | null
}

export function hashApiKey(key: string) {
  return createHash("sha256").update(key).digest("hex")
}

/** A new random key. Store only `hash`; show `key` to the admin once. */
export function generateApiKey() {
  const key = `${KEY_PREFIX}${randomBytes(32).toString("base64url")}`
  return { key, prefix: key.slice(0, KEY_PREFIX.length + 6), hash: hashApiKey(key) }
}

/** Reads the key from `Authorization: Bearer <key>` or `X-API-Key: <key>`. */
export function readApiKey(headers: Headers) {
  const auth = headers.get("authorization")
  if (auth?.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim()
  return headers.get("x-api-key")?.trim() || null
}

export type ApiKeyCheck =
  | { ok: true; key: ApiKeyRecord }
  | { ok: false; reason: "missing" | "invalid" | "revoked" | "expired" }

export async function verifyApiKey(client: SupabaseClient, headers: Headers): Promise<ApiKeyCheck> {
  const raw = readApiKey(headers)
  if (!raw) return { ok: false, reason: "missing" }
  if (!raw.startsWith(KEY_PREFIX)) return { ok: false, reason: "invalid" }

  const { data } = await client
    .from("api_keys")
    .select("id, name, key_prefix, last_used_at, expires_at, revoked_at")
    .eq("key_hash", hashApiKey(raw))
    .maybeSingle()
  const key = data as ApiKeyRecord | null

  if (!key) return { ok: false, reason: "invalid" }
  if (key.revoked_at) return { ok: false, reason: "revoked" }
  if (key.expires_at && new Date(key.expires_at) <= new Date()) return { ok: false, reason: "expired" }

  // Record usage, at most once a minute per key.
  if (!key.last_used_at || Date.now() - new Date(key.last_used_at).getTime() > 60_000) {
    void client.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", key.id).then()
  }
  return { ok: true, key }
}
