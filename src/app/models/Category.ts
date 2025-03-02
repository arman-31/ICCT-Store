import { executeQuery } from "app/lib/db"
import { parseDatabaseResponse, parseDatabaseResponseArray, parseCategory } from "app/lib/db/utils"

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
    return parseDatabaseResponseArray(categories, parseCategory)
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
    return parseDatabaseResponse(categories[0], parseCategory) || null
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
    return parseDatabaseResponse(categories[0], parseCategory) || null
  }

  static async create(data: Omit<Category, "id" | "created_at" | "updated_at">): Promise<Category> {
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
      values: [data.name, data.slug, data.description, data.image_url, data.active],
    })

    const category = await this.findById(result.insertId)
    if (!category) {
      throw new Error("Failed to create category")
    }
    return category
  }

  static async update(id: number, data: Partial<Category>): Promise<Category> {
    const updates = []
    const values = []

    if (data.name) {
      updates.push("name = ?")
      values.push(data.name)
    }
    if (data.slug) {
      updates.push("slug = ?")
      values.push(data.slug)
    }
    if (data.description !== undefined) {
      updates.push("description = ?")
      values.push(data.description)
    }
    if (data.image_url !== undefined) {
      updates.push("image_url = ?")
      values.push(data.image_url)
    }
    if (data.active !== undefined) {
      updates.push("active = ?")
      values.push(data.active)
    }

    if (updates.length === 0) {
      const existingCategory = await this.findById(id)
      if (!existingCategory) {
        throw new Error("Category not found")
      }
      return existingCategory
    }

    values.push(id)

    await executeQuery({
      query: `
        UPDATE categories 
        SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      values,
    })

    const updatedCategory = await this.findById(id)
    if (!updatedCategory) {
      throw new Error("Category not found")
    }
    return updatedCategory
  }

  static async delete(id: number): Promise<boolean> {
    const category = await this.findById(id)
    if (!category) {
      return false
    }

    await executeQuery({
      query: "DELETE FROM categories WHERE id = ?",
      values: [id],
    })
    return true
  }

  static async getProductsByCategory(categoryId: number): Promise<any[]> {
    const products = await executeQuery<any[]>({
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
    return products
  }
}

