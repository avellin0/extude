import { log } from "console"
import { db } from "../../database/client-db"
import { FriendsProps } from "../interface/Friends.interface"
import { User } from "./User.queries"

export class friends {
    async createFriends({ friendOf, id, status }: FriendsProps) {
        const create = await db.query('INSERT INTO friends(user_id, friend_id, status) VALUES ($1, $2, $3)', [friendOf, id, status])

        return create.rows
    }

    async GetFriends(id: string) {
        const research = await db.query('SELECT * From users INNER JOIN friends ON friends.friend_id = users.id WHERE friends.user_id = $1', [id])

        console.log("this is the research:", research.rows);
        

        return research.rows
    }
}