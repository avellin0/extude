import {User} from "../../Queries/User.queries"
export class GetUserInentificator{
    async execute(email: string){
        const query = new User()

        const result = await query.findUserid(email)

        return result
    }
}