import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

const caseStudies = [
  {
    tag: "MS Power Platform",
    title: "Enterprise Document Intelligence Platform",
    description:
      "Built an AI-powered document processing platform for a large financial services group. Automated extraction, classification and routing of 50+ document types across 12 business units — replacing manual review with Azure AI Document Intelligence and Power Automate workflows.",
    metrics: [
      { value: "85%", label: "Reduction in Manual Processing" },
      { value: "3x", label: "Document Throughput" },
      { value: "12", label: "Business Units Onboarded" },
      { value: "6 Wks", label: "Go-Live" },
    ],
  },
  {
    tag: "MS Power Platform",
    title: "Citizen Developer Portal & Governance Hub",
    description:
      "Designed and deployed an enterprise-wide citizen developer program with a self-service portal, governance guardrails, CoE dashboard and training academy — enabling 500+ citizen developers to build safely while IT retains control.",
    metrics: [
      { value: "500+", label: "Citizen Developers" },
      { value: "120+", label: "Apps Governed" },
      { value: "60%", label: "IT Backlog Reduced" },
      { value: "$1.2M", label: "Annual Savings" },
    ],
  },
  {
    tag: "ServiceNow",
    title: "Agentic IT Ops Self-Healing",
    description:
      "Implemented an agentic AI operations framework on ServiceNow ITOM that detects, diagnoses and remediates infrastructure incidents autonomously — reducing MTTR by 70% and auto-resolving 90% of P3/P4 incidents without human intervention.",
    metrics: [
      { value: "70%", label: "MTTR Reduction" },
      { value: "90%", label: "Auto-Resolved Incidents" },
      { value: "$2M+", label: "Annual Savings" },
      { value: "24/7", label: "Autonomous Coverage" },
    ],
  },
  {
    tag: "ServiceNow HRSD + ITSM",
    title: "AI-Powered Employee Service Hub",
    description:
      "Unified HR and IT service delivery for an 8,000-employee enterprise on ServiceNow HRSD and ITSM. Deployed a conversational AI portal with Now Assist, reducing ticket volume by 45% and achieving an NPS of 82 within six months.",
    metrics: [
      { value: "45%", label: "Ticket Reduction" },
      { value: "8K+", label: "Employees Served" },
      { value: "4 Min", label: "Avg Resolution Time" },
      { value: "NPS 82", label: "Employee Satisfaction" },
    ],
  },
  {
    tag: "OutSystems",
    title: "Call Desk & Integrated Workflow for BFSI",
    description:
      "Built a unified call-desk and workflow platform for a major BFSI client — integrating 50+ APIs, 450 action objects and 10,000+ end users across branches. Delivered in 30 weeks on OutSystems with full mobile support.",
    metrics: [
      { value: "10K+", label: "End Users" },
      { value: "50+", label: "API Integrations" },
      { value: "30 Wks", label: "Delivery Timeline" },
      { value: "450", label: "Action Objects" },
    ],
  },
  {
    tag: "OutSystems",
    title: "Government Digital Transformation — Tamkeen",
    description:
      "Delivered Bahrain's first Open Banking-integrated government platform for Tamkeen, replacing end-of-life legacy systems. 15x faster processing, 60% cost reduction and full regulatory compliance — setting a new benchmark for GovTech in the region.",
    metrics: [
      { value: "15x", label: "Faster Processing" },
      { value: "60%", label: "Cost Reduction" },
      { value: "1st", label: "Bahrain Open Banking" },
      { value: "EOL", label: "Legacy Replaced" },
    ],
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      <HeroSection
        size="compact"
        eyebrow="Proven Impact"
        title={
          <>
            Real Outcomes.{" "}
            <em className="text-gold italic">Measurable Results.</em>
          </>
        }
      />

      <SectionWrapper>
        <div className="flex flex-col gap-8">
          {caseStudies.map((cs) => (
            <Card key={cs.title} className="p-0 overflow-hidden">
              <div className="p-6 lg:p-8">
                <CardHeader className="p-0 pb-4">
                  <span className="inline-block rounded-sm bg-navy/5 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-navy/60 w-fit mb-2">
                    {cs.tag}
                  </span>
                  <CardTitle className="text-xl">{cs.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="text-[0.95rem] leading-relaxed mb-6">
                    {cs.description}
                  </CardDescription>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-navy/10 pt-5">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <span className="font-display text-[1.8rem] font-bold text-gold block leading-none">
                          {m.value}
                        </span>
                        <span className="text-[0.75rem] text-muted-foreground mt-1 block">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
