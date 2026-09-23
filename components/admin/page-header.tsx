import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function PageHeader({
  title,
  description,
  crumbs = [],
  actions,
}: {
  title: string
  description?: string
  crumbs?: { label: string; href?: string }[]
  actions?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {crumbs.length > 0 && (
          <nav className="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-500">
            {crumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="size-3 text-gray-400" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-indigo-600">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-700">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="truncate text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
