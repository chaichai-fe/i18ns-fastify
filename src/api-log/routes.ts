import { FastifyInstance } from 'fastify'
import { ApiLogService } from './service'
import { type PaginationDto, type ApiLog, type PaginatedResponse } from './types'

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
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        page: {
                            type: 'number',
                            minimum: 1,
                            description: '页码',
                        },
                        pageSize: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100,
                            description: '每页数量',
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
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'number' },
                                                path: { type: 'string' },
                                                method: { type: 'string' },
                                                operator: { type: ['string', 'null'] },
                                                operatedAt: { type: 'string' },
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
}

