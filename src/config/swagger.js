import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tool Next Backend API',
      version: '1.0.0',
      description: 'API documentation for Tool Next Backend application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'sessionId',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              description: 'User name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
              example: 'john.doe@example.com',
            },
            avatarUrl: {
              type: 'string',
              format: 'uri',
              description: 'User avatar URL',
              example:
                'https://ac.goit.global/fullstack/react/default-avatar.jpg',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update date',
            },
          },
        },
        Tool: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Tool ID',
              example: '507f1f77bcf86cd799439011',
            },
            owner: {
              type: 'string',
              description: 'Tool owner ID',
              example: '507f1f77bcf86cd799439011',
            },
            category: {
              type: 'string',
              description: 'Category ID',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              description: 'Tool name',
              example: 'Drill Machine',
            },
            description: {
              type: 'string',
              description: 'Tool description',
              example: 'Professional drill machine for construction work',
            },
            pricePerDay: {
              type: 'number',
              description: 'Price per day in currency units',
              example: 50.0,
            },
            images: {
              type: 'string',
              format: 'uri',
              description: 'Tool image URL',
              example: 'https://example.com/image.jpg',
            },
            rating: {
              type: 'number',
              description: 'Tool rating',
              example: 4.5,
            },
            specifications: {
              type: 'object',
              description: 'Tool specifications',
            },
            rentalTerms: {
              type: 'string',
              description: 'Rental terms and conditions',
              example: 'Minimum rental period: 1 day',
            },
            bookedDates: {
              type: 'array',
              items: {
                type: 'string',
                format: 'date',
              },
              description: 'Booked dates',
            },
            feedbacks: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of feedback IDs',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tool creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tool last update date',
            },
          },
        },
        Feedback: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Feedback ID',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              description: 'Feedback author name',
              example: 'John Doe',
            },
            description: {
              type: 'string',
              description: 'Feedback description',
              example: 'Great tool, very satisfied!',
            },
            rate: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Rating from 1 to 5',
              example: 5,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Feedback creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Feedback last update date',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 32,
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 64,
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              maxLength: 128,
              example: 'password123',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },
        UpdateToolRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 96,
              example: 'Updated Tool Name',
            },
            pricePerDay: {
              type: 'number',
              minimum: 0,
              example: 75.0,
            },
            categoryId: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            description: {
              type: 'string',
              minLength: 20,
              maxLength: 2000,
              example: 'Updated tool description with more details',
            },
            rentalTerms: {
              type: 'string',
              minLength: 20,
              maxLength: 1000,
              example: 'Updated rental terms and conditions',
            },
            specifications: {
              type: 'string',
              maxLength: 1000,
              example: 'Updated specifications',
            },
            images: {
              type: 'string',
              format: 'uri',
              example: 'https://example.com/new-image.jpg',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
        PaginationResponse: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              example: 1,
            },
            perPage: {
              type: 'number',
              example: 8,
            },
            totalPages: {
              type: 'number',
              example: 5,
            },
            totalTools: {
              type: 'number',
              example: 40,
            },
            pagination: {
              type: 'object',
              properties: {
                hasNextPage: {
                  type: 'boolean',
                  example: true,
                },
                hasPrevPage: {
                  type: 'boolean',
                  example: false,
                },
                nextPage: {
                  type: 'number',
                  nullable: true,
                  example: 2,
                },
                prevPage: {
                  type: 'number',
                  nullable: true,
                  example: null,
                },
              },
            },
          },
        },
      },
    },
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          description:
            'Creates a new user account and returns user data with session cookies',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User successfully registered',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      newUser: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
            409: {
              description: 'Email already in use',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            400: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login user',
          description:
            'Authenticates user and returns user data with session cookies',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'User successfully logged in',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            401: {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            400: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Logout user',
          description: 'Logs out user and clears session cookies',
          security: [
            {
              cookieAuth: [],
            },
          ],
          responses: {
            204: {
              description: 'User successfully logged out',
            },
          },
        },
      },
      '/api/users/{userId}': {
        get: {
          tags: ['Users'],
          summary: 'Get public user by ID',
          description: 'Returns public user information by user ID',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              description: 'User ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439011',
              },
            },
          ],
          responses: {
            200: {
              description: 'User found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        example: 'John Doe',
                      },
                      avatar: {
                        type: 'string',
                        format: 'uri',
                        example:
                          'https://ac.goit.global/fullstack/react/default-avatar.jpg',
                      },
                      email: {
                        type: 'string',
                        format: 'email',
                        example: 'john.doe@example.com',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            400: {
              description: 'Invalid user ID format',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/api/users/{userId}/tools': {
        get: {
          tags: ['Users'],
          summary: 'Get user tools',
          description: 'Returns paginated list of tools owned by a user',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              description: 'User ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439011',
              },
            },
            {
              name: 'page',
              in: 'query',
              required: false,
              description: 'Page number',
              schema: {
                type: 'number',
                default: 1,
                example: 1,
              },
            },
            {
              name: 'perPage',
              in: 'query',
              required: false,
              description: 'Items per page',
              schema: {
                type: 'number',
                default: 8,
                example: 8,
              },
            },
          ],
          responses: {
            200: {
              description: 'Tools found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      user: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            example: 'John Doe',
                          },
                          avatarUrl: {
                            type: 'string',
                            format: 'uri',
                            example:
                              'https://ac.goit.global/fullstack/react/default-avatar.jpg',
                          },
                        },
                      },
                      page: {
                        type: 'number',
                        example: 1,
                      },
                      perPage: {
                        type: 'number',
                        example: 8,
                      },
                      totalPages: {
                        type: 'number',
                        example: 5,
                      },
                      totalTools: {
                        type: 'number',
                        example: 40,
                      },
                      pagination: {
                        type: 'object',
                        properties: {
                          hasNextPage: {
                            type: 'boolean',
                            example: true,
                          },
                          hasPrevPage: {
                            type: 'boolean',
                            example: false,
                          },
                          nextPage: {
                            type: 'number',
                            nullable: true,
                            example: 2,
                          },
                          prevPage: {
                            type: 'number',
                            nullable: true,
                            example: null,
                          },
                        },
                      },
                      tools: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                            },
                            name: {
                              type: 'string',
                            },
                            pricePerDay: {
                              type: 'number',
                            },
                            images: {
                              type: 'string',
                              format: 'uri',
                            },
                            rating: {
                              type: 'number',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            400: {
              description: 'Invalid user ID format',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/{toolId}': {
        get: {
          tags: ['Tools'],
          summary: 'Get tool by ID',
          description: 'Returns tool information by tool ID',
          parameters: [
            {
              name: 'toolId',
              in: 'path',
              required: true,
              description: 'Tool ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439011',
              },
            },
          ],
          responses: {
            200: {
              description: 'Tool found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Tool',
                  },
                },
              },
            },
            404: {
              description: 'Tool not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            400: {
              description: 'Invalid tool ID format',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
        patch: {
          tags: ['Tools'],
          summary: 'Update tool',
          description:
            'Updates tool information. Requires authentication and ownership.',
          security: [
            {
              cookieAuth: [],
            },
          ],
          parameters: [
            {
              name: 'toolId',
              in: 'path',
              required: true,
              description: 'Tool ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439011',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  $ref: '#/components/schemas/UpdateToolRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Tool successfully updated',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Інструмент успішно оновлено.',
                      },
                      tool: {
                        $ref: '#/components/schemas/Tool',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'Tool not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            400: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Tools'],
          summary: 'Delete tool',
          description: 'Deletes a tool. Requires authentication and ownership.',
          security: [
            {
              cookieAuth: [],
            },
          ],
          parameters: [
            {
              name: 'toolId',
              in: 'path',
              required: true,
              description: 'Tool ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439011',
              },
            },
          ],
          responses: {
            200: {
              description: 'Tool successfully deleted',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Tool',
                  },
                },
              },
            },
            404: {
              description: 'Tool not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            400: {
              description: 'Invalid tool ID format',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/api/feedbacks': {
        get: {
          tags: ['Feedbacks'],
          summary: 'Get feedbacks',
          description: 'Returns paginated list of feedbacks',
          parameters: [
            {
              name: 'page',
              in: 'query',
              required: false,
              description: 'Page number',
              schema: {
                type: 'number',
                minimum: 1,
                default: 1,
                example: 1,
              },
            },
            {
              name: 'perPage',
              in: 'query',
              required: false,
              description: 'Items per page',
              schema: {
                type: 'number',
                minimum: 5,
                maximum: 30,
                default: 15,
                example: 15,
              },
            },
          ],
          responses: {
            200: {
              description: 'Feedbacks found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      page: {
                        type: 'number',
                        example: 1,
                      },
                      perPage: {
                        type: 'number',
                        example: 15,
                      },
                      totalItems: {
                        type: 'number',
                        example: 100,
                      },
                      totalPages: {
                        type: 'number',
                        example: 7,
                      },
                      feedbacks: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Feedback',
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
