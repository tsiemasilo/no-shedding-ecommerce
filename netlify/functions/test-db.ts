import { Handler } from '@netlify/functions';
import { neon } from '@neondatabase/serverless';

const databaseUrl = 'postgresql://postgres:0852Tsie*@db.izkihpjkykultfshgqve.supabase.co:5432/postgres';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    const sql = neon(databaseUrl);
    
    // Test database connection
    const result = await sql`SELECT COUNT(*) as count FROM products`;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        productCount: result[0].count,
        message: 'Database connection successful'
      })
    };
  } catch (error) {
    console.error('Database test error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message,
        message: 'Database connection failed'
      })
    };
  }
};