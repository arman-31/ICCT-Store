import { NextResponse } from "next/server"
import { ProductModel } from "app/models/Product"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await ProductModel.findById(Number.parseInt(params.id))

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const product = await ProductModel.update(Number.parseInt(params.id), data)
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

