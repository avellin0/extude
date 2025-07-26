import { User } from "../../Queries/User.queries"

export class Userinfo {
    async execute(email: string) {
        const query = new User()
        
        try {
            const result = await query.VerifyUserEmail(email)

            return { message: "Usuario encontrado", data: result }
        
        }catch(error){
            console.log("this is the error:", error);
            throw new Error("Erro ao verificar email do usuario pelo service")
        }
    }
}