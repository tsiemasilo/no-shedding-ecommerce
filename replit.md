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

## Recent Changes

- June 30, 2025: Product details page and enhanced navigation
  - Created dedicated product details page with comprehensive product information
  - Added clickable product cards throughout the application for seamless navigation
  - Implemented individual product API endpoint (/api/products/:id)
  - Enhanced product display with detailed descriptions, ratings, pricing, and stock status
  - Added trust indicators (secure payment, free shipping, return policy)
  - Integrated shopping cart functionality directly on product details page
  - Fixed subcategory dropdown selection in admin dashboard for proper product categorization

- June 30, 2025: Database migration and product catalog reset
  - Removed all existing products from the system
  - Migrated from in-memory storage to PostgreSQL database storage
  - New products added through admin dashboard are now saved to database
  - Maintained all categories and subcategories with proper structure
  - Currency conversion completed to South African Rands (R) throughout the site

- June 30, 2025: Enhanced subcategory functionality and Power Solutions expansion
  - Fixed subcategory product browsing with proper navigation and empty states
  - Added drag and drop image upload functionality for admin dashboard
  - Expanded Power Solutions with two subcategories: Power Banks and UPS Devices
  - Implemented appropriate icons (Smartphone for Power Banks, Shield for UPS Devices)
  - Added comprehensive product listing views for all subcategories
  - Enhanced empty state messaging: "No Products Yet - Products will be available soon"

- June 28, 2025: Complete redesign with vibrant color palette
  - Applied exact brand colors: Navy Blue #0A2342, Electric Yellow #FFC300, Sand #FDF6EC, Charcoal #333333, Orange #FF6F00
  - Enhanced hero section with 5-column category layout and trust indicators
  - Modernized header with larger logo and improved search bar
  - Upgraded featured products with hover effects and rating badges
  - Redesigned brand story section with gradient backgrounds and statistics
  - Enhanced newsletter section with social proof and professional styling
  - Improved footer with better organization and emergency contact info

## Changelog

- June 28, 2025: Initial setup and complete visual redesign