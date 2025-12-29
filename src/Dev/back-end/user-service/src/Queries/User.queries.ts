import { db } from "../../database/client-db";
import { UserProps } from "../interface/CreateUser.interface"

export class User {

    async VerifyUserEmail(email: string) {
        try {
            const alreadyHaveAccount = await db.query('SELECT * FROM users WHERE email = $1', [email])

            if (alreadyHaveAccount.rows.length <= 0) {
                console.log('Email ainda não registrado');
                throw new Error('Usuário não encontrado');
            }

            return alreadyHaveAccount.rows

        } catch (err) {
            console.log("this is the error", err);
            return false
        }
    }

    async CreateUser({ name, email, password }: UserProps) {
        try {
            const create = await db.query(`
                INSERT INTO users(id,name,email,password) 
                VALUES(uuid_generate_v4(),$1,$2,$3)
                `,
                [name, email, password]
            )

            return create.rows

        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Erro ao criar novo users")
        }
    }

    async findUsername(id: string) {
        try {
            if (typeof (id) !== "string") {
                console.log("o id não é uma string");
                console.log("Esse é o id:", typeof (id));

            }

            const getUserInfo = await db.query("SELECT name FROM users WHERE id = $1", [id])

            return getUserInfo.rows

        } catch (err) {
            console.log("this is the error:", err);
            throw new Error("Erro ao buscar 'name' de 'users' pelo 'userid' ")
        }
    }

    async findUserid(email: string) {
        try {
            const research = await db.query('SELECT id FROM users WHERE email = $1', [email])
            console.log(research.rows);

            return research.rows

        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Ocorreu um erro na busca de id do users")
        }

    }

    async findUserById(id: string) {
        try {
            const research = await db.query('SELECT * FROM users WHERE id = $1', [id])
            console.log(research.rows);

            return research.rows

        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Ocorreu um erro na busca de id do users")
        }

    }

    async findUserByName(name: string) {
        try {
            const research = await db.query('SELECT * FROM users WHERE name = $1', [name])
            console.log("esse é o resultado da busca do nome", research.rows);

            return research.rows

        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Ocorreu um erro na busca de name do users")
        }

    }

    async listAllUsers() {
        try {
            const list = await db.query('SELECT id, name, email FROM users')
            return list.rows
        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Ocorreu um erro na listagem de users")
        }
    }

    async VerifyEmailAndPassword(email: string, password: string) {
        try {
            const alreadyHaveAccount = await db.query('SELECT * FROM users WHERE email = $1', [email])

            if (alreadyHaveAccount.rows.length <= 0) {
                console.log('Email ainda não registrado');
                throw new Error('Usuário não encontrado');
            }

            const user_account = await db.query('SELECT')

        } catch (err) {
            console.log("this is the error", err);
            throw new Error("Erro ao Verificar email do users")
        }
    }

}
