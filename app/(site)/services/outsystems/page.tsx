"use client"

import Link from "next/link"
import {
  ArrowRight,
  Layers,
  RefreshCw,
  Workflow,
  Cable,
  CloudCog,
  ShieldCheck,
  Award,
  Users,
  Code,
  Building2,
  Banknote,
  Globe2,
} from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const heroMetrics = [
  { v: "5★", l: "Marketplace Rating" },
  { v: "33+", l: "Certified Pros" },
  { v: "30+", l: "Enterprise Apps" },
  { v: "6", l: "Industry Verticals" },
]

const teamGlance = [
  { v: "3", l: "Solution Architects" },
  { v: "2", l: "Tech Leads" },
  { v: "15", l: "OS Developers" },
  { v: "10", l: "Mobile Devs" },
]

const services = [
  {
    icon: Layers,
    title: "Enterprise App Development",
    badge: "Core Service",
    desc: "We design, build and deploy enterprise web and mobile apps on OutSystems — from EHS audit platforms to loan origination systems. Our SA leads discovery, defines the domain model, and our team executes in 2-week agile sprints with code review gates.",
    detail:
      "Dedicated SA + Tech Lead + Dev Pod. Reactive web + mobile (iOS/Android MABS). CI/CD via LifeTime. Avg delivery: 12–30 weeks.",
    tags: ["Reactive Web", "Mobile MABS", "Agile", "CI/CD"],
    accent: "border-l-[#ff4713]",
  },
  {
    icon: RefreshCw,
    title: "Legacy System Migration",
    badge: "Transformation",
    desc: "We migrate .NET, Java, Savvion BPM, or Dynamics apps to OutSystems without service disruption. Parallel systems during cutover, historical data migration with validation, and user retraining.",
    detail:
      "Migrated 10,000-user BFSI service desk from .NET/Savvion. 2M+ records. 500+ agents retrained. Zero disruption.",
    tags: [".NET", "Java", "Savvion", "Dynamics", "Zero Downtime"],
    accent: "border-l-gold",
  },
  {
    icon: Workflow,
    title: "Case Management & BPM",
    badge: "Specialist",
    desc: "We implement complex CMF workflows — multi-role approvals, TAT-based escalation, SLA dashboards, audit trails. Our most differentiated capability — delivered at a scale few OS partners have.",
    detail:
      "10,000+ users. 50+ APIs. 450 action objects. Multi-role across 40+ applications. Full BPM replication.",
    tags: ["CMF", "BPM", "SLA", "Escalation", "Audit Trail"],
    accent: "border-l-teal-500",
  },
  {
    icon: Cable,
    title: "System Integration Services",
    badge: "Integration",
    desc: "We connect OutSystems to SAP, Salesforce, core banking (Finacle, Temenos, FinnOne), HRMS, and any REST/SOAP/OData endpoint. Canonical data models and circuit breaker patterns for resilience.",
    detail:
      "50+ APIs in single BFSI engagement. SAP RFC/BAPI for expense posting. CKYC for RBI lending. Bahrain gov APIs.",
    tags: ["SAP RFC", "OData", "Finacle", "CKYC", "50+ APIs"],
    accent: "border-l-blue-500",
  },
  {
    icon: CloudCog,
    title: "ODC Migration & Modernization",
    badge: "Cloud",
    desc: "We transition from OS 11 to ODC. Portfolio assessment, architecture redesign for cloud-native, Forge component migration, CI/CD pipeline setup, and governance with environment strategy.",
    detail:
      "Discovery → Architecture redesign → Data migration → Forge audit → LifeTime CI/CD → Parallel run → Cutover → Hypercare.",
    tags: ["ODC", "Cloud-Native", "Forge Audit", "Multi-Tenant"],
    accent: "border-l-purple-500",
  },
  {
    icon: ShieldCheck,
    title: "Architecture Review & Health Check",
    badge: "Advisory",
    desc: "We audit your OS environment — 4-Layer Canvas compliance, AI Mentor scores, technical debt, performance bottlenecks. Deliver a prioritized remediation roadmap with sprint-level effort estimates.",
    detail:
      "Health Score Report + Tech Debt Register + Performance Plan + Compliance Audit + Remediation Roadmap.",
    tags: ["4-Layer Canvas", "AI Mentor", "Tech Debt", "Performance"],
    accent: "border-l-amber-500",
  },
]

