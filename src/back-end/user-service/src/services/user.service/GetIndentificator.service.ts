import {User} from "../../Queries/User.queries"

export class GetUserIndentificator{
    async execute(email: string){
        const query = new User()

        const result = await query.findUserid(email)

        return result
    }
}