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
        url: 'https://tool-next-backend.onrender.com/',
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
                $ref: '#/components/schemas/BookedPeriod',
              },
              description: 'Booked periods',
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
        CreateToolRequest: {
          type: 'object',
          required: ['name', 'pricePerDay', 'category', 'rentalTerms', 'description'],
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 96,
              example: 'Drill Machine',
            },
            pricePerDay: {
              type: 'number',
              minimum: 0,
              example: 50.0,
            },
            category: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            description: {
              type: 'string',
              minLength: 20,
              maxLength: 2000,
              example: 'Professional drill machine for construction work',
            },
            rentalTerms: {
              type: 'string',
              minLength: 20,
              maxLength: 1000,
              example: 'Minimum rental period: 1 day. Deposit required.',
            },
            specifications: {
              type: 'string',
              description: 'Tool specifications as JSON string (e.g., \'{"power":"1200W","weight":"2.5kg"}\')',
              example: '{"power":"1200W","weight":"2.5kg"}',
            },
            image: {
              type: 'string',
              format: 'binary',
              description: 'Tool image file',
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
            category: {
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
              description: 'Tool specifications as JSON string (e.g., \'{"power":"1500W","weight":"3kg"}\')',
              example: '{"power":"1500W","weight":"3kg"}',
            },
            image: {
              type: 'string',
              format: 'binary',
              description: 'Tool image file',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Category ID',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              description: 'Category title',
              example: 'Power Tools',
            },
            description: {
              type: 'string',
              description: 'Category description',
              example: 'Various power tools for construction',
            },
            keywords: {
              type: 'string',
              description: 'Category keywords',
              example: 'drill, saw, hammer',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Category creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Category last update date',
            },
          },
        },
        BookedPeriod: {
          type: 'object',
          properties: {
            startDate: {
              type: 'string',
              format: 'date',
              example: '2024-01-15',
            },
            endDate: {
              type: 'string',
              format: 'date',
              example: '2024-01-20',
            },
          },
        },
        BookingRequest: {
          type: 'object',
          required: [
            'firstName',
            'lastName',
            'phone',
            'startDate',
            'endDate',
            'deliveryCity',
            'deliveryBranch',
          ],
          properties: {
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            phone: {
              type: 'string',
              example: '+380501234567',
            },
            startDate: {
              type: 'string',
              format: 'date',
              example: '2024-01-15',
            },
            endDate: {
              type: 'string',
              format: 'date',
              example: '2024-01-20',
            },
            deliveryCity: {
              type: 'string',
              example: 'Kyiv',
            },
            deliveryBranch: {
              type: 'string',
              example: 'Branch 1',
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
      '/api/auth/refresh': {
        post: {
          tags: ['Auth'],
          summary: 'Refresh user session',
          description: 'Refreshes user session and returns new session cookies',
          responses: {
            200: {
              description: 'Session successfully refreshed',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Session refreshed',
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'Session not found or expired',
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
      '/api/users/me': {
        get: {
          tags: ['Users'],
          summary: 'Get current user',
          description: 'Returns current authenticated user information',
          security: [
            {
              cookieAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'User found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
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
                minimum: 5,
                maximum: 20,
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
      '/api/tools': {
        get: {
          tags: ['Tools'],
          summary: 'Get all tools',
          description: 'Returns paginated list of tools with optional filtering',
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
                maximum: 20,
                default: 8,
                example: 8,
              },
            },
            {
              name: 'category',
              in: 'query',
              required: false,
              description: 'Category ID(s) - comma separated',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439011',
              },
            },
            {
              name: 'search',
              in: 'query',
              required: false,
              description: 'Search query',
              schema: {
                type: 'string',
                example: 'drill',
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
                      page: {
                        type: 'number',
                        example: 1,
                      },
                      perPage: {
                        type: 'number',
                        example: 8,
                      },
                      totalTools: {
                        type: 'number',
                        example: 40,
                      },
                      totalPages: {
                        type: 'number',
                        example: 5,
                      },
                      tools: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Tool',
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
        post: {
          tags: ['Tools'],
          summary: 'Create tool',
          description:
            'Creates a new tool. Requires authentication. Image is required.',
          security: [
            {
              cookieAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  $ref: '#/components/schemas/CreateToolRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Tool successfully created',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Tool',
                  },
                },
              },
            },
            400: {
              description: 'Validation error or image required',
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
      '/api/tools/{toolId}/availability': {
        get: {
          tags: ['Tools'],
          summary: 'Check tool availability',
          description: 'Returns booked periods for a tool',
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
              description: 'Availability information',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      bookedPeriods: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/BookedPeriod',
                        },
                        example: [
                          {
                            startDate: '2024-01-15',
                            endDate: '2024-01-20',
                          },
                        ],
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
      },
      '/api/bookings/{toolId}': {
        post: {
          tags: ['Bookings'],
          summary: 'Create booking',
          description:
            'Creates a new booking for a tool. Requires authentication.',
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
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BookingRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Booking successfully created',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Successful booking',
                      },
                      booked: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011',
                          },
                          userId: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011',
                          },
                          tool: {
                            type: 'object',
                            properties: {
                              id: {
                                type: 'string',
                                example: '507f1f77bcf86cd799439011',
                              },
                              name: {
                                type: 'string',
                                example: 'Drill Machine',
                              },
                              pricePerDay: {
                                type: 'number',
                                example: 50.0,
                              },
                            },
                          },
                          customerInfo: {
                            type: 'object',
                            properties: {
                              firstName: {
                                type: 'string',
                                example: 'John',
                              },
                              lastName: {
                                type: 'string',
                                example: 'Doe',
                              },
                              phone: {
                                type: 'string',
                                example: '+380501234567',
                              },
                            },
                          },
                          rentalPeriod: {
                            type: 'object',
                            properties: {
                              startDate: {
                                type: 'string',
                                format: 'date',
                                example: '2024-01-15',
                              },
                              endDate: {
                                type: 'string',
                                format: 'date',
                                example: '2024-01-20',
                              },
                              days: {
                                type: 'number',
                                example: 6,
                              },
                            },
                          },
                          delivery: {
                            type: 'object',
                            properties: {
                              city: {
                                type: 'string',
                                example: 'Kyiv',
                              },
                              branch: {
                                type: 'string',
                                example: 'Branch 1',
                              },
                            },
                          },
                          totalPrice: {
                            type: 'number',
                            example: 300.0,
                          },
                          status: {
                            type: 'string',
                            example: 'pending',
                          },
                          createdAt: {
                            type: 'string',
                            format: 'date-time',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Validation error or invalid dates',
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
            409: {
              description: 'Tool is not available for selected dates',
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
      '/api/categories': {
        get: {
          tags: ['Categories'],
          summary: 'Get all categories',
          description: 'Returns list of all categories',
          responses: {
            200: {
              description: 'Categories found',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category',
                    },
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
