import {Request, Response} from 'express'
import { CreateNoteService } from '../../services/notes.service/CreateNotes.service'

export class CreateNotes {
    async handle(req: Request, res: Response){
        const {user_id, content_text} = req.body
  
        const notes = new CreateNoteService()
        const result = await notes.execute({user_id, content_text})

        res.status(200).send(result)
    }
}