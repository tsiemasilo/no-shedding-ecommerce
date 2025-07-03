import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertNewsletterSchema, insertProductSchema, insertCustomerSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";


const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Configure multer for file uploads
  const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadsDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    }),
    fileFilter: (req, file, cb) => {
      // Accept only image files
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'));
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    }
  });

  // Serve uploaded files statically
  app.use('/uploads', express.static(uploadsDir));

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Subcategories
  app.get("/api/subcategories", async (req, res) => {
    try {
      const { categoryId } = req.query;
      
      let subcategories;
      if (categoryId) {
        subcategories = await storage.getSubcategoriesByCategory(parseInt(categoryId as string));
      } else {
        subcategories = await storage.getSubcategories();
      }
      
      res.json(subcategories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subcategories" });
    }
  });

  app.get("/api/subcategories/:slug", async (req, res) => {
    try {
      const subcategory = await storage.getSubcategoryBySlug(req.params.slug);
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      res.json(subcategory);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subcategory" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { categoryId, featured } = req.query;
      
      let products;
      if (featured === "true") {
        products = await storage.getFeaturedProducts();
      } else if (categoryId) {
        products = await storage.getProductsByCategory(parseInt(categoryId as string));
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems(req.params.sessionId);
      
      // Get product details for each cart item
      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return { ...item, product };
        })
      );
      
      res.json(itemsWithProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartItem = insertCartItemSchema.parse(req.body);
      const newItem = await storage.addToCart(cartItem);
      res.json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (quantity === undefined || quantity === null || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(parseInt(req.params.id), quantity);
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      await storage.clearCart(req.params.sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });



  // Newsletter
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletter = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeToNewsletter(newsletter);
      res.json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email address", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Customer Authentication Routes
  app.post("/api/customer/register", async (req, res) => {
    try {
      const customerData = insertCustomerSchema.parse(req.body);
      const existingCustomer = await storage.getCustomerByEmail(customerData.email);
      
      if (existingCustomer) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const customer = await storage.createCustomer({
        ...customerData,
        password: await hashPassword(customerData.password),
      });

      // Remove password from response
      const { password, ...customerResponse } = customer;
      res.status(201).json(customerResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid customer data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  // Get current customer from session
  app.get("/api/customer/user", (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Check if this is a customer (has email but no username/role)
    if (!req.user.email || req.user.username || req.user.role) {
      return res.status(401).json({ message: "Not a customer account" });
    }

    // Remove password from response
    const { password, ...customerResponse } = req.user;
    res.json(customerResponse);
  });

  app.post("/api/customer/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const customer = await storage.getCustomerByEmail(email);
      
      if (!customer) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check if customer has a password set (Google users might not have one initially)
      if (!customer.password || customer.password === "") {
        return res.status(400).json({ 
          message: "No password set for this account. Please set a password first or log in with Google.",
          needsPasswordSetup: true 
        });
      }

      if (!(await comparePasswords(password, customer.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Log in the customer using passport
      req.login(customer, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed" });
        }
        
        // Remove password from response
        const { password: _, ...customerResponse } = customer;
        res.status(200).json(customerResponse);
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Set password for Google users or update existing password
  app.post("/api/customer/set-password", async (req, res) => {
    try {
      if (!req.isAuthenticated() || !req.user?.email) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { password } = req.body;
      
      if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }

      const customer = await storage.getCustomerByEmail(req.user.email);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Hash and set the new password
      const hashedPassword = await hashPassword(password);
      await storage.updateCustomerPassword(customer.id, hashedPassword);

      res.json({ message: "Password set successfully. You can now log in directly with your email and password." });
    } catch (error) {
      console.error("Password set error:", error);
      res.status(500).json({ message: "Failed to set password" });
    }
  });

  // File upload endpoint
  app.post("/api/upload", upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // Admin Product Management Routes
  app.get("/api/admin/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post("/api/admin/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/admin/products/:id", async (req, res) => {
    try {
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(parseInt(req.params.id), productData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", async (req, res) => {
    try {
      console.log(`Attempting to delete product with ID: ${req.params.id}`);
      const success = await storage.deleteProduct(parseInt(req.params.id));
      console.log(`Delete operation result: ${success}`);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Delete product error:", error);
      res.status(500).json({ message: "Failed to delete product", error: error instanceof Error ? error.message : String(error) });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
