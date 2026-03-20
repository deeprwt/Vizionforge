import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  speed?: number
  pauseOnHover?: boolean
}

export function Marquee({ children, className, speed = 30, pauseOnHover = true }: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden [--marquee-gap:2.5rem] md:[--marquee-gap:3.5rem] [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]", className)} style={{ gap: "var(--marquee-gap)" }}>
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn("flex shrink-0 items-center animate-marquee", pauseOnHover && "group-hover:[animation-play-state:paused]")}
          style={{ animationDuration: `${speed}s`, gap: "var(--marquee-gap)" }}
          aria-hidden={i === 1}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
