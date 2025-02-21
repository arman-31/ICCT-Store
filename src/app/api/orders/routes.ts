import { NextResponse } from "next/server"
import connectDB from "app/lib/db"
import Order from "app/models/Order"

export async function GET() {
  try {
    await connectDB()
    const orders = await Order.find({})
      .populate("user", "fullName studentId email")
      .populate("items.product", "name price")
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const order = await Order.create(data)
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
