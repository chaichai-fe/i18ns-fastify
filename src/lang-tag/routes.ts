import { FastifyInstance } from 'fastify'
import { LangTagService } from './service'
import {
  CreateLangTagDto,
  LangTag,
  PaginationDto,
  PaginatedResponse,
} from './types'
import { langTagSchemas } from './schema'

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
      schema: langTagSchemas.findAll,
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
      schema: langTagSchemas.create,
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
      schema: langTagSchemas.findById,
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
      schema: langTagSchemas.update,
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
      schema: langTagSchemas.remove,
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
