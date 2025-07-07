# Supabase Data Transfer Commands

## Run these SQL commands in Supabase SQL Editor:

### 1. Clear existing data
```sql
DELETE FROM cart_items;
DELETE FROM products;
DELETE FROM subcategories;
DELETE FROM categories;
DELETE FROM users;
DELETE FROM customers;
DELETE FROM newsletters;
DELETE FROM support_requests;
```

### 2. Insert Categories
```sql
INSERT INTO categories (id, name, description, image, slug) VALUES
(1, 'Lighting Solutions', 'Premium LED fixtures, smart lighting systems, and energy-efficient solutions', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'lighting-solutions'),
(2, 'Power Solutions', 'UPS systems, generators, power distribution, and backup solutions', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'power-solutions'),
(3, 'Appliance Alternatives', 'Energy-efficient alternatives to traditional appliances', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'appliance-alternatives'),
(4, 'Comfort & Utility Kits', 'Complete electrical tool kits and comfort solutions', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'comfort-utility-kits'),
(5, 'Premium Items', 'Luxury electrical fixtures and high-end smart solutions', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'premium-items'),
(6, 'Safety & Security', 'Advanced security systems and safety equipment for electrical installations', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'safety-security');
```

### 3. Insert Subcategories (first batch)
```sql
INSERT INTO subcategories (id, name, description, slug, category_id, icon) VALUES
(1, 'LED Strip Lights', 'Flexible LED lighting for accent and ambient lighting', 'led-strip-lights', 1, 'Zap'),
(2, 'Smart Bulbs', 'WiFi-enabled smart bulbs with app control', 'smart-bulbs', 1, 'Lightbulb'),
(3, 'Motion Sensor Lights', 'Automatic lighting with motion detection', 'motion-sensor-lights', 1, 'Zap'),
(4, 'Solar Lights', 'Solar-powered outdoor and garden lighting', 'solar-lights', 1, 'Sun'),
(5, 'Emergency Lighting', 'Battery backup and emergency lighting systems', 'emergency-lighting', 1, 'AlertTriangle'),
(6, 'Decorative Lighting', 'Decorative and aesthetic lighting solutions', 'decorative-lighting', 1, 'Star'),
(7, 'Power Banks', 'Portable charging solutions and power banks', 'power-banks', 2, 'Smartphone'),
(8, 'UPS Devices', 'Uninterruptible power supply systems', 'ups-devices', 2, 'Shield'),
(9, 'Manual Coffee Grinders', 'Hand-operated coffee grinding solutions', 'manual-coffee-grinders', 3, 'Coffee'),
(10, 'Battery Operated Fans', 'Portable fans with battery power', 'battery-operated-fans', 3, 'Fan');
```

### 4. Insert Subcategories (second batch)
```sql
INSERT INTO subcategories (id, name, description, slug, category_id, icon) VALUES
(11, 'Load Shedding Survival Kits', 'Complete kits for power outage preparation', 'load-shedding-survival-kits', 4, 'Package'),
(12, 'Surge Protectors', 'Electrical surge protection devices', 'surge-protectors', 4, 'Shield'),
(13, 'Surge Protectors', 'Electrical surge protection devices', 'surge-protectors-comfort', 4, 'Shield'),
(14, 'Security Cameras', 'Advanced surveillance and monitoring systems', 'security-cameras', 6, 'Camera'),
(15, 'Motion Sensor Lights', 'Security-focused motion detection lighting', 'motion-sensor-lights-security', 6, 'Zap'),
(16, 'Alarms', 'Security alarm systems and components', 'alarms', 6, 'ShieldAlert'),
(17, 'Motion Sensor Alarms', 'Motion detection alarm systems', 'motion-sensor-alarms', 6, 'ShieldAlert'),
(18, 'Rechargeable Flash Lights', 'Portable rechargeable flashlight solutions', 'rechargeable-flash-lights', 1, 'Flashlight'),
(19, 'Surge Protectors', 'Electrical surge protection devices for safety', 'surge-protectors-safety', 6, 'Shield');
```

### 5. Insert Admin User
```sql
INSERT INTO users (id, username, password, role, email, first_name, last_name, phone, address, city, postal_code, created_at) VALUES
(1, 'admin', '$2a$10$8K0j5MKZ7QJXU.8z7wFmFeOIYV8m8KF5K2R9Z6yKQGNm8jB5Z3C6G', 'admin', 'admin@noshedding.com', 'System', 'Administrator', '+27123456789', '123 Main Street', 'Cape Town', '8001', NOW());
```

### 6. Insert Products (run in separate commands due to size)

**Product 1:**
```sql
INSERT INTO products (id, name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features) VALUES
(4, 'Q‑SX80 Solar 4K HD WiFi + 5G Outdoor Smart IP PTZ Camera', 'Secure your property with the Andowl Q‑SX80 4K HD Outdoor Smart IP PTZ Camera — a high-performance, solar-powered surveillance solution built for remote monitoring, even in areas without electricity. With ultra-clear 4K video resolution, 360° PTZ control, and support for both 2.4GHz and 5GHz WiFi, this smart camera delivers crystal-clear footage, night and day. It features two-way audio, motion detection alerts, and cloud or local storage, all packed into a rugged, weatherproof housing. Ideal for homes, farms, construction sites, and off-grid areas.', 3350.00, '/uploads/image-1751734700864-313073318.jpg', 6, 14, true, 0.0, true, '{"Solar Powered – Built-in solar panel provides sustainable, off-grid power.  4K Ultra HD – Captures ultra-sharp video for precise detail.  PTZ Functionality – 355° pan & 90° tilt ensures complete area coverage.  Smart Night Vision – Switches between infrared and full-color night mode.  Dual-Band WiFi + 5G Support – Fast, stable connections over 2.4GHz/5GHz WiFi or 5G SIM (model dependent).  App Controlled – Real-time viewing, PTZ control, and alerts via smartphone app (iOS/Android).  Two-Way Audio – Talk and listen directly from your mobile device.  Motion Detection & Alerts – Sends instant notifications on movement.  Storage Options – Supports MicroSD card or cloud storage.  Weatherproof Design – Built for tough outdoor environments."}');
```

