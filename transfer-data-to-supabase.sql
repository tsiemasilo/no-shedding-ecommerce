-- Transfer all data from local database to Supabase
-- Run this script in Supabase SQL Editor

-- Clear existing data (if any)
DELETE FROM cart_items;
DELETE FROM products;
DELETE FROM subcategories;
DELETE FROM categories;
DELETE FROM users;
DELETE FROM customers;
DELETE FROM newsletters;
DELETE FROM support_requests;

-- Reset sequences
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE subcategories_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE customers_id_seq RESTART WITH 1;
ALTER SEQUENCE cart_items_id_seq RESTART WITH 1;
ALTER SEQUENCE newsletters_id_seq RESTART WITH 1;
ALTER SEQUENCE support_requests_id_seq RESTART WITH 1;

-- Note: The actual data will be inserted by the Node.js script below
-- This file is just for reference and manual cleanup if needed