"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { useSignOut } from "./use-sign-out"

export function LoginForm({
  redirectTo,
  configured,
  signedInNonAdmin,
}: {
  redirectTo: string
  configured: boolean
  signedInNonAdmin: string | null
}) {
  const router = useRouter()
  const signOut = useSignOut()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    signedInNonAdmin ? `${signedInNonAdmin} does not have admin access.` : null
  )

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    const { data: isAdmin } = await supabase.rpc("is_admin")
    if (isAdmin !== true) {
      await supabase.auth.signOut()
      setError("This account does not have admin access.")
      setLoading(false)
      return
    }

    router.replace(redirectTo)
    router.refresh()
  }

  return (
    <div className="flex w-full flex-1 flex-col overflow-y-auto lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your credentials to access the admin dashboard</p>
        </div>

        {!configured && (
          <div className="mb-5 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>
              Supabase is not configured. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env</code> and restart the server.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-gray-700">
              Email <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-lg border-gray-300 bg-gray-50 pl-10"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-gray-700">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-lg border-gray-300 bg-gray-50 px-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
              {signedInNonAdmin && (
                <button type="button" onClick={signOut} className="ml-1 font-medium underline">
                  Sign out
                </button>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !configured}
            className="h-12 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold text-white hover:from-indigo-600 hover:to-purple-600"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Admin accounts are created in Supabase. Contact your administrator for access.
        </p>
      </div>
    </div>
  )
}
