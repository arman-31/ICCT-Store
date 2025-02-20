import { notFound } from "next/navigation"
import prisma from "../lib/prisma"
import { Header } from "../components/Header"
import { Button } from "app/components/ui/button"

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { user: true, product: true },
  })

  if (!order) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Thank you for your order, {order.user.name}!</h2>
          <p className="mb-2">Order ID: {order.id}</p>
          <p className="mb-2">Product: {order.product.name}</p>
          <p className="mb-2">Size: {order.size}</p>
          <p className="mb-2">Total Price: ₱{order.totalPrice.toFixed(2)}</p>
          <p className="mb-2">Status: {order.status}</p>
          {order.pickupDate && <p className="mb-4">Pickup Date: {order.pickupDate.toLocaleDateString()}</p>}
          <Button onClick={() => window.print()}>Print Order Details</Button>
        </div>
      </div>
    </main>
  )
}