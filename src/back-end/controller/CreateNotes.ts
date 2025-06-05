import {Request, Response} from 'express'
import {db} from '../database/client-db'

export class CreateNotes {
    async handle(req: Request, res: Response){
        const {user_id, content_text} = req.body
        
        console.log({ user_id, content_text });
        
        if(!user_id || !content_text){
            return res.status(400).send('Todos os campos são obrigatorios')
        }

        const user =  await db.query('INSERT INTO notes(note_id,user_id,content) VALUES (uuid_generate_v4(),$1,$2)', [user_id, content_text])        
        
        res.status(200).json({menssage: "notes were saved!"})
    }
}