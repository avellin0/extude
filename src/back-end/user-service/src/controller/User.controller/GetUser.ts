import { Request, Response } from "express";
import { Username } from "src/services/user.service/GetUser.service";

export class GetUser{
    async handle(req:Request,res:Response){
        const {id} = req.body;
        
        const username = new Username()
        const result = await username.execute(id)
    
        
        res.status(200).send(result)
    } 
}