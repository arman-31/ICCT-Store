import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  suer: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSQORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnection: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function executeQuery<T>({ query, value}: {
  query: string; value?: any[] }): Promise<T> {
    try {
      const [result] = await pool.execute(query, value)
      return result as T
    } catch (error) {
      throw new Error(error instaceof Error ? error.message :
        "Database error")
    }
  }

  export default pool

  