**Product 2:**
```sql
INSERT INTO products (id, name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features) VALUES
(5, 'QS66 Full HD 4K Wireless Smart Camera – Waterproof Outdoor Wi‑Fi CCTV', 'The Andowl QS66 is a robust outdoor surveillance camera equipped with a high-resolution sensor delivering up to 5 MP/4K clarity, paired with intelligent pan‑tilt control. Encased in an IP65/IP66-rated waterproof housing, it withstands the toughest environmental conditions. Connectivity options include 2.4 GHz Wi-Fi (no 5 GHz), while the integrated IR-cut filter and 8-array LED system provide reliable smart night vision—automatically switching between infrared and full-colour modes up to 15–30 m', 2860.00, '/uploads/image-1751736543990-979663328.jpg', 6, 14, true, 0.0, true, '{"Resolution & Sensor: 5 MP CMOS sensor offering sharp 4K/Full‑HD video quality  Pan–Tilt Control: 355° horizontal sweep and 90° vertical tilt, controllable via app  Smart Night Vision: 8-array LEDs (4× IR + 4× full-colour), up to 15–30 m, auto-switching with IR‑cut filter  Waterproof & Durable: Solid IP65/IP66 construction for outdoor protection  Two-Way Audio: Built-in microphone and speaker enable real-time communication  Motion Detection & Alerts: Sends push/email notifications and triggers recording","Flexible Storage: Supports micro‑SD up to 128 GB and offers cloud storage options  App Support & Remote Viewing: Compatible with CareCam Pro on iOS/Android; desktop access via PC client ","Connectivity: Supports 802.11 b/g/n Wi-Fi with optional Ethernet (AP mode)"}');
```

**Product 3:**
```sql
INSERT INTO products (id, name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features) VALUES
(3, '300W Multifunctional power bank solar power system', '300W Portable Solar Power Generator – Q-SP60 Stay powered anywhere, anytime with the Andowl 300W Portable Solar Power Generator. Designed for off-grid convenience and emergency backup, this compact power station delivers reliable energy when you need it most.', 5799.00, '/uploads/image-1751730705153-892105035.jpeg', 2, 7, true, 0.0, true, '{"High-Capacity Battery: Equipped with an 84,000mAh (296Wh) lithium iron phosphate (LiFePO₄) battery for long-lasting, safe, and efficient power storage.  Pure Sine Wave Inverter (300W): Provides clean and stable AC output (220V/50Hz), suitable for sensitive electronics like laptops, routers, lights, and more.  Multiple Output Options:  2 × USB ports (5V/3A)  1 × QC3.0 fast-charging USB (up to 40W)  5 × 12V DC ports (up to 120W each)  1 × AC outlet  10–14V DC port (10A)  Solar Panel Included: Comes with 2 × 30W solar panels and a 5m cable for convenient solar charging in outdoor or load-shedding conditions.  Smart LCD Display: Displays battery status, output levels, and charging status at a glance.  Built-In Protection: Features protection against over-voltage, under-voltage, over-current, short-circuit, overload, and overheating—ensuring safe usage at all times.  Complete Accessory Kit: Includes power station, solar panels, adapter, USB and DC cables, 4 switch-controlled bulbs, and a setup guide—ready to power your home, campsite, or emergency needs.  Ideal For: Camping, load-shedding, outdoor activities, remote work sites, emergency medical use, and more."}');
```

**Product 4:**
```sql
INSERT INTO products (id, name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features) VALUES
(6, 'Q‑V380 4K Solar Intelligent 4G IP PTZ Camera', 'The Q‑V380 is a self-sufficient security powerhouse designed for versatile outdoor deployment. Harnessing solar power and equipped with 4G cellular support, it eliminates the need for cables. With true 4K resolution, wide-angle PTZ control, AI-driven tracking, night vision, waterproof durability, and two-way communication, it''s engineered to safeguard your assets—anywhere, anytime. Manage it seamlessly via the popular V380 mobile app, and record footage locally or in the cloud.', 2949.00, '/uploads/image-1751737759981-404548979.jpeg', 6, 14, true, 0.0, true, '{"4K Ultra HD Imaging – Crystal-clear video capture with 4K resolution for detailed monitoring","Solar-Powered & 4G Connectivity – Built-in solar panel and 4G SIM support provides continuous operation in off-grid locations; dual high-gain antennas ensure stable signals up to 100 Mbps .","PTZ Control – Motorised pan (355°) and tilt (90°) allow full coverage; AI-enabled auto-tracking keeps moving subjects in frame ","Smart Motion Alerts – Human-body detection, auto-tracking and instant mobile notifications upon triggered events","Night Vision & Two-Way Audio – Automatic IR-cut switching with infrared LEDs for clear night surveillance, plus built‑in mic and speaker for live communication and deterrence","Waterproof Build (IP65) – Weather-resistant housing ensures reliable outdoor performance","Flexible Storage Options – Supports micro-SD card up to 128 GB and remote viewing/management via V380 app on iOS & Android ","Compact Design – Weighs approximately 2.5 kg, with a robust solar panel bracket included"}');
```

### 7. Verify Data
```sql
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Subcategories', COUNT(*) FROM subcategories  
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Users', COUNT(*) FROM users;
```