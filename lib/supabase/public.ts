import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env"

/**
 * Cookie-less anonymous client for public pages. Because it never reads
 * cookies, the blog pages can be statically cached and revalidated.
 * Row Level Security limits it to published posts.
 */
export function createPublicClient() {
  if (!isSupabaseConfigured) return null
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
