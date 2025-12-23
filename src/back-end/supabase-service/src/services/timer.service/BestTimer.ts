import { Timer } from "../../Queries/Timer.queries";

export class BestTimerService {
    async execute(userId: string) {
        try {
            const timer = new Timer();
            return timer.BestTimerStreak(userId);

        } catch (err) {
            throw new Error("Error creating timer");
        }
    }
}