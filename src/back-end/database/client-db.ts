import dotenv from 'dotenv'
dotenv.config()

import {Client} from 'pg'
const db = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    port: Number(process.env.PORT),
    database: process.env.DATABASE,
    password: process.env.PASS,
    ssl:{
        rejectUnauthorized: false
    }
})


db.connect()
export {db}