import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6377;
const redisPassword = process.env.REDIS_PASSWORD || '';

export let redis: Redis;

export const initRedis = () => {
  redis = new Redis({
    host: redisHost,
    port: redisPort as unknown as number,
    password: redisPassword
  });

  redis
    .ping()
    .then((result) => {
      console.log('Redis connection successful:', result);
    })
    .catch((error) => {
      console.error('Redis connection error:', error);
    });
};
