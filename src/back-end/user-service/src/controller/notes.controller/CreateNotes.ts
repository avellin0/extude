import {Request, Response} from 'express'
import { CreateNoteService } from '../../services/notes.service/CreateNotes.service'
import { User } from 'src/Queries/User.queries'

export class CreateNotes {
    async handle(req: Request, res: Response){
        const {user_name, content_text} = req.body
  

        const user = new User()
        const userid = await user.findUserByName(user_name)

        console.log("esse é o userid",userid)

        const id: string = userid[0].id

        const notes = new CreateNoteService()
        const result = await notes.execute({user_id: id, content_text})

        res.status(200).send(result)
    }
}