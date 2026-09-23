"use client"

import Link from "next/link"
import {
  ArrowRight,
  UserCheck,
  FileText,
  Zap,
  GitCompare,
  ScrollText,
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
  BookOpen,
  Lock,
  DollarSign,
  Building2,
  Calendar,
  AlertTriangle,
  Bell,
  Landmark,
  CreditCard,
  Database,
  Plug,
  Scale,
  Rocket,
  Settings,
  Activity,
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
  { value: "70%", label: "Reduction TAT" },
  { value: "90%", label: "Paperless" },
  { value: "100%", label: "Audit Trail" },
  { value: "50%", label: "Faster (∥ Review)" },
]

const pipelineStages = [
  { num: "01", title: "Register & CKYC", desc: "OTP + PAN/Aadhaar", color: "bg-amber-50 border-amber-200 text-amber-600" },
  { num: "02", title: "Lead Application", desc: "Intent + Category", color: "bg-teal-50 border-teal-200 text-teal-500" },
  { num: "03", title: "Basic Application", desc: "Borrower+Project Data", color: "bg-blue-50 border-blue-200 text-blue-500" },
  { num: "04", title: "Appraisal", desc: "Eligibility Check", color: "bg-purple-50 border-purple-200 text-purple-500" },
  { num: "05", title: "Detailed + ∥ Review", desc: "Legal + Project", color: "bg-amber-50 border-amber-200 text-amber-500" },
  { num: "06", title: "Sanction Letter", desc: "Auto-Generated", color: "bg-emerald-50 border-emerald-200 text-emerald-500" },
]

const loanCategories = ["Solar", "Wind", "Hybrid", "Thermal", "Transmission", "Hydro", "Non-Capex"]

const losFeatures = [
  { icon: UserCheck, title: "Register & CKYC", desc: "OTP onboarding. CKYC fetch from CKYCR (CERSAI). PAN/Aadhaar verification. Returning user login. Auto-population of name, address, PAN, DOB across application.", tags: ["CKYC API", "14-digit ID", "RBI Mandated"] },
  { icon: FileText, title: "Lead → Basic Application", desc: "Project intent, loan category (Solar/Wind/Hybrid/Thermal/Transmission/Hydro/Misc/Non-Capex), entity type capture. Borrower, project & loan data auto-populated from lead.", tags: ["8 Loan Types", "State/Private"] },
  { icon: Zap, title: "Preliminary Appraisal", desc: "Instant eligibility computation for Solar/Wind/Hybrid (private borrowers). Transaction fee calculation. Auto-populated from application data. Real-time validation.", tags: ["Rules Engine", "Instant Calc"] },
  { icon: GitCompare, title: "Parallel Review (Innovation)", desc: "Legal Team: Title search, security docs review, MOA drafting — simultaneously with — Project Team: Technical appraisal, cost & viability check, environment clearance. 25–30 days → 12–15 days.", tags: ["50% Faster TAT", "Parallel Workflow"] },
  { icon: ScrollText, title: "Auto Sanction Letter", desc: "All fields auto-populated: borrower name, sanctioned amount, loan type, interest rate, tenure, conditions. Digital-signature ready. PDF generation. Committee resolution linkage.", tags: ["Auto-Generation", "Digital Signature"] },
  { icon: CheckCircle2, title: "Maker-Checker at Every Stage", desc: "Creator → Approver dual control at every stage. Full timestamp trail. Email alerts on each step. Client acceptance workflow. RBI audit-ready from Day 1.", tags: ["Dual Control", "RBI Ready"] },
]

const lmsModules = [
  { icon: ClipboardCheck, title: "Proposal Management", desc: "LOS-linked or standalone (Non-LOS) proposals. Amount sought details captured. Structured Creator-Approver approval flow with freeze controls." },
  { icon: CheckCircle2, title: "Sanctions Management", desc: "Sanction details, additional terms, loan closing dates. Multi-stage freeze-submit-approve controls. Linked to LOS application record." },
  { icon: BookOpen, title: "MOA Management", desc: "Memorandum of Association tracking. Document tracking, legal officer assignment, file location management & complete loan document summary." },
  { icon: Lock, title: "Security Stipulation", desc: "Lead FI (Financial Institution) details captured. Security type and terms defined. Creator submits → Approver freezes. Linked to Proposal & Sanction." },
  { icon: ShieldCheck, title: "Security Creation", desc: "Securities registered against stipulation record. Multiple security entries per loan supported. Additional securities tracked separately. Maker-Checker freeze at each entry." },
  { icon: DollarSign, title: "Security Release", desc: "Frozen security records visible in Release tab. Release triggered only after full repayment / conditions. Complete audit trail from creation to release. Linked to Loan Closing lifecycle." },
]

