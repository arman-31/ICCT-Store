import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in .env");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

if (!cached.conn) {
  cached.promise = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  }).then((mongoose) => {
    console.log("✅ MongoDB Connected Successfully!");
    return mongoose;
  }).catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
    throw error;
  });

  cached.conn = await cached.promise;
}

export default cached.conn;

  