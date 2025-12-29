import { Request, Response } from "express";
import { Userinfo } from "../../services/user.service/GetStudentes.service";
import { createHash } from "crypto"


export class VerifyAccountLogin {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const userInfoByEmail = new Userinfo()
            const result = await userInfoByEmail.execute(email)

            if (!result) {
                return res.status(400).send({ message: "Usuario não encontrado" })
            }

            const hashedPassword = createHash('sha256').update(password).digest('hex')

            if (result[0].password !== hashedPassword) {
                throw new Error("Senha incorreta")
            }


            res.status(200).send(result)

        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Erro ao buscar informações do usuario pelo email, verifique: VerifyUserLogin")
        }

    }
}


