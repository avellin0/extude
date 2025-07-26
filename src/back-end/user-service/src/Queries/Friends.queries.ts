import { db } from "../../database/client-db"
import { FriendsProps } from "../interface/Friends.interface"

export class friends {
    async createFriends({ friendOf, id }: FriendsProps) {
        const create = await db.query('INSERT INTO user_friends(user_id, friend_id) VALUES ($1, $2)', [friendOf, id])

        return create.rows
    }

    async GetFriends(id: string) {

        console.log("This is the user_id:", id);

        const research = await db.query('SELECT usuario.name From usuario INNER JOIN user_friends ON user_friends.friend_id = usuario.userId WHERE user_friends.user_id = $1', [id])

        return research.rows
    }
}