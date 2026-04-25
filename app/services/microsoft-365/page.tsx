"use client"

import Link from "next/link"
import {
  ArrowRight,
  Users,
  Workflow,
  FileSearch,
  Bot,
  LayoutGrid,
  Cloud,
  Award,
  Code,
  Briefcase,
  ShieldCheck,
  Zap,
  Database,
  KeyRound,
} from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const heroMetrics = [
  { v: "500+", l: "Citizen Devs" },
  { v: "120+", l: "Apps / 6 Mo" },
  { v: "85%", l: "Processing ↓" },
  { v: "$1.2M", l: "Saved / yr" },
]

const ecosystem = [
  { l: "Power Apps", c: "text-[#0078d4]" },
  { l: "Power Automate", c: "text-purple-500" },
  { l: "Power BI", c: "text-gold" },
  { l: "Copilot Studio", c: "text-teal-500" },
]

const services = [
  {
    icon: Users,
    title: "Citizen Developer Enablement",
    badge: "Core",
    desc: "We set up the complete citizen dev program — CoE Dashboard, environment strategy, DLP policies, maker onboarding, training portal. Your business users build apps in 2–4 weeks instead of 6-month IT wait.",
    detail:
      "500+ devs onboarded. 120+ apps in 6 months. $1.2M savings. IT backlog ↓ 60%.",
    tags: ["CoE", "DLP", "Training", "Governance"],
    accent: "border-l-[#0078d4]",
  },
  {
    icon: Workflow,
    title: "Process Automation (RPA + Cloud)",
    badge: "Automation",
    desc: "We automate manual workflows with Power Automate cloud flows and desktop RPA bots — approval chains, legacy system automation, process mining to identify candidates.",
    detail:
      "Cloud flows. Desktop RPA (attended/unattended). Process mining. AI Builder flows inline.",
    tags: ["Cloud Flows", "Desktop RPA", "Process Mining"],
    accent: "border-l-purple-500",
  },
  {
    icon: FileSearch,
    title: "AI Document Processing",
    badge: "AI",
    desc: "We deploy Azure AI Document Intelligence — invoices, contracts, KYC docs, claims. Power Apps review interface, Power Automate orchestration, Power BI dashboards.",
    detail:
      "Replaced 40+ reviewers with 12 agents. 10K+ docs/month. 85% time ↓. 6-week delivery.",
    tags: ["Azure AI", "95% Accuracy", "Power Apps"],
    accent: "border-l-gold",
  },
  {
    icon: Bot,
    title: "Copilot & AI Agents",
    badge: "AI",
    desc: "We build custom Copilot agents (HR, IT, customer service) connected to SharePoint/Dataverse. GPT-powered plugins for M365 Copilot. Azure OpenAI for enterprise LLM.",
    detail:
      "NLU with topics + entities. Multi-turn conversations. Handoff with context.",
    tags: ["Copilot Studio", "GPT Plugins", "Azure OpenAI"],
    accent: "border-l-teal-500",
  },
  {
    icon: LayoutGrid,
    title: "SharePoint & Digital Workplace",
    badge: "Workplace",
    desc: "Modern intranets with SPFx web parts, doc management, Viva Connections. Migration from on-prem. Metadata-driven libraries with retention.",
    detail:
      "Hub sites + comm sites. SPFx React components. Doc libraries. Approval workflows.",
    tags: ["SPFx", "Intranet", "Viva", "Doc Mgmt"],
    accent: "border-l-emerald-500",
  },
  {
    icon: Cloud,
    title: "Azure Integration Services",
    badge: "Integration",
    desc: "Logic Apps, Azure Functions, APIM, Service Bus. Hybrid connectivity to SAP, Salesforce, on-prem systems. API versioning, throttling, developer portal.",
    detail:
      "B2B orchestration. Serverless compute. Guaranteed delivery. Hybrid via Azure Relay.",
    tags: ["Logic Apps", "APIM", "Functions", "Service Bus"],
    accent: "border-l-amber-500",
  },
]

