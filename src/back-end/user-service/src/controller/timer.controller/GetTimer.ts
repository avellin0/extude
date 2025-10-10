import { GetLastTimer} from "../../services/timer.service/GetLastTimer";
import { Request, Response } from "express";
import { User } from "../../Queries/User.queries";
import { log } from "node:console";

export class GetTimer {
    async handle(request: Request, response: Response) {
        const { username, ultima_atualizacao } = request.body;

        const user = new User();

        console.log('Username:', username);
        log('Ultima Atualizacao:', ultima_atualizacao.toString());

        const userId = await user.findUserByName(username);

        console.log('User ID:', userId);
        

        if (!userId) {
            throw new Error("User not found");
        }

        const getLastTimer = new GetLastTimer();
        const result = await getLastTimer.execute({ userId: userId[0].id, ultima_atualizacao });

        return response.json(result);
    }
}