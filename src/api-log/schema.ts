import { FastifySchema } from "fastify";

export const apiLogSchemas: Record<string, FastifySchema> = {
  findAll: {
    tags: ['api-log'],
    summary: '获取 API 日志列表',
    description: '获取 API 日志列表',
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
  clearOld: {
    tags: ['api-log'],
    summary: '清除六个月之前的日志',
    description: '删除六个月之前的所有API日志记录',
    response: {
      200: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          message: { type: 'string' },
          result: {
            type: 'object',
            properties: {
              deletedCount: { type: 'number' },
              message: { type: 'string' },
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
  clearAll: {
    tags: ['api-log'],
    summary: '清除所有日志',
    description: '删除所有API日志记录',
    response: {
      200: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          message: { type: 'string' },
          result: {
            type: 'object',
            properties: {
              deletedCount: { type: 'number' },
              message: { type: 'string' },
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
}
