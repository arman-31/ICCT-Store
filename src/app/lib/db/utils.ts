import type { Product, Order, Category } from "app/models/types"

export function isProduct(obj: any): obj is Product {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.slug === "string" &&
    typeof obj.price === "number" &&
    (obj.description === undefined || typeof obj.description === "string") &&
    typeof obj.active === "boolean" &&
    obj.created_at instanceof Date &&
    obj.updated_at instanceof Date
  )
}

export function isOrder(obj: any): obj is Order {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.order_number === "string" &&
    typeof obj.user_id === "number" &&
    typeof obj.total_amount === "number" &&
    ["gcash", "cash"].includes(obj.payment_method) &&
    ["pending", "paid", "failed"].includes(obj.payment_status) &&
    obj.pickup_date instanceof Date &&
    ["morning", "afternoon"].includes(obj.pickup_time) &&
    ["pending", "confirmed", "ready", "completed", "cancelled"].includes(obj.status) &&
    (obj.notes === undefined || typeof obj.notes === "string") &&
    obj.created_at instanceof Date &&
    obj.updated_at instanceof Date
  )
}

export function isCategory(obj: any): obj is Category {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.slug === "string" &&
    (obj.description === undefined || typeof obj.description === "string") &&
    (obj.image_url === undefined || typeof obj.image_url === "string") &&
    typeof obj.active === "boolean" &&
    obj.created_at instanceof Date &&
    obj.updated_at instanceof Date
  )
}

export function parseProduct(data: any): Product {
  if (!data) throw new Error("Invalid product data")

  // Convert string dates to Date objects
  const product = {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  }

  if (!isProduct(product)) {
    throw new Error("Invalid product structure")
  }

  return product
}

export function parseOrder(data: any): Order {
  if (!data) throw new Error("Invalid order data")

  // Convert string dates to Date objects
  const order = {
    ...data,
    pickup_date: new Date(data.pickup_date),
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  }

  if (!isOrder(order)) {
    throw new Error("Invalid order structure")
  }

  return order
}

export function parseCategory(data: any): Category {
  if (!data) throw new Error("Invalid category data")

  // Convert string dates to Date objects
  const category = {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  }

  if (!isCategory(category)) {
    throw new Error("Invalid category structure")
  }

  return category
}

export function parseDatabaseResponse<T>(data: any, parser: (item: any) => T): T {
  try {
    return parser(data)
  } catch (error) {
    throw new Error(`Failed to parse database response: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export function parseDatabaseResponseArray<T>(data: any[], parser: (item: any) => T): T[] {
  return data.map((item) => parseDatabaseResponse(item, parser))
}

