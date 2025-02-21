import type React from "react"
import Image from "next/image"

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background image */}
      <div className="fixed inset-0 -z-10">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 dark:from-gray-950/10 dark:to-gray-950/30" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col">{children}</div>
    </div>
  )
}

