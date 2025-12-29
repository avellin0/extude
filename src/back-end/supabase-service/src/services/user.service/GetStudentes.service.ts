import { User } from "../../Queries/User.queries"

export class Userinfo {
    async execute(email: string): Promise<any[]> {
        const query = new User()
        
        try {
            
            const result = await query.VerifyUserEmail(email)

            
            if(!result){
                throw new Error("Usuario não encontrado")
            }

            return result 
        
        }catch(error){
            console.log("this is the error:", error);
            throw new Error("Erro ao verificar email do usuario pelo service")
        }
    }
}
