"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "app/components/ui/button"
import { Input } from "app/components/ui/input"
import { Label } from "app/components/ui/label"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 ">
      {/* Form Side */}
      <div className="flex items-center justify-center p-4 md:p-8 rounded-xl glass-effect shadow text-white w-full max-w-md">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="Enter your student ID"
                required
              />
            </div>

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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Sign Up
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
              Already have an account?{" "}
              <Link href="/auth/Login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
