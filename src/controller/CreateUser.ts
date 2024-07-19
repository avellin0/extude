import { Request, Response } from "express";

import {createHash} from 'crypto'
import {db} from '../database/client-db'
export class CreateUser{
    async handle(req:Request ,res:Response){
            const {userId,name,email,password,permissions} = req.body

            if(!userId || !name || !email || !password || !permissions){
                return res.status(500).send('Todos os campos são obrigatorios')
            }

            const Hash = createHash('sha256').update(password).digest('hex')

            try{

            const create = await db.query('INSERT INTO Usuario(userId,name,email,password,permission) VALUES($1,$2,$3,$4,$5)', [userId,name,email,Hash,permissions])

            res.send(create.rows)
            
            }catch(err){
                console.log(err);
                res.status(500).send('Erro interno')
            }
    }
>>>>>>> schedule_2.0
}