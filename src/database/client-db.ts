import {Client} from 'pg'
const db = new Client({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'school_schedule',
    password: 'pico'
})

export {db}