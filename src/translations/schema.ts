export const translationsSchemas = {
  findAll: {
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
