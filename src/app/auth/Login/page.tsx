"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "app/components/ui/button"
import { Input } from "app/components/ui/input"
import { Label } from "app/components/ui/label"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login form submission
    console.log(formData)
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Form Side */}
      <div className="flex items-center justify-center p-4 md:p-8 rounded-xl glass-effect shadow text-white w-full max-w-md">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e: { target: { value: any } }) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Button variants="outline" type="button" className="w-full">
                Google
              </Button>
              <Button variants="outline" type="button" className="w-full">
                Facebook
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

