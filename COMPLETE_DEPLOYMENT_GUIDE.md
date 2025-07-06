# Complete Deployment Guide: No Shedding E-commerce

This guide walks you through deploying your e-commerce app with full functionality using Netlify + Supabase.

## Step 1: Set Up Supabase (Database & Backend)

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login with your Google account
3. Click "New Project"
4. Choose organization and enter:
   - **Project Name**: `no-shedding-ecommerce`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
5. Click "Create new project" (takes 2-3 minutes)

### 1.2 Get Database Connection String
1. In your Supabase project, go to **Settings** → **Database**
2. Scroll to "Connection parameters"
3. Copy the **URI** (Connection string)
4. Replace `[YOUR-PASSWORD]` with your actual password
5. Save this as your `DATABASE_URL`

### 1.3 Set Up Database Schema
1. In Supabase, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL to create all tables:

```sql
-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL
);

-- Create subcategories table
CREATE TABLE subcategories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  icon TEXT
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image TEXT,
  category_id INTEGER REFERENCES categories(id),
  subcategory_id INTEGER REFERENCES subcategories(id),
  is_featured BOOLEAN DEFAULT FALSE,
  in_stock BOOLEAN DEFAULT TRUE,
  rating DECIMAL(3,2) DEFAULT 0,
  key_features TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create customers table
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create users table (for admin)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create cart_items table
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create newsletters table
CREATE TABLE newsletters (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW()
);

-- Create support_requests table
CREATE TABLE support_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  support_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  has_replied BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample categories
INSERT INTO categories (name, description, image, slug) VALUES
('Power Solutions', 'Backup power systems and energy storage solutions', '/images/power-solutions.jpg', 'power-solutions'),
('Lighting Solutions', 'LED lights, emergency lighting, and smart lighting systems', '/images/lighting-solutions.jpg', 'lighting-solutions'),
('Appliance Alternatives', 'Non-electric alternatives and energy-efficient appliances', '/images/appliance-alternatives.jpg', 'appliance-alternatives'),
('Comfort & Utility Kits', 'Emergency kits and comfort solutions during power outages', '/images/comfort-utility-kits.jpg', 'comfort-utility-kits'),
('Safety & Security', 'Security systems and safety equipment', '/images/safety-security.jpg', 'safety-security');

-- Insert sample subcategories
INSERT INTO subcategories (name, description, slug, category_id, icon) VALUES
('Power Banks', 'Portable power banks and charging solutions', 'power-banks', 1, 'Smartphone'),
('UPS Devices', 'Uninterruptible Power Supply systems', 'ups-devices', 1, 'Shield'),
('LED Lights', 'Energy-efficient LED lighting solutions', 'led-lights', 2, 'Lightbulb'),
('Emergency Lighting', 'Battery-powered emergency lighting', 'emergency-lighting', 2, 'Flashlight'),
('Motion Sensor Lights', 'Automatic motion-activated lighting', 'motion-sensor-lights', 2, 'Zap'),
('Manual Coffee Grinders', 'Hand-operated coffee grinding solutions', 'manual-coffee-grinders', 3, 'Coffee'),
('Battery Operated Fans', 'Portable battery-powered cooling fans', 'battery-operated-fans', 3, 'Fan'),
('Load Shedding Survival Kits', 'Complete emergency preparedness kits', 'load-shedding-survival-kits', 4, 'Package'),
('Surge Protectors', 'Electrical surge protection devices', 'surge-protectors', 4, 'Shield'),
('Motion Sensor Lights', 'Security motion sensor lighting', 'motion-sensor-lights-security', 5, 'Zap'),
('Alarms', 'Security and safety alarm systems', 'alarms', 5, 'ShieldAlert'),
('Motion Sensor Alarms', 'Motion detection alarm systems', 'motion-sensor-alarms', 5, 'ShieldAlert'),
('Rechargeable Flash Lights', 'Portable rechargeable flashlights', 'rechargeable-flash-lights', 2, 'Flashlight'),
('Surge Protectors', 'Safety surge protection devices', 'surge-protectors-safety', 5, 'Shield');

-- Insert admin user (username: admin, password: admin123)
INSERT INTO users (username, password, email, role, first_name, last_name) VALUES
('admin', '$2b$10$8K1p/a0dURRuFux0CjLhxONcfzLAo/k6XFgkjT3UGUKHrLjAUCPLu', 'admin@noshedding.com', 'admin', 'Admin', 'User');
```

4. Click "RUN" to execute the SQL
5. Your database is now set up with all tables and sample data

## Step 2: Set Up GitHub Repository

### 2.1 Create GitHub Repo
1. Go to [github.com](https://github.com) and login
2. Click "New repository"
3. Name it: `no-shedding-ecommerce`
4. Make it Public
5. Click "Create repository"

### 2.2 Push Your Code
1. In your Replit project, open the Shell
2. Run these commands:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/no-shedding-ecommerce.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Step 3: Deploy to Netlify

### 3.1 Deploy Site
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your `no-shedding-ecommerce` repository
5. Configure build settings:
   - **Build command**: `vite build`
   - **Publish directory**: `dist/public`
6. Click "Deploy site"

### 3.2 Add Environment Variables
1. In Netlify, go to your site → **Site settings** → **Environment variables**
2. Add these variables:

```
DATABASE_URL = your-supabase-connection-string
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = nosheddingsupp@gmail.com
SMTP_PASS = your-gmail-app-password
```

### 3.3 Set Up Gmail App Password
1. Go to Google Account settings
2. Security → 2-Step Verification → App passwords
3. Generate password for "Mail"
4. Use this as your `SMTP_PASS`

## Step 4: Test Your Deployment

### 4.1 Basic Functionality Test
1. Visit your Netlify site URL
2. Test:
   - ✅ Homepage loads with categories
   - ✅ Product browsing works
   - ✅ Search functionality
   - ✅ Newsletter signup
   - ✅ Contact form

### 4.2 Admin Dashboard Test
1. Go to `your-site.netlify.app/admin`
2. Login with: `admin` / `admin123`
3. Test:
   - ✅ Add new products
   - ✅ Upload product images
   - ✅ Manage categories
   - ✅ View support requests

## Step 5: What's Working vs. Limitations

### ✅ Fully Working:
- Product catalog and browsing
- Search functionality
- Newsletter signup
- Contact/support forms
- Basic admin dashboard
- Database operations

### ⚠️ Limitations with Basic Setup:
- File uploads (need Supabase Storage)
- Advanced authentication (need Supabase Auth)
- Real-time features (need Supabase Realtime)
- Email sending (need backend functions)

## Step 6: Upgrade to Full Functionality (Optional)

To get 100% functionality, deploy your Express backend to Railway:

1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Add your environment variables
4. Deploy your backend
5. Update frontend API URLs to point to Railway

## Support

If you encounter issues:
1. Check Netlify build logs
2. Verify Supabase connection
3. Test environment variables
4. Check GitHub repository sync

Your e-commerce site is now live with core functionality! 🚀