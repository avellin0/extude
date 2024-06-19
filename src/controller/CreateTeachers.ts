import { Request, Response } from "express";
import { AbstractClassesFactory } from "../CreateFactories/Classes-factory";
import { Teacher } from "../CreateFactories/Teacher-factory";

export class CreateTeachers{
    async handle(req:Request,res:Response){
        const { userid, name, subject,access,classes} = req.body;   

        const new_teacher = new AbstractClassesFactory().createTeachers(userid,name,subject,classes,access)

    
        res.send(new_teacher)
    } 

 
}