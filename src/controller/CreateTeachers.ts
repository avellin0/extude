import { Request, Response } from "express";
import { Teacher } from "../CreateFactories/Teacher-factory";

export class CreateTeachers{
    async handle(req:Request,res:Response){
        const { userid, name, subject,access} = req.body;   

        const new_teacher = new Teacher()
        new_teacher.createTeacher(userid,name,subject,access)

        const user = {
            id: userid,
            name: name,
            tema: subject,
            permissao: access
        }

        res.send(user)
    } 

 
}