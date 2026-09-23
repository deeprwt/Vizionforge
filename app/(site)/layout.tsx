import Script from "next/script"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-[68px]">{children}</main>
      <Footer />
      <Script id="apollo-tracker" strategy="afterInteractive">
        {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"689464a1f608980021537cb8"})},
document.head.appendChild(o)}initApollo();`}
      </Script>
    </>
  )
}
