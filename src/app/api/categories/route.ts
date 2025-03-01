import { NextResponse } from "next/server"
import { executeQuery } from "app/lib/db"

export async function GET() {
  try {
    const categories = await executeQuery<any[]>({
      query: `
        SELECT c.*, 
          COUNT(p.id) as product_count
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        WHERE c.active = true
        GROUP BY c.id
      `,
    })

    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

