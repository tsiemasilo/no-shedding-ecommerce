# Netlify + Supabase Deployment Guide

This guide will help you deploy your No Shedding e-commerce app to Netlify with Supabase as the backend.

## Prerequisites

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Once created, go to **Settings** → **Database**
4. Copy the **Connection String** (URI format)
5. Replace `[YOUR-PASSWORD]` with your database password
6. This will be your `DATABASE_URL`

### 2. Set up Database Schema
1. In your Supabase project, go to **SQL Editor**
2. Run the following command to create your database schema:

```sql
-- Run your database migration
-- You can copy the SQL from your current schema or use Drizzle
```

## Deployment Steps

### 1. Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/no-shedding.git
git push -u origin main
```

### 2. Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"New site from Git"**
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `vite build`
   - **Publish directory**: `dist/public`
5. Add environment variables:
   - `DATABASE_URL`: Your Supabase connection string
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: Your Gmail address
   - `SMTP_PASS`: Your Gmail app password

### 3. Configure Functions (Optional)
The basic Netlify Functions are set up but limited. For full functionality, consider:

1. **Option A**: Use Supabase Edge Functions for complex backend logic
2. **Option B**: Deploy the Express backend to Railway/Render and update API URLs

## Current Limitations

With the basic Netlify setup:
- ✅ Frontend deployed and working
- ✅ Basic product/category API via Netlify Functions
- ❌ Admin dashboard (needs full backend)
- ❌ Authentication (needs session management)
- ❌ File uploads (needs storage solution)
- ❌ Email functionality (needs SMTP configuration)

## Recommended Architecture

For a production deployment, I recommend:

1. **Frontend**: Netlify (static hosting)
2. **Backend API**: Railway or Render (full Express server)
3. **Database**: Supabase PostgreSQL
4. **File Storage**: Supabase Storage or Cloudinary
5. **Email**: SendGrid or AWS SES

This approach gives you:
- ✅ Full feature support
- ✅ Better performance
- ✅ Easier maintenance
- ✅ Proper authentication
- ✅ File upload capabilities

## Files Created for Netlify

- `netlify.toml` - Netlify configuration
- `netlify/functions/api.ts` - Basic API endpoints
- This deployment guide

## Next Steps

1. Test the basic deployment on Netlify
2. Set up Supabase database
3. Configure environment variables
4. Consider upgrading to full backend hosting for complete functionality

Let me know if you need help with any of these steps!