import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { ApiLogService } from '../api-log/service'
import db from '../db'
import { userTable } from '../db/schema'
import { eq } from 'drizzle-orm'

/**
 * API 日志插件选项
 */
export interface ApiLogPluginOptions {
    /**
     * 需要排除的路径（不记录日志）
     * @default ['/api/auth/login', '/api/auth/register']
     */
    excludePaths?: string[]
    /**
     * 需要记录的 HTTP 方法
     * @default ['POST', 'PUT', 'PATCH', 'DELETE']
     */
    methodsToLog?: string[]
}

/**
 * Fastify API 日志记录插件
 * - 自动记录指定方法的 API 调用
 * - 可以通过配置排除特定路径
 */
const apiLogPluginCore: FastifyPluginAsync<ApiLogPluginOptions> = async (
    fastify,
    options
) => {
    // 默认排除登录和注册接口
    const excludePaths = options.excludePaths ?? [
        '/api/auth/login',
        '/api/auth/register',
    ]

    // 默认记录的 HTTP 方法（新增、更新、删除操作）
    const methodsToLog = options.methodsToLog ?? ['POST', 'PUT', 'PATCH', 'DELETE']

    const apiLogService = new ApiLogService()

    fastify.log.info('✅ API log recording plugin registered')

    // 使用 onResponse 钩子记录 API 调用
    fastify.addHook('onResponse', async (request, reply) => {
        console.log('onResponse', request, reply)
        try {
            const method = request.method
            const path = request.url

            // 检查是否是需要记录的方法
            if (!methodsToLog.includes(method)) {
                return
            }

            // 检查是否在排除列表中
            const isExcluded = excludePaths.some((excludePath) => {
                // 支持精确匹配和前缀匹配
                return path === excludePath || path.startsWith(excludePath)
            })

            if (isExcluded) {
                return
            }

            // 获取操作人信息（从 JWT token 中）
            let operator: string | null = null
            try {
                const token = request.headers.authorization?.replace('Bearer ', '')
                if (token) {
                    const payload = fastify.jwt.verify(token) as { userId: number }
                    if (payload?.userId) {
                        // 根据 userId 查询用户 email
                        const [user] = await db
                            .select({ email: userTable.email })
                            .from(userTable)
                            .where(eq(userTable.id, payload.userId))

                        if (user) {
                            operator = user.email
                        }
                    }
                }
            } catch (error) {
                // JWT 验证失败或查询用户失败，operator 保持为 null
                fastify.log.debug('无法获取操作人信息，将记录为匿名操作')
            }

            // 记录日志到数据库
            await apiLogService.create(path, method, operator)

            fastify.log.debug(`📝 API 日志已记录: ${method} ${path} (操作人: ${operator || '匿名'})`)
        } catch (error) {
            // 日志记录失败不应该影响主业务流程
            fastify.log.error('❌ API 日志记录失败')
            fastify.log.error(error)
        }
    })
}

// 使用 fastify-plugin 包装，去除封装，让钩子作用于全局
export const apiLogPlugin = fp(apiLogPluginCore, {
    name: 'api-log-plugin',
    fastify: '5.x'
})

