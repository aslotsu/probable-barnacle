// redis.config.ts
export const getRedisUrl = (): string => {
  // Use environment variable - REQUIRED for security
  if (!process.env.REDIS_URL) {
    throw new Error('REDIS_URL environment variable is not set');
  }
  return process.env.REDIS_URL;
};