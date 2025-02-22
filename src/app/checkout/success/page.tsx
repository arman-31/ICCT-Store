import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "app/components/ui/card"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Thank you for your order. We&apos;ve sent a confirmation email with your order details.</p>
            <div className="text-sm text-muted-foreground">
              <p>Order number: #123456</p>
              <p>You will receive updates about your order status via email.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variants="outline" asChild>
              <Link href="/orders">View Orders</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

