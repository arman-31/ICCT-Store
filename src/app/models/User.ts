import { executeQuery } from "app/lib/db"

export interface User {
  id: number
  full_name: string
  student_id: string
  email: string
  role: "user" | "admin"
  active: boolean
  created_at: Date
  updated_at: Date
}

export class UserModel {
  static async findById(id: number): Promise<User | null> {
    const users = await executeQuery<User[]>({
      query: "SELECT * FROM users WHERE id = ?",
      values: [id],
    })
    return users[0] || null
  }

  static async findByEmail(email: string): Promise<User | null> {
    const users = await executeQuery<User[]>({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email],
    })
    return users[0] || null
  }

  static async create(user: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
    const result = await executeQuery<any>({
      query: `
        INSERT INTO users (full_name, student_id, email, password, role, active)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      values: [user.full_name, user.student_id, user.email, user.password, user.role, user.active],
    })
    return this.findById(result.insertId)
  }
}

export default User
