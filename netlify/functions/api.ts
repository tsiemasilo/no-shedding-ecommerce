import { Handler } from '@netlify/functions';
import { neon } from '@neondatabase/serverless';

// Simple direct database connection for Netlify
const sql = neon(process.env.DATABASE_URL!);

export const handler: Handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    
    // Products endpoint
    if (path === '/api/products' && event.httpMethod === 'GET') {
      const products = await sql`
        SELECT 
          id, 
          name, 
          description, 
          price, 
          image, 
          images, 
          category_id as "categoryId", 
          subcategory_id as "subcategoryId", 
          featured, 
          rating, 
          in_stock as "inStock", 
          key_features as "keyFeatures"
        FROM products
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(products),
      };
    }

    // Categories endpoint
    if (path === '/api/categories' && event.httpMethod === 'GET') {
      const categories = await sql`
        SELECT id, name, description, image, slug
        FROM categories
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(categories),
      };
    }

    // Subcategories endpoint
    if (path === '/api/subcategories' && event.httpMethod === 'GET') {
      const subcategories = await sql`
        SELECT 
          id, 
          name, 
          description, 
          category_id as "categoryId", 
          slug, 
          icon
        FROM subcategories
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(subcategories),
      };
    }

    // Featured products endpoint
    if (path === '/api/products/featured' && event.httpMethod === 'GET') {
      const products = await sql`
        SELECT 
          id, 
          name, 
          description, 
          price, 
          image, 
          images, 
          category_id as "categoryId", 
          subcategory_id as "subcategoryId", 
          featured, 
          rating, 
          in_stock as "inStock", 
          key_features as "keyFeatures"
        FROM products 
        WHERE featured = true
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(products),
      };
    }

    // Default 404 response
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ message: 'Not found' }),
    };

  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};