import connectDB from "app/lib/db"
import Category from "app/models/Category"
import Product from "app/models/Product"

async function testDB() {
  try {
    // Connect to MongoDB
    await connectDB()
    console.log("Connected to MongoDB")

    // Create a test category
    const category = await Category.create({
      name: "Test Category",
      description: "This is a test category",
    })
    console.log("Created category:", category)

    // Create a test product
    const product = await Product.create({
      name: "Test Product",
      description: "This is a test product",
      price: 29.99,
      images: ["/placeholder.svg"],
      category: category._id,
      sizes: [
        { name: "M", stock: 10 },
        { name: "L", stock: 15 },
      ],
    })
    console.log("Created product:", product)

    // Fetch the product with populated category
    const fetchedProduct = await Product.findById(product._id).populate("category")
    console.log("Fetched product with category:", fetchedProduct)
  } catch (error) {
    console.error("Error:", error)
  } finally {
    process.exit()
  }
}

testDB()

