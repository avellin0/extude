import { config } from "dotenv";
config({path: "./src/.env"})

import {Client} from 'pg'
const db = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE,
    password: process.env.PASS
})

db.connect()
export {db}