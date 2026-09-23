"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export function useSignOut() {
  const router = useRouter()
  return useCallback(async () => {
    const { error } = await createClient().auth.signOut()
    if (error) {
      toast.error(error.message)
      return
    }
    router.replace("/admin/login")
    router.refresh()
  }, [router])
}
