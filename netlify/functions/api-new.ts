import { Handler } from '@netlify/functions';
import postgres from 'postgres';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Create a new connection for each function call
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:0852Tsie*@db.izkihpjkykultfshgqve.supabase.co:5432/postgres';
  
  let sql;
  try {
    sql = postgres(databaseUrl, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
      ssl: { rejectUnauthorized: false }
    });
  } catch (connectionError) {
    console.error('Failed to create connection:', connectionError);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Database connection failed', details: connectionError.message }),
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api-new', '');
    console.log('Function called with path:', path);
    
    // Health check
    if (path === '/api/health' && event.httpMethod === 'GET') {
      console.log('Health check called');
      const testResult = await sql`SELECT 1 as test`;
      console.log('Health check result:', testResult);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          status: 'OK', 
          database: 'connected',
          hasEnvVar: !!process.env.DATABASE_URL,
          testResult: testResult[0] 
        }),
      };
    }
    
    // Products endpoint
    if (path === '/api/products' && event.httpMethod === 'GET') {
      console.log('Products endpoint called');
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
        ORDER BY id
      `;
      console.log('Products query result count:', products.length);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(products),
      };
    }

    // Categories endpoint
    if (path === '/api/categories' && event.httpMethod === 'GET') {
      console.log('Categories endpoint called');
      const categories = await sql`
        SELECT id, name, description, image, slug
        FROM categories
        ORDER BY id
      `;
      console.log('Categories query result count:', categories.length);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(categories),
      };
    }

    // Default response for unknown endpoints
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        message: 'Not found',
        requestedPath: path,
        method: event.httpMethod,
        availableEndpoints: ['/api/products', '/api/categories', '/api/health']
      }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message,
        path: event.path 
      }),
    };
  } finally {
    // Always close the connection
    if (sql) {
      try {
        await sql.end();
        console.log('Connection closed');
      } catch (closeError) {
        console.error('Error closing connection:', closeError);
      }
    }
  }
};