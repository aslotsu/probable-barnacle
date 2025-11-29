import { NextRequest } from 'next/server';
import { createClient } from 'redis';

export async function POST(request: NextRequest) {
  try {
    // Create Redis client
    const client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    // Connect to Redis
    await client.connect();
    
    // Get session ID from request
    const { sessionId } = await request.json();

    if (sessionId) {
      // Delete the session from Redis
      await client.del(sessionId);
    }

    // Clean up
    await client.quit();

    return Response.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}