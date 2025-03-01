import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { executeQuery } from "app/lib/db"
import { UserModel } from "app/models/User"

xport async function POST(request: Request) {
    try {
      const { email, password } = await request.json()
  
      const user = await UserModel.findByEmail(email)
      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }
  
      // Get user's password from database
      const [rows] = await executeQuery<any[]>({
        query: "SELECT password FROM users WHERE email = ?",
        value: [email],
      })
  
      const isValid = await bcrypt.compare(password, rows[0].password)
      if (!isValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }
  
      // Don't send password in response
      const { password: _, ...userWithoutPassword } = user
  
      return NextResponse.json(userWithoutPassword)
    } catch (error) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
    }
  }
  
  