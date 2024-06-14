import { Request, Response } from "express";
import { TeacheProto } from "../interfaces/Teachers-proto";

export class CreateTeachers implements TeacheProto{
    infoTeacher(userid: string, name: string, subject: string, classes: number[]): object {
        throw new Error("Method not implemented.");
    }

    name: string;
    subject: string;
    classes: number[];
    // constructor(public name: string, public subject: string, public classes: number[]){}

    async handle(req:Request,res:Response){
    
        const { name, subject, classes, userid} = req.body;    

        const user = {
            userid: userid,
            nome: name,
            materia: subject,
            turma: classes,
          }


         return res.json(user)
    } 

 
}