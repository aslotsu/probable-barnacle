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
    
    // Get user data from request
    const { users } = await request.json();

    // Add default users if they don't exist
    const defaultUsers = users || [
      {
        id: '1',
        email: 'admin@yourdomain.com',
        name: 'Admin User',
        password: 'admin123'
      },
      {
        id: '2',
        email: 'books@yourdomain.com',
        name: 'Books Manager',
        password: 'books123'
      },
      {
        id: '3',
        email: 'events@yourdomain.com',
        name: 'Events Manager',
        password: 'events123'
      }
    ];

    // Store each user in Redis
    for (const user of defaultUsers) {
      await client.set(`user:${user.email}`, JSON.stringify(user));
    }

    // Clean up
    await client.quit();

    return Response.json({ 
      message: 'Users initialized successfully', 
      count: defaultUsers.length 
    });
  } catch (error) {
    console.error('User initialization error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}