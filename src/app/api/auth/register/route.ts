import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "app/lib/db"
import {User} from "app/models/User"



export async function POST(request: Request) {
  try {
    await connectDB()
    const { fullName, studentId, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { studentId }],
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      fullName,
      studentId,
      email,
      password: hashedPassword,
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject()

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

