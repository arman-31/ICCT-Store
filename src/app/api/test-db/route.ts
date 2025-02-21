import { NextResponse } from "next/server"
import connectDB from "app/lib/db"

export async function GET() {
  try {
    const mongoose = await connectDB()

    if (!mongoose) {
      throw new Error("Failed to connect to database")
    }

    const isConnected = mongoose.connection.readyState === 1

    if (isConnected) {
      // List all collections to verify connection
      const collections = await mongoose.connection.db.collections()
      const collectionNames = collections.map((c: { collectionName: any }) => c.collectionName)

      return NextResponse.json({
        status: "success",
        message: "Successfully connected to MongoDB",
        database: mongoose.connection.db.databaseName,
        collections: collectionNames,
        connectionState: "Connected",
      })
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "Database not connected",
          connectionState: "Disconnected",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to database",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

