"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { Button } from "app/components/ui/button"
import {Input} from "app/components/ui/input"

export function Header() {
    return (
      <header className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-bold text-xl">
                ICCT Store
              </Link>
            </div>
  
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <Input type="search" placeholder="Search products..." className="w-full" />
            </div>
  
            <div className="flex items-center gap-4">
              <Link href="/auth/Login">
                <Button variants="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
              <Link href="/cart">
                <Button variants="outline" size="sm" className="flex items-center gap-2">
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
  
  