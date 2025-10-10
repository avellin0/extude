import { BestTimerService} from "../../services/timer.service/BestTimer";
import { Request, Response } from "express";
import { User } from "../../Queries/User.queries";

export class BestTimer {
    async handle(request: Request, response: Response) {
        const { username} = request.body;

        const user = new User();

        console.log('Username:', username);

        const userId = await user.findUserByName(username);

        console.log('User ID:', userId);
        

        if (!userId) {
            throw new Error("User not found");
        }

        const getBestTimer = new BestTimerService();
        const result = await getBestTimer.execute(userId[0].id);

        return response.json(result);
    }
}