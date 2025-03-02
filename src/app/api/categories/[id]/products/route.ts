import { NextResponse } from "next/server"
import { CategoryModel } from "app/models/Category"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const products = await CategoryModel.getProductsByCategory(Number.parseInt(params.id))
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch category products" }, { status: 500 })
  }
}

