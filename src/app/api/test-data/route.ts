import { NextResponse } from "next/server"
import connectDB from "app/lib/db"
import Category from "app/models/Category"
import Product from "app/models/Product"

export async function GET() {
  try {
    await connectDB()

    // Get all categories and products
    const categories = await Category.find({})
    const products = await Product.find({}).populate("category")

    return NextResponse.json({
      success: true,
      data: {
        categories,
        products,
      },
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

