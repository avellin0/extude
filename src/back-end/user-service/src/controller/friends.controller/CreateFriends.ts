import {Request,Response} from "express"
import { CreateFriendService } from "../../services/friend.service/CreateFriends.service";

export class CreateFriends{
    async handle(req:Request,res:Response){
        const {friendOf, id} = req.body;
        
        const friends = new CreateFriendService()
        const result =  await friends.execute({friendOf, id})

        res.status(200).send(result)

    }
}