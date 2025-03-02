import { executeQuery } from "app/lib/db"

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image_url?: string
  active: boolean
  created_at: Date
  updated_at: Date
  product_count?: number
}

export class CategoryModel {
  static async findAll(includeInactive = false): Promise<Category[]> {
    const categories = await executeQuery<Category[]>({
      query: `
        SELECT 
          c.*,
          COUNT(p.id) as product_count
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        ${includeInactive ? "" : "WHERE c.active = true"}
        GROUP BY c.id
        ORDER BY c.name ASC
      `,
    })
    return categories
  }

  static async findById(id: number): Promise<Category | null> {
    const categories = await executeQuery<Category[]>({
      query: `
        SELECT 
          c.*,
          COUNT(p.id) as product_count
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        WHERE c.id = ?
        GROUP BY c.id
      `,
      values: [id],
    })
    return categories[0] || null
  }

  static async findBySlug(slug: string): Promise<Category | null> {
    const categories = await executeQuery<Category[]>({
      query: `
        SELECT 
          c.*,
          COUNT(p.id) as product_count
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        WHERE c.slug = ?
        GROUP BY c.id
      `,
      values: [slug],
    })
    return categories[0] || null
  }

  static async create(category: Omit<Category, "id" | "created_at" | "updated_at">): Promise<Category> {
    const result = await executeQuery<any>({
      query: `
        INSERT INTO categories (
          name, 
          slug, 
          description, 
          image_url, 
          active
        ) VALUES (?, ?, ?, ?, ?)
      `,
      values: [category.name, category.slug, category.description, category.image_url, category.active],
    })

    return this.findById(result.insertId)
  }

  static async update(id: number, category: Partial<Category>): Promise<Category | null> {
    const updates = []
    const values = []

    if (category.name) {
      updates.push("name = ?")
      values.push(category.name)
    }
    if (category.slug) {
      updates.push("slug = ?")
      values.push(category.slug)
    }
    if (category.description !== undefined) {
      updates.push("description = ?")
      values.push(category.description)
    }
    if (category.image_url !== undefined) {
      updates.push("image_url = ?")
      values.push(category.image_url)
    }
    if (category.active !== undefined) {
      updates.push("active = ?")
      values.push(category.active)
    }

    if (updates.length === 0) return this.findById(id)

    values.push(id)

    await executeQuery({
      query: `
        UPDATE categories 
        SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      values,
    })

    return this.findById(id)
  }

  static async delete(id: number): Promise<boolean> {
    try {
      await executeQuery({
        query: "DELETE FROM categories WHERE id = ?",
        values: [id],
      })
      return true
    } catch (error) {
      return false
    }
  }

  static async getProductsByCategory(categoryId: number): Promise<any[]> {
    return executeQuery({
      query: `
        SELECT 
          p.*,
          GROUP_CONCAT(DISTINCT pi.image_url) as images,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'size', ps.size,
              'stock', ps.stock
            )
          ) as sizes
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        WHERE p.category_id = ? AND p.active = true
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `,
      values: [categoryId],
    })
  }
}

