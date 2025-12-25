import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = 'https://ywrcuzbtbswaiynmzkti.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string 

export const supabase = createClient(supabaseUrl, supabaseKey)


// supabase.from('app_users').select('*').then((response) => {
// })


// export class db {
//   async query(){
//     const response = await fetch(`https://ywrcuzbtbswaiynmzkti.supabase.co`)
//     const data = await response.json()
//     return data
//   }
// }

// const test = new db()

// console.log("esse é o resultado",test.query());


