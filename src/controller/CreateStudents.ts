import { Request, Response } from "express";
import { AbstractClassesFactory } from "../CreateFactories/Classes-factory";

export class CreateStudents{
    async handle(req:Request,res:Response){
        const { userid, name,age,classes,access} = req.body;   

        const new_student = new AbstractClassesFactory().createStudents(userid,name,age,classes,access)
    
        res.send(new_student)
    } 

 
}