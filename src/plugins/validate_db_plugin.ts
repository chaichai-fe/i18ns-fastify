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

    fastify.log.info(`🔄 正在验证数据库连接...${connectionString}`)

    if (!connectionString) {
        throw new Error('❌ DATABASE_URL 环境变量未设置')
    }

    try {
        // 创建测试连接
        const connection = await mysql.createConnection(connectionString)

        // 执行简单查询验证连接
        await connection.execute('SELECT 1 as test')

        // 关闭测试连接
        await connection.end()

        fastify.log.info('✅ 数据库连接验证成功')
    } catch (error) {
        fastify.log.error('❌ 数据库连接验证失败')
        throw new Error(`数据库连接验证失败: ${error}`)
    }
}

