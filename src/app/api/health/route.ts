import { NextResponse } from "next/server"
import { validateDBConnection } from "app/lib/validate-db"

export async function GET() {
  try {
    const isConnected = await validateDBConnection()

    if (!isConnected) {
      return NextResponse.json(
        {
          status: "error",
          message: "Database connection failed",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      status: "healthy",
      message: "Database connection successful",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

