export const translationsSchemas = {
  findAll: {
    tags: ['translations'],
    summary: '获取翻译列表',
    description: '获取翻译列表',
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
                business_tag_id: { type: 'number' },
                translations: { type: 'object' },
              },
            },
          },
        },
      },
    },
  },
  create: {
    tags: ['translations'],
    summary: '创建翻译',
    description: '创建翻译',
    body: {
      type: 'object',
      required: ['name', 'description', 'business_tag_id', 'translations'],
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
        business_tag_id: {
          type: 'number',
          minimum: 1,
        },
        translations: {
          type: 'object',
          additionalProperties: true,
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
                business_tag_id: { type: 'number' },
                translations: { type: 'object' },
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
    tags: ['translations'],
    summary: '获取翻译详情',
    description: '获取翻译详情',
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
                business_tag_id: { type: 'number' },
                translations: { type: 'object' },
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
    tags: ['translations'],
    summary: '更新翻译',
    description: '更新翻译',
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
    body: {
      type: 'object',
      required: ['name', 'description', 'business_tag_id', 'translations'],
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
        business_tag_id: {
          type: 'number',
          minimum: 1,
        },
        translations: {
          type: 'object',
          additionalProperties: true,
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
                business_tag_id: { type: 'number' },
                translations: { type: 'object' },
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
    tags: ['translations'],
    summary: '删除翻译',
    description: '删除翻译',
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
              business_tag_id: { type: 'number' },
              translations: { type: 'object' },
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
  exportJson: {
    tags: ['translations'],
    summary: '导出翻译为 JSON',
    description: '导出翻译为 JSON',
    headers: {
      type: 'object',
      properties: {
        authorization: {
          type: 'string',
          pattern: '^Bearer .+',
        },
      },
      required: ['authorization'],
    },
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
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
          business_tag_id: { type: 'number' },
          translations: { type: 'object' },
        },
      },
      401: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          message: { type: 'string' },
        },
      },
      500: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          message: { type: 'string' },
        },
      },
    },
  },
}
