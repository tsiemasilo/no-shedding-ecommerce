# No Shedding E-commerce Platform

## Overview
This project is a full-stack e-commerce platform for "No Shedding," an electrical equipment retailer. It features a modern React frontend, a Node.js/Express backend, and uses PostgreSQL for data persistence. The platform aims to provide a comprehensive online shopping experience with a focus on product display, shopping cart functionality, and user management. The business vision is to provide a robust and user-friendly e-commerce solution to sell electrical equipment, enhancing market presence and customer accessibility.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
- **Color Scheme**: Navy Blue (#0A2342), Electric Yellow (#FFC300), Sand (#FDF6EC), Charcoal (#333333), Orange (#FF6F00).
- **Styling**: Tailwind CSS with shadcn/ui components, Radix UI primitives.
- **Responsiveness**: Fully responsive design, with mobile-specific layouts and optimized touch targets.
- **Product Display**: Interactive flip-card effects for product listings (desktop only), with object-contain for images. Elegant ribbons for "Out of Stock" indicators.
- **Page Layouts**: Redesigned product pages for readability, comprehensive customer profile page, professional checkout interface with security badges.
- **Navigation**: Standardized back buttons, scroll-to-top on page navigation, refined header with clickable logo and search.
- **Notifications**: Simplified toast notifications for cleaner messaging.
- **Zoom Level**: Standardized 80% zoom level for desktop, with increased base font size (20px) for readability.

### Technical Implementations
- **Frontend**: React with TypeScript, Vite, Wouter for routing, TanStack Query for server state.
- **Backend**: Node.js with Express.js, TypeScript with ES modules.
- **Database ORM**: Drizzle ORM with PostgreSQL dialect.
- **Session Management**: In-memory storage for session-based cart tracking.
- **Authentication**: Unified system with role-based access control for customers and admins, Google OAuth integration, secure bcrypt password hashing. Admin users ("admin"/"admin1") redirected to dashboard, customers to home.
- **Product Management**: Key Features section in product schema and admin interface. Automatic product synchronization across related subcategories (e.g., Surge Protectors, Motion Sensor products).
- **Search**: Functional search bar with a dedicated results page, filtering by name and description.
- **Customer Support**: Comprehensive support page with multiple contact channels, resources, FAQ, and email system (Nodemailer for welcome emails and support requests).
- **Deployment**: Vite for frontend build, ESBuild for backend, single deployment artifact. Drizzle Kit for database migrations.

### Feature Specifications
- **Product Catalog**: Categories, products with pricing, descriptions, ratings, stock status.
- **Shopping Cart**: Session-based, real-time updates.
- **Newsletter**: Email subscription.
- **Admin Dashboard**: Redesigned with professional color scheme, enhanced support dashboard with read/unread and reply status tracking, product creation/editing with automatic cache invalidation.
- **Currency**: South African Rands (R) with space separators for thousands (e.g., R1 000).

### System Design Choices
- **Project Structure**: Clear separation of `client`, `server`, and `shared` codebases.
- **Data Flow**: React Query for efficient data fetching, caching, and revalidation. Session-based cart storage.
- **Modularity**: Use of shared TypeScript schemas (`shared/schema.ts`) for consistent data models.

## External Dependencies

- **Database**: Neon Database (serverless PostgreSQL).
- **ORM**: Drizzle ORM (with PostgreSQL adapter).
- **UI Libraries**: React, Radix UI, shadcn/ui.
- **State Management**: TanStack Query (React Query).
- **Validation**: Zod (for type-safe data validation).
- **Date Utilities**: date-fns.
- **Icons**: Lucide React.
- **Deployment Tooling**: Vite, ESBuild.
- **Authentication**: passport-google-oauth20 (for Google OAuth).
- **Email**: Nodemailer (for SMTP integration).