import  pool  from "app/lib/db"

export async function validateDBConnection() {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    return true
  } catch (error) {
    console.error("Database validation error:", error)
    return false
  }
}

