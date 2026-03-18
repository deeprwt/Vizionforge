import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

const products = [
  {
    num: "01",
    name: "MBO",
    title: "Dealer Management Software",
    description:
      "End-to-end dealership operations — inventory, sales, service and finance in one unified SaaS platform. OEM agnostic.",
    metrics: ["360° Dealer View", "8+ Core Modules", "SaaS Cloud-Native"],
    href: "/products/mbo",
  },
  {
    num: "02",
    name: "ExpenseGenie",
    title: "AI-Powered Expense Management",
    description:
      "Snap a receipt. Let AI do the rest. From submission to SAP posting in seconds. 90% faster processing. 4-week go-live.",
    metrics: ["90% Faster Processing", "75% Fewer Errors", "4 Wk Go-Live"],
    href: "/products/expense-genie",
  },
  {
    num: "03",
    name: "Loan Covenant",
    title: "Covenant Compliance for Lending Companies",
    description:
      "Automate financial covenant tracking, breach detection and regulatory reporting for lending companies. Zero missed breaches.",
    metrics: ["Zero Missed Breaches", "80% Less Manual Work", "Full Audit Trail"],
    href: "/products/loan-covenant",
  },
]

export default function ProductsPage() {
  return (
    <>
      <HeroSection
        size="compact"
        eyebrow="Built In-House · Ready to Deploy"
        title={
          <>
            Products Built on the Same Standards{" "}
            <em className="text-gold italic">We Deliver.</em>
          </>
        }
      />

      <SectionWrapper>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.num} className="p-6 group flex flex-col">
              <CardHeader className="p-0 pb-4">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">
                  Product {product.num} — {product.name}
                </span>
                <CardTitle className="text-lg">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 flex flex-col">
                <CardDescription className="mb-4">
                  {product.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="inline-block rounded-sm bg-navy/5 px-3 py-1 text-[0.72rem] font-semibold text-navy/80"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
                <Link
                  href={product.href}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-gold hover:text-gold-light transition-colors"
                >
                  Learn More{" "}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
