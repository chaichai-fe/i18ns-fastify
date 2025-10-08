import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { validateDatabaseConnection } from './db/connection'
import { authRoutes } from './auth/routes'
import { businessTagRoutes } from './business-tag/routes'
import { langTagRoutes } from './lang-tag/routes'
import { translationsRoutes } from './translations/routes'

// Database connection validation and application startup function
async function startApplication() {
  try {
    console.log('🚀 Translation API is starting...')

    // Validate database connection
    const isDatabaseConnected = await validateDatabaseConnection()

    if (!isDatabaseConnected) {
      console.error(
        '💥 Application startup failed: Database connection validation failed'
      )
      process.exit(1)
    }

    // Create Fastify application
    const fastify = Fastify({
      logger: {
        level: 'info',
        transport: {
          target: 'pino-pretty',
        },
      },
    })

    // Register CORS
    await fastify.register(cors, {
      origin: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      credentials: true,
    })

    // Register JWT
    await fastify.register(jwt, {
      secret: process.env.JWT_SECRET!,
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
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: 'Development server',
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
    fastify.get('/', async (request, reply) => {
      return {
        message: 'I18n Translation API is running!',
        version: '1.0.0',
        docs: '/docs',
      }
    })

    // Start the server
    const port = Number(process.env.PORT) || 3000
    const host = process.env.HOST || '0.0.0.0'

    await fastify.listen({ port, host })

    console.log('✅ Database connection validation passed')
    console.log(`🚀 Translation API is running: http://${host}:${port}`)
    console.log(`📚 API Documentation: http://${host}:${port}/docs`)
  } catch (error) {
    console.error('💥 Application startup failed:', error)
    process.exit(1)
  }
}

// Start the application
startApplication()
