import { db } from "database/client-db";
import { UserProps } from "../interface/CreateUser.interface"

export class User {

    async VerifyUserEmail(email: string) {
        try {
            const alreadyHaveAccount = await db.query('SELECT * FROM usuario WHERE email = $1', [email])

            if (alreadyHaveAccount.rows.length < 0) {
                console.log('Email ainda não registrado');
                throw new Error('Usuário não encontrado');
            }

            return alreadyHaveAccount.rows

        } catch (err) {
            console.log("this is the error", err);
            throw new Error("Erro ao Verificar email do usuario")
        }
    }

    async CreateUser({ name, email, password, permissions }: UserProps) {
        try {
            const create = await db.query(`
                INSERT INTO Usuario(userId,name,email,password,permission) 
                VALUES(uuid_generate_v4(),$1,$2,$3,$4)
                `,
                [name, email, password, permissions]
            )

            return create.rows

        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Erro ao criar novo usuario")
        }
    }

    async findUsername(id: string) {
        try {
            if (typeof (id) !== "string") {
                console.log("o id não é uma string");
                console.log("Esse é o id:", typeof (id));

            }

            const getUserInfo = await db.query("SELECT name FROM Usuario WHERE userid = $1", [id])

            return getUserInfo.rows

        } catch (err) {
            console.log("this is the error:", err);
            throw new Error("Erro ao buscar 'name' de 'Usuario' pelo 'userid' ")
        }
    }

    async findUserid(email: string) {
        try {
            const research = await db.query('SELECT userid FROM usuario WHERE email = $1', [email])
            console.log(research.rows);

            return research.rows
        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Ocorreu um erro na busca de id do usuario")           
        }

    }
}