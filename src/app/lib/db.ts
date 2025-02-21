declare global {
    // This adds the type to the global scope
    var mongoose: {
      [x: string]: any
      conn: typeof mongoose | null
      promise: Promise<typeof mongoose> | null
    }
  }
  
  const MONGODB_URI = process.env.MONGODB_URI
  
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env")
  }
  
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentially
   * during API Route usage.
   */
  let cached = global.mongoose
  
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
  }
  
  async function connectDB() {
    if (cached.conn) {
      console.log("🚀 Using cached MongoDB connection")
      return cached.conn
    }
  
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      }
  
      cached.promise = mongoose
        .connect(MONGODB_URI!, opts)
        .then((mongoose: any) => {
          console.log("✅ New MongoDB connection established")
          return mongoose
        })
        .catch((error: any) => {
          console.error("❌ Error connecting to MongoDB:", error)
          throw error
        })
    }
  
    try {
      cached.conn = await cached.promise
    } catch (e) {
      cached.promise = null
      throw e
    }
  
    return cached.conn
  }
  
  export default connectDB
  
  