import { Request, Response } from "express";
import {db} from '../database/client-db'

export class GetId {
   async handle(req: Request, res: Response){
        const {email} = req.params

        const research = await db.query('SELECT userid FROM usuario WHERE email = $1', [email])      
        // SELECT  usuario.userId, notes.content FROM usuario INNER JOIN notes ON usuario.userid = notes.user_id
        console.log(research.rows);
        
        res.send(research.rows)
    }
}