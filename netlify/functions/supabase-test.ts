import { Handler } from '@netlify/functions';

// Test using Supabase REST API instead of direct PostgreSQL connection
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

  try {
    const path = event.path.replace('/.netlify/functions/supabase-test', '');
    console.log('Supabase test function called with path:', path);
    
    // Use Supabase REST API instead of direct PostgreSQL
    const supabaseUrl = 'https://izkihpjkykultfshgqve.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6a2locGpreWt1bHRmc2hncXZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTY3OTE4NywiZXhwIjoyMDUxMjU1MTg3fQ.NVfq7BMNMGMY8LcwCVyq8d4VG-8_fO9-Pr1rIrfC8l4';
    
    // Health check
    if (path === '/api/health' && event.httpMethod === 'GET') {
      console.log('Supabase health check');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          status: 'OK', 
          method: 'supabase-rest-api',
          timestamp: new Date().toISOString()
        }),
      };
    }
    
    // Products endpoint using Supabase REST API
    if (path === '/api/products' && event.httpMethod === 'GET') {
      console.log('Fetching products via Supabase REST API');
      
      const response = await fetch(`${supabaseUrl}/rest/v1/products?select=*&order=id`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
      }
      
      const products = await response.json();
      console.log('Products fetched successfully, count:', products.length);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(products),
      };
    }
    
    // Categories endpoint using Supabase REST API
    if (path === '/api/categories' && event.httpMethod === 'GET') {
      console.log('Fetching categories via Supabase REST API');
      
      const response = await fetch(`${supabaseUrl}/rest/v1/categories?select=*&order=id`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
      }
      
      const categories = await response.json();
      console.log('Categories fetched successfully, count:', categories.length);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(categories),
      };
    }

    // Default response
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
    console.error('Supabase test function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message,
        method: 'supabase-rest-api'
      }),
    };
  }
};