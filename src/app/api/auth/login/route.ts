import { NextRequest } from 'next/server';
import { createClient } from 'redis';
import { getRedisUrl } from '@/lib/redis.config';

export async function POST(request: NextRequest) {
  try {
    // Create Redis client
    const client = createClient({
      url: getRedisUrl()
    });

    // Connect to Redis
    await client.connect();
    
    // Get user credentials from request
    const { email, password } = await request.json();

    // Retrieve user from Redis using email as key
    const userData = await client.get(`user:${email}`);
    
    if (!userData) {
      await client.quit();
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Parse user data
    const user = JSON.parse(userData);
    
    // Compare password (in production, you should hash passwords)
    if (user.password !== password) {
      await client.quit();
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Set session in Redis (this is a simple example)
    const sessionId = `session:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await client.setEx(sessionId, 3600, JSON.stringify({ // Session expires in 1 hour
      userId: user.id,
      email: user.email,
      name: user.name
    }));

    // Clean up
    await client.quit();

    return Response.json({ 
      sessionId,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}