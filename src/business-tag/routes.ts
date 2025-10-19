import { FastifyInstance } from 'fastify'
import { BusinessTagService } from './service'
import {
  CreateBusinessTagDto,
  BusinessTag,
  PaginationDto,
  PaginatedResponse,
} from './types'
import { businessTagSchemas } from './schema'

const businessTagService = new BusinessTagService()

export async function businessTagRoutes(fastify: FastifyInstance) {
  // Get all business tags with pagination
  fastify.get<{
    Querystring: PaginationDto
    Reply: {
      200: {
        statusCode: number
        message: string
        result: PaginatedResponse<BusinessTag>
      }
      400: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/',
    {
      schema: businessTagSchemas.findAll,
    },
    async (request, reply) => {
      try {
        const { page = 1, pageSize = 10 } = request.query
        const result = await businessTagService.findAll({ page, pageSize })
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

  // Create business tag
  fastify.post<{
    Body: CreateBusinessTagDto
    Reply: {
      201: {
        statusCode: number
        message: string
        result: BusinessTag[]
      }
      400: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/',
    {
      schema: businessTagSchemas.create,
    },
    async (request, reply) => {
      try {
        const result = await businessTagService.create(request.body)
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

  // Get business tag by ID
  fastify.get<{
    Params: { id: number }
    Reply: {
      200: {
        statusCode: number
        message: string
        result: BusinessTag[]
      }
      404: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/:id',
    {
      schema: businessTagSchemas.findById,
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const result = await businessTagService.findById(id)
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

  // Update business tag
  fastify.put<{
    Params: { id: number }
    Body: CreateBusinessTagDto
    Reply: {
      200: {
        statusCode: number
        message: string
        result: BusinessTag[]
      }
      400: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/:id',
    {
      schema: businessTagSchemas.update,
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const result = await businessTagService.update(id, request.body)
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

  // Delete business tag
  fastify.delete<{
    Params: { id: number }
    Reply: {
      200: {
        statusCode: number
        message: string
        result: BusinessTag
      }
      404: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/:id',
    {
      schema: businessTagSchemas.remove,
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const result = await businessTagService.remove(id)
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
