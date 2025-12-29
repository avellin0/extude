import { supabase } from "../../database/client-db"
import { FriendsProps } from "../interface/Friends.interface"

export class friends {
    async createFriends({ friendOf, id, status }: FriendsProps) {
        const create = await supabase.from('friends').insert({ user_id: friendOf, friend_id: id, status })

        return create
    }

    async GetFriends(id: string) {
        const research = await supabase.from('friends').select('*').eq('user_id', id)
        
        return research
    }
}