"use client"

import { useState } from "react"
import { Package, ShoppingCart, Users } from "lucide-react"
import { Button } from "app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "app/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "app/components/ui/Table"

export default function AdminDashboard() {
  const [orders] = useState([
    {
      id: "ORD001",
      student: "John Doe",
      studentId: "STU123",
      product: "College of Computer Studies",
      quantity: 1,
      total: 1000,
      status: "Pending",
    },
    {
      id: "ORD002",
      student: "Jane Smith",
      studentId: "STU124",
      product: "College of Art 7 Science",
      quantity: 2,
      total: 2000,
      status: "Completed",
    },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 low in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+8 new today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Manage your recent orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {order.student}
                      <br />
                      <span className="text-sm text-muted-foreground">ID: {order.studentId}</span>
                    </TableCell>
                    <TableCell>
                      {order.product}
                      <br />
                      <span className="text-sm text-muted-foreground">Qty: {order.quantity}</span>
                    </TableCell>
                    <TableCell>₱{order.total.toFixed(2)}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell className="text-right">
                      <Button variants="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

