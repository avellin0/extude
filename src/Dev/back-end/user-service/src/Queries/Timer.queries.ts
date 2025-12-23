import { db } from "../../database/client-db";

export class Timer{

    async getTimeStudiedToday(user_id:string, ultima_atualizacao:string){
        const research = await db.query('SELECT * FROM study_sessions WHERE user_id = $1 AND session_date = $2', [user_id, ultima_atualizacao])

        if(research.rows.length === 0){
            await db.query('INSERT INTO study_sessions(user_id, duration) VALUES ($1, $2)', [user_id, '0'])
            return { totalEstudado: '0', ultima_atualizacao }
        }

        console.log("Resultado do getTimeStudiedToday:", research.rows);
        

        return research.rows
    }

    async updateTimeStudiedToday(user_id:string, duration:number, session_date:string){
        const update = await db.query('UPDATE study_sessions SET duration = $1 WHERE user_id = $2 AND session_date = $3', [duration, user_id, session_date])

        return update.rows
    }

    async createStudySession(user_id:string, duration:number){
        const create = await db.query('INSERT INTO study_sessions(user_id, duration) VALUES ($1, $2)', [user_id, duration])

        return create.rows
    }

    async GetYesterdayDate(user_id:string){
        const yesterday = await db.query('SELECT * FROM study_sessions WHERE session_date = CURRENT_DATE - INTERVAL \'1 day\' AND user_id = $1', [user_id])
        
        if(yesterday.rows.length === 0){
            return [{duration: 0}]
        }
        
        return yesterday.rows
    }

    async BestTimerStreak(user_id:string){
        const best_streak = await db.query(`SELECT MAX(duration) FROM study_sessions WHERE user_id = $1`, [user_id])
        
        if(best_streak.rows.length === 0){
            return [{max: 0}]
        }
        
        return best_streak.rows
    }

}