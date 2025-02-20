"use client"

import type React  from "react"

import { useState } from "react"
import { useRouter} from "next/navigation"
import Header from "../components/Header"
import  { Button }  from "app/components/ui/button"
import  {Input } from "app/components/ui/input"
import  { Label } from "app/components/ui/label"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log("Login with:", email,password)

        alert("Login successfull!")
        router.push("/")
    }

    return (
        <main className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto mt-8 p-4">
                <div className="max-w-md mx-auto bg-white rounder-lg shadow-md overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2x1 font-bold -mb-6 text-center">Log In</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" value={email}
                              onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                 id="password"
                                 type="password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                 Log In
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}