import mysql from "mysql2/promise"

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Type for query parameters
interface QueryParams {
  query: string
  values?: any[]
}

// Execute query function
export async function executeQuery<T>({ query, values }: QueryParams): Promise<T> {
  try {
    const [result] = await pool.execute(query, values)
    return result as T
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Database error")
  }
}

// Export both pool and executeQuery
export { pool }


