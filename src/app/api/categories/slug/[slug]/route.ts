import { NextResponse } from "next/server"
import { CategoryModel } from "app/models/Category"
import { error } from "console"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const category = await CategoryModel.findBySlug(params.slug)

        if (!category) {
            return NextResponse.json({ error: "Category not found"}, {status: 400})
        }

        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch Category"}, { status: 500 })
    }
}