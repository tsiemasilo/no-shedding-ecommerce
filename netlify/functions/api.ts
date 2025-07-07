import { Handler } from '@netlify/functions';

// Use @neondatabase/serverless which works with Supabase and is already installed
import { neon } from '@neondatabase/serverless';

// Get database URL from environment variable or fallback
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:0852Tsie*@db.izkihpjkykultfshgqve.supabase.co:5432/postgres';
const sql = neon(databaseUrl);

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
    console.log('Netlify function called with path:', path, 'method:', event.httpMethod);
    
    // Debug: Test database connection first
    if (path === '/api/health' && event.httpMethod === 'GET') {
      console.log('Testing database connection...');
      console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
      console.log('Using URL:', databaseUrl.substring(0, 50) + '...');
      
      try {
        const testQuery = await sql`SELECT 1 as test`;
        console.log('Database test result:', testQuery);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            status: 'OK', 
            database: 'connected',
            hasEnvVar: !!process.env.DATABASE_URL,
            testResult: testQuery[0] 
          }),
        };
      } catch (dbError) {
        console.error('Database connection failed:', dbError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            status: 'ERROR', 
            database: 'failed',
            hasEnvVar: !!process.env.DATABASE_URL,
            error: dbError.message 
          }),
        };
      }
    }
    
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

    // Admin login endpoint
    if (path === '/api/admin/login' && event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const { username, password } = body;
      
      // Simple hardcoded admin check for Netlify
      if (username === 'admin' && password === 'admin123') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            success: true, 
            user: { id: 1, username: 'admin', role: 'admin' },
            token: 'admin-token-' + Date.now()
          }),
        };
      }
      
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: 'Invalid credentials' }),
      };
    }

    // Admin user check endpoint  
    if (path === '/api/admin/user' && event.httpMethod === 'GET') {
      // For Netlify, we'll use a simple token check from headers
      const authHeader = event.headers.authorization || event.headers.Authorization;
      if (authHeader && authHeader.includes('admin-token')) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ id: 1, username: 'admin', role: 'admin' }),
        };
      }
      
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ message: 'Not authenticated' }),
      };
    }

    // Health check endpoint
    if (path === '/api/health' && event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() }),
      };
    }

    // Default 404 response
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ 
        message: 'Not found', 
        requestedPath: path,
        method: event.httpMethod,
        availableEndpoints: ['/api/products', '/api/categories', '/api/subcategories', '/api/products/featured', '/api/health']
      }),
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