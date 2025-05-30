import { Request, Response } from "express";
import { db } from "../database/client-db";

export class GetStudents{
    async handle(req:Request, res: Response){
        const {email} = req.body

        console.time()
        
        const alreadyHaveAccount = await db.query('SELECT * FROM Usuario WHERE email = $1', [email])

        if(alreadyHaveAccount.rows.length < 0){
            console.log('Usuario não encontrado');
            res.status(404).json("usuario não encontrado")
        } 
        
        res.status(200).send(alreadyHaveAccount.rows)
    }
}

