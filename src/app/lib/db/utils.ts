import Product, { ProductModel } from "app/models/Product";
import Category from "app/models/Category";
import Order from "app/models/Order";

export async function getProducts(query = {}) {
  try {
    const products = await Product.find(query).populate("category").sort({ createdAt: -1 })
    return products
  } catch (error) {
    throw new Error("Failed to fetch products")
  }
}

export async function getCategories() {
  try {
    const categories = await Category.find({ active: true })
    return categories
  } catch (error) {
    throw new Error("Failed to fetch categories")
  }
}

export async function getOrder(orderNumber: string) {
  try {
    const order = await Order.findOne({ orderNumber }).populate("user", "-password").populate("items.product")
    return order
  } catch (error) {
    throw new Error("Failed to fetch order")
  }
}

export async function getUserOrders(userId: string) {
  try {
    const orders = await Order.find({ user: userId }).populate("items.product").sort({ createdAt: -1 })
    return orders
  } catch (error) {
    throw new Error("Failed to fetch user orders")
  }
}

export async function updateStock(productId: string, size: string, quantity: number) {
  try {
    const product = await Product.findById(productId)
    if (!product) throw new Error("Product not found")

    const sizeIndex = product.sizes.findIndex((s: { name: string; }) => s.name === size)
    if (sizeIndex === -1) throw new Error("Size not found")

    const newStock = product.sizes[sizeIndex].stock - quantity
    if (newStock < 0) throw new Error("Insufficient stock")

    product.sizes[sizeIndex].stock = newStock
    product.totalStock = product.sizes.reduce((acc: any, size: { stock: any; }) => acc + size.stock, 0)

    await product.save()
    return product
  } catch (error) {
    throw error
  }
}

