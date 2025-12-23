import { supabase } from "../../database/client-db";

export class Timer{

    async getTimeStudiedToday(user_id:string, ultima_atualizacao:string){
        const research = await supabase.from('study_sessions').select('*').eq('user_id', user_id).eq('session_date', ultima_atualizacao)

        if(research.data!.length === 0){
            await supabase.from('study_sessions').insert({user_id, duration: '0'})
            return { totalEstudado: '0', ultima_atualizacao }
        }

        console.log("Resultado do getTimeStudiedToday:", research.data);

        return research.data
    }

    async updateTimeStudiedToday(user_id:string, duration:number, session_date:string){
        const update = await supabase.from('study_sessions').update({duration}).eq('user_id', user_id).eq('session_date', session_date)
        return update.data
    }

    async createStudySession(user_id:string, duration:number){
        const create = await supabase.from('study_sessions').insert({user_id, duration})

        return create.data
    }

    async GetYesterdayDate(user_id:string){
        const yesterday = await supabase.from('study_sessions').select('*').eq('session_date', 'CURRENT_DATE - INTERVAL \'1 day\'').eq('user_id', user_id)
        
        if(yesterday.data!.length === 0){
            return [{duration: 0}]
        }
        
        return yesterday.data
    }

    async BestTimerStreak(user_id:string){
        const best_streak = await supabase.from('study_sessions').select('MAX(duration) as max').eq('user_id', user_id)

        if(best_streak.data!.length === 0){
            return [{max: 0}]
        }
        
        return best_streak.data
    }

}