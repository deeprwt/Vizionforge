"use client"

import Link from "next/link"
import {
  ArrowRight,
  ScanText,
  Tags,
  FileText,
  ShieldAlert,
  ListChecks,
  Eye,
  MousePointerClick,
  Building2,
  DollarSign,
  Brain,
  BarChart3,
  Lock,
  ShieldCheck,
  Cloud,
  KeyRound,
  Users,
  ScrollText,
  Rocket,
  Settings,
  TestTube,
  PartyPopper,
  CheckCircle2,
  Timer,
  Zap,
  Globe,
} from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const metrics = [
  { value: "90%", label: "Faster Processing" },
  { value: "75%", label: "Fewer Errors" },
  { value: "3x", label: "Faster Reimbursement" },
  { value: "4 Wk", label: "Go-Live" },
]

const heroSteps = [
  { num: "1", title: "Chat with Genie", desc: "Natural language — \"I had lunch at BBQ Nation, ₹1850\"", color: "bg-purple-500" },
  { num: "2", title: "AI Reads & Extracts", desc: "Vendor, amount, GST, date, category — milliseconds", color: "bg-teal-500" },
  { num: "3", title: "Validates & Submits", desc: "Policy check → duplicate check → budget check → submit", color: "bg-gold" },
  { num: "✓", title: "Real-Time to SAP", desc: "Posted to SAP S/4HANA · Document number linked", color: "bg-emerald-500" },
]

const aiFeatures = [
  { icon: ScanText, title: "Smart OCR", desc: "Reads thermal-faded, crumpled, tilted, low-contrast receipts. Handles multi-language text and handwritten amounts.", tags: ["Azure AI Doc Intelligence", "Custom Models"] },
  { icon: Tags, title: "Auto-Categorization", desc: "ML model classifies: Food & Meals, Cab/Travel, Telephone, Hotel, Office Supplies, Miscellaneous — with 97%+ accuracy.", tags: ["ML Classification", "Training: 50K+ receipts"] },
  { icon: FileText, title: "Full Extraction", desc: "Vendor name, invoice amount, bill number, date, tax breakup (GST/CGST/SGST), payment method — structured JSON output.", tags: ["NER Pipeline", "Structured Output"] },
  { icon: ShieldAlert, title: "Instant Validation", desc: "Cross-checks: policy limits per grade, duplicate bill detection (hash matching), budget availability, date validity, vendor blacklist.", tags: ["Rules Engine", "Anomaly Detection"] },
]

const ocrSpecs = [
  { label: "OCR Engine", value: "Azure AI Document Intelligence v4.0" },
  { label: "Supported Formats", value: "JPEG, PNG, PDF, TIFF, BMP, HEIC" },
  { label: "Max File Size", value: "50 MB per receipt image" },
  { label: "Languages", value: "English, Hindi, Regional (12+ languages)" },
  { label: "Extraction Fields", value: "Vendor, Amount, Date, Bill No, GST, Category" },
  { label: "Processing Time", value: "<3 seconds per receipt" },
  { label: "Accuracy", value: "97.3% on standard, 94.1% on thermal-faded" },
  { label: "Duplicate Detection", value: "Perceptual hash + metadata matching" },
]

const conversationalSpecs = [
  { label: "Input Methods", value: "Photo Upload + Text + Voice", desc: "Camera capture, gallery upload, typed description, or voice note" },
  { label: "Response Time", value: "<30 seconds end-to-end", desc: "From receipt capture to submitted expense claim" },
  { label: "Adoption Rate", value: "95%+ in Week 1", desc: "No training required — conversational UX" },
  { label: "Multi-Currency", value: "150+ currencies supported", desc: "Auto-conversion at daily exchange rates" },
]

const rejectionReasons = ["Duplicate Claim", "Over Policy Limit", "Wrong Category", "Missing Receipt", "Policy Violation", "Budget Exceeded", "Incomplete Data", "Other"]

const complianceFeatures = [
  { label: "Mandatory Comments", value: "Required on every rejection" },
  { label: "Audit Trail", value: "Every action: timestamp + user + change" },
  { label: "Status Tracking", value: "Submitted → Reviewing → Approved/Rejected → Posting → Paid" },
  { label: "SAP Linkage", value: "SAP document number for payment tracking" },
  { label: "Employee Visibility", value: "Real-time status, rejection reasons, resubmit option" },
]

