import { GetTimerInterface } from "../../interface/Timer/GetTimer.interface";
import { Timer } from "../../Queries/Timer.queries";

export class GetLastTimer {
    async execute({userId,ultima_atualizacao}: GetTimerInterface) {

        const timer = new Timer();
        return timer.getTimeStudiedToday(userId, ultima_atualizacao);
    }
}