import { Request, Response } from "express";
import {CreateUserService} from "../../services/user.service/CreateUser.service"

export class CreateUser{
    async handle(req:Request ,res:Response){
            const {name,email,password,permissions} = req.body
            
            const service = new CreateUserService()
            const result = await service.execute({name,email,password,permissions})

            res.status(201).json({ message: 'User created successfully', data: result})
    }
}   