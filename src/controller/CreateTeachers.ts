import { Request, Response } from "express";
import { Teacher } from "../CreateFactories/Teacher-factory";

export class CreateTeachers{
    async handle(req:Request,res:Response){
        const { name, subject, classes, userid} = req.body;   
        
         const user = {
            userid: userid,
            nome: name,
            materia: subject,
            turma: classes,
          }

          const new_teacher = new Teacher(name,subject,classes,userid)
          

         return res.json(new_teacher.infoTeacher)
    } 

 
}