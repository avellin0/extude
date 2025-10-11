import { GetTimerInterface } from "../../interface/Timer/GetTimer.interface";
import { Timer } from "../../Queries/Timer.queries";

export class GetLastTimer {
    async execute({userId,ultima_atualizacao}: GetTimerInterface) {

        const timer = new Timer();
        const result = await timer.getTimeStudiedToday(userId, ultima_atualizacao);

        console.log("Resultado do GetLastTimer:", result);

        return result;

    }
}