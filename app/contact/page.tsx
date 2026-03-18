"use client"

import { useState, FormEvent } from "react"
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@vizionforge.com" },
  { icon: Phone, label: "Phone", value: "+91 22 6890 0000" },
  { icon: MapPin, label: "Office", value: "Mumbai, Maharashtra, India" },
  { icon: Clock, label: "Hours", value: "Mon – Fri, 9:30 AM – 6:30 PM IST" },
]

const nextSteps = [
  { num: "01", text: "We respond within 4 business hours." },
  { num: "02", text: "A solution architect is assigned to your request." },
  { num: "03", text: "A 60-minute discovery call is scheduled at your convenience." },
]

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      platform: (form.elements.namedItem("platform") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Something went wrong.")
      }
      setStatus("success")
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.")
      setStatus("error")
    }
  }

  return (
    <>
      <HeroSection
        size="compact"
        eyebrow="Get in Touch"
        title={
          <>
            Let&apos;s Solve Your Hardest{" "}
            <em className="text-gold italic">Problem.</em>
          </>
        }
      />

      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Contact Info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-navy mb-6">
              Contact Information
            </h2>
            <div className="flex flex-col gap-5 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy text-gold">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-display text-lg font-bold text-navy mb-4">
              What Happens Next
            </h3>
            <div className="flex flex-col gap-4">
              {nextSteps.map((step) => (
                <div key={step.num} className="flex items-start gap-3">
                  <span className="font-display text-sm font-bold text-gold">
                    {step.num}
                  </span>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {status === "success" ? (
              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    Your message has been received. A solution architect will
                    reach out within 4 business hours.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-semibold text-navy mb-1.5 block">
                      Full Name *
                    </label>
                    <Input id="name" name="name" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label htmlFor="company" className="text-sm font-semibold text-navy mb-1.5 block">
                      Company *
                    </label>
                    <Input id="company" name="company" placeholder="Acme Inc." required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-navy mb-1.5 block">
                      Work Email *
                    </label>
                    <Input id="email" name="email" type="email" placeholder="jane@acme.com" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-semibold text-navy mb-1.5 block">
                      Phone
                    </label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label htmlFor="platform" className="text-sm font-semibold text-navy mb-1.5 block">
                    Platform of Interest
                  </label>
                  <select
                    id="platform"
                    name="platform"
                    className="h-11 w-full rounded-sm border border-navy/20 bg-white px-4 text-sm text-navy focus:border-gold focus:ring-1 focus:ring-gold/30 focus-visible:outline-none"
                  >
                    <option value="">Select a platform...</option>
                    <option value="outsystems">OutSystems</option>
                    <option value="microsoft">Microsoft 365 / Power Platform</option>
                    <option value="servicenow">ServiceNow</option>
                    <option value="ai">AI / ML / Agentic AI</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-semibold text-navy mb-1.5 block">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project, challenge or idea..."
                    required
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
                )}

                <Button type="submit" size="lg" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send Message"}
                  {status !== "loading" && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            )}
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
