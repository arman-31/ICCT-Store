"use client"

import Link from "next/link"
import { Button } from "@components/ui/button"

export default function AuthForm() {
 return (
    <div className="space-x-2">
        <Link href="/login">
         <Button variant="outline">Log In</Button>
        </Link>
        <Link href="/sighup">
         <Button>Sign Up</Button>
        </Link>
     </div>
 )
}