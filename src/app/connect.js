import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://Arman-31:12311561@icct-store.yoct9.mongodb.net/ICCT-Store?retryWrites=true&w=majority");
    console.log("✅ MongoDB Connected!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}

connectDB();
