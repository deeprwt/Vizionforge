import "server-only"
import { createClient } from "@supabase/supabase-js"
import { SUPABASE_URL } from "./env"

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""

export const isServiceRoleConfigured = Boolean(SUPABASE_URL && SERVICE_ROLE_KEY)

/**
 * Service-role client that bypasses Row Level Security.
 * Only for the public API (app/api/v1), after the API key is verified.
 * Never import this from client code or expose the key.
 */
export function createServiceClient() {
  if (!isServiceRoleConfigured) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured on the server.")
  }
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
