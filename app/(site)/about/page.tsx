import Link from "next/link"
import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: "150+", label: "Collective Years MNC & Global Exp." },
  { value: "33+", label: "Certified Professionals" },
  { value: "30+", label: "Enterprise Apps Delivered" },
  { value: "5★", label: "OutSystems Rating" },
]

const pillars = [
  {
    label: "Expertise",
    title: "Certified Across Platforms",
    body: "Full-stack capability across OutSystems, Microsoft 365, Power Platform, ServiceNow & Mendix — UI, backend, API integration, mobile and AI/ML layers.",
  },
  {
    label: "Approach",
    title: "Advisory-First, AI-Led",
    body: "Advisory Technical Board of industry stalwarts. Domain experts as functional consultants. Insights-first, AI/ML-led innovation mindset at every engagement.",
  },
  {
    label: "Delivery",
    title: "Agile, QA-Gated Sprints",
    body: "Agile sprint cycles from 4–30 weeks. In-house training academy. Rigorous QA and code review gates at every milestone — no exceptions.",
  },
]

const certifications = [
  {
    label: "OutSystems",
    title: "5 Certification Tracks",
    body: "Associate Reactive Developer · Professional Web Developer · Architecture Specialist · Front-End Specialist · Tech Lead. In-house academy ensures 100% team certification.",
  },
  {
    label: "Microsoft",
    title: "Power Platform & Azure",
    body: "PL-100 Power Apps Maker · PL-200 Power Platform Functional Consultant · PL-400 Developer · PL-600 Solution Architect · AZ-204 Azure Developer.",
  },
  {
    label: "ServiceNow",
    title: "ITSM & Agentic AI",
    body: "Certified System Administrator · Certified Application Developer · ITSM Implementation Specialist · Now Assist & Agentic AI early-access program.",
  },
]

const clients = [
  { name: "Tata Realty", desc: "Infrastructure" },
  { name: "PFC", desc: "Power Finance" },
  { name: "Reliance", desc: "General Insurance" },
  { name: "Suzlon", desc: "Renewable Energy" },
  { name: "New India Assurance", desc: "Public Sector Insurance" },
  { name: "Tamkeen · Bahrain", desc: "Kingdom of Bahrain Labor Fund" },
]

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <HeroSection
        size="compact"
        eyebrow="About VizionForge"
        title={
          <>
            Purpose-Built for{" "}
            <em className="text-gold italic">Enterprise Delivery</em>
          </>
        }
      />

      {/* OUR DNA */}
      <SectionWrapper
        label="Our DNA"
        title={
          <>
            Not Generalists.{" "}
            <em className="text-gold italic">Deep Specialists.</em>
          </>
        }
        subtitle="VizionForge is a specialized Low-Code and AI-first engineering firm — built to be your trusted enterprise delivery partner across OutSystems, Microsoft and ServiceNow. We are not a body-shop. We bring an Advisory Technical Board, domain consultants, and an in-house training academy to every engagement."
      >
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-navy/10 bg-white p-6 text-center shadow-sm"
            >
              <span className="font-display text-[2.4rem] font-bold text-gold block leading-none">
                {stat.value}
              </span>
              <span className="text-[0.82rem] text-navy/60 mt-2 block leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* THREE PILLARS */}
      <SectionWrapper
        label="Three Pillars"
        title={
          <>
            How We{" "}
            <em className="text-gold italic">Operate</em>
          </>
        }
      >
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((item) => (
            <Card key={item.title} className="p-6">
              <CardHeader className="p-0 pb-3">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">
                  {item.label}
                </span>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{item.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* CERTIFICATIONS */}
      <SectionWrapper
        dark
        label="Certifications"
        title={
          <>
            Certified Across{" "}
            <em className="text-gold italic">Every Platform We Touch</em>
          </>
        }
      >
        <div className="grid md:grid-cols-3 gap-5">
          {certifications.map((item) => (
            <Card
              key={item.title}
              className="bg-navy border-l-gold/50 border border-white/10 p-6 hover:border-gold/40"
            >
              <CardHeader className="p-0 pb-3">
                <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-gold/70">
                  {item.label}
                </span>
                <CardTitle className="text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-ice/70">{item.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* OUR CLIENTS */}
      <SectionWrapper
        label="Our Clients"
        title={
          <>
            Trusted by{" "}
            <em className="text-gold italic">Industry Leaders</em>
          </>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {clients.map((client) => (
            <div
              key={client.name}
              className="rounded-sm border border-navy/10 bg-white p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span className="font-semibold text-navy block">{client.name}</span>
              <span className="text-[0.82rem] text-navy/50 mt-1 block">{client.desc}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
