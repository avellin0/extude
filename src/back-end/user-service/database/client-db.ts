import dotenv from 'dotenv'
dotenv.config()

import {Client} from 'pg'

const db = new Client({
  connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
})

db.connect()
export {db}