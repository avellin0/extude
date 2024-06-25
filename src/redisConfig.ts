// import { Redis } from "ioredis";
// import {promisify} from 'util' 

// const redisClient = new Redis()

// function getRedis(value: number){
//     const syncRedisGet = promisify(redisClient.get).bind(redisClient) 
//     //  Isso transforma a função dentro de Redis() assincrona , pois essa library não tem suporte 

//     return syncRedisGet(value)

// }

// function setRedis(key: number, value: string){
//     const syncRedisSet = promisify(redisClient.set).bind(redisClient)

//     return syncRedisSet(key, value)
// }

// export {redisClient, getRedis, setRedis}