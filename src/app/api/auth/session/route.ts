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

    if (!sessionId) {
      await client.quit();
      return Response.json({ valid: false, user: null });
    }

    // Get session data from Redis
    const sessionData = await client.get(sessionId);
    
    if (!sessionData) {
      await client.quit();
      return Response.json({ valid: false, user: null });
    }

    // Clean up
    await client.quit();

    const user = JSON.parse(sessionData);
    return Response.json({ valid: true, user });
  } catch (error) {
    console.error('Session validation error:', error);
    return Response.json({ valid: false, user: null });
  }
}