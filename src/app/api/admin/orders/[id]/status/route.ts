import { NextResponse } from "next/server"
import { executeQuery } from "app/lib/db"

export async function PUT(request: Request, { params }: {
params: { id: string } }) {
    try { 
        const { status } = await request.json()

        await executeQuery({
            query: `
              UPDATE orders 
              SET status = ?, 
                 updated_at = CURRENT_TIMESTAMP
              WHERE id = ?
            `,
            values: [status, params.id],
        })

        const [order] = await executeQuery<any[]>({
            query: "SELECT * FROM orders WHERE id = ?",
            values: [params.id],
        })

        return NextResponse.json(order)
    } catch (error) {
        return NextResponse.json({ error: "Failed to update order status"}, { status: 500 })
    }
}