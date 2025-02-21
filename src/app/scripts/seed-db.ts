import connectDB from "app/lib/db"
import Category from "app/models/Category"
import Product from "app/models/Product"
import User from "app/models/User"
import bcrypt from "bcryptjs"

async function seedDB() {
  try {
    await connectDB()
    console.log("Connected to MongoDB")

    // Clear existing data
    await Category.deleteMany({})
    await Product.deleteMany({})
    await User.deleteMany({})

    // Create categories
    const categories = await Category.insertMany([
      {
        name: "T-Shirts",
        description: "School T-Shirts collection",
        image: "/placeholder.svg",
      },
      {
        name: "Hoodies",
        description: "School Hoodies collection",
        image: "/placeholder.svg",
      },
    ])
    console.log("Categories created:", categories)

    // Create products
    const products = await Product.insertMany([
      {
        name: "School Logo T-Shirt",
        description: "Classic school t-shirt with embroidered logo",
        price: 19.99,
        images: ["/placeholder.svg"],
        category: categories[0]._id,
        sizes: [
          { name: "S", stock: 20 },
          { name: "M", stock: 30 },
          { name: "L", stock: 25 },
          { name: "XL", stock: 15 },
        ],
        featured: true,
      },
      {
        name: "School Hoodie",
        description: "Warm and comfortable school hoodie",
        price: 39.99,
        images: ["/placeholder.svg"],
        category: categories[1]._id,
        sizes: [
          { name: "S", stock: 15 },
          { name: "M", stock: 25 },
          { name: "L", stock: 20 },
          { name: "XL", stock: 10 },
        ],
        featured: true,
      },
    ])
    console.log("Products created:", products)

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10)
    const admin = await User.create({
      fullName: "Admin User",
      studentId: "ADMIN001",
      email: "admin@school.com",
      password: hashedPassword,
      role: "admin",
    })
    console.log("Admin user created:", admin)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    process.exit()
  }
}

seedDB()

