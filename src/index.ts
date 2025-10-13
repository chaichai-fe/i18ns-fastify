import { ENV } from './config/env'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { validateDatabasePlugin } from './db/validate_db_plugin'
import { authRoutes } from './auth/routes'
import { businessTagRoutes } from './business-tag/routes'
import { langTagRoutes } from './lang-tag/routes'
import { translationsRoutes } from './translations/routes'

// 应用启动函数
async function startApplication() {
  try {
    console.log('🚀 Translation API 正在启动...')

    // 创建 Fastify 应用
    const fastify = Fastify({
      logger: {
        level: 'info',
        transport: {
          target: 'pino-pretty',
        },
      },
    })

    // 注册数据库验证插件
    await fastify.register(validateDatabasePlugin)

    // Register CORS
    await fastify.register(cors, {
      origin: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      credentials: true,
    })

    // Register JWT
    await fastify.register(jwt, {
      secret: ENV.JWT_SECRET,
    })

    // Register Swagger
    await fastify.register(swagger, {
      openapi: {
        info: {
          title: 'I18n Translation API',
          version: '1.0.0',
          description: 'Translation API built with Fastify',
        },
        servers: [
          {
            url: `http://localhost:${ENV.PORT}`,
            description:
              ENV.NODE_ENV === 'production'
                ? 'Production server'
                : 'Development server',
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description: '请输入 JWT token（不需要加 Bearer 前缀）',
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    })

    await fastify.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
        defaultModelsExpandDepth: 1,
        displayRequestDuration: true,
        filter: true,
        tryItOutEnabled: true,
        // 持久化授权
        persistAuthorization: true,
      },
      staticCSP: true,
      transformStaticCSP: (header: string) => header,
    } as any)

    // Register routes
    await fastify.register(authRoutes, { prefix: '/api/auth' })
    await fastify.register(businessTagRoutes, { prefix: '/api/business-tags' })
    await fastify.register(langTagRoutes, { prefix: '/api/lang-tags' })
    await fastify.register(translationsRoutes, { prefix: '/api/translations' })

    // Root route
    fastify.get('/', () => {
      return {
        message: 'I18n Translation API is running!',
        version: '1.0.0',
        docs: '/docs',
      }
    })

    // 启动服务器
    await fastify.listen({ port: ENV.PORT, host: ENV.HOST })

    console.log(`🚀 Translation API 运行中: http://${ENV.HOST}:${ENV.PORT}`)
    console.log(`📚 API 文档: http://${ENV.HOST}:${ENV.PORT}/docs`)
    console.log(`🌍 当前环境: ${ENV.NODE_ENV}`)
  } catch (error) {
    console.error('💥 应用启动失败:', error)
    process.exit(1)
  }
}

// Start the application
startApplication()
