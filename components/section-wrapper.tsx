import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  label?: string;
  title?: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  label,
  title,
  subtitle,
  dark = false,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section
      className={cn(
        dark && "border-t-[3px] border-gold bg-navy",
        className
      )}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-12 sm:py-[80px]">
        {/* Header */}
        {(label || title) && (
          <div className="mb-10">
            {label && (
              <p className="mb-3 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold">
                {label}
              </p>
            )}

            {title && (
              <h2
                className={cn(
                  "font-display font-bold [&>em]:not-italic [&>em]:text-gold",
                  dark ? "text-white" : "text-navy"
                )}
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}
              >
                {title}
              </h2>
            )}

            <Separator className="mt-5" />

            {subtitle && (
              <p
                className={cn(
                  "mt-4 max-w-[680px] text-[1.05rem] leading-relaxed",
                  dark ? "text-ice" : "text-navy/60"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </section>
  );
}
