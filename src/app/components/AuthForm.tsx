"use client"

import Link from "next/link"
import { Button } from "app/components/ui/button"

export default function AuthForm() {
 return (
    <div className="space-x-2">
        <Link href="/login">
         <Button variants="outline">Log In</Button>
        </Link>
        <Link href="/sighup">
         <Button>Sign Up</Button>
        </Link>
     </div>
 )
}