const caseStudies = [
  {
    title: "Document Intelligence Platform — BFSI",
    pills: ["Azure AI", "Power Platform"],
    icon: FileSearch,
    challenge:
      "10K+ docs/month. 40+ reviewers. 15% errors. 2–3 week backlogs.",
    delivered:
      "Azure AI extraction. Power Automate routing. Power Apps review. Power BI metrics. 12 agents handle volume of 40+.",
    stats: [
      { v: "85%", l: "Processing ↓" },
      { v: "3×", l: "Throughput" },
      { v: "12", l: "BUs" },
      { v: "6 Wk", l: "Delivery" },
    ],
    gradient: "from-[#0078d4] to-[#005a9e]",
  },
  {
    title: "Citizen Dev Portal & Governance — Infrastructure",
    pills: ["CoE", "DLP"],
    icon: Users,
    challenge:
      "6-month IT wait. 40% YoY backlog growth. Shadow IT. Zero governance.",
    delivered:
      "CoE Dashboard. DLP. Training portal. Auto-quarantine. Business users ship in 2–4 weeks.",
    stats: [
      { v: "500+", l: "Devs" },
      { v: "120+", l: "Apps/6Mo" },
      { v: "60%", l: "Backlog ↓" },
      { v: "$1.2M", l: "Saved/yr" },
    ],
    gradient: "from-[#005a9e] to-gold",
  },
]

const products = [
  {
    stack: "AZURE AI · AZURE OPENAI · POWER BI",
    name: "ExpenseGenie — AI Expense Management",
    desc: "Conversational AI on Azure. Reads thermal-faded receipts (97%+ accuracy). Auto-categorizes. Validates against policy. Posts to SAP in 30 seconds. Manager AI Copilot. SOC 2 Type II. 4-week go-live.",
    specs: [
      { l: "Speed", v: "90% faster · 30 seconds" },
      { l: "Accuracy", v: "97.3% / 94.1% thermal" },
      { l: "Go-Live", v: "4 weeks" },
      { l: "Security", v: "SOC 2 · AES-256 · TLS 1.3" },
    ],
  },
]

const certifications = [
  { name: "Power Platform Fundamentals", level: "Foundation", coverage: "All members" },
  { name: "Power Platform Developer", level: "Professional", coverage: "Senior devs" },
  { name: "Azure Integration", level: "Specialist", coverage: "Integration team" },
  { name: "Copilot Studio", level: "Specialist", coverage: "AI leads" },
  { name: "AI Builder", level: "Specialist", coverage: "Doc AI team" },
  { name: "M365 Developer", level: "Specialist", coverage: "SPFx team" },
]

const teamRoles = [
  { l: "Power Platform Leads", v: "3", d: "Architecture, governance, CoE" },
  { l: "App Developers", v: "8", d: "Canvas, Model-Driven, PCF" },
  { l: "RPA Specialists", v: "4", d: "Cloud flows, desktop RPA" },
  { l: "Azure Engineers", v: "3", d: "Logic Apps, Functions, APIM" },
]

const clients = ["Tata Realty", "Reliance", "New India", "Tech Mahindra"]

const techSpecs = [
  { c: "Apps", s: "Canvas, Model-Driven, Portal, PCF" },
  { c: "Data", s: "Dataverse, SQL, SharePoint" },
  { c: "Connectors", s: "400+ standard + custom APIM" },
  { c: "Auth", s: "Azure AD, MFA, B2C" },
  { c: "RPA", s: "Desktop (attended/unattended)" },
  { c: "AI", s: "AI Builder, Copilot Studio, GPT" },
  { c: "Governance", s: "DLP, CoE toolkit, environments" },
  { c: "ALM", s: "GitHub/DevOps CI/CD" },
  { c: "Analytics", s: "Power BI Embedded, RLS, Streaming" },
  { c: "Integration", s: "Logic Apps, Functions, APIM, Bus" },
]

