import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/env"

/**
 * Refreshes the Supabase session on every /admin request and sends
 * signed-out visitors to the login page. The admin role itself is checked
 * in app/admin/(dashboard)/layout.tsx and enforced again by RLS.
 */
export async function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login"
  if (!isSupabaseConfigured) {
    if (isLoginPage) return NextResponse.next()
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
        Object.entries(headers ?? {}).forEach(([key, value]) =>
          response.headers.set(key, value)
        )
      },
    },
  })

  // Do not run code between createServerClient and getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("next", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
