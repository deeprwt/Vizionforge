import type { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"
import { getAdminUser } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/supabase/env"
import { LoginForm } from "@/components/admin/login-form"

export const metadata: Metadata = { title: "Sign in" }

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  // Only allow redirects back into the admin area.
  const redirectTo = next?.startsWith("/admin") && !next.startsWith("//") ? next : "/admin"

  let signedInNonAdmin: string | null = null
  if (isSupabaseConfigured) {
    const { user, isAdmin } = await getAdminUser()
    if (user && isAdmin) redirect(redirectTo)
    if (user) signedInNonAdmin = user.email ?? "this account"
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white lg:flex-row">
      <LoginForm
        redirectTo={redirectTo}
        configured={isSupabaseConfigured}
        signedInNonAdmin={signedInNonAdmin}
      />

      {/* Brand panel */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-[#161950] lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-purple-500/30 blur-3xl" />

        <div className="relative flex max-w-xs flex-col items-center">
          <Image
            src="/assets/images/logo.png"
            alt="VizionForge"
            width={231}
            height={56}
            className="mb-5 h-auto w-full brightness-0 invert"
            priority
          />
          <p className="text-center text-gray-400">
            Content studio — write, publish and manage the VizionForge blog.
          </p>
        </div>
      </div>
    </div>
  )
}
