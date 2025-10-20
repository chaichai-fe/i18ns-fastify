import { FastifySchema } from "fastify";

export const authSchemas: Record<string, FastifySchema> = {
  register: {
    tags: ['auth'],
    summary: '用户注册',
    description: '注册新用户账号',
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
  login: {
    tags: ['auth'],
    summary: '用户登录',
    description: '用户登录获取访问令牌',
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
}
