import { NextResponse } from "next/server"
import { executeQuery } from "app/lib/db"


export async function GET() {
    try {
        const orders = await executeQuery<any[]>({
            query: `
            SELECT 
              o.*,
              u.full_name as user_name,
              u.student_id,
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
            JOIN users u ON o.user_id = u.id
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            GROUP BY o.id
            ORDER BY o.created_at DESC
          `, 
      })
    
     return NextResponse.json(orders)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500})
    }
}