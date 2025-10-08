import { FastifyInstance } from 'fastify'
import { TranslationsService } from './service'
import { CreateTranslationDto, Translation } from './types'
import type { TranslationContent } from '../db/schema'

const translationsService = new TranslationsService()

export async function translationsRoutes(fastify: FastifyInstance) {
  // Get all translations
  fastify.get<{
    Reply: {
      200: {
        statusCode: number
        message: string
        result: Translation[]
      }
    }
  }>(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
              result: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    business_tag_id: { type: 'number' },
                    translations: { type: 'object' },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (_, reply) => {
      const result = await translationsService.findAll()
      return reply.status(200).send({
        statusCode: 200,
        message: 'find all success',
        result,
      })
    }
  )

  // Create translation
  fastify.post<{
    Body: CreateTranslationDto
    Reply: {
      201: {
        statusCode: number
        message: string
        result: Translation[]
      }
      400: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'description', 'business_tag_id', 'translations'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 100,
            },
            description: {
              type: 'string',
              minLength: 5,
              maxLength: 500,
            },
            business_tag_id: {
              type: 'number',
              minimum: 1,
            },
            translations: {
              type: 'object',
              additionalProperties: true,
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
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    business_tag_id: { type: 'number' },
                    translations: { type: 'object' },
                  },
                },
              },
            },
          },
          400: {
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
        const result = await translationsService.create(request.body)
        return reply.status(201).send({
          statusCode: 201,
          message: 'create success',
          result,
        })
      } catch (error) {
        return reply.status(400).send({
          statusCode: 400,
          message: error instanceof Error ? error.message : 'Create failed',
        })
      }
    }
  )

  // Get translation by ID
  fastify.get<{
    Params: { id: number }
    Reply: {
      200: {
        statusCode: number
        message: string
        result: Translation[]
      }
      404: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
              result: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    business_tag_id: { type: 'number' },
                    translations: { type: 'object' },
                  },
                },
              },
            },
          },
          404: {
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
        const { id } = request.params
        const result = await translationsService.findById(id)
        return reply.status(200).send({
          statusCode: 200,
          message: 'find by id success',
          result,
        })
      } catch (error) {
        return reply.status(404).send({
          statusCode: 404,
          message: error instanceof Error ? error.message : 'Not found',
        })
      }
    }
  )

  // Update translation
  fastify.put<{
    Params: { id: number }
    Body: CreateTranslationDto
    Reply: {
      200: {
        statusCode: number
        message: string
        result: Translation[]
      }
      400: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        body: {
          type: 'object',
          required: ['name', 'description', 'business_tag_id', 'translations'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 100,
            },
            description: {
              type: 'string',
              minLength: 5,
              maxLength: 500,
            },
            business_tag_id: {
              type: 'number',
              minimum: 1,
            },
            translations: {
              type: 'object',
              additionalProperties: true,
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
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    business_tag_id: { type: 'number' },
                    translations: { type: 'object' },
                  },
                },
              },
            },
          },
          400: {
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
        const { id } = request.params
        const result = await translationsService.update(id, request.body)
        return reply.status(200).send({
          statusCode: 200,
          message: 'update success',
          result,
        })
      } catch (error) {
        return reply.status(400).send({
          statusCode: 400,
          message: error instanceof Error ? error.message : 'Update failed',
        })
      }
    }
  )

  // Delete translation
  fastify.delete<{
    Params: { id: number }
    Reply: {
      200: {
        statusCode: number
        message: string
        result: Translation
      }
      404: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
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
                  id: { type: 'number' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  business_tag_id: { type: 'number' },
                  translations: { type: 'object' },
                },
              },
            },
          },
          404: {
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
        const { id } = request.params
        const result = await translationsService.remove(id)
        return reply.status(200).send({
          statusCode: 200,
          message: 'delete success',
          result,
        })
      } catch (error) {
        return reply.status(404).send({
          statusCode: 404,
          message: error instanceof Error ? error.message : 'Delete failed',
        })
      }
    }
  )

  // Export translations as JSON (requires authentication)
  fastify.get<{
    Params: { id: number }
    Reply: {
      200: Translation
      401: {
        statusCode: number
        message: string
      }
      500: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/export/json/:id',
    {
      preHandler: async (request, reply) => {
        try {
          const token = request.headers.authorization?.replace('Bearer ', '')
          if (!token) {
            return reply.status(401).send({
              statusCode: 401,
              message: 'Authorization token required',
            })
          }

          // Verify JWT token
          const payload = fastify.jwt.verify(token)
          if (!payload) {
            return reply.status(401).send({
              statusCode: 401,
              message: 'Invalid token',
            })
          }
        } catch (error) {
          return reply.status(401).send({
            statusCode: 401,
            message: 'Invalid token',
          })
        }
      },
      schema: {
        headers: {
          type: 'object',
          properties: {
            authorization: {
              type: 'string',
              pattern: '^Bearer .+',
            },
          },
          required: ['authorization'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: 'string' },
              business_tag_id: { type: 'number' },
              translations: { type: 'object' },
            },
          },
          401: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
          500: {
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
        const { id } = request.params
        const result = await translationsService.findById(id)

        reply.header(
          'Content-Disposition',
          'attachment; filename=translations.json'
        )
        reply.header('Content-Type', 'application/json')

        return reply.status(200).send(result[0])
      } catch (error) {
        return reply.status(500).send({
          statusCode: 500,
          message: error instanceof Error ? error.message : 'Export failed',
        })
      }
    }
  )
}
