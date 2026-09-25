import type { Metadata } from "next"
import { Playfair_Display, DM_Sans, DM_Mono, Outfit } from "next/font/google"
import { Toaster } from "sonner"
import { SITE_URL } from "@/lib/site"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

// Admin dashboard font. Not preloaded so public pages never download it.
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: false,
})

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs (e.g. on blog posts).
  metadataBase: new URL(SITE_URL),
  title: "VizionForge — Low Code · AI-First · Enterprise Delivery",
  description:
    "A specialized Low-Code and AI-first engineering firm — built to be your trusted enterprise delivery partner across OutSystems, Microsoft and ServiceNow.",
  icons: {
    icon: "/assets/images/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} ${outfit.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  )
}
