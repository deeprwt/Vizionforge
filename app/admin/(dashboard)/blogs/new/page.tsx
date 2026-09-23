import type { Metadata } from "next"
import { getAdminUser } from "@/lib/supabase/server"
import { BlogForm } from "@/components/admin/blog-form"
import { getCategories } from "../categories"

export const metadata: Metadata = { title: "New Blog" }

export default async function NewBlogPage() {
  const { supabase, user } = await getAdminUser()
  const categories = await getCategories(supabase)
  const defaultAuthor = (user?.user_metadata?.full_name as string | undefined) ?? ""

  return <BlogForm categories={categories} defaultAuthor={defaultAuthor} />
}
