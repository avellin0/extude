import { Request, Response } from "express";
import { CreateTimer } from "../../services/timer.service/CreateTimer"
import { User } from "../../Queries/User.queries";

export class CreateTimerController {

    async handle(request: Request, response: Response) {
        const { username, duration } = request.body;

        if(duration <= 0 || typeof duration !== 'number'){
            throw new Error("Duration must be greater than zero");
        }

        const user = new User();
        const userId = await user.findUserByName(username);

        console.log('User ID:', userId);
        

        if (!userId) {
            throw new Error("User not found");
        }


        const createTimer = new CreateTimer();
        const result = await createTimer.execute({ userId: userId[0].id, duration });

        return response.json(result);
    }
}