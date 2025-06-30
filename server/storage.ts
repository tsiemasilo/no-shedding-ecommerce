import { categories, products, cartItems, newsletters, type Category, type Product, type CartItem, type Newsletter, type InsertCategory, type InsertProduct, type InsertCartItem, type InsertNewsletter } from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  
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
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private newsletters: Map<number, Newsletter>;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentNewsletterId: number;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.newsletters = new Map();
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentNewsletterId = 1;
    
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

    // Seed products
    const productsData: InsertProduct[] = [
      {
        name: "Smart LED Ceiling Light",
        description: "Wireless controlled, energy-efficient LED ceiling light with dimming capabilities",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 1,
        featured: true,
        rating: "4.8",
        inStock: true
      },
      {
        name: "Portable Power Station",
        description: "1000W capacity portable power station with multiple outlets and USB ports",
        price: "599.99",
        image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 2,
        featured: true,
        rating: "4.6",
        inStock: true
      },
      {
        name: "Professional Multimeter",
        description: "Digital display multimeter with auto-ranging and safety features",
        price: "149.99",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 4,
        featured: true,
        rating: "4.9",
        inStock: true
      },
      {
        name: "Smart Home Hub",
        description: "Control all your smart devices from one central hub with voice control",
        price: "299.99",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 5,
        featured: true,
        rating: "4.7",
        inStock: true
      },
      {
        name: "LED Strip Lights Kit",
        description: "16.4ft RGB LED strip lights with remote control and adhesive backing",
        price: "39.99",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 1,
        featured: false,
        rating: "4.5",
        inStock: true
      },
      {
        name: "Solar Power Generator",
        description: "Eco-friendly solar generator with built-in battery storage",
        price: "899.99",
        image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 2,
        featured: false,
        rating: "4.4",
        inStock: true
      },
      {
        name: "Smart Circuit Breaker Panel",
        description: "Advanced circuit breaker with remote monitoring and control",
        price: "349.99",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 6,
        featured: true,
        rating: "4.8",
        inStock: true
      },
      {
        name: "Whole House Surge Protector",
        description: "Professional-grade surge protection for entire home",
        price: "279.99",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 6,
        featured: false,
        rating: "4.6",
        inStock: true
      },
      {
        name: "Ground Fault Circuit Interrupter",
        description: "GFCI outlet with built-in safety protection",
        price: "45.99",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 6,
        featured: false,
        rating: "4.5",
        inStock: true
      }
    ];

    productsData.forEach(prod => {
      const product: Product = { ...prod, id: this.currentProductId++ };
      this.products.set(product.id, product);
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
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
}

export const storage = new MemStorage();
