import { Request, Response } from "express";
import { AbstractClassesFactory } from "../CreateFactories/Classes-factory";

export class CreateUser{
    async handle(req:Request,res:Response){
        const { userId,name,email,password,permission} = req.body;   

        const new_student = new AbstractClassesFactory().createUser(userId,name,email,password,permission)
    
        res.send(new_student)
    } 

 
}