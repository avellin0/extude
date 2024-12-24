import { Request, Response } from "express";
import {db} from '../database/client-db'

export class GetId {
   async handle(req: Request, res: Response){
        const {email} = req.params

        const research = await db.query('SELECT user_notes_id FROM usuario WHERE email = $1', [email])      
        console.log(research.rows);
        
        res.send(research.rows)
    }
}