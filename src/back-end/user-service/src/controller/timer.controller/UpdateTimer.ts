import { UpdateTimerService } from "../../services/timer.service/UpdateTimer";
import { Request, Response } from "express";
import { User } from "../../Queries/User.queries";
import { GetLastTimer } from "../../services/timer.service/GetLastTimer";




export class UpdateTimer {
    async handle(request: Request, response: Response) {
        const { username, duration, session_date } = request.body;

        const user = new User();

        console.log('Username:', username);
        
        const userId = await user.findUserByName(username);

        if (!userId) {
            throw new Error("User not found");
        }


        


        const ultimas_horas = new GetLastTimer()
        const ultima_atualizacao:any = await ultimas_horas.execute({userId: userId[0].id, ultima_atualizacao: session_date})
        
        const newTimer = ultima_atualizacao[0].duration + duration
        
        console.log('Ultima Atualizacao:', ultima_atualizacao[0].duration);

        const updateTimer = new UpdateTimerService();
        const result = await updateTimer.execute({ userId: userId[0].id, duration: newTimer, session_date });

        return response.json(result);
    }
}
