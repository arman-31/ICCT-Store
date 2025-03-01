import { executeQuery } from "app/lib/db"
import  pool  from "app/lib/db"

export interface Order {
  id: number
  order_number: string
  user_id: number
  total_amount: number
  payment_method: "gcash" | "cash"
  payment_status: "pending" | "paid" | "failed"
  pickup_date: Date
  pickup_time: "morning" | "afternoon"
  status: "pending" | "confirmed" | "ready" | "completed" | "cancelled"
  notes?: string
  created_at: Date
  updated_at: Date
  items?: OrderItem[]
}

export interface OrderItem {
  product_id: number
  size: string
  quantity: number
  price: number
}

export class OrderModel {
  static async create(
    order: Omit<Order, "id" | "order_number" | "created_at" | "updated_at">,
    items: OrderItem[],
  ): Promise<Order> {
    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()

      // Generate order number
      const orderNumber = await this.generateOrderNumber()

      // Create order
      const orderResult = await connection.execute(
        `INSERT INTO orders (
          order_number, user_id, total_amount, payment_method, 
          payment_status, pickup_date, pickup_time, status, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderNumber,
          order.user_id,
          order.total_amount,
          order.payment_method,
          order.payment_status,
          order.pickup_date,
          order.pickup_time,
          order.status,
          order.notes,
        ],
      )

      const orderId = (orderResult[0] as any).insertId

      // Create order items
      for (const item of items) {
        await connection.execute(
          `INSERT INTO order_items (
            order_id, product_id, size, quantity, price
          ) VALUES (?, ?, ?, ?, ?)`,
          [orderId, item.product_id, item.size, item.quantity, item.price],
        )

        // Update product stock
        await connection.execute(
          `UPDATE product_sizes 
           SET stock = stock - ? 
           WHERE product_id = ? AND size = ?`,
          [item.quantity, item.product_id, item.size],
        )
      }

      await connection.commit()
      return this.findById(orderId)
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  private static async generateOrderNumber(): Promise<string> {
    const date = new Date()
    const year = date.getFullYear().toString().substr(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")

    const result = await executeQuery<any[]>({
      query: "SELECT COUNT(*) as count FROM orders",
    })

    const count = result[0].count + 1
    return `ORD-${year}${month}-${count.toString().padStart(4, "0")}`
  }
  static async findById(id: number): Promise<Order | null> {
    const [rows] = await executeQuery<Order[]>({
      query: "SELECT * FROM orders WHERE id = ?",
      values: [id],
    })
    return rows[0] || null
  }
}

export default Order
