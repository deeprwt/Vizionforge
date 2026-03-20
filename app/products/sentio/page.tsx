"use client"

import Link from "next/link"
import {
  ArrowRight,
  FileText,
  Eye,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  Pause,
  Pencil,
  BookOpen,
  Plug,
  Radio,
  Cpu,
  Layers,
  GitCompare,
  Workflow,
  Database,
  Globe,
  Rocket,
  Target,
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
  { value: "<60m", label: "Signal→Alert" },
  { value: "3", label: "Human Gates" },
  { value: "3", label: "Deploy Models" },
  { value: "6", label: "Stage Workflow" },
]

const layers = [
  { num: "01", label: "AUTHOR", title: "React Bowtie Builder", desc: "Role-based authoring · 6-stage workflow: Draft → Safety Assessment → Compliance Review → Incident Investigation → Final Risk Review → Released · Every change versioned and signed", bg: "bg-gold/5", border: "border-gold/20", labelColor: "text-gold" },
  { num: "02", label: "WATCH", title: "Sentio Agent — Signal Intelligence", desc: "Signal Adapter → Bowtie Config Engine → Threshold Engine → Barrier Health Score (100 − signals − CAPA overdue − recurrence) → Escalation Flow · Pre-alerts <60 min", bg: "bg-red-50", border: "border-red-200", labelColor: "text-red-500" },
  { num: "03", label: "REVIEW", title: "GRC Layer — Board & Compliance", desc: "Live KRI dashboards · BRSR-ready audit trails · CAPA tracking · Board reporting auto-generated from live data", bg: "bg-teal-50", border: "border-teal-200", labelColor: "text-teal-500" },
]

const problemCards = [
  { icon: FileText, title: "Built Once", desc: "Created in workshops, stored in BowTieXP or PDFs, reviewed annually. They reflect the world as it was — not as it is. No real-time signal ingestion." },
  { icon: Eye, title: "Watched Manually", desc: "A Compliance Officer opens a form, selects 'At Risk' from a dropdown, types a comment. Every barrier status update is a human manually noticing something." },
  { icon: Clock, title: "Acted On Too Late", desc: "By the time a pattern of near-misses is visible in the quarterly review, the incident has already happened — or the threshold has been silently breached for weeks." },
]

const todayVsSentio = [
  { today: "Manual dropdown selection", sentio: "Signal-driven status update" },
  { today: "Quarterly review cadence", sentio: "<60 minute pre-alerts" },
  { today: "No cross-site patterns", sentio: "Multi-site pattern detection" },
  { today: "No audit trail of decisions", sentio: "Every gate decision timestamped" },
  { today: "Static Bowtie diagrams", sentio: "Live, signal-driven Bowtie" },
]

