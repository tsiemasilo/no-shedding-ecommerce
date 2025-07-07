-- Fix Supabase database schema to match our application

-- Add missing columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS key_features JSONB DEFAULT '{}';

-- Add missing columns to subcategories table
ALTER TABLE subcategories 
ADD COLUMN IF NOT EXISTS icon TEXT;

-- Verify schema
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;