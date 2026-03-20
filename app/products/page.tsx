import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

const products = [
  {
    num: "01",
    name: "ExpenseGenie",
    title: "AI-Powered Expense Management",
    description:
      "Conversational AI that reads, categorizes, validates and submits expenses. From receipt photo to SAP posting in 30 seconds. Zero forms. Zero training. 4-week go-live.",
    metrics: ["90% Faster Processing", "75% Fewer Errors", "4 Wk Go-Live"],
    platform: "Azure AI · Azure OpenAI · Azure AD",
    href: "/products/expense-genie",
  },
  {
    num: "02",
    name: "SafeOps360",
    title: "Enterprise QHSE Platform",
    description:
      "Quality Audit, EHS (ISO 45001), MIS Dashboard, and AI-Powered Safety Intelligence. Deployed across 25+ construction and infrastructure projects at Tata Realty.",
    metrics: ["397+ Audits", "25+ Projects", "5.1M Safe Man-Hours"],
    platform: "React PWA · OutSystems ODC · Azure ML",
    href: "/products/safeops360",
  },
  {
    num: "03",
    name: "SENTIO",
    title: "The Living Bowtie Platform",
    description:
      "Turns static Bowtie risk frameworks into continuously watched, human-gated operating instruments. Three layers — Author, Watch, Review. Three deployment models.",
    metrics: ["<60m Signal→Alert", "3 Human Gates", "6-Stage Workflow"],
    platform: "ServiceNow · React · Node.js · Docker/K8s",
    href: "/products/sentio",
  },
  {
    num: "04",
    name: "LOS / LMS",
    title: "Integrated Loan Origination & Management",
    description:
      "End-to-end digital lending platform for capital finance. CKYC onboarding, parallel review, sanctions, securities and covenant monitoring. India-ready architecture.",
    metrics: ["70% Reduction TAT", "90% Paperless", "100% Audit Trail"],
    platform: "OutSystems ODC · REST/SOAP · Azure Cloud",
    href: "/products/los-lms",
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
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <Card key={product.num} className="p-6 group flex flex-col">
              <CardHeader className="p-0 pb-4">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">
                  Product {product.num} — {product.name}
                </span>
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <span className="text-[0.7rem] font-medium text-navy/40 mt-0.5 block">
                  {product.platform}
                </span>
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
