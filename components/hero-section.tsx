import { cn } from "@/lib/utils";

interface HeroSectionProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  size?: "full" | "compact";
  children?: React.ReactNode;
}

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  size = "full",
  children,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative flex flex-col justify-end overflow-hidden bg-navy",
        size === "full" ? "min-h-[calc(100vh-68px)]" : "min-h-[42vh]"
      )}
    >
      {/* Decorative gradient on right */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[45%]"
        style={{
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(135deg, rgba(212,168,67,0.12) 0%, rgba(30,32,68,0) 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pt-16 pb-16 sm:px-12 md:pt-20 md:pb-24">
        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-3 animate-fade-up">
          <span className="block h-[2px] w-8 bg-gold" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display font-black text-white animate-fade-up-delay-1"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1 }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-ice/90 animate-fade-up-delay-2">
            {subtitle}
          </p>
        )}

        {/* Children */}
        {children && (
          <div className="mt-8 animate-fade-up-delay-3">{children}</div>
        )}
      </div>

      {/* Gold line at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gold" />
    </section>
  );
}
