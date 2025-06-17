import { friends } from "src/Queries/Friends.queries";

export class GetFriendService{
    async execute(id: string){
        const Getfriends = new friends()
        const result = await Getfriends.GetFriends(id)

        return result
    }
}