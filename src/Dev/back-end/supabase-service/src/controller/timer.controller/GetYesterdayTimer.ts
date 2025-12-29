import { GetYesterdayTimerService} from "../../services/timer.service/GetYesterdayTimer";
import { Request, Response } from "express";
import { User } from "../../Queries/User.queries";

type GetYesterdayTimerResult = {
    id: string;
    user_id: string;
    session_date: string;
    duration: number;
};


export class GetYesterdayTimer {
    async handle(request: Request, response: Response) {
        const { username} = request.body;

        const user = new User();

        console.log('Username:', username);

        const userId = await user.findUserByName(username);
        const id = userId ? userId[0].id : null;


        if (!userId) {
            throw new Error("User not found");
        }

        const getYesterdayTimer = new GetYesterdayTimerService();
        const result: GetYesterdayTimerResult[] = await getYesterdayTimer.execute({ userId: id });

        console.log('Yesterday Timer Result:', result[0].duration);


        return response.json(result[0].duration);
    }
}