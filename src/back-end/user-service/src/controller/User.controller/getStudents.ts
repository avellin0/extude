import { Request, Response } from "express";
import { Userinfo } from "src/services/user.service/GetStudentes.service";

export class GetStudents {
    async handle(req: Request, res: Response) {
        const { email } = req.body

        try {
            const userInfoByEmail = new Userinfo()
            const result = await userInfoByEmail.execute(email)

            res.status(200).send(result)
            
        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Erro ao buscar informações do usuario pelo email")
        }

    }
}

