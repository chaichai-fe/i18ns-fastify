import { FastifyInstance } from 'fastify'
import { TranslationsService } from './service'
import { CreateTranslationDto, Translation } from './types'
import { translationsSchemas } from './schema'

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
      schema: translationsSchemas.findAll,
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
      schema: translationsSchemas.create,
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
      schema: translationsSchemas.findById,
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
      schema: translationsSchemas.update,
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
      schema: translationsSchemas.remove,
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
      schema: translationsSchemas.exportJson,
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
