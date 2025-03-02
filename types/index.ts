// Product types
export interface Product {
    id: number
    name: string
    slug: string
    description?: string
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
  
  // Order types
  export interface Order {
    id: number
    order_number: string
    user_id: number
    total_amount: number
    payment_method: "gcash" | "cash"
    payment_status: "pending" | "paid" | "failed"
    pickup_date: Date
    pickup_time: "morning" | "afternoon"
    status: "pending" | "confirmed" | "ready" | "completed" | "cancelled"
    notes?: string
    created_at: Date
    updated_at: Date
    items?: OrderItem[]
  }
  
  export interface OrderItem {
    product_id: number
    size: string
    quantity: number
    price: number
  }
  
  // Category types
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
  
  