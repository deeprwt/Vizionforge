import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

const metrics = [
  { value: "360°", label: "Dealer View" },
  { value: "8+", label: "Core Modules" },
  { value: "SaaS", label: "Cloud-Native" },
]

const modules = [
  {
    title: "Inventory Management",
    description:
      "Real-time stock tracking across multiple locations, automated reorder points, variant management and full vehicle lifecycle visibility.",
  },
  {
    title: "Sales & CRM",
    description:
      "Lead pipeline, test drives, quotation management, booking-to-delivery workflow and customer relationship tracking.",
  },
  {
    title: "Service & Workshop",
    description:
      "Job cards, technician allocation, parts requisition, service history and warranty claim management in one view.",
  },
  {
    title: "Finance & Accounts",
    description:
      "Loan processing, insurance linkage, GST-compliant invoicing, receivables tracking and full general-ledger integration.",
  },
  {
    title: "OEM Reporting",
    description:
      "Automated manufacturer reporting, scheme and incentive tracking, compliance dashboards and audit-ready data exports.",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Sales velocity, service TAT, revenue per bay, inventory ageing and custom KPI dashboards for management review.",
  },
]

export default function MboPage() {
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
                Product 01 — MBO
              </span>
              <h1
                className="font-display font-black text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}
              >
                <em className="text-gold italic">Dealer Management</em> Software
              </h1>
              <p className="mt-5 max-w-[540px] text-lg leading-relaxed text-ice/80">
                End-to-end dealership operations — inventory, sales, service and
                finance in one unified SaaS platform. OEM agnostic. Built for
                Indian and Middle-Eastern automotive retail.
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

      {/* Key Modules */}
      <SectionWrapper
        label="Key Modules"
        title={
          <>
            Everything a Dealership Needs.{" "}
            <em className="text-gold italic">Nothing It Doesn&apos;t.</em>
          </>
        }
      >
        <div className="grid md:grid-cols-3 gap-5">
          {modules.map((mod, i) => (
            <Card key={mod.title} className="p-6">
              <CardHeader className="p-0 pb-3">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">
                  Module {String(i + 1).padStart(2, "0")}
                </span>
                <CardTitle>{mod.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{mod.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
