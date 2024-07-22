import { Request, Response } from "express";
import {createHash} from 'crypto'
import {db} from '../database/client-db'
export class CreateUser{
    async handle(req:Request ,res:Response){
            const {name,email,password,permissions} = req.body

            if(!name || !email || !password || !permissions){
                return res.status(400).send('Todos os campos são obrigatorios')
            }

            const Hash = createHash('sha256').update(password).digest('hex')

            try{

            const create = await db.query('INSERT INTO Usuario(name,email,password,permission) VALUES($1,$2,$3,$4)', [name,email,Hash,permissions])
            
            res.status(201).json({ message: 'User created successfully', data: create.rows })

            }catch(err){
                console.log(err);
                res.status(500).send('Erro interno')
            }
    }
}   