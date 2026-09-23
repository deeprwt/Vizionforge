import type { SupabaseClient } from "@supabase/supabase-js"

/** Distinct categories already in use, for the editor's suggestions. */
export async function getCategories(supabase: SupabaseClient) {
  const { data } = await supabase.from("blogs").select("category").not("category", "is", null)
  return [...new Set((data ?? []).map((row) => row.category as string))].sort()
}
