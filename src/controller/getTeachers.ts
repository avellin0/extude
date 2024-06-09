import { Request, Response } from "express";
import { db } from "../database/client-db";

db.connect()
export class getTeachers {
    async handle(req:Request,res:Response){
        const {teacher_id} = req.body    
        
        const research = await db.query(' SELECT * FROM teachers WHERE teacher_id  = $1', [teacher_id])
        res.send(research.rows)
    }
}