const loanStages = [
  { stage: "Stage 1 — 15%", desc: "Application submitted" },
  { stage: "Stage 2 — 35%", desc: "Appraisal & Sanction" },
  { stage: "Stage 3 — 60%", desc: "MOA & Security" },
  { stage: "Stage 4 — 85%", desc: "Disbursement Ready" },
  { stage: "Stage 5 — 100%", desc: "Active Monitoring" },
]

const financialCovenants = [
  { icon: DollarSign, title: "Financial Covenants", desc: "DSCR (Debt Service Coverage Ratio) · Debt-to-Equity Ratio · Current Ratio maintenance · Minimum Net Worth — all auto-monitored against defined thresholds." },
  { icon: Activity, title: "Operational Covenants", desc: "Project completion milestones · Insurance renewals · Statutory compliance certificates · Utilisation certificates — scheduled monitoring with alerts." },
  { icon: FileText, title: "Reporting Covenants", desc: "Quarterly financials submission · Annual audit reports — auto-scheduled across loan tenure with pre-due and overdue breach alerts to RM, Credit team & management." },
]

const monitoringSteps = [
  { title: "1. Covenant Setup", desc: "Define terms, due dates & thresholds during sanction stage", color: "border-l-gold" },
  { title: "2. Auto-Scheduling", desc: "System schedules milestones across full loan tenure", color: "border-l-teal-500" },
  { title: "3. Data Collection", desc: "Borrower submits documents/financials via portal", color: "border-l-blue-500" },
  { title: "4. Breach Detection", desc: "Automated comparison against defined thresholds", color: "border-l-amber-500" },
  { title: "5. Alert & Escalate", desc: "Email alerts to RM, Credit team & senior management", color: "border-l-red-500" },
]

const alertDashboard = [
  { value: "18", label: "Compliant", color: "text-emerald-500", border: "border-t-emerald-500" },
  { value: "5", label: "Due <30 Days", color: "text-amber-500", border: "border-t-amber-500" },
  { value: "2", label: "Overdue", color: "text-red-500", border: "border-t-red-500" },
  { value: "1", label: "Waived", color: "text-navy/40", border: "border-t-navy/20" },
]

const ckycFlow = [
  { title: "1. Borrower Registers", desc: "Provides PAN / Aadhaar during onboarding via OTP", color: "border-l-gold" },
  { title: "2. CKYC Number Input", desc: "Existing CKYC ID entered or system initiates registry fetch", color: "border-l-teal-500" },
  { title: "3. Registry API Call", desc: "Platform queries CKYCR (CERSAI) for verified KYC data", color: "border-l-blue-500" },
  { title: "4. Auto-Population", desc: "Name, address, PAN, DOB auto-filled across all application forms", color: "border-l-purple-500" },
  { title: "5. Compliance Logged", desc: "KYC status & date stored for RBI audit trail. Immutable.", color: "border-l-emerald-500" },
]

const ckycStats = [
  { value: "Zero", label: "Duplicate KYC Entry", color: "text-gold" },
  { value: "100%", label: "RBI CKYC Compliance", color: "text-teal-500" },
  { value: "Auto", label: "KYC Data Population", color: "text-gold" },
  { value: "Faster", label: "Borrower Onboarding", color: "text-teal-500" },
]

const techFeatures = [
  { icon: Zap, title: "OutSystems ODC Platform", desc: "Visual development environment · Built-in CI/CD & one-click deploy · Cloud & on-premise deployment · Rapid feature configuration · Multi-tenant architecture", tags: ["OutSystems ODC", "Cloud-Native", "Low-Code"] },
  { icon: Lock, title: "Security & Compliance", desc: "Role-based access control · Complete audit trails & timestamps · Data encryption at rest & transit · RBI & CERSAI-aligned controls · Maker-Checker governance", tags: ["RBAC", "AES-256", "TLS 1.3"] },
  { icon: Plug, title: "Integration Ready", desc: "REST/SOAP API support · Core Banking integration (Finacle, Temenos, FinnOne) · Credit Bureau & CKYC connectors · Email & notification systems", tags: ["REST", "SOAP", "OData"] },
  { icon: Database, title: "Scalability", desc: "Multi-borrower architecture · High-volume loan portfolios · 99.9% uptime SLA target · Auto-scaling infrastructure · Elastic compute", tags: ["99.9% SLA", "Auto-Scale"] },
]

