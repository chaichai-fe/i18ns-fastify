import { FastifyInstance } from 'fastify'
import { AuthService } from './service'
import { CreateUserDto, LoginUserDto, AuthResponse } from './types'

const authService = new AuthService()

export async function authRoutes(fastify: FastifyInstance) {
  // Register route
  fastify.post<{
    Body: CreateUserDto
    Reply: {
      201: {
        statusCode: number
        message: string
        result: AuthResponse
      }
      409: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/register',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 50,
            },
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
              minLength: 6,
              maxLength: 100,
            },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
              result: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      name: { type: 'string' },
                      email: { type: 'string' },
                    },
                  },
                  token: { type: 'string' },
                },
              },
            },
          },
          409: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const result = await authService.register(
          request.body,
          fastify.jwt.sign
        )
        return reply.status(201).send({
          statusCode: 201,
          message: 'Registration successful',
          result,
        })
      } catch (error) {
        return reply.status(409).send({
          statusCode: 409,
          message:
            error instanceof Error ? error.message : 'Registration failed',
        })
      }
    }
  )

  // Login route
  fastify.post<{
    Body: LoginUserDto
    Reply: {
      200: {
        statusCode: number
        message: string
        result: AuthResponse
      }
      401: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/login',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
              minLength: 1,
            },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
              result: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      name: { type: 'string' },
                      email: { type: 'string' },
                    },
                  },
                  token: { type: 'string' },
                },
              },
            },
          },
          401: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const result = await authService.login(request.body, fastify.jwt.sign)
        return reply.status(200).send({
          statusCode: 200,
          message: 'Login successful',
          result,
        })
      } catch (error) {
        return reply.status(401).send({
          statusCode: 401,
          message: error instanceof Error ? error.message : 'Login failed',
        })
      }
    }
  )
}
