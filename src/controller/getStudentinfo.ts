import { Request, Response } from "express";
import { db } from "../database/client-db";
// import { getRedis } from "../redisConfig";

export class getStudentsInfo{
    async handle(req:Request, res: Response){
        const {student_id} = req.body

       
        const research = await db.query('SELECT * FROM students WHERE student_id = $1', [student_id])

        
        res.send(research.rows)
    }
}