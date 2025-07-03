import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// Google OAuth strategy will be imported dynamically when needed
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser, Customer } from "@shared/schema";

declare global {
  namespace Express {
    interface User {
      id: number;
      username?: string;
      password?: string;
      role?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string | null;
      address?: string | null;
      city?: string | null;
      postalCode?: string | null;
      createdAt?: Date | null;
    }
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  // For demo purposes, we'll do simple comparison
  // In production, this should use proper hashing
  return supplied === stored;
}

export async function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }),
  );

  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    try {
      // Import using dynamic import for ES modules
      const { Strategy: GoogleStrategy } = await import("passport-google-oauth20");
      
      passport.use(new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/api/auth/google/callback",
        },
        async (accessToken: any, refreshToken: any, profile: any, done: any) => {
          try {
            console.log("Google OAuth strategy called with profile:", {
              id: profile.id,
              displayName: profile.displayName,
              emails: profile.emails,
              name: profile.name
            });
            
            // Check if customer already exists
            let customer = await storage.getCustomerByEmail(profile.emails?.[0]?.value || "");
            
            if (!customer) {
              console.log("Creating new customer from Google profile");
              // Create new customer from Google profile with a default password
              // They can use their email to log in directly with this default password
              const defaultPassword = await hashPassword("google123"); // Default password for Google users
              customer = await storage.createCustomer({
                firstName: profile.name?.givenName || profile.displayName || "",
                lastName: profile.name?.familyName || "",
                email: profile.emails?.[0]?.value || "",
                password: defaultPassword,
                phone: "",
                address: "",
                city: "",
                postalCode: "",
              });
              console.log("Created new customer:", { id: customer.id, email: customer.email });
            } else {
              console.log("Found existing customer:", { id: customer.id, email: customer.email });
            }
            
            return done(null, customer as any);
          } catch (error) {
            console.error("Google OAuth callback error:", error);
            return done(error, undefined);
          }
        }
      ));
      console.log("Google OAuth strategy initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Google OAuth strategy:", error);
    }
  } else {
    console.log("Google OAuth credentials not found - skipping Google strategy");
  }

  passport.serializeUser((user: any, done) => {
    console.log("Serializing user:", { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      role: user.role 
    });
    
    if (user.username && user.role) {
      // This is an admin user
      console.log("Serializing as admin user");
      done(null, { id: user.id, type: 'user' });
    } else if (user.email) {
      // This is a customer
      console.log("Serializing as customer");
      done(null, { id: user.id, type: 'customer' });
    } else {
      // Fallback - assume customer
      console.log("Serializing as fallback customer");
      done(null, { id: user.id, type: 'customer' });
    }
  });
  
  passport.deserializeUser(async (obj: any, done) => {
    try {
      if (obj.type === 'user') {
        const user = await storage.getUser(obj.id);
        done(null, user);
      } else {
        const customer = await storage.getCustomer(obj.id);
        done(null, customer as any);
      }
    } catch (error) {
      done(error, null);
    }
  });

  // Admin login endpoint
  app.post("/api/admin/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  // Admin logout endpoint
  app.post("/api/admin/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  // Get current admin user
  app.get("/api/admin/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    // Only return user data if they are actually an admin
    if (req.user?.role !== "admin") {
      return res.sendStatus(401);
    }
    res.json(req.user);
  });

  // Middleware to check if user is authenticated admin (apply after login/user routes)
  app.use("/api/admin/products*", (req, res, next) => {
    if (!req.isAuthenticated() || req.user?.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  });

  // Test callback endpoint
  app.get("/api/auth/google/test", (req, res) => {
    console.log("Test callback hit with query:", req.query);
    res.json({ message: "Test callback received", query: req.query });
  });

  // Google OAuth routes
  app.get("/api/auth/google", (req, res, next) => {
    console.log("Starting Google OAuth flow");
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  });

  app.get(
    "/api/auth/google/callback", 
    (req, res, next) => {
      console.log("Google OAuth callback hit!");
      console.log("Query params:", req.query);
      console.log("URL:", req.url);
      next();
    },
    passport.authenticate("google", { failureRedirect: "/auth" }),
    (req, res) => {
      console.log("Google OAuth success, redirecting");
      res.redirect("/?oauth=success");
    }
  );
}