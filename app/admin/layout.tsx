import type { Metadata } from "next"
import { TooltipProvider } from "@/components/admin/ui/tooltip"
import "./admin.css"

export const metadata: Metadata = {
  title: { default: "Admin · VizionForge", template: "%s · VizionForge Admin" },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-admin-root className="min-h-screen bg-gray-50 text-gray-900">
      <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
    </div>
  )
}
