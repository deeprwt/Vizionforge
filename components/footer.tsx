import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const services = [
  { label: "OutSystems Practice", href: "/services/outsystems" },
  { label: "Microsoft 365", href: "/services/microsoft-365" },
  { label: "ServiceNow", href: "/services/servicenow" },
  { label: "Agentic AI", href: "/services/servicenow" },
];

const products = [
  { label: "ExpenseGenie", href: "/products/expense-genie" },
  { label: "SafeOps360", href: "/products/safeops360" },
  { label: "SENTIO", href: "/products/sentio" },
  { label: "LOS / LMS", href: "/products/los-lms" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Engagement Model", href: "/engagement" },
  { label: "Contact", href: "/contact" },
];

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-gold">
      {children}
    </h4>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/55 transition-colors hover:text-gold"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-gold bg-navy">
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-12 sm:py-[60px] md:px-12">
        {/* Grid */}
        <div
          className={cn(
            "grid gap-10",
            "grid-cols-1 sm:grid-cols-2",
            "lg:grid-cols-[2fr_1fr_1fr_1fr]"
          )}
        >
          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/assets/images/logo.png"
                alt="VizionForge"
                width={160}
                height={36}
                className="h-9 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-white/55">
              Enterprise software solutions that transform the way organisations operate,
              innovate, and grow.
            </p>
            <div className="mt-4 text-xs leading-relaxed text-white/40">
              <p className="font-semibold text-white/60 mb-1">Bangalore Headquarters</p>
              <p>
                Vizionforge Technologies Pvt Ltd, WeWork Vaishnavi Signature,
                No.78/9, Outer Ring Road, Bellandur Village, Varthur Hobli,
                Bangalore, Karnataka 560103, IN
              </p>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <ColTitle>Services</ColTitle>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <FooterLink key={s.label} href={s.href}>
                  {s.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Col 3 — Products */}
          <div>
            <ColTitle>Products</ColTitle>
            <ul className="flex flex-col gap-2.5">
              {products.map((p) => (
                <FooterLink key={p.label} href={p.href}>
                  {p.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div>
            <ColTitle>Company</ColTitle>
            <ul className="flex flex-col gap-2.5">
              {company.map((c) => (
                <FooterLink key={c.label} href={c.href}>
                  {c.label}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">&copy; 2026 VizionForge</p>
          <p className="text-xs text-white/40">
            harpreet@vizionforge.com&nbsp;&middot;&nbsp;+91 70422 97604
          </p>
        </div>
      </div>
    </footer>
  );
}
