import Link from "next/link"
import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

/* ---------- OutSystems data ---------- */

const osTeam = [
  { value: "3", label: "Solution Architects" },
  { value: "2", label: "Tech Leads" },
  { value: "15", label: "OS Developers" },
  { value: "10", label: "Mobile Developers" },
]

const osCapabilities = [
  "Reactive Web & Progressive Web Apps",
  "Enterprise App Modernization",
  "Case Management Framework (CMF)",
  "API Integration (REST, SOAP, SAP, Salesforce)",
  "ODC Migration & Cloud-Native",
  "Architecture Review & Health Check",
  "Performance Tuning & Tech Debt Reduction",
]

const osCapabilitiesStats = [
  { value: "33+", label: "Certified" },
  { value: "5\u2605", label: "Rating" },
  { value: "450", label: "Action Objects" },
]

const osCertifications = [
  "Associate Reactive Developer",
  "Professional Web Developer",
  "Architecture Specialist",
  "Front-End Specialist",
  "Tech Lead Certification",
  "In-House Academy \u2014 100% Team Certified",
]

const osCertificationsStats = [
  { value: "5", label: "Cert Tracks" },
  { value: "100%", label: "Certified Team" },
  { value: "3", label: "Lead Architects" },
]

const osHighlights = [
  "5\u2605 Customer Rating on OutSystems",
  "Healthcare Prescription & Pharmacy Apps",
  "CMF Experts \u2014 Insurance & BFSI",
  "Tamkeen \u2014 Kingdom of Bahrain Labor Fund",
  "BFSI Call Desk & Lead Management",
  "50+ API Integrations (SAP, Salesforce, REST)",
]

const osHighlightsStats = [
  { value: "30+", label: "Apps" },
  { value: "6", label: "Verticals" },
  { value: "15x", label: "Faster" },
]

/* ---------- Microsoft data ---------- */

const microsoftCards = [
  {
    title: "Power Apps",
    body: "Canvas & Model-Driven apps. Dataverse, custom connectors, component libraries. Citizen-dev governance frameworks.",
  },
  {
    title: "Power Automate",
    body: "Cloud flows, desktop flows (RPA), business process flows. Integration with 400+ connectors including SAP and Salesforce.",
  },
  {
    title: "Power BI",
    body: "Enterprise dashboards, paginated reports, dataflows. Row-level security, incremental refresh, embedded analytics.",
  },
  {
    title: "SharePoint Modern",
    body: "Intranet portals, document management, SPFx web parts. Migration from classic to modern. Viva Connections.",
  },
  {
    title: "Copilot & AI Builder",
    body: "Microsoft 365 Copilot integrations, AI Builder models for document processing, prediction, and object detection.",
  },
  {
    title: "Azure Integration",
    body: "Azure Functions, Logic Apps, API Management, Service Bus. Hybrid cloud architectures with on-premise connectors.",
  },
]

/* ---------- ServiceNow data ---------- */

const serviceNowCards = [
  {
    title: "ITSM & ITOM",
    body: "Incident, Problem, Change & Release Management. Discovery, Service Mapping, Event Management. CMDB health and governance.",
  },
  {
    title: "HRSD & CSM",
    body: "Employee Center, Case & Knowledge Management, Lifecycle Events. Customer Service Management with omni-channel support.",
  },
  {
    title: "Service Portal & UI",
    body: "Custom Service Portal development, UI Builder, Workspace configuration. Responsive, accessible, brand-aligned experiences.",
  },
  {
    title: "Agentic AI",
    body: "Now Assist, Virtual Agent, Predictive Intelligence. Agentic AI workflows for autonomous ticket resolution and proactive service.",
  },
]

/* ---------- Helpers ---------- */

function StatBox({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="rounded-sm bg-navy p-6 flex flex-col gap-4 justify-center">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <span className="font-display text-[2rem] font-bold text-gold block leading-none">
            {s.value}
          </span>
          <span className="text-[0.75rem] text-ice/70 mt-1 block">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function ListItems({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[0.92rem] text-navy/80">
          <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/* ---------- Page ---------- */

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <HeroSection
        size="compact"
        eyebrow="Platform Capabilities"
        title={
          <>
            Three Platforms.{" "}
            <em className="text-gold italic">One Delivery Team.</em>
          </>
        }
      />

      {/* OUTSYSTEMS */}
      <SectionWrapper
        label="OutSystems Practice"
        title={
          <>
            Low-Code Development at{" "}
            <em className="text-gold italic">Enterprise Scale</em>
          </>
        }
        subtitle="Reactive Web & Mobile, Enterprise Modernization, Case Management, API Integration, ODC Migration and Architecture Review — delivered by a 30-strong certified team."
      >
        {/* Team stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {osTeam.map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-navy/10 bg-white p-5 text-center shadow-sm"
            >
              <span className="font-display text-[2rem] font-bold text-gold block leading-none">
                {stat.value}
              </span>
              <span className="text-[0.82rem] text-navy/60 mt-1 block">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="capabilities" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
          </TabsList>

          <TabsContent value="capabilities">
            <div className="grid md:grid-cols-[1fr_240px] gap-6 mt-4">
              <ListItems items={osCapabilities} />
              <StatBox stats={osCapabilitiesStats} />
            </div>
          </TabsContent>

          <TabsContent value="certifications">
            <div className="grid md:grid-cols-[1fr_240px] gap-6 mt-4">
              <ListItems items={osCertifications} />
              <StatBox stats={osCertificationsStats} />
            </div>
          </TabsContent>

          <TabsContent value="highlights">
            <div className="grid md:grid-cols-[1fr_240px] gap-6 mt-4">
              <ListItems items={osHighlights} />
              <StatBox stats={osHighlightsStats} />
            </div>
          </TabsContent>
        </Tabs>
      </SectionWrapper>

      {/* MICROSOFT PRACTICE */}
      <SectionWrapper
        dark
        label="Microsoft Practice"
        title={
          <>
            M365 &amp; Power Platform{" "}
            <em className="text-gold italic">End to End</em>
          </>
        }
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {microsoftCards.map((item) => (
            <Card
              key={item.title}
              className="bg-navy border-l-gold/50 border border-white/10 p-6 hover:border-gold/40"
            >
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-ice/70">{item.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* SERVICENOW */}
      <SectionWrapper
        label="ServiceNow Practice"
        title={
          <>
            ITSM &amp; Workflow{" "}
            <em className="text-gold italic">Automation</em>
          </>
        }
      >
        <div className="grid md:grid-cols-2 gap-5">
          {serviceNowCards.map((item) => (
            <Card key={item.title} className="p-6">
              <CardHeader className="p-0 pb-3">
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{item.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild>
            <Link href="/contact">
              Schedule a Discovery Call <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}
