import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  console.log('Simple test function called');
  console.log('Environment variables available:', Object.keys(process.env).filter(key => key.includes('DATABASE')));
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Test function working',
      timestamp: new Date().toISOString(),
      hasDbUrl: !!process.env.DATABASE_URL,
      envKeys: Object.keys(process.env).filter(key => key.includes('DATABASE')),
    }),
  };
};