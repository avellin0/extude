import {Request,Response} from "express"
import {db} from "../database/client-db" 

export class CreateFriends{
    async handle(req:Request,res:Response){
        const {friendOf, id} = req.body;
    
        console.log("It's that info received:", friendOf, id);
        
        const create = await db.query('INSERT INTO user_friends(user_id, friend_id) VALUES ($1, $2)', [friendOf, id])

        res.status(200).send(create.rows)

    }
}