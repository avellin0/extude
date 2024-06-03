import { Request, Response } from "express";

export class CreateTeachers{
    async handle(req:Request,res:Response){

    const {name, subject, classes, userid} = req.body;

        const user = {
            userid: userid,
            nome: name,
            materia: subject,
            turma: classes,
          }

         return res.json(user)
 }
}