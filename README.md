# I18n Translation API - Fastify Version

A translation API built with Fastify, featuring business tags, language tags, and translation management.

## Features

- **Authentication**: JWT-based user authentication
- **Business Tags**: Manage business categories for translations
- **Language Tags**: Manage supported languages
- **Translations**: Create and manage multilingual content
- **Export**: Export translations as JSON (with authentication)
- **API Documentation**: Swagger UI at `/docs`

## Tech Stack

- **Framework**: Fastify
- **Database**: MySQL with Drizzle ORM
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL database
- pnpm

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy environment variables:

   ```bash
   cp env.example .env
   ```

4. Configure your `.env` file with your database credentials and JWT secret

5. Run database migrations:

   ```bash
   pnpm run db:push
   ```

6. Start the development server:
   ```bash
   pnpm run dev
   ```

The API will be available at `http://localhost:3000` and documentation at `http://localhost:3000/docs`.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Business Tags

- `GET /api/business-tags` - Get all business tags (paginated)
- `POST /api/business-tags` - Create business tag
- `GET /api/business-tags/:id` - Get business tag by ID
- `PUT /api/business-tags/:id` - Update business tag
- `DELETE /api/business-tags/:id` - Delete business tag

### Language Tags

- `GET /api/lang-tags` - Get all language tags (paginated)
- `POST /api/lang-tags` - Create language tag
- `GET /api/lang-tags/:id` - Get language tag by ID
- `PUT /api/lang-tags/:id` - Update language tag
- `DELETE /api/lang-tags/:id` - Delete language tag

### Translations

- `GET /api/translations` - Get all translations
- `POST /api/translations` - Create translation
- `GET /api/translations/:id` - Get translation by ID
- `PUT /api/translations/:id` - Update translation
- `DELETE /api/translations/:id` - Delete translation
- `GET /api/translations/export/json` - Export translations as JSON (requires authentication)

## Database Schema

The application uses the following main tables:

- `users` - User accounts
- `business_tags` - Business categories
- `lang_tags` - Supported languages
- `translation` - Translation content

## Development

### Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build the application
- `pnpm start` - Start production server
- `pnpm run db:generate` - Generate database migrations
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:studio` - Open Drizzle Studio

### Project Structure

```
src/
├── auth/           # Authentication module
├── business-tag/   # Business tags module
├── lang-tag/       # Language tags module
├── translations/   # Translations module
├── db/            # Database configuration and schema
└── index.ts       # Main application file
```

## Migration from ElysiaJS

This project is a Fastify migration of the original ElysiaJS version, maintaining:

- Same database schema and configuration
- Identical API endpoints and functionality
- Same business logic and validation
- Fastify best practices and performance optimizations

## License

UNLICENSED