const gates = [
  {
    num: "GATE 1", role: "SAFETY OFFICER", title: "Signal Validation", color: "border-t-gold", labelColor: "text-gold",
    desc: "Trigger: Sentio threshold engine fires on a barrier. Officer reviews signal evidence and chooses action. Not every threshold breach is a real failure. A permit violation on day one may be a data entry error. The human decides. The log captures the decision — permanently.",
    actions: [
      { label: "Confirm → AT RISK", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
      { label: "Suppress → Reason required", cls: "bg-amber-50 text-amber-600 border-amber-200" },
      { label: "Defer 24h → Re-evaluate", cls: "bg-blue-50 text-blue-600 border-blue-200" },
    ],
  },
  {
    num: "GATE 2", role: "SAFETY MANAGER", title: "Escalation Approval", color: "border-t-amber-500", labelColor: "text-amber-500",
    desc: "Trigger: Barrier health degrades to escalation threshold. Manager reviews full evidence chain before escalation reaches CRO. Automatic escalations that turn out to be false alarms destroy trust within two weeks. This gate prevents that.",
    actions: [
      { label: "Approve → Fire alert", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
      { label: "Edit → Modify message", cls: "bg-gold/10 text-gold border-gold/30" },
      { label: "Reject → Log reason", cls: "bg-red-50 text-red-600 border-red-200" },
    ],
  },
  {
    num: "GATE 3", role: "RISK MANAGER", title: "Config Change Approval", color: "border-t-purple-500", labelColor: "text-purple-500",
    desc: "Trigger: Sentio suggests a new barrier or threat pattern based on signal analysis. Risk Manager authors change in React layer — version increments. Sentio never writes to the Bowtie configuration unilaterally. It reads. Humans write. Every structural change is versioned, dated, and owned.",
    actions: [
      { label: "Author change", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
      { label: "Accept as-is", cls: "bg-blue-50 text-blue-600 border-blue-200" },
      { label: "Reject → Logged", cls: "bg-red-50 text-red-600 border-red-200" },
    ],
  },
]

const feedPhases = [
  {
    phase: "DAY 1", label: "LIVE FROM DEPLOYMENT", title: "SafeOps360 + Manual", color: "border-t-emerald-500", labelColor: "text-emerald-500",
    desc: "SafeOps360 Field Audits: Permit records, inspection findings, near-miss reports via mobile interface. Manual/Portal Upload: Excel, CSV, structured forms — no integration work needed. Author Layer Events: Every compliance workflow status change is itself a signal.",
  },
  {
    phase: "MONTH 2", label: "INTEGRATION SPRINT", title: "SAP EHS + BowTieXP + HR", color: "border-t-blue-500", labelColor: "text-blue-500",
    desc: "SAP EHS (OData/REST): Incident records, permit-to-work, maintenance orders, contractor compliance. BowTieXP XML Import: Existing barrier structures imported without rebuilding. HR/Training Systems: Training completion, certification expiry, contractor onboarding.",
  },
  {
    phase: "PHASE 2", label: "INTELLIGENCE DEPTH", title: "IoT + Cority + AI NLU", color: "border-t-purple-500", labelColor: "text-purple-500",
    desc: "Cority/Maximo: Sentio sits above specialist EHS platforms — intelligence layer, not replacement. IoT/Sensor Feeds: Gas detectors, access control, vibration sensors. Edge aggregation layer. AI Mentor/NLU: WhatsApp messages, field voice notes — typed signal records.",
  },
]

const deployModels = [
  {
    label: "MODEL A", sublabel: "SERVICENOW-NATIVE", title: "Now Experience", color: "text-teal-500",
    desc: "Now Experience React UI — live Bowtie visualisation · Flow Designer — human gate escalation workflows · Performance Analytics — live KRI dashboards · Agent Mobile — offline field capture · Integration Hub — SAP EHS, Cority, Maximo",
    ideal: "Enterprises already on ServiceNow Platform. GRC integration zero-lag. Store distribution ready.",
    infoBg: "bg-teal-50 border-teal-200",
  },
  {
    label: "MODEL B", sublabel: "OUTSYSTEMS-NATIVE", title: "ODC Cloud", color: "text-gold",
    desc: "Reactive Web — live Bowtie with real-time data binding · BPT Business Process Technology — visual escalation flows · Timer Actions — scheduled threshold evaluation · Experience Builder — iOS + Android · REST Integration Studio — adapters",
    ideal: "Enterprises already on OutSystems. ODC cloud-native. Forge components accelerate build.",
    infoBg: "bg-gold/5 border-gold/20",
  },
  {
    label: "MODEL C", sublabel: "FULL-STACK", title: "React + Node.js + PostgreSQL", color: "text-purple-500",
    desc: "React authoring layer (working today) — no platform dependency · Node.js + PostgreSQL backend — fully self-contained · REST API — open for any integration · Docker/Kubernetes — any cloud or on-premise · Sentio Agent as independent microservice",
    ideal: "No ServiceNow/OutSystems. VizionForge-managed deployment. Fastest to first demo.",
    infoBg: "bg-blue-50 border-blue-200",
  },
]

const competitiveTable = [
  { capability: "Bowtie authoring & versioning", bowtie: "✓ Core", sap: "Limited", cority: "Limited", sentinel: "✓", sentio: "✓ Full authoring layer" },
  { capability: "Live barrier health monitoring", bowtie: "Static only", sap: "No", cority: "No", sentinel: "Partial", sentio: "✓ Sentio Agent" },
  { capability: "Signal feeds from operations", bowtie: "No", sap: "Operational", cority: "Compliance", sentinel: "Partial", sentio: "✓ Any source" },
  { capability: "Human-in-the-loop gates", bowtie: "No", sap: "No", cority: "No", sentinel: "No", sentio: "✓ 3 gates" },
  { capability: "Workflow (multi-role approval)", bowtie: "No", sap: "Limited", cority: "Limited", sentinel: "Partial", sentio: "✓ 6-stage workflow" },
  { capability: "IoT / real-time feeds", bowtie: "No", sap: "No", cority: "No", sentinel: "No", sentio: "✓ Phase 2" },
  { capability: "BRSR-ready audit trail", bowtie: "No", sap: "No", cority: "Partial", sentinel: "No", sentio: "✓ Auto-generated" },
  { capability: "Platform-agnostic deployment", bowtie: "No", sap: "No", cority: "No", sentinel: "No", sentio: "✓ 3 models" },
  { capability: "Open feed architecture", bowtie: "No", sap: "No", cority: "No", sentinel: "No", sentio: "✓ REST adapters" },
]

const pricingTiers = [
  { name: "SENTIO BUILD", price: "₹8–12L/yr", per: "per entity", features: ["Full React authoring layer", "Unlimited Bowtie diagrams", "All 6 workflow stages + 4 roles", "Export XLS + PDF", "Version control + audit log", "No integration required — works Day 1"], featured: false },
  { name: "SENTIO WATCH", price: "₹18–28L/yr", per: "per entity", features: ["Everything in Build", "Sentio Agent — continuous watch", "Signal adapter (Day 1 sources)", "Threshold engine + barrier health", "3 human-in-the-loop gates", "Pre-alert delivery <60 min"], featured: true },
  { name: "SENTIO ENTERPRISE", price: "₹35–60L/yr", per: "per entity", features: ["Everything in Watch", "SAP EHS / BowTieXP integration", "IoT / sensor feed adapters", "GRC + BRSR auto-reporting", "Multi-site, multi-entity", "Priority support + CSM"], featured: false },
]

const roadmapPhases = [
  { label: "Phase 0 (Wk 1–4)", desc: "Data model · Deploy Author · Onboard Risk Manager · Baseline" },
  { label: "Phase 1 (Wk 5–12)", desc: "First live signals · Threshold engine · All 3 gates · First pre-alert" },
  { label: "Phase 2 (Wk 13–18)", desc: "SAP EHS adapter · Multi-site · GRC module · BRSR indicators" },
  { label: "Phase 3 (Wk 19–24)", desc: "Load test 50K signals/day · Security audit · Pen test · Hardening" },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SentioPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%]" style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)", background: "linear-gradient(135deg, rgba(212,168,67,0.12) 0%, rgba(30,32,68,0) 70%)" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-red-500/10 border-red-400/30 text-red-300">Living Bowtie Platform</Badge>
              <h1 className="font-display font-black text-gold animate-fade-up" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}>
                SENTIO
              </h1>
              <p className="text-base text-ice/50 italic mt-1 mb-3">The Living Bowtie Platform</p>
              <div className="inline-flex items-center gap-2 rounded-md bg-red-500/10 border border-red-400/20 px-3 py-1.5 text-xs font-medium text-red-300">
                🤖 ServiceNow Now Assist · React Bowtie Builder · Node.js + PostgreSQL · Docker/K8s
              </div>
              <p className="mt-5 max-w-[520px] text-base leading-relaxed text-ice/80 animate-fade-up-delay-1">
                Turns static Bowtie risk frameworks into continuously watched, human-gated operating instruments. Three layers — Author, Watch, Review. Three deployment models — ServiceNow, OutSystems, Full-Stack.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
                <Button asChild size="lg"><Link href="/contact">Book 30-Min Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/contact">6-Week Pilot</Link></Button>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up-delay-3">
                {metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <span className="font-display text-2xl font-bold text-red-400 leading-none block">{m.value}</span>
                    <span className="text-ice/50 text-[0.7rem] font-medium mt-1 block">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Three Layers Visual */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-5 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ice/40 mb-4">Three Layers — One Instrument</p>
              <div className="space-y-3">
                {layers.map((l) => (
                  <div key={l.num} className={`rounded-lg ${l.bg} border ${l.border} p-3.5`}>
                    <p className={`text-[0.55rem] font-bold tracking-[0.12em] ${l.labelColor}`}>{l.num} — {l.label}</p>
                    <p className="text-sm font-bold text-navy mt-1">{l.title}</p>
                    <p className="text-[0.65rem] text-navy/50 mt-0.5 leading-relaxed">{l.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-md bg-white/80 border border-navy/10 p-2.5 text-center text-[0.6rem] text-navy/50">
                <span className="font-bold text-navy/70">Deploy:</span> ServiceNow-native (Now Experience) · OutSystems-native (ODC) · Full-Stack (React + Node.js + PostgreSQL + Docker)
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gold" />
      </section>

      {/* Tabs */}
      <Tabs defaultValue="problem" className="w-full">
        <div className="sticky top-[68px] z-30 bg-white border-b border-navy/10 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-12 overflow-x-auto">
            <TabsList className="w-max min-w-full sm:min-w-0">
              <TabsTrigger value="problem">The Problem</TabsTrigger>
              <TabsTrigger value="gates">Human Gates</TabsTrigger>
              <TabsTrigger value="feeds">Feed Ecosystem</TabsTrigger>
              <TabsTrigger value="deploy">Deployment Models</TabsTrigger>
              <TabsTrigger value="competitive">Competitive</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Roadmap</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab 1: Problem */}
        <TabsContent value="problem">
          <SectionWrapper label="The Gap" title={<>The Bowtie Is the Gold Standard. <em>It Doesn&apos;t Know What&apos;s Happening Right Now.</em></>}>
            <div className="grid sm:grid-cols-3 gap-4">
              {problemCards.map((c) => (
                <Card key={c.title} className="p-5">
                  <CardHeader className="p-0 pb-3">
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

            <div className="mt-8 rounded-sm bg-gold/5 border border-gold/20 p-5 text-sm text-navy/70 leading-relaxed">
              <span className="font-bold text-navy">The gap is not in the methodology.</span> The gap is between what&apos;s on paper and what&apos;s happening on site — right now. Sentio closes this gap with continuous signal intelligence and human-gated decision making.
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-10">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Today vs Sentio</p>
                <div className="overflow-x-auto rounded-sm border border-navy/10">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-navy/[0.03]"><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Today</th><th className="text-left px-4 py-2.5 font-semibold text-gold text-xs">With Sentio</th></tr></thead>
                    <tbody>
                      {todayVsSentio.map((r) => (
                        <tr key={r.today} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 text-navy/50 text-xs">{r.today}</td>
                          <td className="px-4 py-2.5 font-semibold text-gold text-xs">{r.sentio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Author Layer — Working Today</p>
                <div className="rounded-sm bg-teal-50 border border-teal-200 p-4 text-xs text-navy/70 leading-relaxed">
                  <span className="font-bold text-navy">Built. Deployed. Working in production.</span><br /><br />
                  <span className="font-bold text-navy">4 User Roles:</span> Risk Manager · Safety Officer · Compliance Officer · Incident Investigator<br /><br />
                  <span className="font-bold text-navy">6 Workflow Stages:</span> Draft → Safety Assessment → Compliance Review → Incident Investigation → Final Risk Review → Released<br /><br />
                  <span className="font-bold text-navy">Features:</span> Bowtie canvas editor · Barrier assessment table (status + comments per barrier) · Export XLS + PDF · Version control · Every status selection, comment, and version increment time-stamped and signed. This is your BRSR safety evidence chain — built as a side-effect of daily operations.
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 2: Human Gates */}
        <TabsContent value="gates">
          <SectionWrapper label="Human-In-The-Loop" title={<>Sentio Doesn&apos;t Replace Judgment. <em>It Gives Your Team Something to Judge.</em></>}>
            <div className="grid sm:grid-cols-3 gap-4">
              {gates.map((gate) => (
                <Card key={gate.num} className={`p-5 border-t-[3px] ${gate.color}`}>
                  <CardHeader className="p-0 pb-3">
                    <p className={`text-[0.55rem] font-bold tracking-[0.12em] ${gate.labelColor} mb-1`}>{gate.num} — {gate.role}</p>
                    <CardTitle className="text-sm">{gate.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-xs leading-relaxed mb-3">{gate.desc}</CardDescription>
                    <div className="flex flex-wrap gap-1.5">
                      {gate.actions.map((a) => (
                        <span key={a.label} className={`rounded-md border px-2.5 py-1 text-[0.65rem] font-semibold ${a.cls}`}>{a.label}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-sm bg-gold/5 border border-gold/20 p-5 text-xs text-navy/70 leading-relaxed">
              <span className="font-bold text-navy">Every gate decision is time-stamped, attributed, and stored.</span> The audit trail IS the system — not a report generated from it. This is your BRSR evidence chain built as a side-effect of operations.
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 3: Feed Ecosystem */}
        <TabsContent value="feeds">
          <SectionWrapper
            label="Feed Ecosystem"
            title={<>Any System That Generates Safety Data <em>Can Feed Sentio.</em></>}
            subtitle="Start with Day 1 feeds. Add integrations as your roadmap matures. Every feed makes the Bowtie smarter — none are required to start."
          >
            <div className="grid sm:grid-cols-3 gap-4">
              {feedPhases.map((f) => (
                <Card key={f.phase} className={`p-5 border-t-[3px] ${f.color}`}>
                  <CardHeader className="p-0 pb-3">
                    <p className={`text-[0.55rem] font-bold tracking-[0.12em] ${f.labelColor} mb-1`}>{f.phase} — {f.label}</p>
                    <CardTitle className="text-sm">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-xs leading-relaxed">{f.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Sentio Agent Architecture</p>
              <div className="rounded-sm bg-teal-50 border border-teal-200 p-4 text-xs text-navy/70 leading-relaxed">
                <span className="font-bold text-navy">Signal Adapter</span> (normalises feeds into typed signal records) → <span className="font-bold text-navy">Bowtie Config Engine</span> (maps signals to threats, barriers, consequences) → <span className="font-bold text-navy">Threshold Engine</span> (evaluates breach conditions per barrier) → <span className="font-bold text-navy">Barrier Health Score</span> (100 − weighted signals − CAPA overdue − recurrence) → <span className="font-bold text-navy">Escalation Flow</span> (routes alerts with full evidence chain)
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 4: Deployment Models */}
        <TabsContent value="deploy">
          <SectionWrapper label="Three Deployment Models" title={<>Same Product. Same Intelligence. <em>Same Human Gates. Different Runtime.</em></>}>
            <div className="grid sm:grid-cols-3 gap-4">
              {deployModels.map((m) => (
                <Card key={m.label} className="p-5">
                  <CardHeader className="p-0 pb-3">
                    <p className={`text-[0.55rem] font-bold tracking-[0.12em] ${m.color} mb-1`}>{m.label} — {m.sublabel}</p>
                    <CardTitle className="text-sm">{m.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-xs leading-relaxed mb-3">{m.desc}</CardDescription>
                    <div className={`rounded-sm ${m.infoBg} border p-3 text-[0.65rem] text-navy/60`}>
                      <span className="font-bold text-navy">Ideal for:</span> {m.ideal}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 5: Competitive */}
        <TabsContent value="competitive">
          <SectionWrapper label="Competitive Position" title={<>Everyone Owns a Piece. <em>Nobody Owns the Whole.</em></>}>
            <div className="overflow-x-auto rounded-sm border border-navy/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy/[0.03]">
                    <th className="text-left px-3 py-2.5 font-semibold text-navy/70 text-xs min-w-[160px]">Capability</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-navy/70 text-xs">BowTieXP/DNV</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-navy/70 text-xs">SAP EHS</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-navy/70 text-xs">Cority</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-navy/70 text-xs">Sentinel/iSYS</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-gold text-xs">SENTIO</th>
                  </tr>
                </thead>
                <tbody>
                  {competitiveTable.map((row) => (
                    <tr key={row.capability} className="border-t border-navy/5">
                      <td className="px-3 py-2.5 font-medium text-navy text-xs">{row.capability}</td>
                      <td className="px-3 py-2.5 text-navy/40 text-xs">{row.bowtie}</td>
                      <td className="px-3 py-2.5 text-navy/40 text-xs">{row.sap}</td>
                      <td className="px-3 py-2.5 text-navy/40 text-xs">{row.cority}</td>
                      <td className="px-3 py-2.5 text-navy/40 text-xs">{row.sentinel}</td>
                      <td className="px-3 py-2.5 font-bold text-gold text-xs">{row.sentio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-sm bg-gold/5 border border-gold/20 p-5 text-xs text-navy/70 leading-relaxed">
              <span className="font-bold text-navy">The white space:</span> Sentio is the only platform that makes the Bowtie a live instrument AND keeps humans in the decision chain.
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* Tab 6: Pricing & Roadmap */}
        <TabsContent value="pricing">
          <SectionWrapper label="Commercial Model & Roadmap" title={<>Land on Author. <em>Expand with Intelligence.</em></>}>
            <div className="grid sm:grid-cols-3 gap-4">
              {pricingTiers.map((tier) => (
                <div key={tier.name} className={`rounded-sm p-5 ${tier.featured ? "border-2 border-gold shadow-lg" : "border border-navy/10"} bg-white`}>
                  <p className="text-[0.65rem] font-bold text-navy/50 tracking-wider mb-1">{tier.name}</p>
                  <p className="text-xl font-extrabold text-gold">{tier.price}</p>
                  <p className="text-[0.65rem] text-navy/40 mb-4">{tier.per}</p>
                  <ul className="space-y-1.5">
                    {tier.features.map((f) => (
                      <li key={f} className="text-xs text-navy/60 flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 text-teal-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-sm bg-gold/5 border border-gold/20 p-4 text-xs text-navy/70 leading-relaxed">
              <span className="font-bold text-navy">Pilot:</span> One site · One top event · One Bowtie · 6 weeks · Fixed-fee proof of value
            </div>

            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mt-10 mb-4">Roadmap — 24 Weeks to Enterprise Platform</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {roadmapPhases.map((p, i) => {
                const colors = ["border-l-gold", "border-l-teal-500", "border-l-blue-500", "border-l-emerald-500"]
                return (
                  <div key={p.label} className={`rounded-sm bg-white border border-navy/8 border-l-[3px] ${colors[i]} p-4`}>
                    <p className="text-[0.6rem] font-bold uppercase tracking-wider text-gold mb-1">{p.label}</p>
                    <p className="text-[0.7rem] text-navy/60 leading-relaxed">{p.desc}</p>
                  </div>
                )
              })}
            </div>

            <div className="rounded-lg bg-navy p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">The Bowtie You Build Should Watch Itself</h3>
                <p className="text-xs text-ice/40">ServiceNow AI + React + Node.js. 30-minute live demo available.</p>
              </div>
              <Button asChild size="sm"><Link href="/contact">Book Demo <ArrowRight className="ml-2 h-3.5 w-3.5" /></Link></Button>
            </div>
          </SectionWrapper>
        </TabsContent>
      </Tabs>
    </>
  )
}
