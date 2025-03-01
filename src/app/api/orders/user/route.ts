import { NextResponse } from "next/server"
import { OrderModel } from "app/models/Order"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const order = await OrderModel.create(data.order, data.items)
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

