import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

const phases = [
  { num: "01", title: "Discovery & Kickoff", description: "Stakeholder interviews, backlog review, architecture assessment and sprint-zero planning." },
  { num: "02", title: "Sprint Planning", description: "Story mapping, effort estimation, sprint capacity allocation and definition of done." },
  { num: "03", title: "Agile Delivery", description: "2-week sprints with daily standups, demo at sprint end, retrospective and backlog grooming." },
  { num: "04", title: "QA & Security", description: "Automated testing, performance benchmarking, OWASP security checks and code review gates." },
  { num: "05", title: "Release & Handover", description: "Staged rollout, UAT support, documentation, knowledge transfer and hypercare period." },
]

const governance = [
  { title: "Weekly Reports", description: "Sprint velocity, burn-down charts, risk register and blocker escalation — delivered every Friday." },
  { title: "Jira / Confluence", description: "Full transparency with shared Jira boards, Confluence documentation and real-time dashboards." },
  { title: "Dedicated Coordinator", description: "A single point of contact for scheduling, escalation, resource changes and stakeholder communication." },
  { title: "Executive Reviews", description: "Monthly steering-committee reviews with leadership, covering roadmap, budget and strategic alignment." },
]

const models = [
  {
    title: "Dedicated Team",
    description: "A full cross-functional squad — developers, QA, BA and scrum master — embedded in your delivery org. You set the priorities; we deliver the sprints.",
    bestFor: "Long-term programs, product development, ongoing enhancement backlogs.",
  },
  {
    title: "Project-Based",
    description: "Fixed-scope, fixed-timeline delivery with milestone-based billing. We own the plan, the build and the release — you own the outcome.",
    bestFor: "Greenfield builds, platform migrations, compliance-driven projects.",
  },
  {
    title: "Staff Augmentation",
    description: "Certified professionals plugged into your existing team within days. Managed by you, supported by our bench and training academy.",
    bestFor: "Skill gaps, surge capacity, specific certifications needed fast.",
  },
]

const gettingStarted = [
  { num: "01", title: "Share Your Backlog", description: "Send us your project brief, backlog or problem statement. No formal RFP needed." },
  { num: "02", title: "Solution Architecture Call", description: "We schedule a 60-minute call with a solution architect to scope the engagement." },
  { num: "03", title: "SOW & Onboarding", description: "We deliver a detailed SOW within 48 hours. Onboarding starts the week you sign." },
]

export default function EngagementPage() {
  return (
    <>
      <HeroSection
        size="compact"
        eyebrow="How We Work"
        title={
          <>
            Structured Delivery.{" "}
            <em className="text-gold italic">Full Transparency.</em>
          </>
        }
      />

      {/* 5-Phase Delivery */}
      <SectionWrapper
        label="Delivery Process"
        title={
          <>
            Five Phases.{" "}
            <em className="text-gold italic">One Proven Framework.</em>
          </>
        }
      >
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-[2px] bg-gold/20" />
          <div className="flex flex-col gap-6">
            {phases.map((phase) => (
              <div key={phase.num} className="flex gap-6 items-start relative">
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-navy text-gold font-display text-lg font-bold">
                  {phase.num}
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-lg font-bold text-navy">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Governance Framework */}
      <SectionWrapper
        label="Governance Framework"
        title={
          <>
            Transparency at{" "}
            <em className="text-gold italic">Every Level.</em>
          </>
        }
        className="bg-slate-50"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {governance.map((item) => (
            <Card key={item.title} className="p-6">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Engagement Models */}
      <SectionWrapper
        dark
        label="Engagement Models"
        title={
          <>
            Three Ways to Work Together.{" "}
            <em className="text-gold italic">Pick Yours.</em>
          </>
        }
      >
        <div className="grid md:grid-cols-3 gap-5">
          {models.map((model) => (
            <Card
              key={model.title}
              className="bg-navy border-l-gold/50 border border-white/10 p-6 hover:border-gold/40"
            >
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-white text-lg">
                  {model.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-ice/70">
                  {model.description}
                </CardDescription>
                <p className="mt-4 text-[0.78rem] text-gold/80">
                  <span className="font-bold">Best for:</span> {model.bestFor}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Getting Started */}
      <SectionWrapper
        label="Getting Started"
        title={
          <>
            From First Call to{" "}
            <em className="text-gold italic">Sprint One.</em>
          </>
        }
      >
        <div className="grid md:grid-cols-3 gap-6">
          {gettingStarted.map((step) => (
            <Card key={step.num} className="p-6">
              <CardHeader className="p-0 pb-3">
                <span className="font-display text-[2rem] font-bold text-gold/30">
                  {step.num}
                </span>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/contact">
              Schedule a Discovery Call <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  )
}
