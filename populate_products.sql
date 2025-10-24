-- ============================================
-- POPULATE PRODUCTS WITH REALISTIC DATA
-- Total: 91 Products (13 subcategories × 7 products)
-- ============================================

-- ============================================
-- CATEGORY 1: LIGHTING SOLUTIONS (Category ID: 1)
-- ============================================

-- Subcategory 1: Rechargeable LED Lanterns (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('BrightLife Ultra LED Camping Lantern', 'Powerful 1000-lumen rechargeable LED lantern perfect for camping, emergencies, and outdoor adventures. Features multiple brightness modes and up to 48 hours of runtime on a single charge.', 899.00, 'attached_assets/stock_images/rechargeable_led_cam_09c4d17f.jpg', 1, 1, true, 4.8, true, ARRAY['1000 lumens brightness', '48-hour battery life', 'USB-C fast charging', 'IPX6 waterproof rating', 'Collapsible design'], ARRAY[]::text[]),

('LumiCamp 360° LED Lantern', 'Versatile 360-degree illumination lantern with adjustable brightness settings. Compact and lightweight design makes it ideal for hiking, power outages, and nighttime activities.', 649.00, 'attached_assets/stock_images/rechargeable_led_cam_63e6c7de.jpg', 1, 1, false, 4.6, true, ARRAY['360-degree lighting', 'Multiple brightness modes', 'Rechargeable lithium battery', 'Hanging hook included'], ARRAY[]::text[]),

('PowerGlow Emergency LED Lantern', 'Reliable emergency lantern with power bank functionality to charge your devices. Features SOS strobe mode for emergency signaling and durable construction.', 1299.00, 'attached_assets/stock_images/rechargeable_led_cam_16602e1c.jpg', 1, 1, false, 4.7, true, ARRAY['Built-in power bank', 'SOS emergency mode', '800 lumens output', 'Shockproof design', '72-hour runtime'], ARRAY[]::text[]),

('EcoLight Solar & USB Rechargeable Lantern', 'Dual-charging lantern that works with both solar panels and USB charging. Energy-efficient LED technology provides bright, consistent light for extended periods.', 749.00, 'attached_assets/stock_images/rechargeable_led_cam_843c184c.jpg', 1, 1, false, 4.5, true, ARRAY['Solar + USB charging', 'Eco-friendly design', '600 lumens brightness', '36-hour battery life'], ARRAY[]::text[]),

('TrekMaster Portable LED Lantern', 'Ultra-portable camping lantern with magnetic base for hands-free operation. Perfect for tent lighting, reading, and general outdoor illumination.', 549.00, 'attached_assets/stock_images/rechargeable_led_cam_1a2e46ef.jpg', 1, 1, false, 4.4, true, ARRAY['Magnetic mounting base', 'Compact and lightweight', '500 lumens output', 'Red light night mode'], ARRAY[]::text[]),

('MaxBright Premium Rechargeable Lantern', 'Premium quality lantern with adjustable color temperature and dimming function. Built to last with aircraft-grade aluminum construction and impact resistance.', 1599.00, 'attached_assets/stock_images/rechargeable_led_cam_65228f1f.jpg', 1, 1, true, 4.9, true, ARRAY['Adjustable color temperature', 'Premium aluminum body', '1200 lumens max output', 'Wireless charging compatible', 'IP67 waterproof'], ARRAY[]::text[]),

('BasicCamp LED Lantern', 'Affordable and reliable LED lantern for basic camping and emergency needs. Simple operation with long-lasting battery performance and durable plastic housing.', 399.00, 'attached_assets/stock_images/rechargeable_led_cam_ab36d403.jpg', 1, 1, false, 4.3, true, ARRAY['Budget-friendly', '400 lumens brightness', '24-hour runtime', 'Easy push-button control'], ARRAY[]::text[]);

-- Subcategory 2: Solar Powered Lamps (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('SunBeam Garden Solar Lamp', 'Elegant outdoor solar lamp perfect for gardens, pathways, and patios. Automatically turns on at dusk and provides warm ambient lighting throughout the night.', 599.00, 'attached_assets/stock_images/solar_powered_outdoo_019f22cc.jpg', 1, 2, false, 4.6, true, ARRAY['Auto on/off sensor', 'Weather-resistant', 'Warm white LED', '8-hour runtime', 'No wiring required'], ARRAY[]::text[]),

('EcoGlow Solar Security Light', 'Powerful solar-powered security light with motion sensor activation. Bright illumination deters intruders and provides safe outdoor lighting without electricity costs.', 1099.00, 'attached_assets/stock_images/solar_powered_outdoo_ad6b4400.jpg', 1, 2, true, 4.8, true, ARRAY['Motion sensor detection', '120-degree detection angle', '900 lumens brightness', 'Weatherproof IP65', 'Adjustable solar panel'], ARRAY[]::text[]),

('SolarPath Decorative Outdoor Lamp', 'Stylish decorative solar lamp adds charm to outdoor spaces. Premium materials and efficient solar cells ensure reliable performance season after season.', 799.00, 'attached_assets/stock_images/solar_powered_outdoo_d316e713.jpg', 1, 2, false, 4.5, true, ARRAY['Decorative design', 'High-efficiency solar panel', 'Dusk-to-dawn operation', 'Rust-resistant construction'], ARRAY[]::text[]),

('BrightYard Solar Flood Light', 'High-output solar flood light ideal for driveways, yards, and large outdoor areas. Adjustable head allows you to direct light exactly where needed.', 1299.00, 'attached_assets/stock_images/solar_powered_outdoo_d078d011.jpg', 1, 2, false, 4.7, true, ARRAY['Adjustable light head', '1200 lumens output', 'Remote control included', 'Smart light sensor', '10-hour battery life'], ARRAY[]::text[]),

('GardenGlow Solar Stake Lights Set', 'Set of 6 solar stake lights perfect for illuminating garden beds, walkways, and landscape features. Easy installation with no wiring or electricity needed.', 899.00, 'attached_assets/stock_images/solar_powered_outdoo_b5a8a16d.jpg', 1, 2, false, 4.4, true, ARRAY['6-pack set', 'Easy stake installation', 'Automatic operation', 'Weatherproof design'], ARRAY[]::text[]),

('SolarLux Premium Outdoor Lamp', 'Premium solar outdoor lamp with extended battery capacity and superior brightness. Features smart charging technology for optimal performance even on cloudy days.', 1499.00, 'attached_assets/stock_images/solar_powered_outdoo_b87c4df3.jpg', 1, 2, true, 4.9, true, ARRAY['Smart charging technology', 'Extra-large solar panel', '1000 lumens brightness', 'Replaceable battery', 'Modern design'], ARRAY[]::text[]),

('EcoLight Basic Solar Lamp', 'Affordable solar-powered lamp for basic outdoor lighting needs. Simple and effective solution for pathways, steps, and small garden areas.', 449.00, 'attached_assets/stock_images/solar_powered_outdoo_6def99db.jpg', 1, 2, false, 4.2, true, ARRAY['Budget-friendly', 'Easy installation', '6-hour runtime', 'Compact size'], ARRAY[]::text[]);

-- Subcategory 3: Rechargeable Bulbs (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('SmartGlow Emergency LED Bulb 9W', 'Intelligent LED bulb with built-in rechargeable battery that automatically activates during power outages. Works as a regular bulb and emergency light combined.', 349.00, 'attached_assets/stock_images/rechargeable_led_lig_7ed524fe.jpg', 1, 3, true, 4.7, true, ARRAY['Auto power failure detection', '9W energy efficient', '4-hour backup time', 'E27 standard fitting', 'Cool white 6000K'], ARRAY[]::text[]),

('BrightSafe Rechargeable Bulb 12W', 'High-performance 12W rechargeable bulb provides brilliant illumination during normal use and reliable backup lighting during outages. Long-lasting lithium battery ensures dependable emergency lighting.', 449.00, 'attached_assets/stock_images/rechargeable_led_lig_97b85580.jpg', 1, 3, false, 4.6, true, ARRAY['12W high brightness', '6-hour emergency backup', 'Lithium battery technology', 'Instant activation', 'Energy Star rated'], ARRAY[]::text[]),

('LoadGuard Smart Emergency Bulb 15W', 'Premium 15W smart emergency bulb with mobile app control and customizable backup settings. Perfect for load shedding areas with extended power interruptions.', 649.00, 'attached_assets/stock_images/rechargeable_led_lig_71b2a66d.jpg', 1, 3, false, 4.8, true, ARRAY['WiFi app control', '15W super bright', '8-hour backup duration', 'Adjustable brightness', 'Remote control compatible'], ARRAY[]::text[]),

('EcoSmart Rechargeable LED Bulb 7W', 'Economical 7W rechargeable LED bulb ideal for bedrooms, hallways, and small rooms. Provides adequate emergency lighting during power failures at an affordable price.', 279.00, 'attached_assets/stock_images/rechargeable_led_lig_e358ced1.jpg', 1, 3, false, 4.4, true, ARRAY['Budget-friendly option', '7W energy saving', '3-hour backup', 'Standard E27 base', 'Warm white 3000K'], ARRAY[]::text[]),

('PowerSafe Multi-Mode Bulb 10W', 'Versatile 10W rechargeable bulb with multiple operating modes including portable flashlight mode. Detachable design allows use as handheld emergency light.', 549.00, 'attached_assets/stock_images/rechargeable_led_lig_8cb69060.jpg', 1, 3, true, 4.7, true, ARRAY['Detachable flashlight mode', '10W bright output', 'Dual charging options', '5-hour backup time', 'Hook for hanging'], ARRAY[]::text[]),

('LumiCharge Premium Bulb 20W', 'Top-of-the-line 20W rechargeable bulb with ultra-bright output and extended 10-hour backup capacity. Features smart power management and overcharge protection.', 849.00, 'attached_assets/stock_images/rechargeable_led_lig_d589b2ac.jpg', 1, 3, false, 4.9, true, ARRAY['20W maximum brightness', '10-hour extended backup', 'Smart battery management', 'Overcharge protection', 'Cool daylight 6500K'], ARRAY[]::text[]),

('BasicLight Emergency Bulb 5W', 'Simple and reliable 5W emergency bulb for basic lighting needs during power cuts. Affordable solution for essential backup lighting in homes and offices.', 199.00, 'attached_assets/stock_images/rechargeable_led_lig_f9f76364.jpg', 1, 3, false, 4.3, true, ARRAY['Most affordable option', '5W basic lighting', '2-hour backup', 'Easy installation', 'Reliable performance'], ARRAY[]::text[]);

-- Subcategory 4: Motion Sensor Lights (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('SecureBeam Motion Sensor LED Light', 'Advanced motion-activated LED light with adjustable sensitivity and timer settings. Perfect for hallways, stairs, closets, and entryways with automatic on/off functionality.', 799.00, 'attached_assets/stock_images/motion_sensor_securi_2be9fb75.jpg', 1, 4, true, 4.7, true, ARRAY['Adjustable sensitivity', '120-degree detection', 'Timer settings 30s-10min', 'Energy-efficient LED', 'Easy installation'], ARRAY[]::text[]),

('NightGuard Outdoor Motion Light', 'Heavy-duty outdoor motion sensor light designed for security and convenience. Weather-resistant construction withstands harsh conditions while providing reliable motion detection.', 1199.00, 'attached_assets/stock_images/motion_sensor_securi_b2cb145f.jpg', 1, 4, false, 4.8, true, ARRAY['Weatherproof IP65 rated', 'Wide 180-degree coverage', '1000 lumens brightness', 'Dusk-to-dawn sensor', 'Adjustable head'], ARRAY[]::text[]),

('SmartSense Battery Motion Light', 'Cordless battery-powered motion light with easy stick-on installation. Ideal for closets, cabinets, pantries, and areas without electrical outlets.', 449.00, 'attached_assets/stock_images/motion_sensor_securi_0a7910bc.jpg', 1, 4, false, 4.5, true, ARRAY['Battery powered', 'Wireless installation', 'Adhesive mounting', '30-day battery life', 'Auto shut-off'], ARRAY[]::text[]),

('ProDetect Motion Sensor Floodlight', 'Professional-grade motion sensor floodlight for comprehensive outdoor security coverage. Dual adjustable heads provide customizable lighting direction and coverage area.', 1599.00, 'attached_assets/stock_images/motion_sensor_securi_c2d048e5.jpg', 1, 4, true, 4.9, true, ARRAY['Dual adjustable heads', '2400 lumens output', 'Professional installation', 'Metal construction', 'Replaceable LED panels'], ARRAY[]::text[]),

('EcoMotion Solar Sensor Light', 'Eco-friendly solar-powered motion sensor light eliminates electricity costs. Harnesses solar energy during the day to power motion-activated lighting at night.', 899.00, 'attached_assets/stock_images/motion_sensor_securi_85c1453d.jpg', 1, 4, false, 4.6, true, ARRAY['Solar powered', 'Zero electricity cost', '600 lumens brightness', 'Weatherproof design', 'Motion + light sensor'], ARRAY[]::text[]),

('IndoorGuard Motion Ceiling Light', 'Sleek ceiling-mounted motion sensor light perfect for indoor spaces like garages, basements, and utility rooms. Modern design blends seamlessly with any decor.', 699.00, 'attached_assets/stock_images/motion_sensor_securi_5c86ba57.jpg', 1, 4, false, 4.4, true, ARRAY['Ceiling mount design', 'Modern appearance', '800 lumens output', '360-degree detection', 'Easy wiring'], ARRAY[]::text[]),

('CompactSense Mini Motion Light', 'Compact and affordable motion sensor light for small spaces. USB rechargeable battery provides weeks of use between charges with automatic motion activation.', 349.00, 'attached_assets/stock_images/motion_sensor_securi_f061ef2e.jpg', 1, 4, false, 4.3, true, ARRAY['Ultra-compact size', 'USB rechargeable', 'Magnetic mounting', '200 lumens', 'Budget-friendly'], ARRAY[]::text[]);

-- Subcategory 5: Rechargeable Flash Lights (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('TacticalBeam Pro LED Flashlight', 'Military-grade tactical flashlight with 1500-lumen maximum output and multiple lighting modes. Aircraft aluminum construction ensures durability in extreme conditions.', 1299.00, 'attached_assets/stock_images/rechargeable_flashli_5c176f6c.jpg', 1, 5, true, 4.9, true, ARRAY['1500 lumens max output', 'Tactical grade aluminum', 'Zoom focus function', '5 lighting modes', 'IP68 waterproof'], ARRAY[]::text[]),

('PowerFlash USB-C Rechargeable Torch', 'Modern USB-C rechargeable flashlight with fast charging capability and intelligent battery management. Compact design fits easily in pockets, bags, or glove compartments.', 799.00, 'attached_assets/stock_images/rechargeable_flashli_fc5a2be1.jpg', 1, 5, false, 4.7, true, ARRAY['USB-C fast charging', '800 lumens brightness', 'Pocket-sized design', 'Battery indicator', 'Anti-slip grip'], ARRAY[]::text[]),

('SearchBeam Long-Range Flashlight', 'High-powered long-range flashlight projects focused beam up to 500 meters. Perfect for search and rescue, hiking, camping, and outdoor adventures requiring distance illumination.', 1499.00, 'attached_assets/stock_images/rechargeable_flashli_07df7542.jpg', 1, 5, false, 4.8, true, ARRAY['500m beam distance', '1200 lumens output', 'Rechargeable 26650 battery', 'Adjustable focus', 'Strike bezel'], ARRAY[]::text[]),

('EverReady Multi-Function Torch', 'Versatile multi-function flashlight with white light, red light, and SOS modes. Side-mounted work light provides hands-free illumination for repairs and detailed tasks.', 899.00, 'attached_assets/stock_images/rechargeable_flashli_42e7098d.jpg', 1, 5, true, 4.6, true, ARRAY['Main + side work light', 'Red light mode', 'SOS emergency signal', 'Magnetic base', '1000 lumens combined'], ARRAY[]::text[]),

('CompactLite Mini Keychain Flashlight', 'Ultracompact rechargeable keychain flashlight provides surprisingly bright illumination. Always have light available with this tiny but powerful everyday carry essential.', 299.00, 'attached_assets/stock_images/rechargeable_flashli_63e77aed.jpg', 1, 5, false, 4.4, true, ARRAY['Keychain size', '300 lumens output', 'Micro USB charging', 'Lightweight aluminum', 'Budget price'], ARRAY[]::text[]),

('NightRunner Headlamp Flashlight', 'Convertible flashlight with headlamp strap accessory for hands-free operation. Adjustable brightness and beam angle make it perfect for night running, camping, and repairs.', 1099.00, 'attached_assets/stock_images/rechargeable_flashli_bccc58e2.jpg', 1, 5, false, 4.7, true, ARRAY['Headlamp conversion', 'Adjustable beam angle', '900 lumens maximum', 'Tilting head design', 'Elastic headband included'], ARRAY[]::text[]),

('WorkMaster Inspection Flashlight', 'Professional inspection flashlight designed for mechanics and technicians. Slim profile fits into tight spaces while delivering bright, focused illumination where you need it.', 649.00, 'attached_assets/stock_images/rechargeable_flashli_46f8a7ff.jpg', 1, 5, false, 4.5, true, ARRAY['Slim inspection design', 'Magnetic clip', '500 lumens output', 'Rechargeable battery', 'Pocket clip'], ARRAY[]::text[]);

-- ============================================
-- CATEGORY 2: POWER SOLUTIONS (Category ID: 2)
-- ============================================

-- Subcategory 6: Power Banks (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('MegaCharge 20000mAh Power Bank', 'High-capacity 20000mAh power bank charges smartphones 4-6 times on a single charge. Dual USB outputs allow simultaneous charging of multiple devices with fast-charging support.', 1299.00, 'attached_assets/stock_images/portable_power_bank__c902707d.jpg', 2, 6, true, 4.8, true, ARRAY['20000mAh capacity', 'Dual USB outputs', 'Fast charge technology', 'LED battery indicator', 'Universal compatibility'], ARRAY[]::text[]),

('SlimPower 10000mAh Portable Charger', 'Ultra-slim 10000mAh power bank fits easily in pockets and bags without bulk. Perfect balance of capacity and portability for daily commuting and travel.', 799.00, 'attached_assets/stock_images/portable_power_bank__9cd7efe7.jpg', 2, 6, false, 4.6, true, ARRAY['10000mAh capacity', 'Slim 15mm profile', 'Lightweight design', 'USB-C input/output', 'Premium aluminum'], ARRAY[]::text[]),

('PowerStation 30000mAh Super Capacity', 'Massive 30000mAh capacity provides multiple full charges for tablets, smartphones, and other USB devices. Ideal for extended trips, camping, or emergency backup power.', 1999.00, 'attached_assets/stock_images/portable_power_bank__d4292702.jpg', 2, 6, false, 4.7, true, ARRAY['30000mAh ultra-capacity', 'Triple USB outputs', 'Laptop charging capable', 'Digital display', 'Quick charge 3.0'], ARRAY[]::text[]),

('FastCharge QC 15000mAh Power Bank', 'Quick Charge 3.0 enabled power bank delivers blazing-fast charging speeds. 15000mAh capacity with intelligent charging management protects your devices while charging.', 1499.00, 'attached_assets/stock_images/portable_power_bank__cf17094d.jpg', 2, 6, true, 4.9, true, ARRAY['Quick Charge 3.0', '15000mAh capacity', 'Smart IC protection', 'Dual USB ports', 'Premium build quality'], ARRAY[]::text[]),

('MiniCharge 5000mAh Compact Charger', 'Pocket-sized 5000mAh power bank perfect for emergency phone charging on the go. Lightweight and affordable, it''s ideal for daily carry and short trips.', 449.00, 'attached_assets/stock_images/portable_power_bank__034b3609.jpg', 2, 6, false, 4.4, true, ARRAY['5000mAh capacity', 'Ultra-portable size', '1-2 phone charges', 'Budget-friendly', 'Auto power-off'], ARRAY[]::text[]),

('SolarBoost 25000mAh Solar Power Bank', 'Solar-powered 25000mAh power bank with built-in solar panel for emergency recharging. Rugged waterproof construction makes it perfect for outdoor adventures and emergencies.', 1799.00, 'attached_assets/stock_images/portable_power_bank__d5121bd2.jpg', 2, 6, false, 4.7, true, ARRAY['Solar panel charging', '25000mAh capacity', 'IP67 waterproof', 'Built-in flashlight', 'Dual USB outputs'], ARRAY[]::text[]),

('WirelessPro 10000mAh Qi Charger', 'Innovative wireless charging power bank supports both Qi wireless and traditional USB charging. 10000mAh capacity with premium glass surface for efficient wireless charging.', 1599.00, 'attached_assets/stock_images/portable_power_bank__acbea841.jpg', 2, 6, false, 4.8, true, ARRAY['Wireless Qi charging', '10000mAh capacity', 'Wired + wireless modes', 'Premium glass design', 'LED status lights'], ARRAY[]::text[]);

-- Subcategory 7: UPS Devices (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('PowerGuard 650VA Line Interactive UPS', 'Reliable 650VA UPS system protects computers and networking equipment from power interruptions and surges. Provides 15-20 minutes of backup power to safely save work and shut down.', 2499.00, 'attached_assets/stock_images/ups_uninterruptible__eb06bfff.jpg', 2, 7, true, 4.7, true, ARRAY['650VA/360W capacity', 'Line interactive technology', '4 battery backup outlets', 'Surge protection', 'USB monitoring port'], ARRAY[]::text[]),

('OfficeShield 1000VA UPS System', 'Professional 1000VA UPS designed for home offices and small businesses. Advanced voltage regulation and battery management ensure clean, stable power for sensitive electronics.', 3999.00, 'attached_assets/stock_images/ups_uninterruptible__30038e33.jpg', 2, 7, false, 4.8, true, ARRAY['1000VA/600W capacity', 'AVR technology', '6 battery outlets', 'LCD display', 'Replaceable battery'], ARRAY[]::text[]),

('DataCenter 1500VA Rack Mount UPS', 'Server-grade 1500VA rack-mountable UPS for critical systems and network infrastructure. Pure sine wave output protects sensitive server equipment and active PFC power supplies.', 8999.00, 'attached_assets/stock_images/ups_uninterruptible__1e4aac0f.jpg', 2, 7, false, 4.9, true, ARRAY['1500VA/900W capacity', 'Pure sine wave output', '2U rack mount design', 'Network management', 'Hot-swappable battery'], ARRAY[]::text[]),

('HomeProtect 850VA Standby UPS', 'Affordable standby UPS provides basic backup power protection for home computers, modems, and routers. Compact design fits easily under desks or on shelves.', 1899.00, 'attached_assets/stock_images/ups_uninterruptible__66035a0d.jpg', 2, 7, false, 4.5, true, ARRAY['850VA/480W capacity', 'Standby topology', '4 battery outlets', 'Compact footprint', 'LED indicators'], ARRAY[]::text[]),

('SmartPower 2000VA Online UPS', 'True online double-conversion UPS delivers continuous pure sine wave power. Zero transfer time ensures uninterrupted protection for critical medical, industrial, and server applications.', 14999.00, 'attached_assets/stock_images/ups_uninterruptible__38adda2b.jpg', 2, 7, true, 5.0, true, ARRAY['2000VA/1800W capacity', 'Online double-conversion', 'Zero transfer time', 'Unity power factor', 'Extended runtime options'], ARRAY[]::text[]),

('LoadShed 1200VA Gaming UPS', 'UPS optimized for gaming PCs and entertainment systems with automatic voltage regulation. Keeps your gaming sessions uninterrupted during brief power fluctuations and outages.', 4499.00, 'attached_assets/stock_images/ups_uninterruptible__20013c8e.jpg', 2, 7, false, 4.6, true, ARRAY['1200VA/720W capacity', 'Gaming-optimized', '8 total outlets', 'Green power mode', 'USB charging ports'], ARRAY[]::text[]),

('MicroUPS 600VA Desktop Backup', 'Compact desktop UPS provides basic backup power in a space-saving design. Perfect for individual workstations, modem/router combos, and small electronics.', 1599.00, 'attached_assets/stock_images/ups_uninterruptible__2ae4a3e0.jpg', 2, 7, false, 4.4, true, ARRAY['600VA/360W capacity', 'Ultra-compact design', '4 outlets total', 'Energy efficient', 'Budget-friendly'], ARRAY[]::text[]);

-- ============================================
-- CATEGORY 3: APPLIANCE ALTERNATIVES (Category ID: 3)
-- ============================================

-- Subcategory 8: Gas Stoves (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('FlameChef 2-Burner Gas Stove', 'Efficient 2-burner gas stove with high-quality brass burners delivers consistent heat for all your cooking needs. Durable stainless steel construction resists corrosion and scratches.', 3499.00, 'attached_assets/stock_images/gas_stove_burner_coo_ca8c9aeb.jpg', 3, 8, true, 4.7, true, ARRAY['2 brass burners', 'Stainless steel body', 'Auto-ignition', 'Toughened glass top', 'Easy to clean'], ARRAY[]::text[]),

('CookMaster 4-Burner Gas Range', 'Professional 4-burner gas range perfect for families and cooking enthusiasts. Multiple burner sizes accommodate different pot sizes and cooking techniques efficiently.', 7999.00, 'attached_assets/stock_images/gas_stove_burner_coo_804bd04f.jpg', 3, 8, false, 4.8, true, ARRAY['4 burner configuration', 'Variable flame control', 'Cast iron pan supports', 'Enamel coating', 'Large cooking surface'], ARRAY[]::text[]),

('PortableFlame Single Burner Stove', 'Compact single-burner portable gas stove ideal for camping, small kitchens, or as backup during power outages. Lightweight design with carrying case for easy transport.', 1299.00, 'attached_assets/stock_images/gas_stove_burner_coo_a304cb34.jpg', 3, 8, false, 4.5, true, ARRAY['Portable single burner', 'Carrying case included', 'Butane compatible', 'Wind-resistant design', 'Safety lock mechanism'], ARRAY[]::text[]),

('ProChef 3-Burner Glass Top Stove', 'Premium 3-burner gas stove with elegant black glass top complements modern kitchen designs. High-efficiency burners reduce gas consumption while providing powerful heating.', 5499.00, 'attached_assets/stock_images/gas_stove_burner_coo_44aa69b3.jpg', 3, 8, true, 4.9, true, ARRAY['3 high-efficiency burners', 'Premium glass top', 'Ergonomic knobs', 'Drip tray', 'ISI certified'], ARRAY[]::text[]),

('EconoCook 2-Burner Basic Stove', 'Budget-friendly 2-burner gas stove provides reliable cooking performance without premium features. Simple manual ignition and sturdy construction offer excellent value.', 2199.00, 'attached_assets/stock_images/gas_stove_burner_coo_45979c42.jpg', 3, 8, false, 4.3, true, ARRAY['Affordable pricing', '2 standard burners', 'Manual ignition', 'Powder-coated body', 'Basic functionality'], ARRAY[]::text[]),

('OutdoorGrill Camping Gas Burner', 'Rugged outdoor gas burner designed for camping, picnics, and outdoor cooking adventures. Heavy-duty construction withstands outdoor use and portable design travels anywhere.', 1899.00, 'attached_assets/stock_images/gas_stove_burner_coo_0d170454.jpg', 3, 8, false, 4.6, true, ARRAY['Outdoor-rated', 'High-power burner', 'Fold-away legs', 'Weather-resistant', 'Compact storage'], ARRAY[]::text[]),

('SmartFlame Auto-Ignition 3-Burner', 'Modern 3-burner gas stove with one-touch auto-ignition eliminates need for lighters or matches. Safety features include flame failure protection and child-lock knobs.', 6299.00, 'attached_assets/stock_images/gas_stove_burner_coo_8049410d.jpg', 3, 8, false, 4.7, true, ARRAY['One-touch ignition', 'Flame failure protection', '3 burner sizes', 'Child-lock knobs', 'Warranty included'], ARRAY[]::text[]);

-- Subcategory 9: Kettles (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('RapidBoil Electric Kettle 1.7L', 'Fast-boiling 1.7-liter electric kettle heats water in minutes with powerful 2200W heating element. Cordless design with 360-degree base offers convenient pouring from any angle.', 1499.00, 'attached_assets/stock_images/electric_kettle_wate_ac07df6e.jpg', 3, 9, true, 4.7, true, ARRAY['1.7L capacity', '2200W rapid heating', 'Cordless 360° base', 'Auto shut-off', 'Boil-dry protection'], ARRAY[]::text[]),

('GlassView Temperature Control Kettle', 'Premium glass kettle with variable temperature settings for different beverages. Blue LED illumination adds elegant visual appeal while water heats to your desired temperature.', 2499.00, 'attached_assets/stock_images/electric_kettle_wate_1c86c178.jpg', 3, 9, false, 4.8, true, ARRAY['Variable temperature', 'Borosilicate glass', 'LED illumination', 'Keep warm function', 'Digital display'], ARRAY[]::text[]),

('StainlessSteel Pro Kettle 2.0L', 'Large 2-liter stainless steel kettle perfect for families and offices. Durable brushed stainless construction resists fingerprints and maintains appearance over years of use.', 1899.00, 'attached_assets/stock_images/electric_kettle_wate_9d302de7.jpg', 3, 9, false, 4.6, true, ARRAY['2.0L large capacity', 'Brushed stainless steel', '1850W heating', 'Concealed element', 'Cool-touch handle'], ARRAY[]::text[]),

('TravelBoil Compact Kettle 0.5L', 'Compact 0.5-liter travel kettle designed for hotel rooms, dorms, and small spaces. Dual voltage compatibility works worldwide with appropriate plug adapter.', 899.00, 'attached_assets/stock_images/electric_kettle_wate_dd36d585.jpg', 3, 9, false, 4.4, true, ARRAY['0.5L compact size', 'Travel-friendly', 'Dual voltage', 'Foldable handle', 'Carrying pouch'], ARRAY[]::text[]),

('PrecisionTemp Smart Kettle 1.5L', 'Smart electric kettle with app connectivity and programmable temperature presets. Schedule boiling times and customize settings for perfect tea, coffee, or instant meals.', 3299.00, 'attached_assets/stock_images/electric_kettle_wate_5409015d.jpg', 3, 9, true, 4.9, true, ARRAY['WiFi app control', '1.5L capacity', 'Programmable timer', 'Multiple presets', 'Stainless interior'], ARRAY[]::text[]),

('BudgetBoil Basic Electric Kettle', 'Simple and affordable electric kettle provides reliable hot water without fancy features. Perfect for basic tea, coffee, and instant food preparation needs.', 699.00, 'attached_assets/stock_images/electric_kettle_wate_a519de75.jpg', 3, 9, false, 4.2, true, ARRAY['Budget-friendly', '1.5L capacity', 'Basic on/off switch', 'Water level window', 'Lightweight plastic'], ARRAY[]::text[]),

('RetroStyle Vintage Kettle 1.8L', 'Stylish retro-designed electric kettle combines classic aesthetics with modern functionality. Available in multiple colors to match any kitchen decor theme.', 2199.00, 'attached_assets/stock_images/electric_kettle_wate_55292882.jpg', 3, 9, false, 4.5, true, ARRAY['Retro vintage design', '1.8L capacity', 'Multiple color options', 'Stainless steel body', 'Ergonomic spout'], ARRAY[]::text[]);

-- Subcategory 10: Manual Coffee Grinders (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('BaristaGrind Ceramic Burr Grinder', 'Professional manual coffee grinder with adjustable ceramic burr mechanism produces consistent grind for any brewing method. Compact design perfect for home, office, or travel.', 1799.00, 'attached_assets/stock_images/manual_coffee_grinde_6570ae6a.jpg', 3, 10, true, 4.8, true, ARRAY['Ceramic conical burrs', 'Adjustable grind settings', 'Non-slip base', 'Glass jar container', 'Easy to clean'], ARRAY[]::text[]),

('PortaBrew Travel Coffee Grinder', 'Ultra-portable manual grinder fits in backpacks and luggage for fresh coffee anywhere. Stainless steel construction ensures durability during travel and outdoor adventures.', 1299.00, 'attached_assets/stock_images/manual_coffee_grinde_a7a13640.jpg', 3, 10, false, 4.6, true, ARRAY['Travel-sized design', 'Stainless steel build', 'Compact storage', 'Adjustable coarseness', '30g bean capacity'], ARRAY[]::text[]),

('ClassicMill Wooden Hand Grinder', 'Traditional wooden manual coffee grinder with vintage charm and reliable grinding performance. Drawer-style container catches grounds while maintaining classic coffee mill aesthetics.', 2299.00, 'attached_assets/stock_images/manual_coffee_grinde_ae95d185.jpg', 3, 10, false, 4.7, true, ARRAY['Wooden construction', 'Drawer collection', 'Vintage aesthetic', 'Carbon steel burrs', 'Heirloom quality'], ARRAY[]::text[]),

('PrecisionGrind Premium Burr Mill', 'High-end manual grinder with precision-engineered burrs delivers exceptional grind uniformity. Perfect for espresso enthusiasts demanding professional-quality results at home.', 3499.00, 'attached_assets/stock_images/manual_coffee_grinde_366d8a9a.jpg', 3, 10, true, 4.9, true, ARRAY['Premium burr quality', 'Micro-adjustment ring', 'Large 50g capacity', 'Aluminum body', 'Espresso-capable'], ARRAY[]::text[]),

('QuickGrind Budget Coffee Mill', 'Affordable manual coffee grinder for daily fresh-ground coffee without breaking the bank. Simple blade mechanism provides adequate grinding for drip coffee and French press.', 599.00, 'attached_assets/stock_images/manual_coffee_grinde_6c960987.jpg', 3, 10, false, 4.3, true, ARRAY['Budget-friendly', 'Simple operation', 'Basic grinding', 'Plastic construction', 'Easy maintenance'], ARRAY[]::text[]),

('CampGrind Outdoor Coffee Mill', 'Rugged manual grinder built for camping and outdoor use with shock-resistant materials. Compact cylindrical design stores easily in camping gear while delivering fresh coffee outdoors.', 1499.00, 'attached_assets/stock_images/manual_coffee_grinde_be20d4c3.jpg', 3, 10, false, 4.5, true, ARRAY['Outdoor-ready build', 'Shock-resistant', 'Cylindrical design', 'Carabiner attachment', 'Weatherproof'], ARRAY[]::text[]),

('ArtisanMill Hand-Crank Grinder', 'Artisan-quality manual grinder handcrafted with attention to detail and grinding excellence. Heavy-duty construction and premium materials ensure decades of reliable service.', 2999.00, 'attached_assets/stock_images/manual_coffee_grinde_4af4bf79.jpg', 3, 10, false, 4.8, true, ARRAY['Artisan craftsmanship', 'Heavy-duty build', 'Premium materials', 'Smooth operation', 'Lifetime warranty'], ARRAY[]::text[]);

-- Subcategory 11: Battery Operated Fans (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('CoolBreeze Rechargeable Desk Fan', 'Portable rechargeable desk fan provides up to 12 hours of cooling on a single charge. Quiet brushless motor and adjustable tilt head direct airflow exactly where needed.', 1299.00, 'attached_assets/stock_images/battery_operated_por_242c81ba.jpg', 3, 11, true, 4.7, true, ARRAY['12-hour battery life', 'USB-C rechargeable', 'Quiet operation', 'Adjustable tilt', '3 speed settings'], ARRAY[]::text[]),

('MightyWind Battery Operated Fan', 'Powerful battery-operated fan delivers strong airflow despite compact size. Perfect for outdoor events, camping, and emergency cooling during power outages.', 1699.00, 'attached_assets/stock_images/battery_operated_por_77afefb2.jpg', 3, 11, false, 4.6, true, ARRAY['High airflow output', 'Rechargeable battery', '360-degree rotation', 'Sturdy base', 'LED battery indicator'], ARRAY[]::text[]),

('ClipFan Portable Mini Fan', 'Versatile clip-on fan attaches to strollers, desks, tents, or treadmills for cooling anywhere. Flexible neck bends to direct airflow and compact size travels easily.', 799.00, 'attached_assets/stock_images/battery_operated_por_750dc3d8.jpg', 3, 11, false, 4.4, true, ARRAY['Clip-on design', 'Flexible neck', 'USB rechargeable', 'Ultra-portable', '8-hour runtime'], ARRAY[]::text[]),

('TowerCool Standing Battery Fan', 'Cordless standing fan with rechargeable battery provides whole-room cooling without electrical outlet constraints. Oscillation feature distributes air evenly throughout space.', 3499.00, 'attached_assets/stock_images/battery_operated_por_d6d570de.jpg', 3, 11, true, 4.8, true, ARRAY['Standing tower design', 'Auto oscillation', '16-hour battery', 'Remote control', 'Timer function'], ARRAY[]::text[]),

('PocketFan Handheld Cooling Device', 'Ultra-portable handheld fan fits in pockets and purses for personal cooling on the go. Perfect for hot weather commutes, outdoor events, and travel.', 499.00, 'attached_assets/stock_images/battery_operated_por_9a3bfd10.jpg', 3, 11, false, 4.3, true, ARRAY['Pocket-sized', 'Handheld design', 'Rechargeable battery', '4-hour runtime', 'Budget price'], ARRAY[]::text[]),

('LoadShed Emergency Fan', 'Emergency battery fan designed specifically for load shedding and power outages. Extended battery life and multiple speed settings provide comfort during extended outages.', 1899.00, 'attached_assets/stock_images/battery_operated_por_3ea28950.jpg', 3, 11, false, 4.7, true, ARRAY['Extended 20-hour battery', 'Emergency-ready', 'Stable base', '4 speed levels', 'LED power display'], ARRAY[]::text[]),

('DualPower Solar & Battery Fan', 'Eco-friendly fan operates on solar power or rechargeable battery for maximum versatility. Solar panel charges battery during day for nighttime cooling without electricity.', 2299.00, 'attached_assets/stock_images/battery_operated_por_12874d51.jpg', 3, 11, false, 4.6, true, ARRAY['Solar + battery power', 'Eco-friendly operation', 'Dual charging options', 'Adjustable solar panel', 'Zero electricity cost'], ARRAY[]::text[]);

-- ============================================
-- CATEGORY 4: COMFORT & UTILITY KITS (Category ID: 4)
-- ============================================

-- Subcategory 12: Load Shedding Survival Kits (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('Essential Load Shedding Kit', 'Complete basic kit includes LED lantern, flashlight, and rechargeable bulb for essential lighting during power outages. Affordable solution for households experiencing frequent load shedding.', 2999.00, 'attached_assets/stock_images/emergency_survival_k_ea94931b.jpg', 4, 12, true, 4.7, true, ARRAY['LED lantern included', 'Flashlight', 'Rechargeable bulb', 'Compact storage box', 'Ready to use'], ARRAY[]::text[]),

('Premium Family Survival Kit', 'Comprehensive family kit contains multiple light sources, power bank, and emergency supplies. Everything needed to maintain comfort and safety during extended power interruptions.', 5999.00, 'attached_assets/stock_images/emergency_survival_k_092e522b.jpg', 4, 12, false, 4.8, true, ARRAY['Multiple light sources', '20000mAh power bank', 'First aid supplies', 'Radio with flashlight', 'Durable carry case'], ARRAY[]::text[]),

('Office Load Shedding Kit', 'Professional kit designed for office environments includes UPS-friendly equipment and multiple device chargers. Keep business operations running during scheduled power cuts.', 7999.00, 'attached_assets/stock_images/emergency_survival_k_83a0bbcc.jpg', 4, 12, false, 4.6, true, ARRAY['Office-optimized', 'Multiple chargers', 'Portable WiFi backup', 'LED desk lamp', 'Cable organizer'], ARRAY[]::text[]),

('Deluxe Emergency Preparedness Kit', 'Top-tier survival kit with premium components for maximum preparedness. Solar charger, high-capacity power bank, and professional-grade lighting ensure extended autonomy.', 9999.00, 'attached_assets/stock_images/emergency_survival_k_f0da1c25.jpg', 4, 12, true, 4.9, true, ARRAY['Solar charging capability', 'Premium components', 'Extended runtime items', 'Comprehensive supplies', 'Waterproof container'], ARRAY[]::text[]),

('Student Dorm Survival Kit', 'Compact kit tailored for students living in dorms and shared accommodations. Space-efficient items provide essential lighting and charging during study sessions affected by outages.', 1999.00, 'attached_assets/stock_images/emergency_survival_k_80ee1989.jpg', 4, 12, false, 4.4, true, ARRAY['Student-friendly', 'Compact size', 'Study lamp included', '10000mAh power bank', 'Affordable price'], ARRAY[]::text[]),

('Automotive Emergency Kit', 'Vehicle-oriented kit stores in car for roadside emergencies and camping. Includes jumper cables, flashlights, warning triangles, and basic tools for automotive situations.', 3499.00, 'attached_assets/stock_images/emergency_survival_k_0353f151.jpg', 4, 12, false, 4.5, true, ARRAY['Automotive focus', 'Jumper cables', 'Warning triangles', 'Multi-tool included', 'Compact car storage'], ARRAY[]::text[]),

('Weekend Camping Survival Kit', 'Outdoor-focused kit perfect for camping trips and outdoor adventures. Weather-resistant items and solar charging ensure self-sufficiency away from electrical infrastructure.', 4499.00, 'attached_assets/stock_images/emergency_survival_k_4c26436e.jpg', 4, 12, false, 4.7, true, ARRAY['Outdoor-optimized', 'Weather-resistant', 'Solar charger', 'Camping lantern', 'Backpack-friendly'], ARRAY[]::text[]);

-- Subcategory 13: Surge Protectors (7 products)
INSERT INTO products (name, description, price, image, category_id, subcategory_id, featured, rating, in_stock, key_features, images)
VALUES
('SafeGuard 6-Outlet Surge Protector', 'Reliable 6-outlet surge protector shields electronics from voltage spikes and power surges. Essential protection for computers, TVs, and sensitive electronic equipment.', 799.00, 'attached_assets/stock_images/surge_protector_powe_aec769cf.jpg', 4, 13, true, 4.7, true, ARRAY['6 protected outlets', '900 joules protection', 'LED indicator lights', '6-foot power cord', 'Overload protection'], ARRAY[]::text[]),

('PowerSafe 10-Outlet Strip with USB', 'Versatile 10-outlet surge protector with integrated USB charging ports. Accommodates multiple devices while protecting against surges and providing convenient USB charging.', 1299.00, 'attached_assets/stock_images/surge_protector_powe_fe6310a2.jpg', 4, 13, false, 4.8, true, ARRAY['10 AC outlets', '4 USB charging ports', '1800 joules protection', 'Individual switches', 'Mounting brackets'], ARRAY[]::text[]),

('TravelSafe Compact Surge Protector', 'Travel-sized surge protector with 3 outlets and USB ports fits easily in luggage. Protect laptops and devices from voltage fluctuations in hotel rooms and airports.', 599.00, 'attached_assets/stock_images/surge_protector_powe_61cc1da5.jpg', 4, 13, false, 4.5, true, ARRAY['Travel-sized', '3 outlets + 2 USB', '540 joules protection', 'Compact design', 'Folding plug'], ARRAY[]::text[]),

('ProTech 12-Outlet Surge Station', 'Professional surge protection station with 12 outlets and premium components. Ideal for home offices, entertainment centers, and workstations with multiple devices.', 2499.00, 'attached_assets/stock_images/surge_protector_powe_9a71eb19.jpg', 4, 13, true, 4.9, true, ARRAY['12 protected outlets', '3600 joules protection', 'EMI/RFI filtering', 'Phone/coax protection', 'Lifetime warranty'], ARRAY[]::text[]),

('SmartSurge WiFi Controlled Strip', 'Smart surge protector with WiFi app control and individual outlet scheduling. Monitor power consumption and control devices remotely via smartphone application.', 1899.00, 'attached_assets/stock_images/surge_protector_powe_2bcdb72a.jpg', 4, 13, false, 4.6, true, ARRAY['WiFi app control', 'Individual outlet control', 'Energy monitoring', '8 smart outlets', 'Voice control compatible'], ARRAY[]::text[]),

('BasicSafe 4-Outlet Surge Strip', 'Simple and affordable 4-outlet surge protector for basic electronics protection. No-frills design provides essential surge protection at budget-friendly pricing.', 399.00, 'attached_assets/stock_images/surge_protector_powe_cc326bb2.jpg', 4, 13, false, 4.3, true, ARRAY['4 protected outlets', '450 joules protection', 'Budget-friendly', 'Indicator light', 'Basic protection'], ARRAY[]::text[]),

('UltraProtect Premium Surge System', 'Top-tier surge protection system with advanced filtering and maximum joule rating. Protects expensive equipment with comprehensive protection against all power anomalies.', 3999.00, 'attached_assets/stock_images/surge_protector_powe_e91a9f9f.jpg', 4, 13, false, 5.0, true, ARRAY['4000 joules protection', 'Advanced EMI filtering', '12 outlets', 'Network/cable protection', 'Insurance coverage'], ARRAY[]::text[]);
