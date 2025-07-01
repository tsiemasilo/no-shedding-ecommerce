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

- July 1, 2025: Completed Google OAuth integration for customer authentication
  - Installed and configured dotenv for environment variable management
  - Successfully implemented Google OAuth strategy with passport-google-oauth20
  - Added dynamic ES module import compatibility for Google OAuth
  - Google "Sign in with Google" button now fully functional
  - Automatic customer account creation from Google profiles
  - Proper redirect URI configuration: https://no-shedding.replit.app/api/auth/google/callback
  - Google OAuth credentials configured and working (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)
  - Users can now authenticate using Google accounts and get automatic customer profiles

- July 1, 2025: Implemented complete customer authentication system
  - Added customers table to database schema with personal details
  - Created customer authentication API routes with secure bcrypt password hashing
  - Built customer authentication React hook with context state management
  - Developed comprehensive customer login/signup page with form validation
  - Integrated customer authentication into header with consolidated login dropdown
  - Single "Sign In" button now provides access to both customer and admin login options
  - Persistent login state using localStorage with welcome messages and logout functionality

- June 30, 2025: Enhanced navbar and increased font sizes
  - Increased navbar height from 16 to 20 (h-16 to h-20) for better prominence
  - Enlarged logo from 12x12 to 16x16 and positioned on far left with flex-shrink-0
  - Increased logo text from text-xl to text-2xl for better visibility
  - Enhanced search bar with larger padding and text-lg font size
  - Upgraded navigation links to text-lg with font-medium weight
  - Enlarged user action icons from w-5 h-5 to w-6 h-6
  - Increased cart count badge size and font weight for better visibility

- June 30, 2025: Set website to 90% zoom level as standard
  - Added CSS zoom property to body element for consistent 90% scaling
  - Website now operates at 90% zoom level across all pages and components
  - Maintained increased base font size at 18px for better readability
  - Provides optimal balance between readability and screen space utilization

- June 30, 2025: Updated out of stock displays with elegant ribbons
  - Replaced full image overlays with top-right corner ribbons
  - Applied consistent red ribbon styling across all product displays
  - Updated product details, subcategory views, and featured products
  - Added professional rotation and shadow effects for visual appeal
  - Product images now remain fully visible with clear status indication

- June 30, 2025: Standardized back button styling across all pages
  - Applied consistent professional design with glassmorphism effects
  - Added hover animations and scale effects for better user interaction
  - Unified styling: white semi-transparent background, navy borders, smooth transitions
  - Updated back buttons in product details, subcategory views, admin dashboard, and error pages
  - Enhanced user experience with pulse animations and proper contrast

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