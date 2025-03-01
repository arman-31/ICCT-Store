import { NextResponse } from "next/server"
import { executeQuery } from "app/lib/db"

export async function GET() {
  try {
    // Test connection by getting counts from main tables
    const counts = await executeQuery<any[]>({
      query: `
        SELECT 
          (SELECT COUNT(*) FROM users) as users,
          (SELECT COUNT(*) FROM products) as products,
          (SELECT COUNT(*) FROM categories) as categories,
          (SELECT COUNT(*) FROM orders) as orders
      `,
    })

    return NextResponse.json({
      status: "success",
      message: "Successfully connected to MySQL",
      counts: counts[0],
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to database",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}