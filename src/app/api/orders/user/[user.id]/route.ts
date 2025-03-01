import { NextResponse } from "next/server"
import { executeQuery } from "app/lib/db"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const orders = await executeQuery<any[]>({
      query: `
        SELECT 
          o.*,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'product_id', oi.product_id,
              'product_name', p.name,
              'size', oi.size,
              'quantity', oi.quantity,
              'price', oi.price
            )
          ) as items
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `,
      value: [params.userId],
    })

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user orders" }, { status: 500 })
  }
}

