import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { ProductModel } from "app/models/Product"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // Get form data
    const name = formData.get("name") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const size = formData.get("size") as string
    const stock = Number.parseInt(formData.get("stock") as string)
    const image = formData.get("image") as File

    // Generate slug from name
    const slug = name.toLowerCase().replace(/ /g, "-")

    // Handle image upload
    let imageUrl = "/placeholder.svg"
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      const filename = `${slug}-${uniqueSuffix}${image.name.match(/\.[^.]*$/)?.[0] || ""}`
      const filepath = join(process.cwd(), "public/uploads", filename)

      // Save file
      await writeFile(filepath, buffer)
      imageUrl = `/uploads/${filename}`
    }

    // Create product
    const product = await ProductModel.create({
      name,
      slug,
      price,
      description: "", // Add description field if needed
      category_id: 1, // Set appropriate category_id
      featured: false,
      active: true,
    })

    // Add product size and stock
    await ProductModel.addSize(product.id, {
      size,
      stock,
    })

    // Add product image
    await ProductModel.addImage(product.id, imageUrl)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

