import "dotenv/config";
import { db } from "./server/db";
import { products, subcategories } from "./shared/schema";

const productData = {
  1: { // Rechargeable LED Lanterns
    images: [
      "/attached_assets/stock_images/rechargeable_led_cam_09c4d17f.jpg",
      "/attached_assets/stock_images/rechargeable_led_cam_16602e1c.jpg",
      "/attached_assets/stock_images/rechargeable_led_cam_1a2e46ef.jpg",
      "/attached_assets/stock_images/rechargeable_led_cam_63e6c7de.jpg",
      "/attached_assets/stock_images/rechargeable_led_cam_65228f1f.jpg",
      "/attached_assets/stock_images/rechargeable_led_cam_843c184c.jpg",
      "/attached_assets/stock_images/rechargeable_led_cam_ab36d403.jpg"
    ],
    products: [
      { name: "Portable LED Camping Lantern 500 Lumens", price: "899.00", description: "Bright 500 lumen LED lantern perfect for camping and outdoor activities. Rechargeable battery lasts up to 12 hours.", features: ["500 Lumens brightness", "12-hour battery life", "USB rechargeable", "Waterproof IP65 rating"] },
      { name: "Emergency LED Lantern with Solar Panel", price: "1299.00", description: "Dual charging LED lantern with solar panel and USB charging. Ideal for load shedding emergencies.", features: ["Solar + USB charging", "360° illumination", "SOS flash mode", "20-hour runtime"] },
      { name: "Ultra-Bright LED Work Light 1000 Lumens", price: "1599.00", description: "Professional grade work light with adjustable brightness and hanging hook. Perfect for workshops and garages.", features: ["1000 Lumens output", "3 brightness modes", "Magnetic base", "8-hour battery"] },
      { name: "Compact LED Lantern for Home Use", price: "699.00", description: "Compact and stylish LED lantern perfect for indoor use during power outages. Touch control dimming.", features: ["Touch dimming control", "Portable design", "6-hour battery", "Warm white light"] },
      { name: "Heavy-Duty LED Camping Light 800 Lumens", price: "1099.00", description: "Rugged LED lantern built for outdoor adventures. Shock-resistant and weatherproof construction.", features: ["800 Lumens brightness", "Shock-resistant", "Waterproof design", "15-hour runtime"] },
      { name: "Multi-Function LED Lantern with Power Bank", price: "1799.00", description: "Versatile LED lantern that doubles as a power bank to charge your devices during emergencies.", features: ["Built-in power bank", "600 Lumens", "Multiple lighting modes", "USB output port"] },
      { name: "Solar LED Camping Lantern Premium", price: "1499.00", description: "Premium solar-powered LED lantern with fast charging and long battery life. Perfect for off-grid adventures.", features: ["Solar fast charging", "750 Lumens", "Collapsible design", "18-hour battery life"] }
    ]
  },
  2: { // Solar Powered Lamps
    images: [
      "/attached_assets/stock_images/solar_powered_outdoo_019f22cc.jpg",
      "/attached_assets/stock_images/solar_powered_outdoo_6def99db.jpg",
      "/attached_assets/stock_images/solar_powered_outdoo_ad6b4400.jpg",
      "/attached_assets/stock_images/solar_powered_outdoo_b5a8a16d.jpg",
      "/attached_assets/stock_images/solar_powered_outdoo_b87c4df3.jpg",
      "/attached_assets/stock_images/solar_powered_outdoo_d078d011.jpg",
      "/attached_assets/stock_images/solar_powered_outdoo_d316e713.jpg"
    ],
    products: [
      { name: "Solar Garden Light Set of 4", price: "1299.00", description: "Decorative solar garden lights that automatically turn on at dusk. No wiring required.", features: ["Auto on/off sensor", "Weather resistant", "8-hour runtime", "Easy installation"] },
      { name: "Solar Motion Sensor Security Light", price: "899.00", description: "Bright solar-powered security light with motion sensor. Perfect for outdoor security.", features: ["PIR motion sensor", "Wide detection range", "Adjustable brightness", "All-weather design"] },
      { name: "Solar Pathway Lights Pack of 6", price: "1599.00", description: "Elegant solar pathway lights to illuminate walkways and driveways. Stylish and energy-efficient.", features: ["Stainless steel construction", "Auto light sensor", "10-hour runtime", "Weather-proof"] },
      { name: "Solar Flood Light 100W Equivalent", price: "1999.00", description: "Powerful solar flood light equivalent to 100W traditional bulb. Ideal for yards and parking areas.", features: ["100W equivalent", "Remote control", "Dusk to dawn", "6000K daylight"] },
      { name: "Solar String Lights 10M", price: "799.00", description: "Beautiful solar string lights perfect for outdoor decoration and ambiance. 10 meters of warm white LEDs.", features: ["10 meter length", "Warm white LEDs", "8 lighting modes", "Solar powered"] },
      { name: "Solar Wall Light with Remote", price: "1199.00", description: "Modern solar wall light with remote control for adjustable brightness and modes.", features: ["Remote controlled", "3 lighting modes", "Motion sensor option", "12-hour battery"] },
      { name: "Solar Landscape Spotlight Set", price: "1799.00", description: "Professional solar landscape spotlights to highlight garden features. Adjustable angle and brightness.", features: ["Adjustable angle", "2-in-1 installation", "High brightness", "Auto on/off"] }
    ]
  },
  3: { // Rechargeable Bulbs
    images: [
      "/attached_assets/stock_images/rechargeable_led_lig_71b2a66d.jpg",
      "/attached_assets/stock_images/rechargeable_led_lig_7ed524fe.jpg",
      "/attached_assets/stock_images/rechargeable_led_lig_8cb69060.jpg",
      "/attached_assets/stock_images/rechargeable_led_lig_97b85580.jpg",
      "/attached_assets/stock_images/rechargeable_led_lig_d589b2ac.jpg",
      "/attached_assets/stock_images/rechargeable_led_lig_e358ced1.jpg",
      "/attached_assets/stock_images/rechargeable_led_lig_f9f76364.jpg"
    ],
    products: [
      { name: "Smart Rechargeable LED Bulb 12W", price: "399.00", description: "Intelligent rechargeable LED bulb that stays on during power failures. 12W brightness with 4-hour backup.", features: ["12W brightness", "4-hour backup", "Auto-recharge", "Standard E27 fitting"] },
      { name: "Emergency LED Bulb 15W with Hook", price: "499.00", description: "Emergency LED bulb with removable hook for portable use. Perfect for load shedding.", features: ["15W super bright", "Portable with hook", "6-hour backup", "Dual mode: fixed/portable"] },
      { name: "Rechargeable LED Bulb 9W Cool White", price: "349.00", description: "Energy-efficient 9W LED bulb with built-in battery backup. Cool white light for clear visibility.", features: ["9W cool white", "3-hour backup", "Energy efficient", "Long lifespan"] },
      { name: "Smart Emergency Bulb with Remote", price: "599.00", description: "Advanced LED bulb with remote control and emergency backup. Adjustable brightness levels.", features: ["Remote controlled", "Dimming function", "5-hour backup", "Memory function"] },
      { name: "Rechargeable LED Bulb 20W Ultra Bright", price: "699.00", description: "Ultra-bright 20W LED bulb with extended battery backup. Ideal for large rooms and outdoor areas.", features: ["20W ultra bright", "8-hour backup", "Wide beam angle", "Fast charging"] },
      { name: "Emergency LED Bulb Twin Pack 12W", price: "749.00", description: "Value pack of two 12W rechargeable LED bulbs. Ensure backup lighting in multiple rooms.", features: ["Twin pack value", "12W each", "4-hour backup each", "Standard fitting"] },
      { name: "Solar Rechargeable LED Bulb Kit", price: "899.00", description: "Complete solar LED bulb kit with solar panel and rechargeable bulb. Perfect for off-grid living.", features: ["Solar panel included", "15W brightness", "All-day runtime", "Complete kit"] }
    ]
  },
  4: { // Motion Sensor Lights
    images: [
      "/attached_assets/stock_images/motion_sensor_securi_0a7910bc.jpg",
      "/attached_assets/stock_images/motion_sensor_securi_2be9fb75.jpg",
      "/attached_assets/stock_images/motion_sensor_securi_5c86ba57.jpg",
      "/attached_assets/stock_images/motion_sensor_securi_85c1453d.jpg",
      "/attached_assets/stock_images/motion_sensor_securi_b2cb145f.jpg",
      "/attached_assets/stock_images/motion_sensor_securi_c2d048e5.jpg",
      "/attached_assets/stock_images/motion_sensor_securi_f061ef2e.jpg"
    ],
    products: [
      { name: "Wireless Motion Sensor LED Light", price: "599.00", description: "Battery-powered wireless motion sensor light. Easy installation anywhere without wiring.", features: ["Wireless installation", "PIR motion sensor", "Battery powered", "Auto on/off"] },
      { name: "Outdoor Motion Security Light 20W", price: "1299.00", description: "Powerful 20W LED security light with adjustable motion sensor. Perfect for outdoor security.", features: ["20W LED", "Adjustable sensor", "Weatherproof IP65", "Wide coverage"] },
      { name: "Under Cabinet Motion Sensor Light", price: "399.00", description: "Slim under-cabinet light with motion sensor. Perfect for kitchens and closets.", features: ["Slim design", "USB rechargeable", "Magnetic mounting", "Warm white light"] },
      { name: "Motion Sensor Night Light Pack of 3", price: "899.00", description: "Set of 3 motion sensor night lights for hallways and stairs. Energy-efficient and convenient.", features: ["3-pack value", "Plug-in design", "Low power consumption", "Soft warm glow"] },
      { name: "Solar Motion Sensor Wall Light", price: "1099.00", description: "Solar-powered motion sensor wall light. Zero electricity cost with automatic operation.", features: ["Solar powered", "Motion activated", "All-weather rated", "Bright illumination"] },
      { name: "Smart Motion Sensor Bulb E27", price: "699.00", description: "Smart LED bulb with built-in motion sensor. Screws into standard socket, no hub required.", features: ["Built-in sensor", "Standard E27 fitting", "Auto on/off", "Energy saving"] },
      { name: "Indoor Motion Sensor Ceiling Light", price: "1499.00", description: "Ceiling-mounted motion sensor light for indoor use. Perfect for garages, basements, and storage areas.", features: ["Ceiling mount", "360° detection", "Adjustable timeout", "Bright white LED"] }
    ]
  },
  5: { // Rechargeable Flash Lights
    images: [
      "/attached_assets/stock_images/rechargeable_flashli_07df7542.jpg",
      "/attached_assets/stock_images/rechargeable_flashli_42e7098d.jpg",
      "/attached_assets/stock_images/rechargeable_flashli_46f8a7ff.jpg",
      "/attached_assets/stock_images/rechargeable_flashli_5c176f6c.jpg",
      "/attached_assets/stock_images/rechargeable_flashli_63e77aed.jpg",
      "/attached_assets/stock_images/rechargeable_flashli_bccc58e2.jpg",
      "/attached_assets/stock_images/rechargeable_flashli_fc5a2be1.jpg"
    ],
    products: [
      { name: "Tactical LED Flashlight 3000 Lumens", price: "899.00", description: "Professional tactical flashlight with 3000 lumens output. Rechargeable with multiple modes.", features: ["3000 Lumens", "5 lighting modes", "Zoom function", "USB-C charging"] },
      { name: "Mini Rechargeable Flashlight Keychain", price: "299.00", description: "Ultra-compact keychain flashlight. Small but powerful, perfect for everyday carry.", features: ["Keychain size", "500 Lumens", "USB rechargeable", "Pocket clip included"] },
      { name: "Heavy-Duty LED Torch 5000mAh", price: "1299.00", description: "Heavy-duty rechargeable torch with large 5000mAh battery. Up to 20 hours runtime.", features: ["5000mAh battery", "20-hour runtime", "Waterproof IPX7", "Power bank function"] },
      { name: "Rechargeable Spotlight 10000 Lumens", price: "1999.00", description: "Ultra-bright rechargeable spotlight for outdoor and industrial use. 10000 lumens output.", features: ["10000 Lumens", "Shoulder strap", "Built-in stand", "USB output"] },
      { name: "COB LED Work Light Rechargeable", price: "699.00", description: "Versatile COB LED work light with magnetic base and hook. Perfect for repairs and inspections.", features: ["COB LED technology", "Magnetic base", "Hanging hook", "4-hour runtime"] },
      { name: "Head Torch Rechargeable LED", price: "599.00", description: "Hands-free headlamp with adjustable strap. Ideal for camping, running, and repairs.", features: ["Hands-free design", "Adjustable angle", "3 brightness levels", "Lightweight"] },
      { name: "Rechargeable Flashlight Set of 2", price: "1499.00", description: "Value pack of two high-quality rechargeable flashlights. One for home, one for car.", features: ["2-pack value", "1000 Lumens each", "USB charging", "Durable aluminum"] }
    ]
  },
  6: { // Power Banks
    images: [
      "/attached_assets/stock_images/portable_power_bank__034b3609.jpg",
      "/attached_assets/stock_images/portable_power_bank__9cd7efe7.jpg",
      "/attached_assets/stock_images/portable_power_bank__acbea841.jpg",
      "/attached_assets/stock_images/portable_power_bank__c902707d.jpg",
      "/attached_assets/stock_images/portable_power_bank__cf17094d.jpg",
      "/attached_assets/stock_images/portable_power_bank__d4292702.jpg",
      "/attached_assets/stock_images/portable_power_bank__d5121bd2.jpg"
    ],
    products: [
      { name: "Power Bank 20000mAh Fast Charge", price: "799.00", description: "High-capacity 20000mAh power bank with fast charging support. Charge multiple devices simultaneously.", features: ["20000mAh capacity", "Fast charging", "Dual USB output", "LED indicator"] },
      { name: "Slim Power Bank 10000mAh", price: "599.00", description: "Ultra-slim 10000mAh power bank that fits easily in your pocket. Perfect for daily use.", features: ["Ultra-slim design", "10000mAh", "Lightweight", "Universal compatibility"] },
      { name: "Solar Power Bank 30000mAh", price: "1299.00", description: "Massive 30000mAh solar power bank for outdoor adventures. Built-in solar panel for emergency charging.", features: ["30000mAh capacity", "Solar charging", "LED flashlight", "Waterproof"] },
      { name: "Wireless Charging Power Bank 15000mAh", price: "1099.00", description: "Modern power bank with wireless charging pad. Charge Qi-enabled devices without cables.", features: ["Wireless Qi charging", "15000mAh", "USB-C input/output", "Fast charge support"] },
      { name: "Mini Power Bank 5000mAh", price: "399.00", description: "Compact 5000mAh power bank perfect for quick top-ups. Small enough for any pocket.", features: ["Compact size", "5000mAh", "Built-in cable", "Lightweight"] },
      { name: "Rugged Power Bank 25000mAh", price: "1599.00", description: "Ruggedized power bank built for extreme conditions. Shockproof and waterproof design.", features: ["25000mAh capacity", "Shockproof", "IP67 waterproof", "Dual fast charge"] },
      { name: "Smart Power Bank with Display 20000mAh", price: "999.00", description: "Intelligent power bank with LED display showing exact battery percentage. Fast charging technology.", features: ["LED percentage display", "20000mAh", "Smart charging", "Multiple protection"] }
    ]
  },
  7: { // UPS Devices
    images: [
      "/attached_assets/stock_images/ups_uninterruptible__1e4aac0f.jpg",
      "/attached_assets/stock_images/ups_uninterruptible__20013c8e.jpg",
      "/attached_assets/stock_images/ups_uninterruptible__2ae4a3e0.jpg",
      "/attached_assets/stock_images/ups_uninterruptible__30038e33.jpg",
      "/attached_assets/stock_images/ups_uninterruptible__38adda2b.jpg",
      "/attached_assets/stock_images/ups_uninterruptible__66035a0d.jpg",
      "/attached_assets/stock_images/ups_uninterruptible__eb06bfff.jpg"
    ],
    products: [
      { name: "UPS 650VA Desktop PC Backup", price: "2499.00", description: "Reliable 650VA UPS for desktop computers. Provides up to 15 minutes backup during power failures.", features: ["650VA/360W capacity", "4 battery outlets", "Surge protection", "Auto voltage regulation"] },
      { name: "UPS 1000VA Home Office", price: "3999.00", description: "1000VA UPS ideal for home offices. Protects computer, monitor, and router from power issues.", features: ["1000VA/600W", "6 outlets", "LCD display", "USB monitoring"] },
      { name: "Line Interactive UPS 1500VA", price: "5999.00", description: "Advanced line interactive UPS for critical equipment. Extended runtime and superior protection.", features: ["1500VA/900W", "Pure sine wave", "LCD panel", "Hot-swappable battery"] },
      { name: "Mini UPS for WiFi Router 12V", price: "1299.00", description: "Compact UPS designed for WiFi routers and modems. Stay connected during load shedding.", features: ["12V DC output", "4-6 hour runtime", "Compact design", "Auto-switchover"] },
      { name: "Smart UPS 2000VA Network Grade", price: "8999.00", description: "Enterprise-grade 2000VA UPS with network management. Perfect for servers and network equipment.", features: ["2000VA/1200W", "Network card slot", "Pure sine wave", "Extended runtime"] },
      { name: "UPS 3000VA Heavy-Duty", price: "12999.00", description: "Heavy-duty 3000VA UPS for high-power equipment. Industrial-grade reliability and performance.", features: ["3000VA/1800W", "10 outlets", "Digital display", "Battery expansion"] },
      { name: "Compact UPS 500VA Travel", price: "1899.00", description: "Portable 500VA UPS for travelers and mobile setups. Lightweight and easy to carry.", features: ["500VA/300W", "Portable design", "Travel-friendly", "Multi-plug support"] }
    ]
  },
  8: { // Gas Stoves
    images: [
      "/attached_assets/stock_images/gas_stove_burner_coo_0d170454.jpg",
      "/attached_assets/stock_images/gas_stove_burner_coo_44aa69b3.jpg",
      "/attached_assets/stock_images/gas_stove_burner_coo_45979c42.jpg",
      "/attached_assets/stock_images/gas_stove_burner_coo_8049410d.jpg",
      "/attached_assets/stock_images/gas_stove_burner_coo_804bd04f.jpg",
      "/attached_assets/stock_images/gas_stove_burner_coo_a304cb34.jpg",
      "/attached_assets/stock_images/gas_stove_burner_coo_ca8c9aeb.jpg"
    ],
    products: [
      { name: "Portable Single Burner Gas Stove", price: "599.00", description: "Compact single burner gas stove perfect for load shedding. Lightweight and portable design.", features: ["Single burner", "Portable design", "Piezo ignition", "Adjustable flame"] },
      { name: "Double Burner Gas Stove Premium", price: "1299.00", description: "High-quality double burner gas stove with enamel coating. Efficient cooking during power outages.", features: ["Two burners", "Enamel coating", "Auto ignition", "Sturdy construction"] },
      { name: "Camping Gas Stove with Case", price: "799.00", description: "Portable camping gas stove with carrying case. Perfect for outdoor cooking and emergencies.", features: ["Carrying case included", "Wind-resistant", "Compact folding", "Easy setup"] },
      { name: "Glass Top Gas Stove 2 Burner", price: "1899.00", description: "Modern glass top gas stove with two burners. Stylish design with easy-to-clean surface.", features: ["Tempered glass top", "Brass burners", "Auto ignition", "Easy cleaning"] },
      { name: "Heavy-Duty Gas Cooker 3 Burner", price: "2499.00", description: "Professional 3-burner gas cooker for serious cooking. Heavy-duty construction for daily use.", features: ["Three burners", "Cast iron grates", "Large capacity", "Commercial quality"] },
      { name: "Infrared Gas Stove Single", price: "899.00", description: "Efficient infrared gas stove with fast heating. Energy-saving technology with precise control.", features: ["Infrared technology", "Fast heating", "Energy efficient", "Safety auto-shutoff"] },
      { name: "Portable Gas Stove with Cylinder", price: "1599.00", description: "Complete portable gas stove kit with butane cylinder. Ready to use right out of the box.", features: ["Cylinder included", "Portable case", "Safety valve", "Complete kit"] }
    ]
  },
  9: { // Kettles
    images: [
      "/attached_assets/stock_images/electric_kettle_wate_1c86c178.jpg",
      "/attached_assets/stock_images/electric_kettle_wate_5409015d.jpg",
      "/attached_assets/stock_images/electric_kettle_wate_55292882.jpg",
      "/attached_assets/stock_images/electric_kettle_wate_9d302de7.jpg",
      "/attached_assets/stock_images/electric_kettle_wate_a519de75.jpg",
      "/attached_assets/stock_images/electric_kettle_wate_ac07df6e.jpg",
      "/attached_assets/stock_images/electric_kettle_wate_dd36d585.jpg"
    ],
    products: [
      { name: "Stainless Steel Electric Kettle 1.8L", price: "699.00", description: "Large 1.8L stainless steel kettle with rapid boil technology. Perfect for families.", features: ["1.8L capacity", "Rapid boil", "Auto shut-off", "Cordless design"] },
      { name: "Glass Electric Kettle with LED 1.7L", price: "899.00", description: "Elegant glass kettle with blue LED illumination. Watch water boil through the clear glass.", features: ["1.7L glass body", "LED lighting", "Boil-dry protection", "360° base"] },
      { name: "Travel Kettle Mini 0.5L", price: "399.00", description: "Compact 0.5L travel kettle perfect for hotel rooms and offices. Dual voltage compatible.", features: ["0.5L mini size", "Dual voltage", "Travel-friendly", "Fast boiling"] },
      { name: "Premium Electric Kettle 2.0L", price: "1299.00", description: "Premium 2.0L electric kettle with temperature control. Perfect temperature for different beverages.", features: ["2.0L capacity", "Temperature control", "Keep warm function", "Premium build"] },
      { name: "Variable Temperature Kettle 1.5L", price: "1599.00", description: "Advanced kettle with variable temperature settings. Ideal for tea enthusiasts and coffee lovers.", features: ["Variable temperature", "1.5L capacity", "Digital display", "Precision heating"] },
      { name: "Whistling Stovetop Kettle 2.5L", price: "799.00", description: "Traditional whistling kettle for gas stoves. Classic design with loud whistle alert.", features: ["2.5L capacity", "Loud whistle", "Gas stove compatible", "Durable steel"] },
      { name: "Quick Boil Electric Kettle 1.7L", price: "599.00", description: "Fast-boiling electric kettle that saves time and energy. Boils water in under 3 minutes.", features: ["Quick 3-min boil", "1.7L capacity", "Energy efficient", "Safety features"] }
    ]
  },
  10: { // Manual Coffee Grinders
    images: [
      "/attached_assets/stock_images/manual_coffee_grinde_366d8a9a.jpg",
      "/attached_assets/stock_images/manual_coffee_grinde_4af4bf79.jpg",
      "/attached_assets/stock_images/manual_coffee_grinde_6570ae6a.jpg",
      "/attached_assets/stock_images/manual_coffee_grinde_6c960987.jpg",
      "/attached_assets/stock_images/manual_coffee_grinde_a7a13640.jpg",
      "/attached_assets/stock_images/manual_coffee_grinde_ae95d185.jpg",
      "/attached_assets/stock_images/manual_coffee_grinde_be20d4c3.jpg"
    ],
    products: [
      { name: "Manual Coffee Grinder Ceramic Burr", price: "799.00", description: "Premium manual grinder with ceramic burr mechanism. Perfect grind for pour-over coffee.", features: ["Ceramic burr grinder", "Adjustable grind size", "No electricity needed", "Portable design"] },
      { name: "Vintage Hand Coffee Mill", price: "899.00", description: "Classic vintage-style hand coffee mill. Beautiful addition to any kitchen.", features: ["Vintage design", "Cast iron body", "Drawer catch", "Traditional grinding"] },
      { name: "Portable Coffee Grinder for Travel", price: "599.00", description: "Compact portable coffee grinder perfect for camping and travel. Fresh coffee anywhere.", features: ["Travel-friendly", "Slim design", "Durable construction", "Easy to clean"] },
      { name: "Premium Stainless Steel Hand Grinder", price: "1299.00", description: "High-end stainless steel manual grinder with precision burr. Consistent grind every time.", features: ["Stainless steel", "Precision burr", "Adjustable settings", "Professional quality"] },
      { name: "Manual Coffee Grinder with Glass Jar", price: "699.00", description: "Manual grinder with glass storage jar. Grind and store in one convenient unit.", features: ["Glass storage jar", "Ceramic grinder", "Airtight lid", "Easy grinding"] },
      { name: "Wooden Manual Coffee Grinder", price: "1099.00", description: "Beautiful wooden manual coffee grinder. Combines functionality with elegant design.", features: ["Wooden body", "Ceramic mechanism", "Drawer storage", "Classic style"] },
      { name: "Mini Manual Coffee Grinder Compact", price: "499.00", description: "Ultra-compact manual grinder for single servings. Perfect for minimalists.", features: ["Ultra-compact", "Single serving", "Lightweight", "Budget-friendly"] }
    ]
  },
  11: { // Battery Operated Fans
    images: [
      "/attached_assets/stock_images/battery_operated_por_12874d51.jpg",
      "/attached_assets/stock_images/battery_operated_por_242c81ba.jpg",
      "/attached_assets/stock_images/battery_operated_por_3ea28950.jpg",
      "/attached_assets/stock_images/battery_operated_por_750dc3d8.jpg",
      "/attached_assets/stock_images/battery_operated_por_77afefb2.jpg",
      "/attached_assets/stock_images/battery_operated_por_9a3bfd10.jpg",
      "/attached_assets/stock_images/battery_operated_por_d6d570de.jpg"
    ],
    products: [
      { name: "Rechargeable Desk Fan 6 Inch", price: "599.00", description: "Compact 6-inch rechargeable desk fan. Perfect for personal cooling during load shedding.", features: ["6-inch blade", "Rechargeable battery", "3 speed settings", "USB charging"] },
      { name: "Portable Battery Fan with LED Light", price: "799.00", description: "Multi-function portable fan with built-in LED light. Essential for load shedding.", features: ["Fan + LED light", "Rechargeable", "Adjustable head", "Long runtime"] },
      { name: "Mini Handheld Battery Fan", price: "299.00", description: "Ultra-portable handheld fan for personal cooling. Small enough to fit in your bag.", features: ["Handheld design", "Rechargeable USB", "Foldable handle", "Quiet operation"] },
      { name: "Rechargeable Standing Fan 12 Inch", price: "1499.00", description: "Full-size 12-inch rechargeable standing fan. Powerful cooling without electricity.", features: ["12-inch blade", "Adjustable height", "Remote control", "8-hour battery"] },
      { name: "Clip-On Battery Fan for Strollers", price: "399.00", description: "Convenient clip-on fan for strollers and desks. Flexible arm for perfect positioning.", features: ["Clip-on design", "Flexible arm", "Battery powered", "Quiet motor"] },
      { name: "Rechargeable Tower Fan Bladeless", price: "2499.00", description: "Modern bladeless tower fan with rechargeable battery. Safe and stylish cooling solution.", features: ["Bladeless design", "Oscillating", "Remote control", "10-hour runtime"] },
      { name: "Solar Powered Fan with Battery Backup", price: "1299.00", description: "Eco-friendly solar fan with battery backup. Sustainable cooling for off-grid living.", features: ["Solar powered", "Battery backup", "Portable", "Environment friendly"] }
    ]
  },
  12: { // Load Shedding Survival Kits
    images: [
      "/attached_assets/stock_images/emergency_survival_k_0353f151.jpg",
      "/attached_assets/stock_images/emergency_survival_k_092e522b.jpg",
      "/attached_assets/stock_images/emergency_survival_k_4c26436e.jpg",
      "/attached_assets/stock_images/emergency_survival_k_80ee1989.jpg",
      "/attached_assets/stock_images/emergency_survival_k_83a0bbcc.jpg",
      "/attached_assets/stock_images/emergency_survival_k_ea94931b.jpg",
      "/attached_assets/stock_images/emergency_survival_k_f0da1c25.jpg"
    ],
    products: [
      { name: "Essential Load Shedding Kit", price: "2499.00", description: "Complete survival kit with LED lantern, power bank, and rechargeable torch. Everything you need.", features: ["LED lantern included", "10000mAh power bank", "Rechargeable torch", "Carrying case"] },
      { name: "Premium Home Backup Kit", price: "4999.00", description: "Premium kit with multiple backup solutions. Solar panel, lanterns, and power banks.", features: ["Solar panel", "3 LED lanterns", "2 power banks", "Emergency radio"] },
      { name: "Office Load Shedding Kit", price: "3499.00", description: "Professional kit designed for office use. Keep working during power outages.", features: ["UPS for laptop", "LED desk lamp", "Power bank", "Extension cord"] },
      { name: "Family Safety Kit", price: "5999.00", description: "Comprehensive family safety kit for extended power outages. Includes lighting and power solutions.", features: ["Multiple lanterns", "Large power bank", "First aid items", "Emergency supplies"] },
      { name: "Student Study Kit", price: "1999.00", description: "Compact kit perfect for students. Study without interruption during load shedding.", features: ["Desk lamp", "Power bank", "USB fan", "Study essentials"] },
      { name: "Camping & Emergency Kit", price: "3999.00", description: "Versatile kit for camping and emergencies. Rugged and weather-resistant components.", features: ["Weatherproof case", "Solar charger", "Multi-tool", "Emergency blanket"] },
      { name: "Mini Survival Kit Compact", price: "1499.00", description: "Compact emergency kit that fits in your car. Essential items for unexpected power cuts.", features: ["Compact size", "Flashlight", "Power bank", "Car adapter"] }
    ]
  },
  13: { // Surge Protectors
    images: [
      "/attached_assets/stock_images/surge_protector_powe_2bcdb72a.jpg",
      "/attached_assets/stock_images/surge_protector_powe_61cc1da5.jpg",
      "/attached_assets/stock_images/surge_protector_powe_9a71eb19.jpg",
      "/attached_assets/stock_images/surge_protector_powe_aec769cf.jpg",
      "/attached_assets/stock_images/surge_protector_powe_cc326bb2.jpg",
      "/attached_assets/stock_images/surge_protector_powe_e91a9f9f.jpg",
      "/attached_assets/stock_images/surge_protector_powe_fe6310a2.jpg"
    ],
    products: [
      { name: "6-Way Surge Protector with USB", price: "499.00", description: "Essential 6-way surge protector with USB charging ports. Protect your devices from power spikes.", features: ["6 AC outlets", "2 USB ports", "Surge protection", "On/off switch"] },
      { name: "Heavy-Duty Surge Protector 10 Outlets", price: "899.00", description: "Professional 10-outlet surge protector for home and office. Maximum device protection.", features: ["10 outlets", "Circuit breaker", "Heavy-duty cord", "Wall mountable"] },
      { name: "Compact Travel Surge Protector", price: "349.00", description: "Portable surge protector perfect for travel. Protect your devices anywhere.", features: ["Compact design", "3 outlets", "USB charging", "Travel-friendly"] },
      { name: "Smart Surge Protector WiFi Enabled", price: "1299.00", description: "Smart surge protector with WiFi control. Monitor and control devices remotely.", features: ["WiFi enabled", "App control", "Energy monitoring", "Voice control ready"] },
      { name: "Rack Mount Surge Protector 8 Outlets", price: "1599.00", description: "Rack-mountable surge protector for server rooms. Professional-grade protection.", features: ["Rack mount design", "8 outlets", "Metal housing", "Professional grade"] },
      { name: "Surge Protector with Master Control", price: "699.00", description: "Intelligent surge protector with master outlet. Saves energy automatically.", features: ["Master control outlet", "6 controlled outlets", "Energy saving", "Auto shutoff"] },
      { name: "Outdoor Surge Protector Weatherproof", price: "999.00", description: "Weather-resistant surge protector for outdoor use. Protect outdoor equipment safely.", features: ["Weatherproof IP65", "4 outlets", "Lockable cover", "Outdoor rated"] }
    ]
  }
};

