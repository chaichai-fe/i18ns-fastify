import { FastifyInstance } from 'fastify'
import { ApiLogService } from './service'
import {
  type PaginationDto,
  type ApiLog,
  type PaginatedResponse,
} from './types'
import { apiLogSchemas } from './schema'

const apiLogService = new ApiLogService()

export async function apiLogRoutes(fastify: FastifyInstance) {
  // 获取 API 日志列表
  fastify.get<{
    Querystring: PaginationDto
    Reply: {
      200: {
        statusCode: number
        message: string
        result: PaginatedResponse<ApiLog>
      }
      400: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/',
    {
      schema: apiLogSchemas.findAll,
    },
    async (request, reply) => {
      try {
        const { page = 1, pageSize = 20 } = request.query
        const result = await apiLogService.findAll({ page, pageSize })
        return reply.status(200).send({
          statusCode: 200,
          message: 'API logs retrieved successfully',
          result,
        })
      } catch (error) {
        fastify.log.error('Failed to retrieve API logs')
        fastify.log.error(error)
        return reply.status(400).send({
          statusCode: 400,
          message: error instanceof Error ? error.message : 'Query failed',
        })
      }
    }
  )

  // 清除六个月之前的日志
  fastify.delete<{
    Reply: {
      200: {
        statusCode: number
        message: string
        result: {
          deletedCount: number
          message: string
        }
      }
      400: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/clear-old',
    {
      schema: apiLogSchemas.clearOld,
    },
    async (request, reply) => {
      try {
        const deletedCount = await apiLogService.clearOldLogs()
        return reply.status(200).send({
          statusCode: 200,
          message: 'Old logs cleared successfully',
          result: {
            deletedCount,
            message: `Successfully deleted ${deletedCount} old log records`,
          },
        })
      } catch (error) {
        fastify.log.error('Failed to clear old logs')
        fastify.log.error(error)
        return reply.status(400).send({
          statusCode: 400,
          message:
            error instanceof Error ? error.message : 'Failed to clear old logs',
        })
      }
    }
  )

  // 清除所有日志
  fastify.delete<{
    Reply: {
      200: {
        statusCode: number
        message: string
        result: {
          deletedCount: number
          message: string
        }
      }
      400: {
        statusCode: number
        message: string
      }
    }
  }>(
    '/clear-all',
    {
      schema: apiLogSchemas.clearAll,
    },
    async (request, reply) => {
      try {
        fastify.log.info('Starting clear all logs operation')
        const deletedCount = await apiLogService.clearAllLogs()
        fastify.log.info(
          `Clear all logs completed, deleted ${deletedCount} records`
        )

        return reply.status(200).send({
          statusCode: 200,
          message: 'All logs cleared successfully',
          result: {
            deletedCount,
            message: `Successfully deleted ${deletedCount} log records`,
          },
        })
      } catch (error) {
        fastify.log.error('Failed to clear all logs')
        fastify.log.error(error)
        return reply.status(400).send({
          statusCode: 400,
          message:
            error instanceof Error ? error.message : 'Failed to clear all logs',
        })
      }
    }
  )
}
