import { executeQuery, pool } from "app/lib/db"
import { parseDatabaseResponse, parseDatabaseResponseArray, parseOrder } from "app/lib/db/utils"
import type { Order, OrderItem } from "./types"

export class OrderModel {
  static async create(
    orderData: Omit<Order, "id" | "order_number" | "created_at" | "updated_at">,
    items: OrderItem[],
  ): Promise<Order> {
    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()

      // Generate order number
      const orderNumber = await this.generateOrderNumber()

      // Create order
      const [orderResult] = await connection.execute(
        `INSERT INTO orders (
          order_number, user_id, total_amount, payment_method, 
          payment_status, pickup_date, pickup_time, status, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderNumber,
          orderData.user_id,
          orderData.total_amount,
          orderData.payment_method,
          orderData.payment_status,
          orderData.pickup_date,
          orderData.pickup_time,
          orderData.status,
          orderData.notes,
        ],
      )

      const orderId = (orderResult as any).insertId

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

      const order = await this.findById(orderId)
      return order
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  static async findById(id: number): Promise<Order> {
    const [orders] = await executeQuery<any[]>({
      query: `
        SELECT o.*, 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'product_id', oi.product_id,
              'size', oi.size,
              'quantity', oi.quantity,
              'price', oi.price
            )
          ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.id = ?
        GROUP BY o.id
      `,
      values: [id],
    })

    if (!orders || orders.length === 0) {
      throw new Error("Order not found")
    }

    return parseDatabaseResponse(orders[0], parseOrder)
  }

  static async findByUserId(userId: number): Promise<Order[]> {
    const [orders] = await executeQuery<any[]>({
      query: `
        SELECT o.*, 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'product_id', oi.product_id,
              'size', oi.size,
              'quantity', oi.quantity,
              'price', oi.price
            )
          ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `,
      values: [userId],
    })

    return parseDatabaseResponseArray(orders, parseOrder)
  }

  static async updateStatus(id: number, status: Order["status"]): Promise<Order> {
    await executeQuery({
      query: `
        UPDATE orders 
        SET status = ?, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      values: [status, id],
    })

    return this.findById(id)
  }

  static async updatePaymentStatus(id: number, paymentStatus: Order["payment_status"]): Promise<Order> {
    await executeQuery({
      query: `
        UPDATE orders 
        SET payment_status = ?, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      values: [paymentStatus, id],
    })

    return this.findById(id)
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
}

