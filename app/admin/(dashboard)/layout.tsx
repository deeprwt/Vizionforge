import { redirect } from "next/navigation"
import { getAdminUser } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/supabase/env"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) redirect("/admin/login")

  const { user, isAdmin } = await getAdminUser()
  if (!user || !isAdmin) redirect("/admin/login")

  const email = user.email ?? ""
  const name =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    email.split("@")[0] ||
    "Admin"

  return <AdminShell admin={{ name, email }}>{children}</AdminShell>
}
