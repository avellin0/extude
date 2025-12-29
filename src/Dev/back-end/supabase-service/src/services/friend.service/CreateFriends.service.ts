import { friends } from "../../Queries/Friends.queries";

interface FriendsProps{
    friendOf: string
    id: string,
    status?: string
}

export class CreateFriendService{
    async execute({friendOf, id, status}: FriendsProps){      
          
        const new_friends = new friends()
        const result = await new_friends.createFriends({friendOf, id, status})

        return result
    }
}