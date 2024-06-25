import { Request, Response } from "express";
import { db } from "../database/client-db";
// import { getRedis } from "../redisConfig";

export class getStudentsInfo{
    async handle(req:Request, res: Response){
        const {student_id} = req.body

        console.time()
        
        // const userRedis = await getRedis(student_id)
        // const user = JSON.parse(userRedis)

        const research = await db.query('SELECT * FROM students WHERE student_id = $1', [student_id])

        console.timeEnd()
        
        res.send(research.rows)
    }
}