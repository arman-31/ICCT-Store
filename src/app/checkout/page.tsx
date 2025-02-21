"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "app/components/ui/card"
import { Input } from "app/components/ui/input"
import { Label } from "app/components/ui/label"
import { RadioGroup, RadioGroupItem } from "app/components/ui/radio-group"
import { Separator } from "app/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "app/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "app/components/ui/alert"

// This would come from your cart state/API
const cartItems = [
  {
    id: 1,
    name: "School Hoodie",
    size: "L",
    price: 39.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "School T-Shirt",
    size: "M",
    price: 19.99,
    quantity: 2,
  },
]

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    studentId: "",
    fullName: "",
    paymentMethod: "gcash",
    pickupDate: "",
    pickupTime: "",
    gcashNumber: "",
  })

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const processingFee = 5.99
  const total = subtotal + processingFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically:
      // 1. Validate stock availability
      // 2. Process payment
      // 3. Create order record
      // 4. Send confirmation email

      // Redirect to success page
      window.location.href = "/checkout/success"
    } catch (err) {
      setError("An error occurred while processing your order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cart">
        <Button variants="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid gap-6">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>We&apos;ll use this to send your order confirmation</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e: { target: { value: any } }) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e: { target: { value: any } }) => setFormData({ ...formData, studentId: e.target.value })}
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
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e: { target: { value: any } }) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pickup Schedule</CardTitle>
                <CardDescription>Choose when you&apos;d like to pick up your order</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pickup-date">Pickup Date</Label>
                  <Input
                    id="pickup-date"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e: { target: { value: any } }) => setFormData({ ...formData, pickupDate: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pickup-time">Preferred Time</Label>
                  <Select
                    value={formData.pickupTime}
                    onValueChange={(value: any) => setFormData({ ...formData, pickupTime: value })}
                    required
                  >
                    <SelectTrigger id="pickup-time">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (1PM - 4PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you&apos;d like to pay for your order</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value: any) => setFormData({ ...formData, paymentMethod: value })}
                  className="grid gap-4"
                >
                  <Label
                    htmlFor="gcash"
                    className="flex cursor-pointer items-center rounded-lg border p-4 [&:has(:checked)]:bg-accent"
                  >
                    <RadioGroupItem value="gcash" id="gcash" className="mr-4" />
                    <div className="grid gap-1.5">
                      <div className="font-medium">GCash</div>
                      <div className="text-sm text-muted-foreground">Pay using your GCash account</div>
                    </div>
                  </Label>
                  {formData.paymentMethod === "gcash" && (
                    <div className="grid gap-2 pl-8">
                      <Label htmlFor="gcash-number">GCash Number</Label>
                      <Input
                        id="gcash-number"
                        type="tel"
                        placeholder="Enter your GCash number"
                        value={formData.gcashNumber}
                        onChange={(e: { target: { value: any } }) => setFormData({ ...formData, gcashNumber: e.target.value })}
                        required={formData.paymentMethod === "gcash"}
                      />
                    </div>
                  )}
                  <Label
                    htmlFor="cash"
                    className="flex cursor-pointer items-center rounded-lg border p-4 [&:has(:checked)]:bg-accent"
                  >
                    <RadioGroupItem value="cash" id="cash" className="mr-4" />
                    <div className="grid gap-1.5">
                      <div className="font-medium">Cash on Pickup</div>
                      <div className="text-sm text-muted-foreground">Pay when you pick up your order</div>
                    </div>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} ({item.size}) x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>${processingFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 text-sm text-muted-foreground">
                  <p>
                    Your order will be available for pickup at the school store during your selected time slot. Please
                    bring a valid student ID for verification.
                  </p>
                  <p>
                    Note: Some items may require 15-30 days for restocking. You will be notified via email about the
                    status of your order.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

