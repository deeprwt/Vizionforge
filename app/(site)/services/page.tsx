import Link from "next/link"
import {
  ArrowRight,
  Layers,
  Cloud,
  Workflow,
  CheckCircle2,
  Sparkles,
  Award,
  Users,
} from "lucide-react"
import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

/* ------------------------------------------------------------------ */
/*  Practice cards                                                     */
/* ------------------------------------------------------------------ */

const practices = [
  {
    num: "01",
    name: "OutSystems",
    badge: "Premier Practice",
    title: "Low-Code at Enterprise Scale",
    desc: "We architect, build and migrate enterprise applications on OutSystems — from complex case management for 10,000+ users to government portals. 100% certified team, 5★ marketplace rating.",
    icon: Layers,
    accent: "from-[#ff4713] to-[#D4A843]",
    accentColor: "text-[#ff4713]",
    bgAccent: "bg-[#fff0eb]",
    borderAccent: "border-[#ffc9b3]",
    metrics: [
      { v: "5★", l: "Rating" },
      { v: "33+", l: "Certified" },
      { v: "30+", l: "Apps" },
      { v: "6", l: "Verticals" },
    ],
    capabilities: [
      "Enterprise App Development",
      "Legacy System Migration",
      "Case Management & BPM",
      "ODC Migration & Modernization",
    ],
    href: "/services/outsystems",
  },
  {
    num: "02",
    name: "Microsoft 365",
    badge: "Microsoft Practice",
    title: "Power Platform & Azure AI",
    desc: "We enable enterprises to build apps, automate processes, and deploy AI within the Microsoft ecosystem. From citizen developer programs with governance to Azure AI document processing replacing 40+ reviewers with 12 agents.",
    icon: Cloud,
    accent: "from-[#0078d4] to-[#D4A843]",
    accentColor: "text-[#0078d4]",
    bgAccent: "bg-[#e8f4fd]",
    borderAccent: "border-[#a8d4f2]",
    metrics: [
      { v: "500+", l: "Citizen Devs" },
      { v: "120+", l: "Apps / 6 Mo" },
      { v: "85%", l: "Time Saved" },
      { v: "$1.2M", l: "Saved / yr" },
    ],
    capabilities: [
      "Citizen Developer Enablement",
      "Process Automation (RPA + Cloud)",
      "AI Document Processing",
      "Copilot & AI Agents",
    ],
    href: "/services/microsoft-365",
  },
  {
    num: "03",
    name: "ServiceNow",
    badge: "ServiceNow Practice",
    title: "Agentic AI & Workflow",
    desc: "We implement, customize and extend ServiceNow — from ITSM/HRSD to autonomous AI agents that resolve 90% of P3/P4 incidents without human intervention. Full stack: ITSM, ITOM, HRSD, CSM, Now Assist, Agentic AI.",
    icon: Workflow,
    accent: "from-[#81b535] to-[#D4A843]",
    accentColor: "text-[#81b535]",
    bgAccent: "bg-[#f0f8e0]",
    borderAccent: "border-[#c2e8a0]",
    metrics: [
      { v: "70%", l: "MTTR ↓" },
      { v: "90%", l: "Auto-Fix" },
      { v: "8K+", l: "Employees" },
      { v: "$2M+", l: "Saved / yr" },
    ],
    capabilities: [
      "ITSM Implementation",
      "Agentic AI & Self-Healing IT",
      "HRSD & Employee Service Hub",
      "ITOM & Event Management",
    ],
    href: "/services/servicenow",
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        size="compact"
        eyebrow="Platform Capabilities"
        title={
          <>
            Three Platforms.{" "}
            <em className="text-gold italic">One Delivery Team.</em>
          </>
        }
        subtitle="OutSystems, Microsoft 365, ServiceNow — engineered, integrated, and delivered by a single certified team. Pick a practice to dive deeper."
      />

      {/* ============================================================ */}
      {/*  Practice Cards                                               */}
      {/* ============================================================ */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-3 gap-6">
          {practices.map((p) => (
            <Card
              key={p.name}
              className="group flex flex-col overflow-hidden border-l-0 hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Gradient banner */}
              <div className={`h-1.5 bg-gradient-to-r ${p.accent}`} />

              <CardHeader className="p-6 pb-3">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-md ${p.bgAccent} ${p.borderAccent} border flex items-center justify-center`}
                  >
                    <p.icon className={`h-6 w-6 ${p.accentColor}`} />
                  </div>
                  <span
                    className={`text-[0.65rem] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full ${p.bgAccent} ${p.accentColor} ${p.borderAccent} border`}
                  >
                    {p.badge}
                  </span>
                </div>

                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">
                  Practice {p.num} — {p.name}
                </span>
                <h3 className="font-display text-xl font-bold text-navy mt-1.5">
                  {p.title}
                </h3>
              </CardHeader>

              <CardContent className="p-6 pt-0 flex-1 flex flex-col">
                <p className="text-sm text-navy/60 leading-relaxed mb-5">
                  {p.desc}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-2 mb-5 rounded-md bg-navy/[0.02] border border-navy/8 p-3">
                  {p.metrics.map((m) => (
                    <div key={m.l} className="text-center">
                      <span
                        className={`font-display font-bold text-base block leading-none ${p.accentColor}`}
                      >
                        {m.v}
                      </span>
                      <span className="text-[0.55rem] text-navy/50 mt-1 block leading-tight">
                        {m.l}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Capabilities */}
                <ul className="flex flex-col gap-2 mb-6">
                  {p.capabilities.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-[0.82rem] text-navy/75"
                    >
                      <CheckCircle2
                        className={`h-3.5 w-3.5 ${p.accentColor} shrink-0 mt-0.5`}
                      />
                      {c}
                    </li>
                  ))}
                </ul>

                <Link
                  href={p.href}
                  className="mt-auto inline-flex items-center justify-between gap-1 px-4 py-3 rounded-sm bg-navy text-white text-sm font-bold hover:bg-navy-mid transition-colors"
                >
                  Explore {p.name}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* ============================================================ */}
      {/*  Why VizionForge                                              */}
      {/* ============================================================ */}
      <SectionWrapper
        dark
        label="Why VizionForge"
        title={
          <>
            One Team. Three Platforms.{" "}
            <em className="text-gold italic">Zero Hand-offs.</em>
          </>
        }
        subtitle="Most partners specialize in one stack. We deliver across all three — with the integration glue, governance and AI overlays that real enterprises need."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Award,
              title: "100% Certified",
              desc: "Every developer carries platform certifications. In-house academy gets new hires production-ready in 6 weeks.",
            },
            {
              icon: Users,
              title: "Senior-Led Pods",
              desc: "Every engagement is led by a Solution Architect + Tech Lead. We don't push junior teams onto critical workstreams.",
            },
            {
              icon: Sparkles,
              title: "AI-First Delivery",
              desc: "Now Assist, Azure OpenAI, AI Builder, OutSystems AI Mentor — embedded into every solution from day one, not retrofitted.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-sm bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:border-gold/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-md bg-gold/15 flex items-center justify-center mb-4">
                <item.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="text-white font-bold text-base mb-2">
                {item.title}
              </h3>
              <p className="text-ice/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-sm bg-gold/10 border border-gold/30 p-6">
          <div>
            <h3 className="text-white font-bold text-lg">
              Not sure which practice fits your problem?
            </h3>
            <p className="text-ice/70 text-sm mt-1">
              Schedule a 30-minute discovery call. We'll map your needs to the
              right stack — or a hybrid.
            </p>
          </div>
          <Button asChild>
            <Link href="/contact">
              Schedule Discovery Call <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}
