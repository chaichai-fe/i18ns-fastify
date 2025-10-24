import { FastifyPluginAsync } from 'fastify'
import mysql from 'mysql2/promise'

/**
 * 数据库插件选项
 */
export interface DatabasePluginOptions {
    connectionString?: string
}

/**
 * Fastify 数据库插件
 * - 在应用启动时验证数据库连接
 */
export const validateDatabasePlugin: FastifyPluginAsync<DatabasePluginOptions> = async (
    fastify,
    options
) => {
    const connectionString = options.connectionString ?? process.env.DATABASE_URL

    fastify.log.info(`🔄 Database connection string: ${connectionString}`)

    if (!connectionString) {
        throw new Error('❌ DATABASE_URL environment variable is not set')
    }

    try {
        // 创建测试连接
        const connection = await mysql.createConnection(connectionString)

        // 执行简单查询验证连接
        await connection.execute('SELECT 1 as test')

        // 关闭测试连接
        await connection.end()

        fastify.log.info('✅ Database connection validation successful')
    } catch (error) {
        fastify.log.error('❌ Database connection validation failed')
        throw new Error(`Database connection validation failed: ${error}`)
    }
}

