"use client"

import { cn } from "@/lib/utils"

interface HomeVideoHeroProps {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  children?: React.ReactNode
}

export default function HomeVideoHero({ eyebrow, title, subtitle, children }: HomeVideoHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden flex flex-col justify-end",
        "min-h-screen",
        "-mt-[68px] px-6 lg:px-12 pb-16 pt-[120px]"
      )}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/videos/home-hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gold line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold z-10" />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        {/* Eyebrow */}
        <div className="animate-fade-up flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-gold" />
          <span className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-gold">
            {eyebrow}
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-up-delay-1 font-display font-black text-white leading-[1.08] text-[clamp(2.8rem,6vw,5.2rem)]">
          {title}
        </h1>

        {subtitle && (
          <p className="animate-fade-up-delay-2 text-lg text-ice/90 leading-relaxed max-w-[560px] mt-6">
            {subtitle}
          </p>
        )}

        {children && (
          <div className="animate-fade-up-delay-3 mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
