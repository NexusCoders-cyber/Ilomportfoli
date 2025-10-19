# Personal Portfolio Web Application

## Overview

This is a full-stack personal portfolio web application built with React (client), Node.js/Express (backend), and MongoDB. The application features a public-facing portfolio site with project showcases, blog posts, and a dedicated bot showcase page, alongside a secure admin dashboard for content management. The site is production-ready with SEO optimization, responsive design, and multi-platform deployment support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**: React 18 with TypeScript, built using Vite for fast development and optimized production builds.

**Routing**: Client-side routing implemented with Wouter (lightweight alternative to React Router), supporting routes for Home, About, Projects, Bot showcase, Blog, Contact, and Admin dashboard.

**UI Component System**: Built on shadcn/ui components library with Radix UI primitives, providing accessible, customizable components. Styling uses Tailwind CSS with a custom design system featuring dark/light themes.

**State Management & Data Fetching**: TanStack Query (React Query) handles server state management, caching, and data synchronization. Form state managed with React Hook Form combined with Zod validation schemas.

**Animation System**: Framer Motion provides page transitions and UI animations throughout the application.

**Theme System**: Custom theme provider with localStorage persistence supporting dark and light modes. Theme preferences survive page refreshes.

**Authentication Flow**: JWT tokens stored in localStorage. Protected admin routes check for valid tokens, redirecting to login on authentication failure. Auth headers automatically attached to API requests.

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js. Middleware stack includes Helmet for security headers, CORS for cross-origin requests, and custom logging middleware.

**API Design**: RESTful API with clear endpoint separation:
- Public endpoints (GET): `/api/projects`, `/api/updates`, `/api/bot`
- Protected endpoints (POST/PUT/DELETE): Require JWT authentication for all admin operations
- Authentication endpoint: `/api/auth/login` for admin login

**Authentication & Authorization**: JWT-based authentication with bcrypt password hashing. Admin credentials can be configured via environment variables. Middleware (`authenticateToken`) protects admin routes.

**File Upload Strategy**: Multer handles file uploads with in-memory storage, converting images to base64 data URLs for storage. Supports up to 5MB files with image format validation (JPEG, PNG, GIF, WebP).

**Input Validation**: Express Validator validates incoming requests on server-side. Zod schemas in shared directory provide type-safe validation for both client and server.

**Development vs Production**: Vite dev server integration in development mode. Production serves static built files from `dist/public` directory.

### Data Storage

**Database**: MongoDB with Mongoose ODM for schema definition and data modeling.

**Schema Design**:
- `AdminUser`: Email, passwordHash, createdAt
- `Project`: Title, slug, description, stack array, images array, GitHub/live URLs, featured flag
- `Update` (Blog): Title, slug, contentMarkdown, tags array, published status, timestamps
- `BotInfo`: Name, tagline, description, features array, screenshots array, GitHub repo, demo URL
- `ContactMessage`: Name, email, message, status (new/read/replied), timestamp

**Data Relationships**: Collections are independent with no foreign key relationships. Content linking (like blog posts to projects) handled at application layer.

**Slug Generation**: Automatic URL-safe slug generation from titles for SEO-friendly URLs.

**Database Seeding**: Seed script creates default admin user and bot info on first run if they don't exist.

### External Dependencies

**Database Service**: MongoDB Atlas or any MongoDB-compatible service. Connection string configured via `MONGODB_URI` environment variable.

**Font Loading**: Google Fonts CDN for Inter (body/headings) and JetBrains Mono (code) typefaces.

**Build Dependencies**:
- Vite with React plugin for frontend builds
- esbuild for server bundling in production
- Drizzle Kit configured (though application uses MongoDB/Mongoose, not PostgreSQL)

**Deployment Platforms**: Application supports deployment to Render, Koyeb, Netlify, and Replit with provided configuration and documentation.

**Environment Configuration**:
- `MONGODB_URI`: Database connection string (required)
- `JWT_SECRET`: Secret key for JWT signing (defaults to placeholder)
- `ADMIN_EMAIL`: Initial admin email (defaults to admin@example.com)
- `ADMIN_PASSWORD`: Initial admin password (defaults to admin123456)
- `NODE_ENV`: Environment flag (development/production)

**Development Tools**: Replit-specific plugins for runtime error overlay, cartographer, and dev banner when running in Replit environment.