import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

const metrics = [
  { value: "Zero", label: "Missed Breaches" },
  { value: "80%", label: "Less Manual Work" },
  { value: "Full", label: "Audit Trail" },
]

const features = [
  {
    title: "Covenant Repository",
    description:
      "Centralized repository of all financial and non-financial covenants across lenders, facilities and borrowers — searchable and version-controlled.",
  },
  {
    title: "Automated Monitoring",
    description:
      "Rule-based engines continuously monitor covenant thresholds against real-time financial data. Alerts fire before breaches occur.",
  },
  {
    title: "Breach Management",
    description:
      "Structured workflows for breach detection, notification, waiver requests and cure-period tracking with full audit history.",
  },
  {
    title: "Regulatory Reporting",
    description:
      "Pre-built templates for RBI, NHB and internal compliance reporting. Auto-generated reports with drill-down to source data.",
  },
  {
    title: "Multi-Lender Portfolio",
    description:
      "Manage covenants across multiple lending relationships, facility types and borrower entities from a single consolidated dashboard.",
  },
  {
    title: "Core Banking Integration",
    description:
      "Pre-built connectors for Finacle, FinnOne, LOS/LMS platforms and general-ledger systems. API-first architecture for custom integrations.",
  },
]

export default function LoanCovenantPage() {
  return (
    <>
      {/* Product Hero */}
      <section className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%]" style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)", background: "linear-gradient(135deg, rgba(212,168,67,0.12) 0%, rgba(30,32,68,0) 70%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70 mb-3 block">
                Product 03 — Loan Covenant Management
              </span>
              <h1
                className="font-display font-black text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}
              >
                <em className="text-gold italic">Covenant Compliance</em> for Lending Companies
              </h1>
              <p className="mt-5 max-w-[540px] text-lg leading-relaxed text-ice/80">
                Automate financial covenant tracking, breach detection and
                regulatory reporting for lending companies. Never miss a
                covenant breach again.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Metric Boxes */}
            <div className="flex flex-col gap-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="border border-white/10 rounded-sm p-6 flex items-center gap-5 hover:border-gold/30 transition-colors"
                >
                  <span className="font-display text-[2.4rem] font-bold text-gold leading-none">
                    {m.value}
                  </span>
                  <span className="text-ice/70 text-sm font-medium">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gold" />
      </section>

      {/* Features */}
      <SectionWrapper
        label="Platform Capabilities"
        title={
          <>
            Complete Covenant Lifecycle.{" "}
            <em className="text-gold italic">Fully Automated.</em>
          </>
        }
      >
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feat, i) => (
            <Card key={feat.title} className="p-6">
              <CardHeader className="p-0 pb-3">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <CardTitle>{feat.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{feat.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