const integrations = [
  { icon: Building2, title: "HRMS", desc: "Oracle PeopleSoft, Workday, SuccessFactors. Employee master, cost centers, grade limits, reporting hierarchy auto-synced.", tags: ["REST API", "Scheduled Sync"] },
  { icon: DollarSign, title: "ERP", desc: "SAP S/4HANA, Oracle EBS. Real-time expense posting. Document number returned. GL account mapping. Cost center allocation.", tags: ["SAP RFC/BAPI", "OData"] },
  { icon: Brain, title: "AI Services", desc: "Azure AI Document Intelligence for OCR. Azure OpenAI for natural language understanding. Custom ML models for categorization.", tags: ["Azure Cognitive"] },
  { icon: BarChart3, title: "Analytics", desc: "Power BI embedded dashboards. Spend analytics by category, department, employee. Compliance monitoring. Trend analysis.", tags: ["Power BI Embedded"] },
]

const securityFeatures = [
  { icon: ShieldCheck, title: "SOC 2 Type II", desc: "Continuous monitoring. Annual third-party audits. Controls for security, availability, processing integrity, confidentiality, and privacy." },
  { icon: Cloud, title: "Azure Cloud", desc: "Microsoft Azure infrastructure. 99.99% uptime SLA. Geo-redundant storage. India region (Central/South). Auto-scaling compute." },
  { icon: Lock, title: "Encryption", desc: "AES-256 at rest. TLS 1.3 in transit. Zero-knowledge architecture. Column-level encryption for PII fields." },
  { icon: KeyRound, title: "SSO & MFA", desc: "Azure AD, Okta, SAML 2.0 integration. Multi-factor authentication mandatory for admin roles. Conditional access policies." },
  { icon: Users, title: "RBAC", desc: "Granular role-based access: Employee, Manager, Finance Admin, Super Admin. Field-level permissions. IP whitelisting." },
  { icon: ScrollText, title: "Audit Logging", desc: "Every action logged with timestamp, user, IP, device, and change details. Immutable audit log. 7-year retention. Export to SIEM." },
]

const nfrSpecs = [
  { label: "Uptime SLA", value: "99.99%", detail: "Geo-redundant Azure (India Central + South)" },
  { label: "Response Time", value: "<200ms", detail: "API p95 latency" },
  { label: "Concurrent Users", value: "10,000+", detail: "Auto-scaling Azure App Service" },
  { label: "Data Retention", value: "7 years", detail: "Configurable per compliance policy" },
  { label: "Encryption", value: "AES-256 + TLS 1.3", detail: "At rest + in transit + column-level PII" },
  { label: "Authentication", value: "Azure AD / Okta / SAML 2.0", detail: "SSO + MFA mandatory for admins" },
  { label: "Accessibility", value: "WCAG 2.1 AA", detail: "Keyboard + screen reader support" },
]

const comparison = [
  { metric: "Time to Submit", legacy: "20–30 minutes", genie: "30 seconds", improvement: "40x faster" },
  { metric: "Data Entry", legacy: "100% manual", genie: "100% AI-automated", improvement: "Zero manual" },
  { metric: "Categorization", legacy: "Employee guesses", genie: "AI auto-classifies (97%+)", improvement: "97% accuracy" },
  { metric: "Approval Assist", legacy: "None", genie: "AI spending analysis + recommendations", improvement: "80% faster approvals" },
  { metric: "ERP Posting", legacy: "Manual / weekly batch", genie: "Real-time to SAP S/4HANA", improvement: "Instant" },
  { metric: "Error Rate", legacy: "~60% claims have errors", genie: "<5% error rate", improvement: "92% reduction" },
  { metric: "Reimbursement Cycle", legacy: "2–4 weeks", genie: "3–5 business days", improvement: "3x faster" },
  { metric: "Admin Hours/Month", legacy: "120+ hours", genie: "~30 hours", improvement: "75% reduction" },
]

const deploymentStack = [
  { component: "Application", tech: "Azure App Service (Web App)" },
  { component: "AI Engine", tech: "Azure AI Document Intelligence v4.0" },
  { component: "NLU", tech: "Azure OpenAI Service (GPT-4)" },
  { component: "Database", tech: "Azure SQL Database (Geo-redundant)" },
  { component: "File Storage", tech: "Azure Blob Storage (encrypted)" },
  { component: "Message Queue", tech: "Azure Service Bus" },
  { component: "Serverless", tech: "Azure Functions (triggers)" },
  { component: "Identity", tech: "Azure AD B2C + SAML 2.0" },
  { component: "Analytics", tech: "Power BI Embedded" },
  { component: "Monitoring", tech: "Azure Application Insights" },
]

