import {Request,Response} from "express"
import { CreateFriendService } from "../../services/friend.service/CreateFriends.service";
import {User} from "../../Queries/User.queries"
import { log } from "console";

export class CreateFriends{
    async handle(req:Request,res:Response){
        const {friend_email,name,status} = req.body;
        
        const user = new User()
        const verifyUser = async(userId:string) => await user.findUserByName(userId)


        const verifyId = await verifyUser(name)
        const verifyFriendOf = await verifyUser(friend_email)

        if(!verifyId || !verifyFriendOf) {
            return res.status(404).send("User not found")
        }

        log("verifyId:", verifyId);
        log("verifyFriendOf:", verifyFriendOf);

        const friends = new CreateFriendService()
        const result =  await friends.execute({friendOf: verifyFriendOf[0].id, id: verifyId[0].id, status})

        res.status(200).json({message: "Friend created successfully", data: result})

    }
}