import {  createClient } from "redis";

const client = createClient({
     url: process.env.REDIS_URL || 'redis://localhost:6379'
})

client.on('error',()=>{
   console.log('Redis Error')
})

client.on('connect',()=>{
    console.log('Redis Connected')
})

await client.connect()
export default client