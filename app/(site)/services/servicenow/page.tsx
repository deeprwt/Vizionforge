"use client"

import Link from "next/link"
import {
  ArrowRight,
  Settings2,
  Bot,
  Headphones,
  Palette,
  Activity,
  Cable,
  Award,
  Users,
  Code,
  ShieldAlert,
  Search,
  Wrench,
  CheckCircle2,
  Cpu,
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
  { v: "70%", l: "MTTR ↓" },
  { v: "90%", l: "P3/P4 Auto" },
  { v: "8K+", l: "Employees" },
  { v: "$2M+", l: "Saved / yr" },
]

const modules = [
  { l: "ITSM / ITOM", c: "text-[#81b535]" },
  { l: "HRSD / CSM", c: "text-blue-500" },
  { l: "Service Portal", c: "text-purple-500" },
  { l: "Agentic AI", c: "text-red-500" },
]

const services = [
  {
    icon: Settings2,
    title: "ITSM Implementation & Optimization",
    badge: "Core",
    desc: "We implement Incident, Problem, Change, Request on ServiceNow. CMDB design, SLA policies, assignment rules, Performance Analytics dashboards — aligned to ITIL.",
    detail:
      "Fully configured ITSM. CMDB with discovery. SLA per priority. Assignment with load balancing. PA dashboards. KB with smart search.",
    tags: ["Incident", "Problem", "Change", "CMDB", "SLA"],
    accent: "border-l-[#81b535]",
  },
  {
    icon: Bot,
    title: "Agentic AI & Self-Healing IT",
    badge: "AI",
    desc: "We deploy autonomous AI agents — ITOM events → Now Assist classification → CMDB root cause → auto-runbook → verification. Humans handle P1/P2 with pre-populated AI context.",
    detail:
      "2,000+ servers. 90% P3/P4 auto. 70% MTTR ↓. $2M+ savings. 24/7 autonomous. NOC freed for strategic work.",
    tags: ["Now Assist", "AI Agents", "Auto-Runbook", "CMDB RCA"],
    accent: "border-l-red-500",
  },
  {
    icon: Headphones,
    title: "HRSD & Employee Service Hub",
    badge: "Employee",
    desc: "Unified portal — IT + HR + Facilities + Finance. NLU Virtual Agent for leave, payslips, IT resets. GenAI Now Assist for summarization and auto-triage.",
    detail:
      "8,000+ employees across India + ME. 45% tickets ↓. NPS 82. 4-min L0 resolution. 200+ catalog items. 500+ KB articles.",
    tags: ["HRSD", "Virtual Agent", "Employee Center", "Multi-Region"],
    accent: "border-l-blue-500",
  },
  {
    icon: Palette,
    title: "Service Portal Design",
    badge: "Portal",
    desc: "Custom branded portals with responsive catalog, dynamic forms, Angular widgets. Virtual Agent embedded. Mobile-first with Now Mobile. 200+ items, smart KB search.",
    detail:
      "Branded responsive portal. Service catalog. Dynamic forms. Custom widgets. KB with AI search.",
    tags: ["Custom Theme", "Catalog", "Widgets", "Mobile"],
    accent: "border-l-purple-500",
  },
  {
    icon: Activity,
    title: "ITOM & Event Management",
    badge: "Operations",
    desc: "Integrate with Datadog, Splunk, Dynatrace, Azure Monitor. Event-to-incident correlation. Threshold alerting. Foundation for agentic AI auto-remediation.",
    detail:
      "Alert rules from 10+ sources. Correlation + dedup. Discovery for CMDB. Foundation for autonomous agents.",
    tags: ["Event Mgmt", "Datadog", "Splunk", "Correlation"],
    accent: "border-l-amber-500",
  },
  {
    icon: Cable,
    title: "Integration Hub & Flow Designer",
    badge: "Integration",
    desc: "Spokes for SAP, Azure AD, Slack/Teams, Jira, Datadog. Custom REST/SOAP via MID Server. Flow Designer for automated processes and cross-system orchestration.",
    detail:
      "SAP (OData) · Azure AD (SAML) · Datadog/Splunk (Event API) · Slack/Teams · Jira (bi-dir) · Custom REST/SOAP.",
    tags: ["Spokes", "Flow Designer", "MID Server", "Bi-Dir"],
    accent: "border-l-teal-500",
  },
]

