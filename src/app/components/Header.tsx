'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Logo from "./Logo"
import SearchBar from "./SearchBar"
import AuthForm from "./AuthForm"
import { ShoppingCart } from "lucide-react"

export default function Header() {
    const [cartItemCount, setCartItemCount] = useState(0)

    useEffect(() => {
        const updateCartCount = () => {
            const saveCart = localStorage.getItem("cart")
            if (saveCart) {
                const cart = JSON.parse(saveCart)
                setCartItemCount(cart.length)
            }
        }

        updateCartCount()
        window.addEventListener("storage", updateCartCount)
        return () => window.removeEventListener("storage", updateCartCount)
    }, [])

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex flex-col
             md:flex-row items-center justify-between">
                <Logo />
                <SearchBar />
                <div className="flex items-center space-x-4">
                    <AuthForm />
                    <Link href="/cart" className="relative">
                     <ShoppingCart className="w-5 h-6" />
                     {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2
                         bg-red-500 text-white rounded-full w-5 h-5 flex
                         item-center justify-center text-xs">
                            {cartItemCount}
                         </span>
                     )}
                    </Link>
                </div>
             </div>
        </header>
    )
} 
