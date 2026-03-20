import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import HomeVideoHero from "@/components/home-video-hero"
import SectionWrapper from "@/components/section-wrapper"
import { Marquee } from "@/components/ui/marquee"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: "150+", label: "Collective Years\nMNC & Global Exp." },
  { value: "5★", label: "Customer Rating\non OutSystems" },
  { value: "33+", label: "Certified\nProfessionals" },
  { value: "30+", label: "Enterprise Apps\nDelivered" },
  { value: "3", label: "Platforms\nOS · MS · SN" },
]

const clients = [
  { name: "Tata Realty", logo: "/assets/images/trusted/tata realty.png" },
  { name: "Reliance", logo: "/assets/images/trusted/reliance.png" },
  { name: "PFC", logo: "/assets/images/trusted/pfc.png" },
  { name: "Suzlon", logo: "/assets/images/trusted/suzlon.png" },
  { name: "New India Assurance", logo: "/assets/images/trusted/New India Assurance.png" },
  { name: "Tamkeen", logo: "/assets/images/trusted/tamkeen.png" },
  { name: "HDFC ERGO", logo: "/assets/images/trusted/hdfc ergo.png" },
  { name: "Tech Mahindra", logo: "/assets/images/trusted/tech mahinda.png" },
]

const pills = ["OutSystems", "Microsoft 365", "ServiceNow", "Power Platform", "Agentic AI"]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <HomeVideoHero
        eyebrow="Low Code · AI-First · Enterprise Delivery"
        title={
          <>
            Solving Deep<br />
            <span className="text-gold">Business Problems</span><br />
            That Matter
          </>
        }
        subtitle="A specialized Low-Code and AI-first engineering firm — built to be your trusted enterprise delivery partner across OutSystems, Microsoft and ServiceNow."
      >
        {/* Pills */}
        <div className="flex gap-3 flex-wrap mb-10">
          {pills.map((pill) => (
            <Badge key={pill} variant="default">{pill}</Badge>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap">
          <Button asChild size="lg">
            <Link href="/contact">Schedule a Discovery Call</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">View Case Studies</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-white/10 pt-10 gap-y-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center px-4 border-r border-white/8 last:border-r-0"
            >
              <span className="font-display text-[2.6rem] font-bold text-gold block leading-none">
                {stat.value}
              </span>
              <span className="text-[0.78rem] text-ice mt-2 block leading-snug whitespace-pre-line">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </HomeVideoHero>

      {/* CLIENT LOGO STRIP */}
      <div className="bg-navy border-t border-white/5 border-b-[3px] border-b-gold">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-7">
          {/* Mobile: label on top, Desktop: inline */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-12">
            <span className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-white/40 whitespace-nowrap shrink-0">
              Trusted by
            </span>
            <Marquee speed={30} className="flex-1">
              {clients.map((client) => (
                <Image
                  key={client.name}
                  src={client.logo}
                  alt={client.name}
                  width={200}
                  height={60}
                  className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* WHO WE ARE */}
      <SectionWrapper
        label="Who We Are"
        title={<>The Engineering Partner <em className="text-gold italic">Your Enterprise Relies On</em></>}
        subtitle="We are not a body-shop. We are a specialized, AI-first engineering firm with an Advisory Technical Board, domain consultants, and an in-house training academy — delivering across OutSystems, Microsoft 365, Power Platform, and ServiceNow."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { label: "Expertise", title: "Certified Across Platforms", body: "Full-stack capability across OutSystems, Microsoft 365, Power Platform, ServiceNow & Mendix — UI, backend, API integration, mobile and AI/ML layers." },
            { label: "Approach", title: "Advisory-First, AI-Led", body: "Advisory Technical Board of industry stalwarts. Domain experts as functional consultants. Insights-first, AI/ML-led innovation mindset at every engagement." },
            { label: "Delivery", title: "Agile, QA-Gated Sprints", body: "Agile sprint cycles from 4–30 weeks. In-house training academy. Rigorous QA and code review gates at every milestone — no exceptions." },
          ].map((item) => (
            <Card key={item.title} className="p-6">
              <CardHeader className="p-0 pb-3">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">{item.label}</span>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{item.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* PLATFORM PRACTICES */}
      <SectionWrapper
        dark
        label="Platform Practices"
        title={<>Three Platforms.<br /><em className="text-gold italic">One Unified Delivery Model.</em></>}
      >
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {[
            { label: "OutSystems", title: "Low-Code Development", body: "Reactive Web & Mobile · Enterprise App Modernization · Case Management (CMF) · API Integration (50+ connectors) · ODC Migration & Cloud" },
            { label: "Microsoft", title: "M365 & Power Platform", body: "Power Apps & Power Automate · Power BI & Dataverse · SharePoint Modernization · Copilot & AI Builder · Azure Integration Services" },
            { label: "ServiceNow", title: "ITSM & Workflow Automation", body: "ITSM / ITOM / HRSD / CSM · Service Portal Development · Integration Hub & Spokes · Agentic AI & Now Assist · Workflow Automation at Scale" },
          ].map((item) => (
            <Card key={item.title} className="bg-navy border-l-gold/50 border border-white/10 p-6 hover:border-gold/40">
              <CardHeader className="p-0 pb-3">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">{item.label}</span>
                <CardTitle className="text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-ice/70">{item.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild>
            <Link href="/services">Explore All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* PRODUCTS TEASER */}
      <SectionWrapper
        label="Built In-House"
        title={<>Products <em className="text-gold italic">Ready to Deploy</em></>}
        subtitle="Three production-ready products built on the same Low Code and AI-first engineering principles that power our client delivery."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { num: "01", label: "MBO", title: "Dealer Management Software", href: "/products/mbo", body: "End-to-end dealership operations — inventory, sales, service and finance in one unified SaaS platform. OEM agnostic." },
            { num: "02", label: "ExpenseGenie", title: "AI-Powered Expense Management", href: "/products/expense-genie", body: "Snap a receipt. Let AI do the rest. From submission to SAP posting in seconds. 90% faster processing. 4-week go-live." },
            { num: "03", label: "Loan Covenant", title: "Covenant Compliance for Lenders", href: "/products/loan-covenant", body: "Automate financial covenant tracking, breach detection and regulatory reporting for lending companies. Zero missed breaches." },
          ].map((item) => (
            <Card key={item.title} className="border-l-navy p-6 group">
              <CardHeader className="p-0 pb-3">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">
                  Product — {item.label}
                  {/* {item.num}  */}
                </span>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{item.body}</CardDescription>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-gold hover:text-gold-light transition-colors"
                >
                  Learn More <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