const caseStudies = [
  {
    title: "BFSI — Call Desk & Integrated Workflow",
    pills: ["CMF", "BFSI"],
    icon: Banknote,
    challenge:
      "Legacy .NET/Savvion serving 10,000+ employees across 40+ apps. EOL, no support. 48-hour avg resolution. Brittle integrations.",
    delivered:
      "Full CMF with multi-role workflows. 50+ API integrations (Finacle, Salesforce). TAT escalation. Migration from .NET/Savvion — zero disruption. 2M+ records.",
    stats: [
      { v: "10K+", l: "Employees" },
      { v: "50+", l: "APIs" },
      { v: "30 Wk", l: "Delivery" },
      { v: "450", l: "Action Obj" },
    ],
    gradient: "from-[#ff4713] to-[#c43810]",
  },
  {
    title: "Government — Tamkeen, Bahrain Digital Transformation",
    pills: ["KPMG", "Government"],
    icon: Globe2,
    challenge:
      "Bahrain Labor Fund on EOL Microsoft Dynamics. Evaluated MS CRM, PowerApps, Zoho, Mendix — selected OutSystems for AWS + CI/CD.",
    delivered:
      "Citizen portal with dynamic role-based fields. Government integrations. First IBAN open banking in Bahrain. OS on AWS. Delivered with KPMG.",
    stats: [
      { v: "15×", l: "Faster" },
      { v: "60%", l: "Cost ↓" },
      { v: "1st", l: "IBAN BH" },
      { v: "EOL", l: "CRM Replaced" },
    ],
    gradient: "from-[#8b4513] to-gold",
  },
]

const products = [
  {
    stack: "OUTSYSTEMS ODC + REACT + AZURE",
    name: "SafeOps360 — Enterprise QHSE",
    desc: "4 modules. 5 RBAC roles. 6 AI capabilities. ISO 45001 aligned. Deployed at Tata Realty — 397+ audits across 25+ project sites.",
    specs: [
      { l: "Scale", v: "397+ audits · 25+ sites" },
      { l: "Stack", v: "React PWA + ODC + Azure ML" },
    ],
  },
  {
    stack: "OUTSYSTEMS ODC",
    name: "LOS/LMS — Loan Origination & Management",
    desc: "6-stage origination. 8 loan types. CKYC integration. Parallel legal + project review. Maker-Checker. Auto sanction letters. Covenant monitoring.",
    specs: [
      { l: "Impact", v: "70% TAT ↓ · 90% paperless" },
      { l: "Compliance", v: "RBI + CKYC + CERSAI" },
    ],
  },
]

const certifications = [
  { name: "Associate Reactive Developer", level: "Foundation", count: "30+" },
  { name: "Professional Reactive Developer", level: "Professional", count: "15+" },
  { name: "Lead Architect", level: "Expert", count: "3" },
  { name: "Mobile Developer", level: "Specialist", count: "10" },
  { name: "Integration Specialist", level: "Specialist", count: "5" },
]

const teamRoles = [
  { l: "Solution Architects", v: "3", d: "Architecture, governance, client advisory" },
  { l: "Tech Leads", v: "2", d: "Platform stewardship, code quality" },
  { l: "OS Developers", v: "15", d: "Reactive web, server actions, BPT" },
  { l: "Mobile Developers", v: "10", d: "iOS/Android MABS, offline, PWA" },
]

const clients = ["Tata Realty", "PFC", "Tamkeen", "Reliance", "Suzlon", "HDFC ERGO"]

const techSpecs = [
  { c: "Platform", s: "OutSystems 11 + ODC" },
  { c: "UI", s: "Reactive Web (SPA) + MABS/PWA" },
  { c: "Backend", s: "Server Actions, Timers, BPT" },
  { c: "Database", s: "OS DB + External (SQL Server, Oracle)" },
  { c: "Integration", s: "REST, SOAP, SAP RFC/BAPI/OData" },
  { c: "Mobile", s: "MABS 10+ (iOS 15+, Android 12+)" },
  { c: "Deploy", s: "One-click, CI/CD, LifeTime" },
  { c: "Security", s: "OWASP Top 10, RBAC, CSP" },
]

