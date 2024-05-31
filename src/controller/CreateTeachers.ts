import { Request, Response } from "express";

export class CreateTeachers{
    async handle(req:Request,res:Response){

    const {name, subject, classes} = req.body;

        const user = {
            nome: name,
            materia: subject,
            turma: classes,
          }

         return res.json(user)
 }
}