import "server-only"
import { cache } from "react"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env"

/**
 * Supabase client bound to the signed-in user's session cookies.
 * Use in Server Components, Server Actions and Route Handlers.
 * Create a new one per request — never share it.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // proxy.ts refreshes the session, so this is safe to ignore.
        }
      },
    },
  })
}

/**
 * The signed-in user and whether they are listed in `admin_users`.
 * Memoized per request so layouts and pages share one lookup.
 */
export const getAdminUser = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { supabase, user: null, isAdmin: false }

  const { data: isAdmin } = await supabase.rpc("is_admin")
  return { supabase, user, isAdmin: isAdmin === true }
})