async function populateProducts() {
  console.log("Starting product population...");

  const allSubcategories = await db.select().from(subcategories);
  console.log(`Found ${allSubcategories.length} subcategories`);

  let totalProducts = 0;

  for (const subcategory of allSubcategories) {
    const data = productData[subcategory.id as keyof typeof productData];
    
    if (!data) {
      console.log(`No product data found for subcategory ${subcategory.id} (${subcategory.name})`);
      continue;
    }

    console.log(`\nProcessing subcategory: ${subcategory.name} (ID: ${subcategory.id})`);

    for (let i = 0; i < data.products.length; i++) {
      const productInfo = data.products[i];
      const product = {
        name: productInfo.name,
        description: productInfo.description,
        price: productInfo.price,
        image: data.images[i],
        images: [data.images[i]],
        categoryId: subcategory.categoryId,
        subcategoryId: subcategory.id,
        featured: i === 0, // Make first product in each subcategory featured
        rating: "4.5",
        inStock: true,
        keyFeatures: productInfo.features
      };

      await db.insert(products).values(product);
      totalProducts++;
      console.log(`  ✓ Added: ${product.name}`);
    }
  }

  console.log(`\n✅ Successfully added ${totalProducts} products across ${allSubcategories.length} subcategories!`);
}

populateProducts()
  .then(() => {
    console.log("\n🎉 Product population completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error populating products:", error);
    process.exit(1);
  });
