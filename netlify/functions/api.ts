import { Handler } from '@netlify/functions';
import express from 'express';
import serverless from 'serverless-http';
import { storage } from '../../server/storage.js';

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

// Basic API routes for Netlify
app.get('/api/products', async (req, res) => {
  try {
    const products = await storage.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await storage.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/subcategories', async (req, res) => {
  try {
    const subcategories = await storage.getSubcategories();
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
});

// Export handler
export const handler: Handler = serverless(app);