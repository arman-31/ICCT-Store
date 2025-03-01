import { executeQuery } from "app/lib/db"

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  category_id: number
  featured: boolean
  active: boolean
  created_at: Date
  updated_at: Date
  images?: string[]
  sizes?: ProductSize[]
}

export interface ProductSize {
  size: string
  stock: number
}

export class ProductModel {
  static update(arg0: number, data: any) {
    throw new Error("Method not implemented.")
  }
  static async findAll(): Promise<Product[]> {
    const products = await executeQuery<Product[]>({
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

    return products.map(this.formatProduct)
  }

  static async findById(id: number): Promise<Product | null> {
    const products = await executeQuery<Product[]>({
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
      value: [id],
    })

    return products[0] ? this.formatProduct(products[0]) : null
  }

  private static formatProduct(product: any): Product {
    return {
      ...product,
      images: product.images ? product.images.split(",") : [],
      sizes: product.sizes
        ? product.sizes.split(",").map((size: string) => {
            const [name, stock] = size.split(":")
            return { size: name, stock: Number.parseInt(stock) }
          })
        : [],
    }
  }
}

export default Product