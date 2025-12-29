import { GetYesterdayInterface } from "../../interface/Timer/GetYesterday.interface";
import { Timer } from "../../Queries/Timer.queries";

export class GetYesterdayTimerService {
    async execute({userId}: GetYesterdayInterface) {

        const timer = new Timer();
        return timer.GetYesterdayDate(userId);
    }
}