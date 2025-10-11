import { GetLastTimer} from "../../services/timer.service/GetLastTimer";
import { Request, Response } from "express";
import { User } from "../../Queries/User.queries";

export class GetTimer {
    async handle(request: Request, response: Response) {
        const { username, session_date } = request.body;

        const user = new User();

        console.log("Procurando user:", username);
        console.log("Data da sessão:", session_date);
        

        const userId = await user.findUserByName(username);

        if (!userId) {
            throw new Error("User not found");
        }

        const getLastTimer = new GetLastTimer();
        const result = await getLastTimer.execute({ userId: userId[0].id, ultima_atualizacao: session_date });

        return response.json(result);
    }
}