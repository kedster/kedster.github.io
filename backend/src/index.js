/**
 * Cloudflare Worker for Seth Keddy's Portfolio
 * Handles API endpoints and server-side functionality
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // API routes
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env);
    }

    // Fallback for non-API requests
    return new Response('Not Found', { status: 404 });
  },
};

async function handleApiRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Health check endpoint
  if (path === '/api/health') {
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  }

  // Contact form endpoint (placeholder for future implementation)
  if (path === '/api/contact' && request.method === 'POST') {
    // TODO: Implement contact form handling
    // This could integrate with email services, databases, etc.
    return Response.json({
      message: 'Contact form endpoint - implementation pending',
      received: true,
    });
  }

  // Portfolio stats endpoint (placeholder for future analytics)
  if (path === '/api/stats') {
    return Response.json({
      visitors: 'Analytics integration pending',
      projects: 6,
      lastUpdate: new Date().toISOString(),
    });
  }

  return new Response('API endpoint not found', { status: 404 });
}