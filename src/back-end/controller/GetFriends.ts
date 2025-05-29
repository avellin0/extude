import { Request, Response } from "express";
import { db } from "../database/client-db";

export class GetFriends{
    async handle(req:Request,res:Response){
        const {id} = req.body;

        console.log("This is the user_id:", id);


        const research = await db.query('SELECT Usuario.name From Usuario INNER JOIN user_friends ON user_friends.friend_id = Usuario.userId WHERE user_friends.user_id = $1', [id])
        
        res.status(200).send(research.rows)
    }
}