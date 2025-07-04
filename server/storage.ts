import { categories, products, cartItems, newsletters, subcategories, users, customers, type Category, type Product, type CartItem, type Newsletter, type Subcategory, type User, type Customer, type InsertCategory, type InsertProduct, type InsertCartItem, type InsertNewsletter, type InsertSubcategory, type InsertUser, type InsertCustomer } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  
  // Subcategories
  getSubcategories(): Promise<Subcategory[]>;
  getSubcategoriesByCategory(categoryId: number): Promise<Subcategory[]>;
  getSubcategoryBySlug(slug: string): Promise<Subcategory | undefined>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Newsletter
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  
  // Users/Auth
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Customers/Auth
  getCustomer(id: number): Promise<Customer | undefined>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomerPassword(id: number, hashedPassword: string): Promise<void>;
  
  // Product management
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private subcategories: Map<number, Subcategory>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private newsletters: Map<number, Newsletter>;
  private users: Map<number, User>;
  private customers: Map<number, Customer>;
  private currentCategoryId: number;
  private currentSubcategoryId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentNewsletterId: number;
  private currentUserId: number;
  private currentCustomerId: number;

  constructor() {
    this.categories = new Map();
    this.subcategories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.newsletters = new Map();
    this.users = new Map();
    this.customers = new Map();
    this.currentCategoryId = 1;
    this.currentSubcategoryId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentNewsletterId = 1;
    this.currentUserId = 1;
    this.currentCustomerId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoriesData: InsertCategory[] = [
      {
        name: "Lighting Solutions",
        description: "Premium LED fixtures, smart lighting systems, and energy-efficient solutions",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "lighting-solutions"
      },
      {
        name: "Power Solutions", 
        description: "UPS systems, generators, power distribution, and backup solutions",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "power-solutions"
      },
      {
        name: "Appliance Alternatives",
        description: "Energy-efficient alternatives to traditional appliances",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "appliance-alternatives"
      },
      {
        name: "Comfort & Utility Kits",
        description: "Complete electrical tool kits and comfort solutions",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "comfort-utility-kits"
      },
      {
        name: "Premium Items",
        description: "Luxury electrical fixtures and high-end smart solutions",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "premium-items"
      },
      {
        name: "Safety & Security",
        description: "Circuit breakers, surge protectors, electrical safety equipment",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "safety-security"
      }
    ];

    categoriesData.forEach(cat => {
      const category: Category = { ...cat, id: this.currentCategoryId++ };
      this.categories.set(category.id, category);
    });

    // Seed subcategories
    const subcategoriesData: InsertSubcategory[] = [
      // Lighting Solutions subcategories
      {
        name: "Rechargeable LED Lanterns",
        description: "Portable LED lanterns with rechargeable batteries",
        categoryId: 1, // Lighting Solutions
        slug: "rechargeable-led-lanterns"
      },
      {
        name: "Solar Powered Lamp",
        description: "Eco-friendly solar powered outdoor and indoor lamps",
        categoryId: 1, // Lighting Solutions
        slug: "solar-powered-lamp"
      },
      {
        name: "Rechargeable Bulbs",
        description: "Emergency LED bulbs with built-in battery backup",
        categoryId: 1, // Lighting Solutions
        slug: "rechargeable-bulbs"
      },
      {
        name: "Motion Sensor Lights",
        description: "Automatic LED lights with motion detection",
        categoryId: 1, // Lighting Solutions
        slug: "motion-sensor-lights"
      },
      // Power Solutions subcategories
      {
        name: "Power Banks",
        description: "Portable battery packs for charging devices on-the-go",
        categoryId: 2, // Power Solutions
        slug: "power-banks"
      },
      {
        name: "UPS Devices",
        description: "Uninterruptible Power Supply systems for backup power protection",
        categoryId: 2, // Power Solutions
        slug: "ups-devices"
      },
      // Appliance Alternatives subcategories
      {
        name: "Gas Stoves",
        description: "Efficient gas-powered cooking stoves and portable burners",
        categoryId: 3, // Appliance Alternatives
        slug: "gas-stoves"
      },
      {
        name: "Kettles",
        description: "Electric and stovetop kettles for quick water heating",
        categoryId: 3, // Appliance Alternatives
        slug: "kettles"
      }
    ];

    subcategoriesData.forEach(subcat => {
      const subcategory: Subcategory = { ...subcat, id: this.currentSubcategoryId++ };
      this.subcategories.set(subcategory.id, subcategory);
    });

    // Seed admin user
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin1", // In production, this should be hashed
      role: "admin"
    };
    this.users.set(adminUser.id, adminUser);

    // Products will be added through admin dashboard and saved to database
    // No seed products - starting with empty product catalog
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async getSubcategories(): Promise<Subcategory[]> {
    return Array.from(this.subcategories.values());
  }

  async getSubcategoriesByCategory(categoryId: number): Promise<Subcategory[]> {
    return Array.from(this.subcategories.values()).filter(subcat => subcat.categoryId === categoryId);
  }

  async getSubcategoryBySlug(slug: string): Promise<Subcategory | undefined> {
    return Array.from(this.subcategories.values()).find(subcat => subcat.slug === slug);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.categoryId === categoryId);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists for this session
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.productId === cartItem.productId && item.sessionId === cartItem.sessionId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += cartItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      // Create new item
      const newItem: CartItem = { ...cartItem, id: this.currentCartItemId++ };
      this.cartItems.set(newItem.id, newItem);
      return newItem;
    }
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToRemove = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    itemsToRemove.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  async subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const newSubscription: Newsletter = { 
      ...newsletter, 
      id: this.currentNewsletterId++,
      subscribedAt: new Date().toISOString()
    };
    this.newsletters.set(newSubscription.id, newSubscription);
    return newSubscription;
  }

  // User/Auth methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = { ...user, id: this.currentUserId++ };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  // Customer authentication methods
  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(customer => customer.email === email);
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const newCustomer: Customer = { 
      ...customer, 
      id: this.currentCustomerId++,
      createdAt: new Date()
    };
    this.customers.set(newCustomer.id, newCustomer);
    return newCustomer;
  }

  async updateCustomerPassword(id: number, hashedPassword: string): Promise<void> {
    const customer = this.customers.get(id);
    if (customer) {
      customer.password = hashedPassword;
      this.customers.set(id, customer);
    }
  }

  // Product management methods
  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct: Product = { ...product, id: this.currentProductId++ };
    this.products.set(newProduct.id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (product) {
      const updatedProduct: Product = { ...product, ...productUpdate };
      this.products.set(id, updatedProduct);
      return updatedProduct;
    }
    return undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
}

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
    this.seedData();
  }

  private async seedData() {
    // Check if categories already exist to avoid duplicate seeding
    const existingCategories = await db.select().from(categories).limit(1);
    if (existingCategories.length > 0) {
      return; // Data already seeded
    }

    // Seed categories
    const categoriesData: InsertCategory[] = [
      {
        name: "Lighting Solutions",
        description: "Premium LED fixtures, smart lighting systems, and energy-efficient solutions",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "lighting-solutions"
      },
      {
        name: "Power Solutions", 
        description: "UPS systems, generators, power distribution, and backup solutions",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "power-solutions"
      },
      {
        name: "Appliance Alternatives",
        description: "Energy-efficient alternatives to traditional appliances",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "appliance-alternatives"
      },
      {
        name: "Comfort & Utility Kits",
        description: "Complete electrical tool kits and comfort solutions",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "comfort-utility-kits"
      },
      {
        name: "Premium Items",
        description: "Luxury electrical fixtures and high-end smart solutions",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "premium-items"
      },
      {
        name: "Safety & Security",
        description: "Advanced security systems and safety equipment for electrical installations",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        slug: "safety-security"
      }
    ];

    await db.insert(categories).values(categoriesData);

    // Seed subcategories
    const subcategoriesData: InsertSubcategory[] = [
      // Lighting Solutions subcategories
      {
        name: "Rechargeable LED Lanterns",
        description: "Portable LED lanterns with rechargeable batteries",
        categoryId: 1,
        icon: "Zap",
        slug: "rechargeable-led-lanterns"
      },
      {
        name: "Solar Powered Lamps",
        description: "Eco-friendly solar-powered outdoor and indoor lamps",
        categoryId: 1,
        icon: "Sun",
        slug: "solar-powered-lamps"
      },
      {
        name: "Rechargeable Bulbs",
        description: "Smart LED bulbs with built-in backup power",
        categoryId: 1,
        icon: "Lightbulb",
        slug: "rechargeable-bulbs"
      },
      {
        name: "Motion Sensor Lights",
        description: "Automatic lighting solutions with motion detection",
        categoryId: 1,
        icon: "Eye",
        slug: "motion-sensor-lights"
      },
      // Power Solutions subcategories
      {
        name: "Power Banks",
        description: "Portable charging solutions for all your devices",
        categoryId: 2,
        icon: "Smartphone",
        slug: "power-banks"
      },
      {
        name: "UPS Devices",
        description: "Uninterruptible power supply systems for home and office",
        categoryId: 2,
        icon: "Shield",
        slug: "ups-devices"
      },
      // Appliance Alternatives subcategories
      {
        name: "Gas Stoves",
        description: "Efficient gas cooking solutions and portable stoves",
        categoryId: 3,
        icon: "Flame",
        slug: "gas-stoves"
      },
      {
        name: "Kettles",
        description: "Electric and gas kettles for all your hot water needs",
        categoryId: 3,
        icon: "Coffee",
        slug: "kettles"
      },
      {
        name: "Manual Coffee Grinders",
        description: "Hand-operated coffee grinders for fresh coffee anywhere",
        categoryId: 3,
        icon: "Coffee",
        slug: "manual-coffee-grinders"
      },
      {
        name: "Battery Operated Fans",
        description: "Portable fans powered by rechargeable batteries",
        categoryId: 3,
        icon: "Fan",
        slug: "battery-operated-fans"
      },
      // Comfort and Utility Kits subcategories
      {
        name: "Load Shedding Survival Kits",
        description: "Complete emergency kits for power outages and load shedding",
        categoryId: 4,
        icon: "Package",
        slug: "load-shedding-survival-kits"
      },
      {
        name: "Surge Protectors",
        description: "Advanced surge protection for sensitive electronics",
        categoryId: 4,
        icon: "Shield",
        slug: "surge-protectors"
      }
    ];

    await db.insert(subcategories).values(subcategoriesData);

    // Seed admin user
    await db.insert(users).values({
      username: "admin",
      password: "admin1", // In production, this should be hashed
      role: "admin"
    });

    // No products seeded - they will be added through admin dashboard
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async getSubcategories(): Promise<Subcategory[]> {
    return await db.select().from(subcategories);
  }

  async getSubcategoriesByCategory(categoryId: number): Promise<Subcategory[]> {
    return await db.select().from(subcategories).where(eq(subcategories.categoryId, categoryId));
  }

  async getSubcategoryBySlug(slug: string): Promise<Subcategory | undefined> {
    const [subcategory] = await db.select().from(subcategories).where(eq(subcategories.slug, slug));
    return subcategory;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.featured, true));
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.categoryId, categoryId));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    const [newItem] = await db.insert(cartItems).values(cartItem).returning();
    return newItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const [updatedItem] = await db.update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
    return (result.rowCount ?? 0) > 0;
  }

  async subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const [newSubscription] = await db.insert(newsletters).values({
      email: newsletter.email,
      subscribedAt: new Date().toISOString()
    }).returning();
    return newSubscription;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  // Customer authentication methods
  async getCustomer(id: number): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer || undefined;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.email, email));
    return customer || undefined;
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const [newCustomer] = await db
      .insert(customers)
      .values(customer)
      .returning();
    return newCustomer;
  }

  async updateCustomerPassword(id: number, hashedPassword: string): Promise<void> {
    await db
      .update(customers)
      .set({ password: hashedPassword })
      .where(eq(customers.id, id));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db.update(products)
      .set(productUpdate)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      console.log(`DatabaseStorage: Deleting product with ID ${id}`);
      
      // First delete any cart items that reference this product
      console.log(`DatabaseStorage: Removing cart items for product ${id}`);
      await db.delete(cartItems).where(eq(cartItems.productId, id));
      
      // Then delete the product
      const result = await db.delete(products).where(eq(products.id, id));
      console.log(`DatabaseStorage: Delete result:`, result);
      const success = (result.rowCount ?? 0) > 0;
      console.log(`DatabaseStorage: Delete success: ${success}`);
      return success;
    } catch (error) {
      console.error(`DatabaseStorage: Delete error for product ${id}:`, error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
