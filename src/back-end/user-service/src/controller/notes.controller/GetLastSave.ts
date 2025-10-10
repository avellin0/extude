import { Response, Request } from 'express'
import { LastSaveNotes } from '../../services/notes.service/GetLastSave.service'
import { User } from 'src/Queries/User.queries'

export class GetLastSave {
    async handle(req: Request, res: Response) {
        const {user_name } = req.params

        const user = new User()
        const userid = await user.findUserByName(user_name)


        const notes = new LastSaveNotes()
        const result = await notes.execute(userid[0].id)

        res.status(200).json({message: "isValid", data: result})
    }
}