const bfsiApplicability = [
  { icon: Landmark, title: "Public Sector Banks", names: "SBI, Bank of Baroda, PNB, Canara Bank", desc: "Project finance origination, sanctions & covenant tracking for large-ticket corporate and infrastructure loans.", color: "border-t-gold" },
  { icon: Building2, title: "NBFCs & HFCs", names: "HDFC, Bajaj Finance, Shriram Finance", desc: "Infrastructure lending, renewable energy financing and structured credit origination.", color: "border-t-teal-500" },
  { icon: Scale, title: "Development Finance", names: "PFC, REC, NaBFID, SIDBI", desc: "Capital-intensive project loans with complex sanction conditions and multi-party securities.", color: "border-t-purple-500" },
  { icon: CreditCard, title: "Private Banks", names: "ICICI, Kotak, Axis, Yes Bank", desc: "SME and project lending pipelines with full LOS-LMS integration and CKYC compliance.", color: "border-t-blue-500" },
]

const deploymentPhases = [
  { label: "Phase 1 (Wk 1–6)", value: "Foundation", desc: "Requirements, infra, OutSystems env, master config" },
  { label: "Phase 2 (Wk 7–14)", value: "LOS Go-Live", desc: "Onboarding, CKYC, application flows, UAT" },
  { label: "Phase 3 (Wk 15–20)", value: "LMS Go-Live", desc: "Sanctions, MOA, securities, covenant, production" },
  { label: "Phase 4 (Ongoing)", value: "Optimize", desc: "Analytics, integrations, feature expansion, SLA" },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LosLmsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%]" style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)", background: "linear-gradient(135deg, rgba(212,168,67,0.12) 0%, rgba(30,32,68,0) 70%)" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-gold/10 border-gold/30 text-gold-light">Built on OutSystems ODC</Badge>
              <h1 className="font-display font-black text-white animate-fade-up" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1 }}>
                Integrated Loan <em className="text-gold italic">Origination</em> & <em className="text-teal-400 italic">Management</em>
              </h1>
              <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-gold/10 border border-gold/20 px-3 py-1.5 text-xs font-medium text-gold-light">
                ⚡ OutSystems ODC · REST/SOAP APIs · CKYC Registry · Azure Cloud · CI/CD
              </div>
              <p className="mt-5 max-w-[520px] text-base leading-relaxed text-ice/80 animate-fade-up-delay-1">
                End-to-end digital lending platform for capital finance. LOS + LMS in one system — from CKYC onboarding through origination, parallel review, sanctions, securities and covenant monitoring. India-ready architecture.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
                <Button asChild size="lg"><Link href="/contact">Schedule Live Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/contact">30-Day POC</Link></Button>
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

            {/* Pipeline Visual */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-5 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ice/40 mb-4">6-Stage Origination Pipeline</p>
              <div className="grid grid-cols-3 gap-2">
                {pipelineStages.map((s) => (
                  <div key={s.num} className={`rounded-md ${s.color} border p-2.5 text-center`}>
                    <p className="text-lg font-extrabold">{s.num}</p>
                    <p className="text-[0.6rem] font-bold text-navy">{s.title}</p>
                    <p className="text-[0.5rem] text-navy/40">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {loanCategories.map((c) => (
                  <span key={c} className="rounded-md bg-gold/10 border border-gold/30 px-2.5 py-0.5 text-[0.6rem] font-semibold text-gold">{c}</span>
                ))}
              </div>
              <div className="mt-3 rounded-md bg-white/80 border border-navy/10 p-2.5 text-center text-[0.6rem] text-navy/50">
                <span className="font-bold text-navy/70">Platform:</span> OutSystems ODC · Visual Dev · Built-in CI/CD · One-click deploy · Cloud & On-Prem · REST/SOAP APIs
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gold" />
      </section>

      {/* Tabs */}
      <Tabs defaultValue="los" className="w-full">
        <div className="sticky top-[68px] z-30 bg-white border-b border-navy/10 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-12 overflow-x-auto">
            <TabsList className="w-max min-w-full sm:min-w-0">
              <TabsTrigger value="los">Origination (LOS)</TabsTrigger>
              <TabsTrigger value="lms">Management (LMS)</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="covenant">Covenant Monitoring</TabsTrigger>
              <TabsTrigger value="ckyc">CKYC & Compliance</TabsTrigger>
              <TabsTrigger value="tech">Technology & Applicability</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab 1: LOS */}
        <TabsContent value="los">
          <SectionWrapper label="LOS Module" title={<>Complete Borrower Journey — <em>6 Stages.</em></>}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {losFeatures.map((f) => (
                <Card key={f.title} className="p-5">
                  <CardHeader className="p-0 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
                      <f.icon className="h-4.5 w-4.5 text-gold" />
                    </div>
                    <CardTitle className="text-sm">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-xs leading-relaxed">{f.desc}</CardDescription>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {f.tags.map((t) => (
                        <span key={t} className="inline-block rounded bg-navy/5 px-2 py-0.5 text-[0.6rem] font-semibold text-navy/60">{t}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 2: LMS */}
        <TabsContent value="lms">
          <SectionWrapper label="LMS Module" title={<>Post-Sanction Control Tower — <em>6 Sub-Modules.</em></>}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lmsModules.map((m) => (
                <Card key={m.title} className="p-5">
                  <CardHeader className="p-0 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
                      <m.icon className="h-4.5 w-4.5 text-gold" />
                    </div>
                    <CardTitle className="text-sm">{m.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-xs leading-relaxed">{m.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-sm bg-gold/5 border border-gold/20 p-5 text-xs text-navy/70 leading-relaxed">
              <span className="font-bold text-navy">Full collateral lifecycle:</span> Stipulation → Creation → Release · Multi-entry per loan · Linked to MOA & Sanctions · Zero manual reconciliation · Complete audit trail from first stipulation to final release.
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 3: Governance */}
        <TabsContent value="governance">
          <SectionWrapper label="Governance Framework" title={<>Maker-Checker Controls & <em>Loan Staging.</em></>}>
            {/* Maker-Checker Flow */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
              {[
                { title: "MAKER", desc: "Creator fills & saves\nDraft → Submitted", bg: "bg-teal-50 border-teal-200 text-teal-600" },
                { title: "CHECKER", desc: "Approver reviews & freezes\nSubmitted → Frozen", bg: "bg-amber-50 border-amber-200 text-amber-600" },
                { title: "SYSTEM", desc: "Timestamp & audit logged\nFrozen → Locked", bg: "bg-emerald-50 border-emerald-200 text-emerald-600" },
              ].map((step, i) => (
                <div key={step.title} className="flex items-center gap-3 w-full sm:w-auto">
                  <div className={`flex-1 sm:flex-initial rounded-lg ${step.bg} border p-5 text-center min-w-[160px]`}>
                    <p className="text-sm font-bold">{step.title}</p>
                    <p className="text-[0.65rem] text-navy/50 mt-1 whitespace-pre-line">{step.desc}</p>
                  </div>
                  {i < 2 && <span className="text-navy/20 text-xl font-bold hidden sm:block">→</span>}
                </div>
              ))}
            </div>

            <div className="rounded-sm bg-teal-50 border border-teal-200 p-4 text-xs text-navy/70 leading-relaxed mb-10">
              <span className="font-bold text-navy">Every record requires Creator → Approver dual control.</span> Full timestamp trail for every action — RBI audit-ready. Freeze prevents unauthorised edits post-approval. Applied to: Applications, Sanctions, MOA, Securities, Covenants.
            </div>

            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-4">Loan Staging — 5-Stage Lifecycle</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {loanStages.map((s, i) => {
                const colors = ["border-l-gold", "border-l-teal-500", "border-l-blue-500", "border-l-amber-500", "border-l-emerald-500"]
                return (
                  <div key={s.stage} className={`rounded-sm bg-white border border-navy/8 border-l-[3px] ${colors[i]} p-3`}>
                    <p className="text-[0.65rem] font-bold text-navy">{s.stage}</p>
                    <p className="text-[0.6rem] text-navy/50 mt-0.5">{s.desc}</p>
                  </div>
                )
              })}
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 4: Covenant Monitoring */}
        <TabsContent value="covenant">
          <SectionWrapper label="Covenant Monitoring" title={<>Proactive <em>Portfolio Governance.</em></>}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {financialCovenants.map((c) => (
                  <Card key={c.title} className="p-5">
                    <CardHeader className="p-0 pb-2">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
                        <c.icon className="h-4.5 w-4.5 text-gold" />
                      </div>
                      <CardTitle className="text-sm">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-xs leading-relaxed">{c.desc}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Monitoring Lifecycle</p>
                <div className="space-y-2 mb-6">
                  {monitoringSteps.map((step) => (
                    <div key={step.title} className={`rounded-sm bg-white border border-navy/8 border-l-[3px] ${step.color} p-3`}>
                      <p className="text-xs font-bold text-navy">{step.title}</p>
                      <p className="text-[0.65rem] text-navy/50 mt-0.5">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Alert Dashboard</p>
                <div className="grid grid-cols-2 gap-3">
                  {alertDashboard.map((a) => (
                    <div key={a.label} className={`rounded-sm border border-navy/10 ${a.border} border-t-[3px] p-4 text-center`}>
                      <span className={`font-display text-2xl font-bold ${a.color} leading-none block`}>{a.value}</span>
                      <span className="text-navy/50 text-[0.7rem] font-medium mt-1 block">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 5: CKYC & Compliance */}
        <TabsContent value="ckyc">
          <SectionWrapper label="CKYC Integration & Regulatory Compliance" title={<>Centralised KYC for BFSI — <em>RBI & SEBI Mandated.</em></>}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-navy/60 leading-relaxed mb-5">
                  Central KYC Registry (CKYCR) mandated by RBI and SEBI for all regulated financial entities in India. Enables a single, verified KYC record shared across all BFSI institutions — eliminating repeated submissions.
                </p>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">CKYC Flow in Platform</p>
                <div className="space-y-2">
                  {ckycFlow.map((step) => (
                    <div key={step.title} className={`rounded-sm bg-white border border-navy/8 border-l-[3px] ${step.color} p-3`}>
                      <p className="text-xs font-bold text-navy">{step.title}</p>
                      <p className="text-[0.65rem] text-navy/50 mt-0.5">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {ckycStats.map((s) => (
                    <div key={s.label} className="rounded-sm border border-navy/10 p-4 text-center">
                      <span className={`font-display text-xl font-bold ${s.color} leading-none block`}>{s.value}</span>
                      <span className="text-navy/50 text-[0.65rem] font-medium mt-1 block">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {["CERSAI → Registry Authority", "14-Digit CKYC Number", "RBI Mandated", "SEBI Aligned"].map((t, i) => {
                    const colors = ["bg-gold/10 text-gold border-gold/30", "bg-teal-50 text-teal-600 border-teal-200", "bg-blue-50 text-blue-600 border-blue-200", "bg-purple-50 text-purple-600 border-purple-200"]
                    return <span key={t} className={`rounded-md border px-3 py-1 text-[0.7rem] font-semibold ${colors[i]}`}>{t}</span>
                  })}
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Regulatory Framework</p>
                <div className="rounded-sm bg-gold/5 border border-gold/20 p-4 text-xs text-navy/70 leading-relaxed">
                  <span className="font-bold text-navy">Built for:</span> RBI norms · PFC-style lending structures · CKYC registry integration · Maker-Checker (RBI circular) · Complete timestamp audit trails · Digital signature readiness · Parallel review workflows reducing TAT below regulatory benchmarks
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 6: Technology & Applicability */}
        <TabsContent value="tech">
          <SectionWrapper label="Technology Platform & Applicability" title={<>Built on OutSystems — <em>Enterprise-Grade Low-Code.</em></>}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {techFeatures.map((f) => (
                  <Card key={f.title} className="p-5">
                    <CardHeader className="p-0 pb-2">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
                        <f.icon className="h-4.5 w-4.5 text-gold" />
                      </div>
                      <CardTitle className="text-sm">{f.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-xs leading-relaxed">{f.desc}</CardDescription>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {f.tags.map((t) => (
                          <span key={t} className="inline-block rounded bg-navy/5 px-2 py-0.5 text-[0.6rem] font-semibold text-navy/60">{t}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">BFSI Applicability</p>
                <div className="space-y-3 mb-6">
                  {bfsiApplicability.map((b) => (
                    <div key={b.title} className={`rounded-sm bg-white border border-navy/10 ${b.color} border-t-[3px] p-4`}>
                      <div className="flex items-center gap-2 mb-1">
                        <b.icon className="h-4 w-4 text-gold" />
                        <p className="text-sm font-bold text-navy">{b.title}</p>
                      </div>
                      <p className="text-[0.65rem] font-semibold text-gold mb-1">{b.names}</p>
                      <p className="text-[0.65rem] text-navy/50 leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Deployment Timeline</p>
                <div className="grid grid-cols-2 gap-3">
                  {deploymentPhases.map((p) => (
                    <div key={p.label} className="rounded-sm bg-navy/[0.02] border border-navy/8 p-3">
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-gold mb-1">{p.label}</p>
                      <p className="text-xs font-semibold text-navy">{p.value}</p>
                      <p className="text-[0.65rem] text-navy/50 mt-0.5">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-navy p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Ready to Transform Lending Operations?</h3>
                <p className="text-xs text-ice/40">OutSystems ODC · India-ready architecture · 30-day POC available.</p>
              </div>
              <Button asChild size="sm"><Link href="/contact">Schedule Live Demo <ArrowRight className="ml-2 h-3.5 w-3.5" /></Link></Button>
            </div>
          </SectionWrapper>
        </TabsContent>
      </Tabs>
    </>
  )
}
