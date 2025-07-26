import { Request, Response } from "express";
import { GetFriendService } from "../../services/friend.service/GetFriends.service";

export class GetFriends{
    async handle(req:Request,res:Response){
        const {id} = req.body;
        
        const research = new GetFriendService()
        const result = await research.execute(id)

        res.status(200).send(result)
    }
}