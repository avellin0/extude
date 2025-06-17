import { db } from "database/client-db";
import { friends } from "src/Queries/Friends.queries";

interface FriendsProps{
    friendOf: string
    id: string
}

export class CreateFriendService{
    async execute({friendOf, id}: FriendsProps){        
        const new_friends = new friends()
        const result = await new_friends.createFriends({friendOf, id})

        return result
    }
}