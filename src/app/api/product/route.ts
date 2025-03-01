import { NextResponse } from "next/server"
import { ProductModel } from "app/models/Product"

export async function GET() {
  try {
    const products = await ProductModel.findAll()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

