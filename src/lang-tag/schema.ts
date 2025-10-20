import { FastifySchema } from "fastify";
export const langTagSchemas: Record<string, FastifySchema> = {
  findAll: {
    tags: ['lang-tag'],
    summary: '获取语言标签列表',
    description: '获取语言标签列表',
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
  create: {
    tags: ['lang-tag'],
    summary: '创建语言标签',
    description: '创建语言标签',
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
  findById: {
    tags: ['lang-tag'],
    summary: '获取语言标签详情',
    description: '获取语言标签详情',
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
  update: {
    tags: ['lang-tag'],
    summary: '更新语言标签',
    description: '更新语言标签',
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
  remove: {
    tags: ['lang-tag'],
    summary: '删除语言标签',
    description: '删除语言标签',
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
}
