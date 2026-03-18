import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

const metrics = [
  { value: "90%", label: "Faster Processing" },
  { value: "75%", label: "Fewer Errors" },
  { value: "3x", label: "Faster Reimbursement" },
  { value: "4 Wk", label: "Go-Live" },
]

const features = [
  {
    title: "AI OCR Engine",
    subtitle: "Azure AI Document Intelligence",
    description:
      "Automatically extract vendor, amount, date, GST and line items from any receipt or invoice — handwritten, printed or digital.",
  },
  {
    title: "Conversational Submission",
    subtitle: "Chat with Genie",
    description:
      "Employees submit expenses via natural-language chat on Teams or WhatsApp. No forms. No training. Just talk to Genie.",
  },
  {
    title: "Manager AI Copilot",
    subtitle: "Smart Approvals",
    description:
      "AI flags policy violations, duplicate claims and outliers before the manager even opens the queue. One-tap approve or reject.",
  },
  {
    title: "ERP & HRMS Integration",
    subtitle: "Ready Connectors",
    description:
      "Pre-built connectors for SAP, Oracle, Microsoft Dynamics, Tally and major HRMS platforms. API-first architecture.",
  },
]

export default function ExpenseGeniePage() {
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
                Product 02 — ExpenseGenie
              </span>
              <h1
                className="font-display font-black text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}
              >
                <em className="text-gold italic">AI-Powered</em> Expense Management
              </h1>
              <p className="mt-5 max-w-[540px] text-lg leading-relaxed text-ice/80">
                Snap a receipt. Let AI do the rest. From submission to SAP
                posting in seconds — with full policy compliance, zero manual
                data entry, and a conversational interface your employees will
                actually love.
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
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="border border-white/10 rounded-sm p-6 text-center hover:border-gold/30 transition-colors"
                >
                  <span className="font-display text-[2.4rem] font-bold text-gold leading-none block">
                    {m.value}
                  </span>
                  <span className="text-ice/70 text-sm font-medium mt-2 block">
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
        label="Core Capabilities"
        title={
          <>
            Intelligent Expense Management,{" "}
            <em className="text-gold italic">End to End.</em>
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
                <p className="text-sm font-medium text-gold/80">{feat.subtitle}</p>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{feat.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/contact">
              Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}
