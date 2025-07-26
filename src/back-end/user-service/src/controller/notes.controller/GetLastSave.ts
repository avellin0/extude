import {Response,Request} from 'express'
import { LastSaveNotes } from '../../services/notes.service/GetLastSave.service'

export class GetLastSave{
    async handle(req:Request,res:Response){
        const {id} = req.params

        const user = new LastSaveNotes()
        const result = await user.execute(id)

        res.status(200).send(result)
    }
}