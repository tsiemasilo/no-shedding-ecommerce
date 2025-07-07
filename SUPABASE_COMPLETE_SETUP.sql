-- Complete Supabase setup with schema fixes and data

-- 1. Fix schema first
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS key_features JSONB DEFAULT '{}';

ALTER TABLE subcategories 
ADD COLUMN IF NOT EXISTS icon TEXT;

-- 2. Clear existing data
DELETE FROM cart_items;
DELETE FROM products;
DELETE FROM subcategories;
DELETE FROM categories;
DELETE FROM users;

-- 3. Insert Categories
INSERT INTO categories (id, name, description, image, slug) VALUES
(1, 'Lighting Solutions', 'Premium LED fixtures, smart lighting systems, and energy-efficient solutions', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'lighting-solutions'),
(2, 'Power Solutions', 'UPS systems, generators, power distribution, and backup solutions', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'power-solutions'),
(3, 'Appliance Alternatives', 'Energy-efficient alternatives to traditional appliances', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'appliance-alternatives'),
(4, 'Comfort & Utility Kits', 'Complete electrical tool kits and comfort solutions', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'comfort-utility-kits'),
(5, 'Premium Items', 'Luxury electrical fixtures and high-end smart solutions', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'premium-items'),
(6, 'Safety & Security', 'Advanced security systems and safety equipment for electrical installations', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'safety-security');

-- 4. Insert Subcategories
INSERT INTO subcategories (id, name, description, slug, category_id, icon) VALUES
(1, 'LED Strip Lights', 'Flexible LED lighting for accent and ambient lighting', 'led-strip-lights', 1, 'Zap'),
(2, 'Smart Bulbs', 'WiFi-enabled smart bulbs with app control', 'smart-bulbs', 1, 'Lightbulb'),
(7, 'Power Banks', 'Portable charging solutions and power banks', 'power-banks', 2, 'Smartphone'),
(14, 'Security Cameras', 'Advanced surveillance and monitoring systems', 'security-cameras', 6, 'Camera');

-- 5. Insert Admin User (password: admin123)
INSERT INTO users (id, username, password, role, email, first_name, last_name, phone, address, city, postal_code, created_at) VALUES
(1, 'admin', '$2a$10$8K0j5MKZ7QJXU.8z7wFmFeOIYV8m8KF5K2R9Z6yKQGNm8jB5Z3C6G', 'admin', 'admin@noshedding.com', 'System', 'Administrator', '+27123456789', '123 Main Street', 'Cape Town', '8001', NOW());

-- 6. Insert Products with simplified features (avoiding JSONB array issues)
INSERT INTO products (id, name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, images, key_features) VALUES
(4, 'Q‑SX80 Solar 4K HD WiFi + 5G Outdoor Smart IP PTZ Camera', 
'Secure your property with the Andowl Q‑SX80 4K HD Outdoor Smart IP PTZ Camera — a high-performance, solar-powered surveillance solution built for remote monitoring, even in areas without electricity.', 
3350.00, '/uploads/image-1751734700864-313073318.jpg', 6, 14, true, 4.5, true, 
'{}', 
'{}');

INSERT INTO products (id, name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, images, key_features) VALUES
(5, 'QS66 Full HD 4K Wireless Smart Camera – Waterproof Outdoor Wi‑Fi CCTV', 
'The Andowl QS66 is a robust outdoor surveillance camera equipped with a high-resolution sensor delivering up to 5 MP/4K clarity, paired with intelligent pan‑tilt control.', 
2860.00, '/uploads/image-1751736543990-979663328.jpg', 6, 14, true, 4.2, true, 
'{}', 
'{}');

INSERT INTO products (id, name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, images, key_features) VALUES
(3, '300W Multifunctional power bank solar power system', 
'300W Portable Solar Power Generator – Q-SP60. Stay powered anywhere, anytime with the Andowl 300W Portable Solar Power Generator. Designed for off-grid convenience and emergency backup.', 
5799.00, '/uploads/image-1751730705153-892105035.jpeg', 2, 7, true, 4.8, true, 
'{}', 
'{}');

INSERT INTO products (id, name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, images, key_features) VALUES
(6, 'Q‑V380 4K Solar Intelligent 4G IP PTZ Camera', 
'The Q‑V380 is a self-sufficient security powerhouse designed for versatile outdoor deployment. Harnessing solar power and equipped with 4G cellular support, it eliminates the need for cables.', 
2949.00, '/uploads/image-1751737759981-404548979.jpeg', 6, 14, true, 4.6, true, 
'{}', 
'{}');

-- 7. Verify data
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Subcategories', COUNT(*) FROM subcategories  
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Users', COUNT(*) FROM users;

-- 8. Test product query
SELECT id, name, price, featured FROM products WHERE featured = true;