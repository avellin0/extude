import { UpdateTimerInterface } from "src/interface/Timer/UpdateTimer.interface";
import { Timer } from "../../Queries/Timer.queries";

export class UpdateTimerService {
    async execute({ userId, duration, session_date}: UpdateTimerInterface) {
        const timer = new Timer();
        return timer.updateTimeStudiedToday(userId, duration, session_date);

    }
}