import { Request, Response } from "express";
import { Teacher } from "../CreateFactories/Teacher-factory";
import { db } from "../database/client-db";

export class CreateTeachers{
    async handle(req:Request,res:Response){
        const { userid, name, subject,access} = req.body;   

        const new_teacher = new Teacher(name,subject,access,userid)
        
        const pushTeacher = await db.query('INSERT INTO teachers(teacher_id,name,subject,access) VALUES($1,$2,$3,$4);',[userid,name,subject,access])

        console.log(new_teacher);
        return res.json(pushTeacher.rows)
    } 

 
}