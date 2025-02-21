"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User } from "lucide-react"
import { Button } from "app/components/ui/button"
import { Input } from "app/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b glass-effect-strong">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image src="/placeholder.svg?height=32&width=32" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-xl text-white">School Store</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full bg-white/20 text-white placeholder:text-gray-300"
            />
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variants="ghost" size="sm" className="flex items-center gap-2 text-white hover:bg-white/20">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variants="outline"
                size="sm"
                className="flex items-center gap-2 text-white border-white hover:bg-white/20"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

