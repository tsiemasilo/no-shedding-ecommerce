import { Handler } from '@netlify/functions';
import express from 'express';
import serverless from 'serverless-http';
import session from 'express-session';
import { registerRoutes } from '../../server/routes.js';

const app = express();

// Configure express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for Netlify
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Session configuration for Netlify
app.use(session({
  secret: process.env.SESSION_SECRET || 'netlify-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Register all routes
registerRoutes(app);

// Export handler
export const handler: Handler = serverless(app);