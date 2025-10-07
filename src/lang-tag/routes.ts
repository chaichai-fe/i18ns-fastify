import { FastifyInstance } from 'fastify'
import { LangTagService } from './service'
import {
  CreateLangTagDto,
  LangTag,
  PaginationDto,
  PaginatedResponse,
} from './types'

const langTagService = new LangTagService()

export async function langTagRoutes(fastify: FastifyInstance) {
  // Get all language tags with pagination
  fastify.get<{
    Querystring: PaginationDto
    Reply: {
      200: {
        statusCode: number
        message: string
        result: PaginatedResponse<LangTag>
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
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'number', minimum: 1 },
            pageSize: { type: 'number', minimum: 1, maximum: 100 },
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
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                      },
                    },
                  },
                  total: { type: 'number' },
                  page: { type: 'number' },
                  pageSize: { type: 'number' },
                  totalPages: { type: 'number' },
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
        const { page = 1, pageSize = 10 } = request.query
        const result = await langTagService.findAll({ page, pageSize })
        return reply.status(200).send({
          statusCode: 200,
          message: 'find all success',
          result,
        })
      } catch (error) {
        return reply.status(400).send({
          statusCode: 400,
          message: error instanceof Error ? error.message : 'Query failed',
        })
      }
    }
  )

  // Create language tag
  fastify.post<{
    Body: CreateLangTagDto
    Reply: {
      201: {
        statusCode: number
        message: string
        result: LangTag[]
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
          required: ['name', 'description'],
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
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
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
        const result = await langTagService.create(request.body)
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

  // Get language tag by ID
  fastify.get<{
    Params: { id: number }
    Reply: {
      200: {
        statusCode: number
        message: string
        result: LangTag[]
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
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
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
        const result = await langTagService.findById(id)
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

  // Update language tag
  fastify.put<{
    Params: { id: number }
    Body: CreateLangTagDto
    Reply: {
      200: {
        statusCode: number
        message: string
        result: LangTag[]
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
          required: ['name', 'description'],
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
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
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
        const result = await langTagService.update(id, request.body)
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

  // Delete language tag
  fastify.delete<{
    Params: { id: number }
    Reply: {
      200: {
        statusCode: number
        message: string
        result: LangTag
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
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
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
        const result = await langTagService.remove(id)
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
}
