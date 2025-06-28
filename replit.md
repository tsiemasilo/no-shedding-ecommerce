# No Shedding E-commerce Platform

## Overview

This is a full-stack e-commerce platform built for "No Shedding," an electrical equipment retailer. The application features a modern React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence and Drizzle ORM for database management.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: In-memory storage with session-based cart tracking

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared TypeScript schemas and types
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Database Schema
The application uses four main entities defined in `shared/schema.ts`:
- **Categories**: Product categories with name, description, image, and slug
- **Products**: Items with pricing, descriptions, ratings, stock status, and category relationships
- **Cart Items**: Session-based shopping cart with product references and quantities
- **Newsletters**: Email subscription management

### API Endpoints
- **Categories**: `/api/categories` - List and retrieve product categories
- **Products**: `/api/products` - Product catalog with filtering and featured items
- **Cart**: `/api/cart` - Shopping cart operations (add, update, remove, clear)
- **Newsletter**: `/api/newsletter` - Email subscription handling

### Frontend Features
- Responsive product catalog with category navigation
- Shopping cart with real-time updates
- Featured products showcase
- Newsletter subscription
- Brand story and company information
- Toast notifications for user feedback

## Data Flow

1. **Product Display**: Categories and products are fetched from the database and cached using React Query
2. **Shopping Cart**: Cart operations use session-based storage, with items persisted per browser session
3. **User Interactions**: Form submissions (cart, newsletter) trigger API calls with optimistic updates
4. **State Management**: Server state is managed by React Query with automatic caching and revalidation

## External Dependencies

### Production Dependencies
- **UI Framework**: React with Radix UI components
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle with PostgreSQL adapter
- **Validation**: Zod schemas for type-safe data validation
- **Date Handling**: date-fns for date utilities
- **Icons**: Lucide React icon library

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **Vite**: Fast development server and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Mode
- Vite dev server for frontend with HMR (Hot Module Replacement)
- tsx for running TypeScript server files directly
- Environment variables for database connection

### Production Build
1. Frontend: Vite builds static assets to `dist/public`
2. Backend: ESBuild bundles server code to `dist/index.js`
3. Single deployment artifact with both frontend and backend

### Database Management
- Drizzle Kit handles schema migrations
- Push-based deployment with `db:push` command
- PostgreSQL connection via DATABASE_URL environment variable

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 28, 2025. Initial setup