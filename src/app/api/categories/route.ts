import { NextResponse } from "next/server"
import { CategoryModel } from "app/models/Category"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("includeInactive") === "true"

    const categories = await CategoryModel.findAll(includeInactive)
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const category = await CategoryModel.create({
      name: data.name,
      slug: data.name.toLowerCase().replace(/ /g, "-"),
      description: data.description,
      image_url: data.image_url,
      active: true,
    })
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

