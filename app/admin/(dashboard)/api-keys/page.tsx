import type { Metadata } from "next"
import { headers } from "next/headers"
import { AlertTriangle } from "lucide-react"
import { getAdminUser } from "@/lib/supabase/server"
import { isServiceRoleConfigured } from "@/lib/supabase/admin"
import { PageHeader } from "@/components/admin/page-header"
import { ApiKeysManager, type ApiKeyRow } from "@/components/admin/api-keys-manager"
import { ApiQuickStart } from "@/components/admin/api-quick-start"

export const metadata: Metadata = { title: "API Access" }

export default async function ApiKeysPage() {
  const { supabase } = await getAdminUser()
  const { data, error } = await supabase
    .from("api_keys")
    .select("id, name, key_prefix, created_at, last_used_at, expires_at, revoked_at")
    .order("created_at", { ascending: false })

  const requestHeaders = await headers()
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "vizionforge.com"
  const proto = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
  const origin = (process.env.SITE_URL || `${proto}://${host}`).replace(/\/+$/, "")

  return (
    <>
      <PageHeader
        title="API Access"
        description="Give partners and tools an API key so they can publish blog posts, images and SEO metadata to the website."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "API Access" }]}
      />

      {!isServiceRoleConfigured && (
        <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <p>
            The API is disabled until <code className="font-semibold">SUPABASE_SERVICE_ROLE_KEY</code> is set in the
            server environment. You can still create keys now.
          </p>
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load API keys: {error.message}. Did you run the v2 section of <code>supabase/schema.sql</code>?
        </div>
      )}

      <div className="space-y-6">
        <ApiKeysManager keys={(data ?? []) as ApiKeyRow[]} />
        <ApiQuickStart origin={origin} />
      </div>
    </>
  )
}
