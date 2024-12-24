import { Request, Response } from "express";
import { db } from "../database/client-db";

export class GetStudents{
    async handle(req:Request, res: Response){
        const {email} = req.body

        console.time()
        
        const alreadyHaveAccount = await db.query('SELECT * FROM Usuario WHERE email = $1', [email])

        if(alreadyHaveAccount.rows.length > 0){
            console.log('Email já registrado');
            return res.send('Usuario ja  existe') 
        } 
        
        console.timeEnd()

        res.status(500).send("Tudo certo")
    }
}