const deploymentTimeline = [
  { icon: Settings, week: "Week 1", title: "Discovery", desc: "Policy setup · Category mapping · Grade limits · Cost center config", color: "border-l-gold" },
  { icon: Zap, week: "Week 2", title: "Integration", desc: "HRMS connector · SAP connector · SSO config · Blob storage setup", color: "border-l-teal-500" },
  { icon: TestTube, week: "Week 3", title: "Testing", desc: "Pilot group UAT · Edge case testing · Performance validation · Security audit", color: "border-l-blue-500" },
  { icon: PartyPopper, week: "Week 4", title: "Go Live", desc: "Phased rollout · Manager training · Support handover · Hypercare 2 weeks", color: "border-l-emerald-500" },
]

const hostingSpecs = [
  { label: "Region", value: "Azure India (Central + South)", desc: "Geo-redundant with automatic failover" },
  { label: "Scaling", value: "Auto-scale 1–50 instances", desc: "Based on CPU/memory/request count" },
  { label: "Backup", value: "Daily automated + PITR", desc: "Point-in-time recovery to 35 days" },
  { label: "DR", value: "RPO <1hr, RTO <4hr", desc: "Cross-region failover with Azure Traffic Manager" },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ExpenseGeniePage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  Hero                                                         */}
      {/* ============================================================ */}
      <section className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[45%]"
          style={{
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
            background: "linear-gradient(135deg, rgba(212,168,67,0.12) 0%, rgba(30,32,68,0) 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-purple-500/10 border-purple-400/30 text-purple-300">
                AI-Powered Expense Management
              </Badge>
              <h1
                className="font-display font-black text-white animate-fade-up"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}
              >
                Expense<em className="text-gold italic">Genie</em>
              </h1>
              <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-500/10 border border-blue-400/20 px-3 py-1.5 text-xs font-medium text-blue-300">
                ☁️ Built on Microsoft Azure · Azure AI Document Intelligence · Azure AD
              </div>
              <p className="mt-5 max-w-[520px] text-base leading-relaxed text-ice/80 animate-fade-up-delay-1">
                Conversational AI that reads, categorizes, validates and submits expenses.
                From receipt photo to SAP posting in 30 seconds. Zero forms. Zero training. 4-week go-live.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
                <Button asChild size="lg">
                  <Link href="/contact">Request Live Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Start Free Pilot</Link>
                </Button>
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

            {/* Hero Visual — Employee Flow */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-5 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ice/40 mb-4">
                Employee Experience — 30 Seconds
              </p>
              <div className="flex flex-col gap-3">
                {heroSteps.map((step) => (
                  <div key={step.title} className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 p-3">
                    <div className={`w-7 h-7 rounded-full ${step.color} text-white flex items-center justify-center text-[0.65rem] font-bold shrink-0`}>
                      {step.num}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{step.title}</p>
                      <p className="text-[0.7rem] text-ice/50">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md bg-white/5 border border-white/10 p-3 text-center text-[0.7rem] text-ice/40">
                <span className="font-bold text-ice/60">Tech Stack:</span> Azure AI Document Intelligence · Azure OpenAI · Azure AD · Azure SQL · Azure Blob · Power BI
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gold" />
      </section>

      {/* ============================================================ */}
      {/*  Tabs                                                         */}
      {/* ============================================================ */}
      <Tabs defaultValue="ai-engine" className="w-full">
        <div className="sticky top-[68px] z-30 bg-white border-b border-navy/10 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-12 overflow-x-auto">
            <TabsList className="w-max min-w-full sm:min-w-0">
              <TabsTrigger value="ai-engine">AI Engine</TabsTrigger>
              <TabsTrigger value="manager">Manager Experience</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="security">Security & Compliance</TabsTrigger>
              <TabsTrigger value="comparison">Before vs After</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ---- Tab 1: AI Engine ---- */}
        <TabsContent value="ai-engine">
          <SectionWrapper
            label="AI-Powered OCR Engine"
            title={<>100% Accuracy. <em>Even on Thermal-Faded Receipts.</em></>}
            subtitle="Azure AI Document Intelligence reads what other OCR systems fail on — thermal-faded POS prints, crumpled taxi receipts, low-contrast handwritten bills."
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiFeatures.map((f) => (
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

            <div className="grid lg:grid-cols-2 gap-8 mt-12">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Functional Specifications</p>
                <div className="overflow-x-auto rounded-sm border border-navy/10">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-navy/[0.03]"><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Capability</th><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Specification</th></tr></thead>
                    <tbody>
                      {ocrSpecs.map((s) => (
                        <tr key={s.label} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 font-medium text-navy text-xs">{s.label}</td>
                          <td className="px-4 py-2.5 text-navy/60 text-xs">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Conversational AI Interface</p>
                <div className="rounded-sm bg-gold/5 border border-gold/20 p-4 mb-4">
                  <p className="font-bold text-navy text-sm">Zero Forms. Zero Dropdowns. Just Chat.</p>
                  <p className="text-xs text-navy/60 mt-1 leading-relaxed">
                    Employees interact via natural language — text or voice. The AI handles extraction, categorization, validation, and submission.
                    If you can send a text message, you can use ExpenseGenie.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {conversationalSpecs.map((s) => (
                    <div key={s.label} className="rounded-sm bg-navy/[0.02] border border-navy/8 p-3">
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-gold mb-1">{s.label}</p>
                      <p className="text-xs font-semibold text-navy">{s.value}</p>
                      <p className="text-[0.65rem] text-navy/50 mt-0.5">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* ---- Tab 2: Manager Experience ---- */}
        <TabsContent value="manager">
          <SectionWrapper
            label="Manager Approval Flow"
            title={<>AI-Assisted Approvals & <em>Structured Compliance.</em></>}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  { icon: ListChecks, title: "Pending Queue", desc: "Unified view of all team requests. Priority sorted by amount, urgency, and policy compliance indicators. Filter by status, date, category, employee." },
                  { icon: Eye, title: "Expense Review", desc: "Full details: extracted data, original receipt, AI confidence score, policy validation results, historical spending pattern for this employee and category." },
                  { icon: MousePointerClick, title: "One-Tap Action", desc: "AI recommends approve/flag/reject based on spending patterns, anomaly scores, and historical data. Manager can override with one tap + optional comment." },
                ].map((item) => (
                  <Card key={item.title} className="p-5">
                    <CardHeader className="p-0 pb-2">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
                        <item.icon className="h-4.5 w-4.5 text-gold" />
                      </div>
                      <CardTitle className="text-sm">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-xs leading-relaxed">{item.desc}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Rejection Framework</p>
                <div className="rounded-sm bg-teal-50 border border-teal-200 p-4 mb-4">
                  <p className="font-bold text-navy text-sm">8 Pre-Defined Rejection Reasons</p>
                  <p className="text-xs text-navy/60 mt-1">Ensure consistency and auditability across all managers.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {rejectionReasons.map((r) => (
                    <span key={r} className="rounded-md bg-red-50 border border-red-200 px-3 py-1 text-[0.7rem] font-semibold text-red-600">{r}</span>
                  ))}
                </div>

                <div className="overflow-x-auto rounded-sm border border-navy/10">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-navy/[0.03]"><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Compliance Feature</th><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Detail</th></tr></thead>
                    <tbody>
                      {complianceFeatures.map((f) => (
                        <tr key={f.label} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 font-medium text-navy text-xs">{f.label}</td>
                          <td className="px-4 py-2.5 text-navy/60 text-xs">{f.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* ---- Tab 3: Integration ---- */}
        <TabsContent value="integration">
          <SectionWrapper
            label="Enterprise Integration Architecture"
            title={<>Plug Into Your <em>Existing Ecosystem.</em></>}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrations.map((item) => (
                <Card key={item.title} className="p-5">
                  <CardHeader className="p-0 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
                      <item.icon className="h-4.5 w-4.5 text-gold" />
                    </div>
                    <CardTitle className="text-sm">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-xs leading-relaxed">{item.desc}</CardDescription>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span key={t} className="inline-block rounded bg-navy/5 px-2 py-0.5 text-[0.6rem] font-semibold text-navy/60">{t}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-sm bg-blue-50 border border-blue-200 p-5 text-xs text-navy/70 leading-relaxed">
              <span className="font-bold text-navy">Integration Architecture:</span> ExpenseGenie Core (Azure App Service) → Azure AI Document Intelligence → Azure SQL Database → Azure Blob Storage (receipts) → SAP S/4HANA (OData/RFC) → HRMS (REST) → Azure AD (SSO/SAML) → Power BI (Analytics) → Azure Service Bus (async processing) → Azure Functions (serverless triggers)
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* ---- Tab 4: Security & Compliance ---- */}
        <TabsContent value="security">
          <SectionWrapper
            label="Security & Compliance"
            title={<>Enterprise-Grade. <em>SOC 2 Type II Compliant.</em></>}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {securityFeatures.map((f) => (
                <Card key={f.title} className="p-5">
                  <CardHeader className="p-0 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-2">
                      <f.icon className="h-4.5 w-4.5 text-gold" />
                    </div>
                    <CardTitle className="text-sm">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-xs leading-relaxed">{f.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 overflow-x-auto rounded-sm border border-navy/10">
              <table className="w-full text-sm">
                <thead><tr className="bg-navy/[0.03]"><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">NFR</th><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Specification</th><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Detail</th></tr></thead>
                <tbody>
                  {nfrSpecs.map((s) => (
                    <tr key={s.label} className="border-t border-navy/5">
                      <td className="px-4 py-2.5 font-medium text-navy text-xs">{s.label}</td>
                      <td className="px-4 py-2.5 font-semibold text-gold text-xs">{s.value}</td>
                      <td className="px-4 py-2.5 text-navy/60 text-xs">{s.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* ---- Tab 5: Before vs After ---- */}
        <TabsContent value="comparison">
          <SectionWrapper
            label="Business Impact"
            title={<>Legacy Tools vs <em>ExpenseGenie.</em></>}
          >
            <div className="overflow-x-auto rounded-sm border border-navy/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy/[0.03]">
                    <th className="text-left px-4 py-3 font-semibold text-navy/70 text-xs">Metric</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy/70 text-xs">Legacy Tools</th>
                    <th className="text-left px-4 py-3 font-semibold text-gold text-xs">ExpenseGenie</th>
                    <th className="text-left px-4 py-3 font-semibold text-teal-600 text-xs">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.metric} className="border-t border-navy/5">
                      <td className="px-4 py-3 font-medium text-navy text-xs">{row.metric}</td>
                      <td className="px-4 py-3 text-navy/50 text-xs">{row.legacy}</td>
                      <td className="px-4 py-3 font-semibold text-gold text-xs">{row.genie}</td>
                      <td className="px-4 py-3 font-bold text-teal-600 text-xs">{row.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[
                { value: "90%", label: "Processing Time Reduction", color: "text-gold" },
                { value: "75%", label: "Fewer Errors & Violations", color: "text-teal-500" },
                { value: "3x", label: "Faster Reimbursement", color: "text-gold" },
                { value: "40%", label: "Lower Admin Cost", color: "text-teal-500" },
              ].map((s) => (
                <div key={s.label} className="rounded-sm border border-navy/10 p-5 text-center">
                  <span className={`font-display text-3xl font-bold ${s.color} leading-none block`}>{s.value}</span>
                  <span className="text-navy/50 text-[0.7rem] font-medium mt-2 block">{s.label}</span>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </TabsContent>

        {/* ---- Tab 6: Deployment ---- */}
        <TabsContent value="deployment">
          <SectionWrapper
            label="Deployment"
            title={<>Go Live in 4 Weeks. <em>Not 4 Months.</em></>}
          >
            {/* Timeline */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {deploymentTimeline.map((step) => (
                <div key={step.title} className={`rounded-sm bg-white border border-navy/8 border-l-[3px] ${step.color} p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className="h-4 w-4 text-gold" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-wider text-gold">{step.week}</span>
                  </div>
                  <p className="text-sm font-bold text-navy">{step.title}</p>
                  <p className="text-[0.7rem] text-navy/50 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Deployment Architecture</p>
                <div className="overflow-x-auto rounded-sm border border-navy/10">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-navy/[0.03]"><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Component</th><th className="text-left px-4 py-2.5 font-semibold text-navy/70 text-xs">Technology</th></tr></thead>
                    <tbody>
                      {deploymentStack.map((s) => (
                        <tr key={s.component} className="border-t border-navy/5">
                          <td className="px-4 py-2.5 font-medium text-navy text-xs">{s.component}</td>
                          <td className="px-4 py-2.5 text-navy/60 text-xs">{s.tech}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold mb-3">Hosting & Scalability</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {hostingSpecs.map((s) => (
                    <div key={s.label} className="rounded-sm bg-navy/[0.02] border border-navy/8 p-3">
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-gold mb-1">{s.label}</p>
                      <p className="text-xs font-semibold text-navy">{s.value}</p>
                      <p className="text-[0.65rem] text-navy/50 mt-0.5">{s.desc}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="rounded-lg bg-navy p-6">
                  <h3 className="text-base font-bold text-white mb-1">Ready to Kill the Expense Form?</h3>
                  <p className="text-xs text-ice/40 mb-4">4-week go-live. Azure cloud-native. SOC 2 compliant.</p>
                  <Button asChild size="sm">
                    <Link href="/contact">Schedule Demo <ArrowRight className="ml-2 h-3.5 w-3.5" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </TabsContent>
      </Tabs>
    </>
  )
}
