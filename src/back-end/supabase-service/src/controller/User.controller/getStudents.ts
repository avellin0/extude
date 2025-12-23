import { Request, Response } from "express";
import { Userinfo } from "../../services/user.service/GetStudentes.service";

export class GetStudentByEmail {
    async handle(req: Request, res: Response) {
        const { email } = req.params

        try {
            const userInfoByEmail = new Userinfo()
            const result = await userInfoByEmail.execute(email)

            console.log("Esse é o resultado do controller:", result);
            

            res.status(200).send(result)
            
        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Erro ao buscar informações do usuario pelo email")
        }

    }
}

