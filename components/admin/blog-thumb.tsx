import Image from "next/image"
import { ImageIcon } from "lucide-react"

export function BlogThumb({ src }: { src: string | null }) {
  return (
    <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-400">
      {src ? <Image src={src} alt="" fill sizes="44px" className="object-cover" /> : <ImageIcon className="size-4" />}
    </span>
  )
}
