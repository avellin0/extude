import { Timer } from "../../Queries/Timer.queries";
import { CreateTimerInterface } from "../../interface/Timer/CreateTimer.interface";

export class CreateTimer {
    async execute({ userId, duration }: CreateTimerInterface) {
        try {
            const timer = new Timer();
            return timer.createStudySession(userId, duration);

        } catch (err) {
            throw new Error("Error creating timer");
        }
    }
}