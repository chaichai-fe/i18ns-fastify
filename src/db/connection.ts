import mysql from 'mysql2/promise'

/**
 * Validate database connection
 * @returns Promise<boolean> Returns true if connection succeeds, false if fails
 */
export async function validateDatabaseConnection(): Promise<boolean> {
  const connectionString = process.env.DATABASE_URL

  console.log('🔄 Validating database connection...', connectionString)

  if (!connectionString) {
    console.error('❌ DATABASE_URL environment variable is not set')
    return false
  }

  try {
    console.log('🔄 Validating database connection...')

    // Create database connection
    const connection = await mysql.createConnection(connectionString)

    // Execute a simple query to validate the connection
    await connection.execute('SELECT 1 as test')

    // Close the connection
    await connection.end()

    console.log('✅ Database connection validation successful')
    return true
  } catch (error) {
    console.error('❌ Database connection validation failed:', error)
    return false
  }
}

