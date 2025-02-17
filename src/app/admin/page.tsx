import prisma from "@/lib/prisma"
import Header from "@/app/components/Header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

async function updateOrderStatus(orderId: string, status: string) {
  "use server"
  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  })
}

export default async function AdminDashboard() {
  const orders = await prisma.order.findMany({
    include: { user: true, product: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Student Number</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>₱{order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{order.user.studentNumber}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>
                  <Select defaultValue={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                    <SelectTrigger>
                      <SelectValue>{order.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}