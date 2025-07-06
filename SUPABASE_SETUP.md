# Supabase Setup for Your Project

Your Supabase Project URL: https://izkihpjkykultfshgqve.supabase.co

## Step 1: Get Your Database Connection String

1. Go to your Supabase project: https://izkihpjkykultfshgqve.supabase.co
2. Click **Settings** → **Database**
3. Scroll to "Connection parameters"
4. Copy the **URI** (Connection string) - it will look like:
   ```
   postgresql://postgres.izkihpjkykultfshgqve:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password
6. This is your `DATABASE_URL` for deployment

## Step 2: Set Up Your Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste this complete SQL script:

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

4. Click **"RUN"** to execute the SQL
5. You should see success messages for each table creation

## Step 3: Verify Database Setup

1. Go to **Table Editor** in your Supabase project
2. You should see all these tables:
   - categories (5 rows)
   - subcategories (14 rows)  
   - products (empty - will be populated via admin)
   - customers (empty)
   - users (1 admin user)
   - cart_items (empty)
   - newsletters (empty)
   - support_requests (empty)

## Next Steps

Once your database is set up:

1. **Push to GitHub**: Create repository and push your code
2. **Deploy to Netlify**: Connect GitHub repo to Netlify
3. **Add Environment Variables** in Netlify:
   - `DATABASE_URL` = your Supabase connection string
   - `SMTP_HOST` = smtp.gmail.com
   - `SMTP_PORT` = 587
   - `SMTP_USER` = nosheddingsupp@gmail.com
   - `SMTP_PASS` = your Gmail app password

4. **Test Your Deployment**:
   - Visit your live site
   - Go to `/admin` and login with: admin / admin123
   - Add products through the admin dashboard

Your e-commerce site will be fully functional with database-backed operations!