const govPatterns = [
  {
    icon: Briefcase,
    title: "CoE Starter Kit",
    desc: "App inventory, maker analytics, compliance scoring, orphan cleanup.",
    accent: "border-l-[#0078d4]",
  },
  {
    icon: ShieldCheck,
    title: "DLP Framework",
    desc: "Connector classification. HTTP controls. Custom connector governance.",
    accent: "border-l-purple-500",
  },
  {
    icon: Zap,
    title: "ALM Pipeline",
    desc: "Solution packaging. GitHub CI/CD. Environment variables. Auto testing.",
    accent: "border-l-teal-500",
  },
  {
    icon: KeyRound,
    title: "Security",
    desc: "Azure AD conditional access. RLS. Sensitivity labels. Audit logging.",
    accent: "border-l-gold",
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MicrosoftPage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  Hero                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-navy text-white py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[45%]"
          style={{
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
            background:
              "linear-gradient(135deg, rgba(0,120,212,0.18) 0%, rgba(30,32,68,0) 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-12">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div>
              <Badge className="mb-4 bg-[#0078d4]/10 border-[#0078d4]/30 text-[#5fb0f5]">
                Microsoft Practice
              </Badge>
              <h1
                className="font-display font-black text-white animate-fade-up"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}
              >
                Microsoft 365 &{" "}
                <em className="text-[#5fb0f5] italic">Power Platform</em>
              </h1>
              <p className="mt-5 max-w-[560px] text-base leading-relaxed text-ice/80 animate-fade-up-delay-1">
                We enable enterprises to build apps, automate processes, and
                deploy AI within the Microsoft ecosystem. From citizen dev
                programs with governance to Azure AI document processing
                replacing 40+ reviewers with 12 agents.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Schedule Call <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/case-studies">View Case Studies</Link>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up-delay-3">
                {heroMetrics.map((m) => (
                  <div key={m.l} className="text-center">
                    <span className="font-display text-2xl font-bold text-[#5fb0f5] leading-none block">
                      {m.v}
                    </span>
                    <span className="text-ice/50 text-[0.7rem] font-medium mt-1 block leading-tight">
                      {m.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ecosystem Panel */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#5fb0f5] mb-4">
                Ecosystem
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {ecosystem.map((e) => (
                  <div
                    key={e.l}
                    className="rounded-md bg-white/5 border border-white/10 p-3 text-center"
                  >
                    <span
                      className={`text-sm font-bold ${e.c} block leading-tight`}
                    >
                      {e.l}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md bg-[#0078d4]/10 border border-[#0078d4]/20 p-3 text-center text-[0.7rem] text-[#5fb0f5]">
                3 Leads · 8 Devs · 4 RPA · 3 Azure
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gold" />
      </section>

      {/* ============================================================ */}
      {/*  Tabs                                                         */}
      {/* ============================================================ */}
      <Tabs defaultValue="capabilities" className="w-full">
        <div className="sticky top-[68px] z-30 bg-white border-b border-navy/10 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-12 overflow-x-auto">
            <TabsList className="w-max min-w-full sm:min-w-0">
              <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
              <TabsTrigger value="products">Products We Built</TabsTrigger>
              <TabsTrigger value="team">Team & Certifications</TabsTrigger>
              <TabsTrigger value="tech">Technical Specs</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ---- Capabilities ---- */}
        <TabsContent value="capabilities">
          <SectionWrapper
            label="What We Do for Clients"
            title={
              <>
                Our Microsoft <em>Service Offerings</em>
              </>
            }
          >
            <div className="grid md:grid-cols-2 gap-5">
              {services.map((s) => (
                <Card
                  key={s.title}
                  className={`p-6 border-l-[4px] ${s.accent}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gold/10 flex items-center justify-center shrink-0">
                        <s.icon className="h-5 w-5 text-gold" />
                      </div>
                      <CardTitle className="text-base">{s.title}</CardTitle>
                    </div>
                    <span className="text-[0.6rem] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#0078d4]/10 text-[#0078d4] whitespace-nowrap shrink-0">
                      {s.badge}
                    </span>
                  </div>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {s.desc}
                  </CardDescription>
                  <div className="rounded-md bg-navy/[0.03] border border-navy/8 p-3 text-xs text-navy/70 leading-relaxed mb-4">
                    {s.detail}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-block rounded bg-navy/5 px-2 py-0.5 text-[0.65rem] font-semibold text-navy/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* ---- Case Studies ---- */}
        <TabsContent value="case-studies">
          <SectionWrapper
            label="Proven Delivery"
            title={
              <>
                Case Studies & <em>Track Record</em>
              </>
            }
          >
            <div className="flex flex-col gap-6">
              {caseStudies.map((cs) => (
                <Card
                  key={cs.title}
                  className="overflow-hidden border-l-0 p-0"
                >
                  <div
                    className={`p-5 bg-gradient-to-r ${cs.gradient} flex items-center justify-between gap-4 flex-wrap`}
                  >
                    <div className="flex items-center gap-3">
                      <cs.icon className="h-5 w-5 text-white shrink-0" />
                      <h3 className="font-display text-lg font-bold text-white">
                        {cs.title}
                      </h3>
                    </div>
                    <div className="flex gap-1.5">
                      {cs.pills.map((p) => (
                        <span
                          key={p}
                          className="text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/15 text-white"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6 p-6">
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#0078d4] mb-2">
                        Challenge
                      </p>
                      <p className="text-sm text-navy/70 leading-relaxed">
                        {cs.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-teal-600 mb-2">
                        What We Delivered
                      </p>
                      <p className="text-sm text-navy/70 leading-relaxed">
                        {cs.delivered}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-5 bg-navy/[0.03] border-t border-navy/10">
                    {cs.stats.map((s) => (
                      <div key={s.l} className="text-center">
                        <span className="font-display text-2xl font-bold text-[#0078d4] block leading-none">
                          {s.v}
                        </span>
                        <span className="text-[0.6rem] text-navy/50 mt-1 block">
                          {s.l}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* ---- Products ---- */}
        <TabsContent value="products">
          <SectionWrapper
            label="In-House Products"
            title={
              <>
                Products We Built on <em>Azure</em>
              </>
            }
          >
            <div className="grid md:grid-cols-1 gap-5">
              {products.map((p) => (
                <Card key={p.name} className="p-6">
                  <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#0078d4] mb-2">
                    {p.stack}
                  </p>
                  <CardTitle className="text-lg mb-2">{p.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {p.desc}
                  </CardDescription>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {p.specs.map((s) => (
                      <div
                        key={s.l}
                        className="rounded-md bg-navy/[0.02] border border-navy/8 p-3"
                      >
                        <p className="text-[0.6rem] font-bold uppercase tracking-wider text-gold mb-1">
                          {s.l}
                        </p>
                        <p className="text-xs font-semibold text-navy">
                          {s.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* ---- Team & Certifications ---- */}
        <TabsContent value="team">
          <SectionWrapper
            label="Practice Team"
            title={
              <>
                Team & <em>Certifications</em>
              </>
            }
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Certifications
                </p>
                <div className="overflow-hidden rounded-sm border border-navy/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-navy/[0.03]">
                        <th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">
                          Certification
                        </th>
                        <th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">
                          Coverage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {certifications.map((c) => (
                        <tr key={c.name} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 font-medium text-navy text-xs">
                            {c.name}
                          </td>
                          <td className="px-4 py-2.5 font-bold text-gold text-xs">
                            {c.coverage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Roles
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {teamRoles.map((r) => (
                    <div
                      key={r.l}
                      className="rounded-sm bg-navy/[0.02] border border-navy/8 p-4"
                    >
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-gold mb-1">
                        {r.l}
                      </p>
                      <p className="text-2xl font-display font-bold text-navy mb-1 leading-none">
                        {r.v}
                      </p>
                      <p className="text-[0.7rem] text-navy/50 leading-relaxed">
                        {r.d}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-navy/50 mt-6 mb-3">
                  Clients
                </p>
                <div className="flex flex-wrap gap-2">
                  {clients.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 rounded-md bg-[#e8f4fd] text-[#0078d4] border border-[#a8d4f2] text-xs font-semibold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-lg bg-navy p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Unlock Power Platform at Scale
                </h3>
                <p className="text-ice/60 text-sm">
                  500+ citizen devs · $1.2M savings · Governance-first
                </p>
              </div>
              <Button asChild>
                <Link href="/contact">
                  Schedule Call <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* ---- Tech Specs ---- */}
        <TabsContent value="tech">
          <SectionWrapper
            label="Platform Depth"
            title={
              <>
                Technical <em>Specifications</em>
              </>
            }
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Capability Matrix
                </p>
                <div className="overflow-hidden rounded-sm border border-navy/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-navy/[0.03]">
                        <th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">
                          Capability
                        </th>
                        <th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">
                          Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {techSpecs.map((s) => (
                        <tr key={s.c} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 font-medium text-navy text-xs">
                            {s.c}
                          </td>
                          <td className="px-4 py-2.5 text-navy/60 text-xs">
                            {s.s}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Governance Patterns
                </p>
                <div className="flex flex-col gap-3">
                  {govPatterns.map((p) => (
                    <div
                      key={p.title}
                      className={`rounded-sm bg-navy/[0.02] border border-navy/8 border-l-[3px] ${p.accent} p-4 flex items-start gap-3`}
                    >
                      <p.icon className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-navy text-sm mb-1">
                          {p.title}
                        </p>
                        <p className="text-xs text-navy/60 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>
      </Tabs>
    </>
  )
}