const caseStudies = [
  {
    title: "Agentic IT Ops — Self-Healing Infrastructure (Energy)",
    pills: ["Agentic AI", "Now Assist"],
    icon: Bot,
    challenge:
      "2,000+ servers. NOC 25 people. 3,000+ incidents/month. P3/P4 = 60%. MTTR 4.2hr. $3.5M NOC cost.",
    delivered:
      "Autonomous AI: ITOM → Now Assist → CMDB RCA → auto-runbook → health check. P1/P2 get AI context, investigation ↓ 60%.",
    stats: [
      { v: "70%", l: "MTTR ↓" },
      { v: "90%", l: "Auto-Fix" },
      { v: "$2M+", l: "Saved/yr" },
      { v: "24/7", l: "Autonomous" },
    ],
    gradient: "from-[#81b535] to-[#5a7c20]",
  },
  {
    title: "AI-Powered Employee Service Hub — Multi-Region",
    pills: ["HRSD", "Virtual Agent"],
    icon: Headphones,
    challenge:
      "8K+ employees, 4 portals, 48hr resolution, NPS 31. HR overwhelmed with repetitive queries.",
    delivered:
      "Unified HRSD+ITSM. NLU Virtual Agent. 200+ catalog. 500+ KB. Now Assist GenAI. Multi-language (EN, HI, AR).",
    stats: [
      { v: "45%", l: "Tickets ↓" },
      { v: "8K+", l: "Employees" },
      { v: "4 Min", l: "L0 Res" },
      { v: "NPS 82", l: "Satisfaction" },
    ],
    gradient: "from-[#5a7c20] to-gold",
  },
]

const products = [
  {
    stack: "SERVICENOW · REACT · NODE.JS",
    name: "Sentio — The Living Bowtie Platform",
    desc: "Three layers: Author (React, 6-stage workflow, 4 roles) → Watch (Sentio Agent, barrier health, threshold engine, <60min alerts) → Review (GRC, BRSR audit trails). 3 human-in-the-loop gates. 3 deployment models (ServiceNow, OutSystems, Full-Stack).",
    specs: [
      { l: "Alerts", v: "<60 minutes" },
      { l: "Gates", v: "3 human-in-the-loop" },
      { l: "Deploy", v: "3 models" },
      { l: "Data", v: "397+ live audits" },
    ],
  },
]

const certifications = [
  { name: "ITSM Implementation", module: "Incident, Problem, Change" },
  { name: "HRSD Implementation", module: "Cases, Lifecycle, Center" },
  { name: "CSM Implementation", module: "Cases, Accounts, Entitlements" },
  { name: "Now Assist & AI Agents", module: "GenAI, VA, Predictive" },
  { name: "Flow Designer", module: "Workflows, subflows" },
  { name: "Integration Hub", module: "Spokes, REST, MID Server" },
]

const teamRoles = [
  { l: "ServiceNow Architects", v: "2", d: "Platform, ITSM design, AI strategy" },
  { l: "ITSM / ITOM", v: "5", d: "Implementation, config, migration" },
  { l: "HRSD / CSM", v: "3", d: "HR service, customer service" },
  { l: "AI / NLU", v: "3", d: "Now Assist, VA, Predictive Intel" },
]

const clients = ["Suzlon", "New India", "Tata Realty", "Reliance", "Tech Mahindra"]

const techSpecs = [
  { c: "ITSM", s: "Incident, Problem, Change, Request, SLA, KB" },
  { c: "ITOM", s: "Event Mgmt, Discovery, Service Mapping" },
  { c: "HRSD", s: "HR Cases, Lifecycle, Employee Center" },
  { c: "CSM", s: "Cases, Accounts, Entitlements, Surveys" },
  { c: "AI", s: "Now Assist, Virtual Agent NLU, Predictive" },
  { c: "Portal", s: "Service Portal, Now Experience, Catalog" },
  { c: "Automation", s: "Flow Designer, Subflows, Spokes" },
  { c: "Integration", s: "REST, SOAP, MID Server, Hub Spokes" },
  { c: "Analytics", s: "Performance Analytics, Dashboards" },
  { c: "Mobile", s: "Now Mobile, Agent Mobile" },
]

