import { Request, Response } from "express";
import { GetFriendService } from "../../services/friend.service/GetFriends.service";
import { User } from "src/Queries/User.queries";


export class GetFriends{
    async handle(req:Request,res:Response){
        const {user_name} = req.body;
        
        const user = new User()
        const userid = await user.findUserByName(user_name)


        const research = new GetFriendService()
        const result = await research.execute(userid[0].id)


        res.status(200).json({message: "Friends found", data: result} )
    }
}