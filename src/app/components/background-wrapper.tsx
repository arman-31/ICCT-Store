import type React from "react"
import Image from "next/image"

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background image */}
      <div className="fixed inset-0 -z-10">
        <Image src="/background.png?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col">{children}</div>
    </div>
  )
}



