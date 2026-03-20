"use client"

import Link from "next/link"
import {
  ArrowRight,
  ClipboardCheck,
  ShieldCheck,
  BarChart3,
  Brain,
  Server,
  Rocket,
  Users,
  Eye,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Lightbulb,
  Search,
  Calendar,
  HardHat,
  Activity,
  Building2,
  Layers,
  Database,
  Lock,
  Globe,
  Cloud,
  Cpu,
  Settings,
} from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const metrics = [
  { value: "397+", label: "Audits Managed" },
  { value: "25+", label: "Projects" },
  { value: "5.1M", label: "Safe Man-Hours" },
  { value: "142", label: "Days No LTI" },
]

const liveStats = [
  { value: "5.1M", label: "Safe Man-Hours", trend: "↑ 4.2% MoM", color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-200" },
  { value: "142", label: "Days Without LTI", color: "text-gold", bg: "bg-gold/5", border: "border-gold/20" },
  { value: "87", label: "Near Miss Reports", trend: "↑ 15.2%", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
  { value: "28", label: "Open Findings", trend: "5 Critical", trendColor: "text-red-500", color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
  { value: "3,847", label: "Total Manpower", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  { value: "2,450", label: "Training Hours", trend: "↑ 12.5%", color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
]

const qualityRoles = [
  { role: "Admin", scope: "All regions, all projects", actions: "Create, Assign, Delete, Configure, Override" },
  { role: "Project Head", scope: "Own projects", actions: "Review, Approve, Return, Assign Auditees" },
  { role: "Auditor", scope: "Assigned projects", actions: "Inspect, Record, Photo, Submit Reports" },
  { role: "Auditee", scope: "Own discipline", actions: "Respond, Upload Evidence, Close NC" },
  { role: "Viewer", scope: "As configured", actions: "Read-only dashboards & reports" },
]

const checkpointDecisions = ["✓ Compliance", "✗ NC Major", "⚠ NC Minor", "◆ Observation", "★ OFI"]
const checkpointColors = ["bg-emerald-50 text-emerald-600 border-emerald-200", "bg-red-50 text-red-600 border-red-200", "bg-amber-50 text-amber-600 border-amber-200", "bg-blue-50 text-blue-600 border-blue-200", "bg-purple-50 text-purple-600 border-purple-200"]

const auditLifecycle = [
  { num: "1", title: "Create Audit", desc: "Admin selects project, region, disciplines, assigns auditors", color: "bg-gold/5 border-gold/20" },
  { num: "2", title: "Execute Checkpoints", desc: "Decisions, photos, comments per checkpoint", color: "bg-teal-50 border-teal-200" },
  { num: "3", title: "Review & Approve", desc: "Project Head reviews, approves or returns", color: "bg-blue-50 border-blue-200" },
  { num: "4", title: "Corrective Action", desc: "Auditee uploads evidence, closes NCs", color: "bg-amber-50 border-amber-200" },
  { num: "5", title: "Report & Close", desc: "Auto-generated interim/final PDF reports", color: "bg-emerald-50 border-emerald-200" },
]

const isoClauses = ["4.x Context", "5.x Leadership", "6.x Planning", "7.x Support", "8.x Operation", "9.x Evaluation", "10.x Improvement"]

const observationCategories = [
  { label: "Compliance", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  { label: "Observation", cls: "bg-blue-50 text-blue-600 border-blue-200" },
  { label: "Minor NC", cls: "bg-amber-50 text-amber-600 border-amber-200" },
  { label: "Major NC", cls: "bg-red-50 text-red-600 border-red-200" },
  { label: "Best Practice", cls: "bg-teal-50 text-teal-600 border-teal-200" },
  { label: "Role Model", cls: "bg-gold/10 text-gold border-gold/30" },
]

const capaSteps = [
  { title: "1. Finding Raised", desc: "Auditor records NC with Area of Concern and Recommendation. Linked to specific checkpoint and discipline.", color: "border-l-red-500" },
  { title: "2. Root Cause Analysis", desc: "Team member identifies root cause using 5-Why or Fishbone method. Documentation mandatory.", color: "border-l-amber-500" },
  { title: "3. CAPA Plan", desc: "Target date, responsible person, evidence requirements defined. Linked to NC record.", color: "border-l-blue-500" },
  { title: "4. Implementation", desc: "Team executes correction. Photo/document evidence uploaded. Progress tracked.", color: "border-l-teal-500" },
  { title: "5. Verification & Close", desc: "Auditor verifies closure. Project Head gives final approval. NC status updated across all reports.", color: "border-l-emerald-500" },
]

const misTiers = [
  { icon: Activity, title: "Project MIS", desc: "Safe Man-Hours · Days Without LTI · Open Findings by Severity · Near Miss Reports · Checkpoint Compliance Rate · NC Closure Trend · Audit Completion vs Target", tags: ["Project Heads", "Site Safety Officers"] },
  { icon: Building2, title: "Regional MIS", desc: "Total Manpower · Active Projects · Regional Safety Score · Project Ranking · Region Observation Heatmap · Audit Per Annum (H1/H2) · IFR Trend", tags: ["Regional Heads", "EHS Directors"] },
  { icon: Globe, title: "Corporate MIS", desc: "All 8 KPIs · Cross-Region Benchmarking · Predictive Risk Outlook · Board-Ready Reports · ESG Data Export (GRI, SASB, BRSR) · Monthly/Quarterly Auto-Reports", tags: ["CXOs", "Board Committee", "ESG"] },
]

const incidentTypes = ["First Aid", "Medical Treatment", "LTI", "Fatality", "Property Damage", "Environmental Spill", "Near Miss"]
const incidentColors = ["bg-emerald-50 text-emerald-600 border-emerald-200", "bg-blue-50 text-blue-600 border-blue-200", "bg-amber-50 text-amber-600 border-amber-200", "bg-red-50 text-red-600 border-red-200", "bg-gold/10 text-gold border-gold/30", "bg-teal-50 text-teal-600 border-teal-200", "bg-purple-50 text-purple-600 border-purple-200"]

const dataEntryCapabilities = [
  { label: "Man-Hours", detail: "Daily/weekly logging by project and contractor" },
  { label: "Training Records", detail: "Induction, toolbox talks, specialized hours" },
  { label: "Near Miss", detail: "Anonymous or named, category tagged, location mapped" },
  { label: "PPE Compliance", detail: "Daily headcount + compliance % per zone" },
  { label: "Monthly MIS", detail: "Auto-generated at month-end with approval workflow" },
  { label: "Quarterly Board", detail: "PDF + PPT export with ESG metrics" },
  { label: "Ad-Hoc Reports", detail: "Custom date/region/metric with PDF/Excel export" },
  { label: "Scheduled Delivery", detail: "Email-based, daily/weekly/monthly cadence" },
]

const aiCapabilities = [
  { icon: Brain, title: "Predictive Risk Scoring", desc: "ML models analyze audit history, weather, workforce count, project phase to generate 0–100 Risk Score per zone. Auto-escalation alerts when threshold exceeded.", tags: ["Azure ML", "XGBoost", "0–100 Score"] },
  { icon: Search, title: "NLP Audit Intelligence", desc: "Extracts recurring themes from observation text, auto-categorizes findings, detects systemic issues across 100s of reports. Cross-project pattern detection.", tags: ["Azure OpenAI", "GPT-4", "Embeddings"] },
  { icon: Calendar, title: "Smart Scheduling", desc: "Optimizes audit calendar by risk priority, auditor availability, project milestones, historical NC windows. 30% auditor travel reduction achieved.", tags: ["OR-Tools", "Constraint AI"] },
  { icon: AlertTriangle, title: "Anomaly Detection", desc: "Real-time statistical monitoring: NC rate spikes, reporting gaps, inconsistent man-hours, sudden compliance drops. Instant push alerts to leadership.", tags: ["Isolation Forest", "DBSCAN"] },
  { icon: Camera, title: "Computer Vision PPE", desc: "AI photo analysis detects PPE compliance (helmet, vest, shoes, gloves), housekeeping issues, scaffolding safety from audit photos. Reduces auditor subjectivity.", tags: ["Azure Custom Vision", "YOLO v8"] },
  { icon: Lightbulb, title: "Auto-Generated Insights", desc: "Weekly AI safety briefings: top 5 risks, improving/declining trends, best practice sites, recommended CAPA priorities. Auto-delivered to configured distribution.", tags: ["Azure Functions", "Synapse Analytics"] },
]

const archLayers = [
  { title: "Presentation", desc: "React Web App · PWA · Tablet Kiosk Mode · Responsive UI · Offline capability", color: "border-l-teal-500" },
  { title: "Application", desc: "OutSystems ODC · REST APIs · Visual Workflows · Business Logic Engine · BPT", color: "border-l-gold" },
  { title: "AI & Analytics", desc: "Azure ML · Azure OpenAI · Custom Vision · Anomaly Detection · Synapse Analytics", color: "border-l-purple-500" },
  { title: "Data & Security", desc: "Azure SQL · Blob Storage · Azure AD / SSO / LDAP · API Gateway · TLS 1.3 / AES-256", color: "border-l-blue-500" },
]

const nfrSpecs = [
  { label: "Uptime SLA", value: "99.9% — Geo-redundant Azure" },
  { label: "Page Load", value: "<2 seconds — CDN + query optimization" },
  { label: "Concurrent Users", value: "10,000+ — Auto-scaling" },
  { label: "Data Retention", value: "7 years — Regulatory compliant" },
  { label: "Encryption", value: "TLS 1.3 transit + AES-256 at rest" },
  { label: "Accessibility", value: "WCAG AA — Keyboard + screen reader" },
  { label: "Compliance", value: "SOC 2 Type II · ISO 27001" },
]

const engagementModels = [
  { label: "SaaS", value: "Per-user/month", desc: "VizionForge cloud · 5–50 projects" },
  { label: "Dedicated", value: "Isolated Azure tenant", desc: "Custom branding · 50–200+ projects" },
  { label: "On-Premise", value: "Client infrastructure", desc: "License-based · Air-gapped environments" },
  { label: "Go-Live", value: "4–6 weeks", desc: "Discovery → Deploy → Train → Go-Live" },
]

const deployTimeline = [
  { week: "Week 1–2", desc: "Requirements · Template review · Role mapping · SSO/LDAP · Data migration plan" },
  { week: "Week 3–4", desc: "Azure deploy (India) · ERP/HR integrations · Custom branding · Master data" },
  { week: "Week 5", desc: "Admin training · Auditor workshops · Auditee onboarding · Parallel run" },
  { week: "Week 6", desc: "Production launch · Data migration · 24/7 hypercare 2 weeks" },
  { week: "Week 7–12", desc: "AI model training · Dashboard customization · Advanced analytics" },
]

const impactStats = [
  { value: "60-70%", label: "Faster Audit Cycles", color: "text-gold" },
  { value: "40%", label: "Fewer Incidents", color: "text-teal-500" },
  { value: "₹6-10L", label: "Per Site/Year (from ₹18L)", color: "text-gold" },
  { value: "200+", label: "Man-Hours Saved/Month", color: "text-teal-500" },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SafeOps360Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%]" style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)", background: "linear-gradient(135deg, rgba(212,168,67,0.12) 0%, rgba(30,32,68,0) 70%)" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-teal-500/10 border-teal-400/30 text-teal-300">Production-Proven · Tata Realty</Badge>
              <h1 className="font-display font-black text-white animate-fade-up" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}>
                Safe<em className="text-teal-400 italic">Ops</em>360
              </h1>
              <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-teal-500/10 border border-teal-400/20 px-3 py-1.5 text-xs font-medium text-teal-300">
                ☁️ React PWA + OutSystems ODC + Azure ML + Azure SQL + Synapse Analytics
              </div>
              <p className="mt-5 max-w-[520px] text-base leading-relaxed text-ice/80 animate-fade-up-delay-1">
                Enterprise QHSE platform — Quality Audit, EHS (ISO 45001), MIS Dashboard, and AI-Powered Safety Intelligence. Deployed across 25+ construction and infrastructure projects.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
                <Button asChild size="lg"><Link href="/contact">Schedule Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/contact">Download Brochure</Link></Button>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up-delay-3">
                {metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <span className="font-display text-2xl font-bold text-gold leading-none block">{m.value}</span>
                    <span className="text-ice/50 text-[0.7rem] font-medium mt-1 block">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live MIS Visual */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-5 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ice/40 mb-4">Live MIS — Corporate View</p>
              <div className="grid grid-cols-2 gap-2.5">
                {liveStats.map((s) => (
                  <div key={s.label} className={`rounded-lg ${s.bg} border ${s.border} p-3 text-center`}>
                    <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                    <p className="text-[0.6rem] text-navy/60 font-medium">{s.label}</p>
                    {s.trend && <p className={`text-[0.55rem] font-semibold ${s.trendColor || "text-emerald-500"} mt-0.5`}>{s.trend}</p>}
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-md bg-white/80 border border-navy/10 p-2.5 text-center text-[0.6rem] text-navy/50">
                <span className="font-bold text-navy/70">Stack:</span> React PWA · OutSystems ODC · Azure ML · Azure OpenAI · Custom Vision · YOLO · Azure SQL · Synapse
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gold" />
      </section>

      {/* Tabs */}
      <Tabs defaultValue="quality" className="w-full">
        <div className="sticky top-[68px] z-30 bg-white border-b border-navy/10 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-12 overflow-x-auto">
            <TabsList className="w-max min-w-full sm:min-w-0">
              <TabsTrigger value="quality">Quality Audit</TabsTrigger>
              <TabsTrigger value="ehs">EHS Audit</TabsTrigger>
              <TabsTrigger value="mis">MIS Dashboard</TabsTrigger>
              <TabsTrigger value="ai">AI Engine</TabsTrigger>
              <TabsTrigger value="architecture">Architecture & NFRs</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab 1: Quality Audit */}
        <TabsContent value="quality">
          <SectionWrapper label="Module 1 — Quality Audit" title={<>Checkpoint-Level <em>Audit Management.</em></>}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-navy/60 leading-relaxed mb-5">5 user roles with granular RBAC. 7 discipline types (Structure, MEP, Architecture, Fire & Safety, Quality Docs + custom). Checkpoint-level photo evidence. Interim & final PDF reports with company branding.</p>
                <div className="overflow-x-auto rounded-sm border border-navy/10">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-navy/[0.03]"><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Role</th><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Scope</th><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Key Actions</th></tr></thead>
                    <tbody>
                      {qualityRoles.map((r) => (
                        <tr key={r.role} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 font-medium text-navy text-xs">{r.role}</td>
                          <td className="px-4 py-2.5 text-navy/60 text-xs">{r.scope}</td>
                          <td className="px-4 py-2.5 text-navy/60 text-xs">{r.actions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Checkpoint Decision Types</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {checkpointDecisions.map((d, i) => (
                    <span key={d} className={`rounded-md border px-3 py-1 text-[0.7rem] font-semibold ${checkpointColors[i]}`}>{d}</span>
                  ))}
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Audit Lifecycle</p>
                <div className="space-y-2">
                  {auditLifecycle.map((step) => (
                    <div key={step.num} className={`flex items-center gap-3 rounded-md ${step.color} border p-3`}>
                      <span className="text-xs font-extrabold text-navy/70 w-4">{step.num}.</span>
                      <div>
                        <p className="text-xs font-bold text-navy">{step.title}</p>
                        <p className="text-[0.65rem] text-navy/50">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mt-5 mb-2">Core Data Entities</p>
                <div className="rounded-sm bg-teal-50 border border-teal-200 p-3 text-xs text-navy/70 leading-relaxed">
                  Project → Audits → Checkpoints · Discipline → Activities → IS/ITP codes · Checkpoint → Decision + Photos + Comments · Report → Interim / Final PDF with branding
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 2: EHS Audit */}
        <TabsContent value="ehs">
          <SectionWrapper label="Module 2 — EHS Audit" title={<>ISO 45001 Aligned · <em>CAPA Lifecycle · NC Register.</em></>}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-navy/60 leading-relaxed mb-5">Pre-configured audit areas mapping ISO 45001 Clauses 4.1 through 10.3. Auto-numbered TRIL-series audit request IDs with project/region tagging. Complete NC register with root cause analysis.</p>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">ISO 45001 Clause Coverage</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {isoClauses.map((c) => (
                    <span key={c} className="rounded-md bg-teal-50 border border-teal-200 px-3 py-1 text-[0.7rem] font-semibold text-teal-600">{c}</span>
                  ))}
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Observation Categories</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {observationCategories.map((c) => (
                    <span key={c.label} className={`rounded-md border px-3 py-1 text-[0.7rem] font-semibold ${c.cls}`}>{c.label}</span>
                  ))}
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Compliance Standards</p>
                <div className="rounded-sm bg-gold/5 border border-gold/20 p-4 text-xs text-navy/70 leading-relaxed">
                  <span className="font-bold text-navy">Pre-configured for:</span> ISO 45001 · ISO 9001 · OSHA · Factories Act 1948 · BOCW Act · Checkpoint libraries aligned to all standards. Template cloning per project type (residential, commercial, infra).
                </div>
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">CAPA Lifecycle</p>
                <div className="space-y-2">
                  {capaSteps.map((step) => (
                    <div key={step.title} className={`rounded-sm bg-white border border-navy/8 border-l-[3px] ${step.color} p-3`}>
                      <p className="text-xs font-bold text-navy">{step.title}</p>
                      <p className="text-[0.65rem] text-navy/50 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mt-5 mb-2">Checkpoint Status Flow</p>
                <div className="rounded-sm bg-teal-50 border border-teal-200 p-3 text-xs text-navy/70">
                  Auditor Saved → Auditor Submitted → Team Member Submitted → Project Head Submitted → Closed
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mt-4 mb-2">Admin Capabilities</p>
                <div className="rounded-sm bg-blue-50 border border-blue-200 p-3 text-xs text-navy/70 leading-relaxed">
                  <span className="font-bold text-navy">Master Data:</span> Audit Areas, Checkpoints, Regions, Projects, Users — centrally configurable. <span className="font-bold text-navy">Template Cloning:</span> Clone & customize per project type. <span className="font-bold text-navy">Bulk Ops:</span> Approve All / Reject All for 50+ checkpoints.
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 3: MIS Dashboard */}
        <TabsContent value="mis">
          <SectionWrapper label="Module 3 — MIS Safety Dashboard" title={<>Three-Tier Reporting · <em>8 Real-Time KPIs · ESG Export.</em></>}>
            <div className="grid sm:grid-cols-3 gap-4">
              {misTiers.map((tier) => (
                <Card key={tier.title} className="p-5">
                  <CardHeader className="p-0 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
                      <tier.icon className="h-4.5 w-4.5 text-gold" />
                    </div>
                    <CardTitle className="text-sm">{tier.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-xs leading-relaxed">{tier.desc}</CardDescription>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tier.tags.map((t) => (
                        <span key={t} className="inline-block rounded bg-navy/5 px-2 py-0.5 text-[0.6rem] font-semibold text-navy/60">{t}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-10">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Incident Management</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {incidentTypes.map((t, i) => (
                    <span key={t} className={`rounded-md border px-3 py-1 text-[0.7rem] font-semibold ${incidentColors[i]}`}>{t}</span>
                  ))}
                </div>
                <div className="rounded-sm bg-teal-50 border border-teal-200 p-4 text-xs text-navy/70 leading-relaxed">
                  <span className="font-bold text-navy">Investigation Workflow:</span> Report → Assignment → Root Cause (5-Why, Fishbone) → CAPA → Closure → Verification<br />
                  <span className="font-bold text-navy mt-1 inline-block">Safety Metrics:</span> IFR (Injury Frequency Rate) · ISR (Injury Severity Rate) · DART calculations<br />
                  <span className="font-bold text-navy mt-1 inline-block">Regulatory Filing:</span> Auto-populated forms for OSHA recordkeeping and Factories Act notifications
                </div>
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Data Entry & Automated Reporting</p>
                <div className="overflow-x-auto rounded-sm border border-navy/10">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-navy/[0.03]"><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Capability</th><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Detail</th></tr></thead>
                    <tbody>
                      {dataEntryCapabilities.map((c) => (
                        <tr key={c.label} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 font-medium text-navy text-xs">{c.label}</td>
                          <td className="px-4 py-2.5 text-navy/60 text-xs">{c.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 4: AI Engine */}
        <TabsContent value="ai">
          <SectionWrapper label="Module 4 — AI Engine" title={<>6 AI Capabilities · <em>From Reactive to Predictive Safety.</em></>}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiCapabilities.map((cap) => (
                <Card key={cap.title} className="p-5">
                  <CardHeader className="p-0 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
                      <cap.icon className="h-4.5 w-4.5 text-gold" />
                    </div>
                    <CardTitle className="text-sm">{cap.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-xs leading-relaxed">{cap.desc}</CardDescription>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cap.tags.map((t) => (
                        <span key={t} className="inline-block rounded bg-navy/5 px-2 py-0.5 text-[0.6rem] font-semibold text-navy/60">{t}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-sm bg-gold/5 border border-gold/20 p-5 text-xs text-navy/70 leading-relaxed">
              <span className="font-bold text-navy">Unified Data Lake:</span> All 4 modules feed into Azure SQL + Synapse Analytics — single source of truth for enterprise QHSE intelligence. AI models trained on real audit data from 397+ audits across 25+ projects.
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 5: Architecture & NFRs */}
        <TabsContent value="architecture">
          <SectionWrapper label="Technical Architecture & NFRs" title={<>Enterprise-Grade · <em>Cloud-Native · SOC 2 Compliant.</em></>}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Architecture Layers</p>
                <div className="space-y-2 mb-6">
                  {archLayers.map((layer) => (
                    <div key={layer.title} className={`rounded-sm bg-white border border-navy/8 border-l-[3px] ${layer.color} p-3`}>
                      <p className="text-xs font-bold text-navy">{layer.title}</p>
                      <p className="text-[0.65rem] text-navy/50 mt-0.5">{layer.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Integration Points</p>
                <div className="flex flex-wrap gap-2">
                  {["SAP / Oracle", "Azure AD", "Exchange / Gmail", "SharePoint", "IoT Hub", "OSHA Portal"].map((t, i) => {
                    const colors = ["bg-gold/10 text-gold border-gold/30", "bg-teal-50 text-teal-600 border-teal-200", "bg-blue-50 text-blue-600 border-blue-200", "bg-purple-50 text-purple-600 border-purple-200", "bg-amber-50 text-amber-600 border-amber-200", "bg-red-50 text-red-600 border-red-200"]
                    return <span key={t} className={`rounded-md border px-3 py-1 text-[0.7rem] font-semibold ${colors[i]}`}>{t}</span>
                  })}
                </div>
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Non-Functional Requirements</p>
                <div className="overflow-x-auto rounded-sm border border-navy/10 mb-6">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-navy/[0.03]"><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">NFR</th><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Specification</th></tr></thead>
                    <tbody>
                      {nfrSpecs.map((s) => (
                        <tr key={s.label} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 font-medium text-navy text-xs">{s.label}</td>
                          <td className="px-4 py-2.5 font-semibold text-gold text-xs">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Engagement Models</p>
                <div className="grid grid-cols-2 gap-3">
                  {engagementModels.map((m) => (
                    <div key={m.label} className="rounded-sm bg-navy/[0.02] border border-navy/8 p-3">
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-gold mb-1">{m.label}</p>
                      <p className="text-xs font-semibold text-navy">{m.value}</p>
                      <p className="text-[0.65rem] text-navy/50 mt-0.5">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 6: Deployment */}
        <TabsContent value="deployment">
          <SectionWrapper label="Deployment Timeline" title={<>Rapid Go-Live in <em>4–6 Weeks.</em></>}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
              {deployTimeline.map((step, i) => {
                const colors = ["border-l-gold", "border-l-teal-500", "border-l-blue-500", "border-l-emerald-500", "border-l-purple-500"]
                return (
                  <div key={step.week} className={`rounded-sm bg-white border border-navy/8 border-l-[3px] ${colors[i]} p-4`}>
                    <p className="text-[0.6rem] font-bold uppercase tracking-wider text-gold mb-1">{step.week}</p>
                    <p className="text-[0.7rem] text-navy/60 leading-relaxed">{step.desc}</p>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {impactStats.map((s) => (
                <div key={s.label} className="rounded-sm border border-navy/10 p-5 text-center">
                  <span className={`font-display text-2xl font-bold ${s.color} leading-none block`}>{s.value}</span>
                  <span className="text-navy/50 text-[0.7rem] font-medium mt-2 block">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-navy p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">See SafeOps360 Live</h3>
                <p className="text-xs text-ice/40">397+ audits tracked at Tata Realty. React + OutSystems ODC + Azure ML.</p>
              </div>
              <Button asChild size="sm"><Link href="/contact">Schedule Demo <ArrowRight className="ml-2 h-3.5 w-3.5" /></Link></Button>
            </div>
          </SectionWrapper>
        </TabsContent>
      </Tabs>
    </>
  )
}
