import { Request, Response } from "express";
import {GetUserIndentificator} from "../../services/user.service/GetIndentificator.service";

export class GetId {
   async handle(req: Request, res: Response){
        const {email} = req.params

        const user = new GetUserIndentificator()
        const result = await user.execute(email)
        
        res.status(200).send(result)
    }
}