const archPatterns = [
  {
    title: "4-Layer Canvas",
    desc: "End User → Core → Foundation → Library. No upward references.",
    accent: "border-l-[#ff4713]",
  },
  {
    title: "Domain-Driven Design",
    desc: "Bounded contexts. Aggregate roots. Event-driven integration.",
    accent: "border-l-teal-500",
  },
  {
    title: "Multi-Tenant",
    desc: "Site properties. Data-level segregation. Per-tenant branding.",
    accent: "border-l-blue-500",
  },
  {
    title: "Integration Patterns",
    desc: "Canonical model. Circuit breaker. Async BPT. Exponential backoff.",
    accent: "border-l-purple-500",
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OutSystemsPage() {
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
              "linear-gradient(135deg, rgba(255,71,19,0.18) 0%, rgba(30,32,68,0) 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-12">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div>
              <Badge className="mb-4 bg-[#ff4713]/10 border-[#ff4713]/30 text-[#ff8c5a]">
                OutSystems Premier Practice
              </Badge>
              <h1
                className="font-display font-black text-white animate-fade-up"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}
              >
                Out<em className="text-[#ff8c5a] italic">Systems</em> Practice
              </h1>
              <p className="mt-5 max-w-[560px] text-base leading-relaxed text-ice/80 animate-fade-up-delay-1">
                We architect, build and migrate enterprise applications on
                OutSystems — from complex case management for 10,000+ users to
                government portals. Every engagement led by a Lead Architect,
                delivered by a 100% certified team.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Schedule SA Call <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/case-studies">View Case Studies</Link>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up-delay-3">
                {heroMetrics.map((m) => (
                  <div key={m.l} className="text-center">
                    <span className="font-display text-2xl font-bold text-[#ff8c5a] leading-none block">
                      {m.v}
                    </span>
                    <span className="text-ice/50 text-[0.7rem] font-medium mt-1 block leading-tight">
                      {m.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team at a Glance Panel */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#ff8c5a] mb-4">
                Team at a Glance
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {teamGlance.map((t) => (
                  <div
                    key={t.l}
                    className="rounded-md bg-white/5 border border-white/10 p-3 text-center"
                  >
                    <span className="font-display text-2xl font-bold text-white block leading-none">
                      {t.v}
                    </span>
                    <span className="text-[0.65rem] text-ice/50 mt-1 block">
                      {t.l}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md bg-[#ff4713]/10 border border-[#ff4713]/20 p-3 text-center text-[0.7rem] text-[#ff8c5a]">
                100% Certified · 5 Cert Tracks · In-House Academy
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
                Our OutSystems <em>Service Offerings</em>
              </>
            }
            subtitle="These are actual VizionForge services — not platform features. Each describes what we deliver, how we deliver it, and what we've proven."
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
                    <span className="text-[0.6rem] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#ff4713]/10 text-[#ff4713] whitespace-nowrap shrink-0">
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
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#ff4713] mb-2">
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
                        <span className="font-display text-2xl font-bold text-[#ff4713] block leading-none">
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
                Products We Built on <em>OutSystems</em>
              </>
            }
          >
            <div className="grid md:grid-cols-2 gap-5">
              {products.map((p) => (
                <Card key={p.name} className="p-6">
                  <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#ff4713] mb-2">
                    {p.stack}
                  </p>
                  <CardTitle className="text-base mb-2">{p.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {p.desc}
                  </CardDescription>
                  <div className="grid grid-cols-2 gap-3">
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
              {/* Cert Table */}
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
                          Level
                        </th>
                        <th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">
                          Members
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
                            {c.level}
                          </td>
                          <td className="px-4 py-2.5 font-bold text-gold text-xs">
                            {c.count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-sm bg-gold/5 border border-gold/30 p-4 text-xs text-navy/70 leading-relaxed">
                  <span className="font-bold text-navy">100% certified.</span>{" "}
                  In-House Academy certifies new hires in 6 weeks. Monthly
                  skill sprints on ODC, AI/ML, CMF.
                </div>
              </div>

              {/* Team Roles */}
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
                      className="px-3 py-1.5 rounded-md bg-[#fff0eb] text-[#ff4713] border border-[#ffc9b3] text-xs font-semibold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
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
                          Specification
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
                  <Building2 className="h-4 w-4" />
                  Architecture Patterns
                </p>
                <div className="flex flex-col gap-3">
                  {archPatterns.map((p) => (
                    <div
                      key={p.title}
                      className={`rounded-sm bg-navy/[0.02] border border-navy/8 border-l-[3px] ${p.accent} p-4`}
                    >
                      <p className="font-bold text-navy text-sm mb-1">
                        {p.title}
                      </p>
                      <p className="text-xs text-navy/60 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-lg bg-navy p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Talk to Our Lead Architect
                </h3>
                <p className="text-ice/60 text-sm">
                  33+ certified · 5★ · 30+ apps · CMF at 10K+ scale
                </p>
              </div>
              <Button asChild>
                <Link href="/contact">
                  Schedule SA Call <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </SectionWrapper>
        </TabsContent>
      </Tabs>
    </>
  )
}
