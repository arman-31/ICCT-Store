import { NextResponse } from "next/server"
import { CategoryModel } from "app/models/Category"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const category = await CategoryModel.findById(Number.parseInt(params.id))

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const category = await CategoryModel.update(Number.parseInt(params.id), data)
    return NextResponse.json(category)
  } catch (error) {
    if (error instanceof Error && error.message === "Category not found") {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = await CategoryModel.delete(Number.parseInt(params.id))

    if (!success) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}

