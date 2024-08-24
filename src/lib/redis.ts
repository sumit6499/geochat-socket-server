import Redis from 'ioredis'
import dotenv from 'dotenv'
dotenv.config()

const redisClient:Redis=new Redis(process.env.REDIS_URL)

redisClient.on('error',(error)=>{
    console.error("redis error")
    throw new Error("Redis not configured properly")
})
export default redisClient