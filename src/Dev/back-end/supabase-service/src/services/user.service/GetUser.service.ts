import { User } from "../../Queries/User.queries"

export class Username {
    async execute(id: string) {
        const query = new User()
        
        try {
            const result = await query.findUsername(id)

            return { message: "Usuario encontrado", data: result }
        
        }catch(error){
            console.log("this is the error:", error);
            throw new Error("Erro ao buscar username pelo service")
        }
    }
}