const aiFlow = [
  {
    icon: ShieldAlert,
    title: "1. Event Ingestion",
    desc: "ITOM aggregates alerts. Dedup + correlation.",
    accent: "border-l-[#81b535]",
  },
  {
    icon: Search,
    title: "2. AI Classification",
    desc: "Now Assist severity + categorization + CMDB CI mapping.",
    accent: "border-l-red-500",
  },
  {
    icon: Wrench,
    title: "3. Auto-Remediation",
    desc: "Runbook: restart, config rollback, disk cleanup, cert renewal.",
    accent: "border-l-amber-500",
  },
  {
    icon: CheckCircle2,
    title: "4. Verify & Close",
    desc: "Health check. Auto-close. KB article generated. P1/P2 escalated.",
    accent: "border-l-emerald-500",
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ServiceNowPage() {
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
              "linear-gradient(135deg, rgba(129,181,53,0.18) 0%, rgba(30,32,68,0) 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-12">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div>
              <Badge className="mb-4 bg-[#81b535]/10 border-[#81b535]/30 text-[#a8d473]">
                ServiceNow Practice
              </Badge>
              <h1
                className="font-display font-black text-white animate-fade-up"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}
              >
                ServiceNow &{" "}
                <em className="text-[#a8d473] italic">Agentic AI</em>
              </h1>
              <p className="mt-5 max-w-[560px] text-base leading-relaxed text-ice/80 animate-fade-up-delay-1">
                We implement, customize and extend ServiceNow — from ITSM/HRSD
                to autonomous AI agents that resolve 90% of P3/P4 incidents
                without human intervention. Full stack: ITSM, ITOM, HRSD, CSM,
                Portal, Now Assist, Agentic AI.
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
                    <span className="font-display text-2xl font-bold text-[#a8d473] leading-none block">
                      {m.v}
                    </span>
                    <span className="text-ice/50 text-[0.7rem] font-medium mt-1 block leading-tight">
                      {m.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modules Panel */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#a8d473] mb-4">
                Modules
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {modules.map((e) => (
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
              <div className="mt-4 rounded-md bg-[#81b535]/10 border border-[#81b535]/20 p-3 text-center text-[0.7rem] text-[#a8d473]">
                2 Architects · 5 ITSM · 3 HRSD · 3 AI/NLU
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
                Our ServiceNow <em>Service Offerings</em>
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
                    <span className="text-[0.6rem] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#81b535]/10 text-[#5a7c20] whitespace-nowrap shrink-0">
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
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#5a7c20] mb-2">
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
                        <span className="font-display text-2xl font-bold text-[#5a7c20] block leading-none">
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
                Products We <em>Built</em>
              </>
            }
          >
            <div className="grid md:grid-cols-1 gap-5">
              {products.map((p) => (
                <Card key={p.name} className="p-6">
                  <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#5a7c20] mb-2">
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
                          Module
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {certifications.map((c) => (
                        <tr key={c.name} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 font-medium text-navy text-xs">
                            {c.name}
                          </td>
                          <td className="px-4 py-2.5 text-navy/60 text-xs">
                            {c.module}
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
                      className="px-3 py-1.5 rounded-md bg-[#f0f8e0] text-[#5a7c20] border border-[#c2e8a0] text-xs font-semibold"
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
                  Deploy Agentic AI on ServiceNow
                </h3>
                <p className="text-ice/60 text-sm">
                  70% MTTR · 90% auto · $2M+ savings · NPS 82
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
                  <Cpu className="h-4 w-4" />
                  Agentic AI Flow
                </p>
                <div className="flex flex-col gap-3">
                  {aiFlow.map((step) => (
                    <div
                      key={step.title}
                      className={`rounded-sm bg-navy/[0.02] border border-navy/8 border-l-[3px] ${step.accent} p-4 flex items-start gap-3`}
                    >
                      <step.icon className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-navy text-sm mb-1">
                          {step.title}
                        </p>
                        <p className="text-xs text-navy/60 leading-relaxed">
                          {step.desc}
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
