import { Badge } from "@/components/admin/ui/badge"
import { cn } from "@/lib/utils"
import type { BlogStatus } from "@/lib/blog/types"

export function StatusBadge({ status }: { status: BlogStatus }) {
  const published = status === "published"
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full font-semibold",
        published
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-amber-200 bg-amber-50 text-amber-700"
      )}
    >
      <span className={cn("size-1.5 rounded-full", published ? "bg-emerald-500" : "bg-amber-500")} />
      {published ? "Published" : "Draft"}
    </Badge>
  )
}
