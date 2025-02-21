import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "app/components/Header"
import { Footer } from "app/components/footer"
import { BackgroundWrapper} from "app/components/background-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ICCT Store",
  description: "Your one-stop shop for school merchandise",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <BackgroundWrapper>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
       </BackgroundWrapper>
      </body>
    </html>
  )
}

