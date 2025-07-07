import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api-simple', '');
    console.log('Simple API called with path:', path);
    
    // Health check
    if (path === '/api/health') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          status: 'OK',
          timestamp: new Date().toISOString(),
          message: 'Simple API working'
        }),
      };
    }

    // Mock products data for testing
    if (path === '/api/products') {
      const mockProducts = [
        {
          id: 1,
          name: "Solar LED Light",
          description: "High-quality solar LED light",
          price: 299.99,
          image: "/api/placeholder/300/200",
          inStock: true,
          rating: 4.5,
          categoryId: 1
        },
        {
          id: 2,
          name: "Power Bank 10000mAh",
          description: "Portable power bank",
          price: 599.99,
          image: "/api/placeholder/300/200",
          inStock: true,
          rating: 4.8,
          categoryId: 2
        }
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(mockProducts),
      };
    }

    // Mock categories
    if (path === '/api/categories') {
      const mockCategories = [
        {
          id: 1,
          name: "Lighting Solutions",
          description: "Solar and LED lighting products",
          image: "/api/placeholder/400/300",
          slug: "lighting-solutions"
        },
        {
          id: 2,
          name: "Power Solutions",
          description: "Power banks and UPS devices",
          image: "/api/placeholder/400/300",
          slug: "power-solutions"
        }
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(mockCategories),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};