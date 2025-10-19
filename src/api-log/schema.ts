export const apiLogSchemas = {
  findAll: {
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
}
