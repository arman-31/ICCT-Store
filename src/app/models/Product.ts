import { executeQuery } from "app/lib/db"
import { parseDatabaseResponse, parseDatabaseResponseArray, parseProduct } from "app/lib/db/utils"
import type { Product } from "./types"

export class ProductModel {
  static async findAll(): Promise<Product[]> {
    const products = await executeQuery<any[]>({
      query: `
        SELECT p.*, 
          GROUP_CONCAT(DISTINCT pi.image_url) as images,
          GROUP_CONCAT(DISTINCT CONCAT(ps.size, ':', ps.stock)) as sizes
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        WHERE p.active = true
        GROUP BY p.id
      `,
    })

    return parseDatabaseResponseArray(products, parseProduct)
  }

  static async findById(id: number): Promise<Product> {
    const [product] = await executeQuery<any[]>({
      query: `
        SELECT p.*, 
          GROUP_CONCAT(DISTINCT pi.image_url) as images,
          GROUP_CONCAT(DISTINCT CONCAT(ps.size, ':', ps.stock)) as sizes
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        WHERE p.id = ?
        GROUP BY p.id
      `,
      values: [id],
    })

    if (!product) {
      throw new Error("Product not found")
    }

    return parseDatabaseResponse(product, parseProduct)
  }

  // Update other methods similarly...
}

