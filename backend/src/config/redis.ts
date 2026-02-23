import redis from 'redis';

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_URL}` || `redis://localhost:6379`,
  password: process.env.REDIS_AUTH,
});

const redisSubscriber = redisClient.duplicate();

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
})

redisSubscriber.on('error', (err) => {
    console.error('Redis subscriber error:', err);
})

export async function connectRedis(): Promise<void> {
    if(!redisClient.isOpen){
        await redisClient.connect();
        console.log('✅ Redis connected');
    }
    if(!redisSubscriber.isOpen){
        redisSubscriber.connect();
        console.log('✅ Redis subscriber connected');
    }
}

export { redisSubscriber };
export default redisClient;