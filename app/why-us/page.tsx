import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

const differentiators = [
  {
    num: "01",
    title: "Advisory Technical Board",
    description:
      "Industry stalwarts from banking, insurance, automotive and government guide every major engagement — ensuring solutions are architecturally sound and domain-relevant.",
  },
  {
    num: "02",
    title: "AI-First Engineering",
    description:
      "Every project starts with an AI opportunity scan. We embed machine learning, NLP and agentic AI into workflows — not as an afterthought, but as a design principle.",
  },
  {
    num: "03",
    title: "In-House Training Academy",
    description:
      "Our developers are certified, continuously upskilled and bench-ready. We don't scramble for talent — we grow it. 33+ certified professionals and counting.",
  },
  {
    num: "04",
    title: "Domain Consultants on Staff",
    description:
      "Functional experts in BFSI, automotive, manufacturing and government work alongside engineers — bridging the gap between business intent and technical execution.",
  },
  {
    num: "05",
    title: "Multi-Platform Fluency",
    description:
      "OutSystems, Microsoft 365, Power Platform and ServiceNow — we don't force-fit a platform. We recommend the right one for your problem and deliver on it.",
  },
  {
    num: "06",
    title: "Production-Grade Products",
    description:
      "MBO, ExpenseGenie and Loan Covenant are proof we build what we preach — production-ready SaaS products on the same standards we deliver for clients.",
  },
]

const comparisonRows = [
  {
    dimension: "Team Model",
    vizionforge: "Dedicated cross-functional squads",
    largeSi: "Rotating bench resources",
    bodyShop: "Individual contractors",
  },
  {
    dimension: "AI Integration",
    vizionforge: "AI-first by design",
    largeSi: "Bolt-on at extra cost",
    bodyShop: "Not offered",
  },
  {
    dimension: "Domain Expertise",
    vizionforge: "In-house consultants",
    largeSi: "Generalist PMO layer",
    bodyShop: "None — your responsibility",
  },
  {
    dimension: "Transparency",
    vizionforge: "Shared Jira, weekly reports, exec reviews",
    largeSi: "Monthly status decks",
    bodyShop: "Timesheet only",
  },
  {
    dimension: "Quality Gates",
    vizionforge: "Automated QA + code review at every sprint",
    largeSi: "End-of-phase testing",
    bodyShop: "Your QA process",
  },
  {
    dimension: "Pricing",
    vizionforge: "Outcome-linked, milestone-based",
    largeSi: "T&M with overhead markup",
    bodyShop: "Hourly / daily rate",
  },
]

export default function WhyUsPage() {
  return (
    <>
      <HeroSection
        size="compact"
        eyebrow="Why VizionForge"
        title={
          <>
            Six Reasons to Choose{" "}
            <em className="text-gold italic">VizionForge.</em>
          </>
        }
      />

      {/* Differentiators */}
      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-5">
          {differentiators.map((d) => (
            <Card key={d.num} className="p-6">
              <CardHeader className="p-0 pb-3">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">
                  {d.num}
                </span>
                <CardTitle>{d.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{d.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Comparison Table */}
      <SectionWrapper
        className="bg-slate-50"
        label="How We Compare"
        title={
          <>
            VizionForge vs{" "}
            <em className="text-gold italic">Alternatives.</em>
          </>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-navy/10">
                <th className="text-left py-4 pr-4 font-bold text-navy w-1/4">
                  Dimension
                </th>
                <th className="text-left py-4 px-4 font-bold text-gold w-1/4">
                  VizionForge
                </th>
                <th className="text-left py-4 px-4 font-bold text-navy/60 w-1/4">
                  Large SI
                </th>
                <th className="text-left py-4 pl-4 font-bold text-navy/60 w-1/4">
                  Body Shop
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.dimension}
                  className="border-b border-navy/5 hover:bg-white transition-colors"
                >
                  <td className="py-4 pr-4 font-semibold text-navy">
                    {row.dimension}
                  </td>
                  <td className="py-4 px-4 text-navy font-medium">
                    {row.vizionforge}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {row.largeSi}
                  </td>
                  <td className="py-4 pl-4 text-muted-foreground">
                    {row.bodyShop}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1.15 }}
          >
            Let&apos;s Build Something That Matters —{" "}
            <em className="text-gold italic">Together.</em>
          </h2>
          <p className="text-ice/70 mt-4 text-lg">
            Whether you need a dedicated squad, a fixed-scope build or
            certified professionals on demand — we are ready.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/contact">
                Schedule a Discovery Call{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
