"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Header from "../components/Header"
import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"

interface CartItem {
    id: string
    name: string
    price: number
    size: string
}

export default function CartPage() {
    const [cartItem, setCartItem] = useState<CartItem[]>([])
    const router =useRouter()

    useEffect(() => {
        const saveCart = localStorage.getItem("cart")
        if (saveCart) {
            setCartItem(JSON.parse(saveCart))
        }
    }, [])

    const removeFromCart = (index: number) => {
        const updateCart = cartItem.filter((_, i) => i !== index)
        setCartItem(updateCart)
        localStorage.setItem("cart", JSON.stringify(updateCart))
    }

    const getTotalPrice = () => {
        return cartItem.reduce((total, item) => total + item.price, 0).toFixed(2)
    }

    const handleCheckout = () => {
        alert("Proceeding to checkout...")
    }

    return (
        <main className="min-screen bg-gray-100">
            <Header />
            <div className="container mx-auto mt- p-4">
                <h1 className="text-2x1 font -bold mb-6">Your Cart</h1>
                {cartItem.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cartItem.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.size}</TableCell>
                                    <TableCell className="text-right">₱{item.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onclick={() => removeFromCart(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colspan={2} className="font-bold">Total</TableCell>
                                <TableCell className="text-right font-bodl">₱{getTotalPrice()}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                     </Table>
                     <div className="mt-6 flex justify-end">
                        <Button on click={handleCheckout}>Proceed to checkout</Button>
                     </div>
                    </>
                )}
            </div>
        </main>
    )
}