import { supabase } from "../../database/client-db";
import { UserProps } from "../interface/CreateUser.interface"

export class User {

    async VerifyUserEmail(email: string) {
        try {
            const alreadyHaveAccount = await supabase.from('app_users').select('*').eq("email", email)

            if (alreadyHaveAccount.data!.length <= 0) {
                console.log('Email ainda não registrado');
                throw new Error('Usuário não encontrado');
            }

            return alreadyHaveAccount.data

        } catch (err) {
            console.log("this is the error", err);
            return false
        }
    }

    async CreateUser({ name, email, password }: UserProps) {

        try {


            const create = await supabase.from('app_users').insert({ "name": name, "email": email, "password": password })

            return create.data

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

            const getUserInfo = await supabase.from('app_users').select('name').eq('id', id)

            return getUserInfo.data

        } catch (err) {
            console.log("this is the error:", err);
            throw new Error("Erro ao buscar 'name' de 'users' pelo 'userid' ")
        }
    }

    async findUserid(email: string) {
        try {
            const research = await supabase.from('app_users').select('id').eq('email', email)
            console.log(research.data);

            return research.data

        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Ocorreu um erro na busca de id do users")
        }

    }

    async findUserById(id: string) {
        try {
            const research = await supabase.from('users').select('*').eq('id', id)
            console.log(research.data);

            return research.data

        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Ocorreu um erro na busca de id do users")
        }

    }

    async findUserByName(name: string) {
        try {
            const research = await supabase.from('app_users').select('*').eq('name', name)
            console.log("esse é o resultado da busca do nome", research.data);

            return research.data

        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Ocorreu um erro na busca de name do users")
        }

    }

    async listAllUsers() {
        try {
            const list = await supabase.from('users').select('id, name, email')
            return list.data
        } catch (error) {
            console.log("this is the error:", error);
            throw new Error("Ocorreu um erro na listagem de users")
        }
    }

    async VerifyEmailAndPassword(email: string, password: string) {
        try {
            const alreadyHaveAccount = await supabase.from('users').select('*').eq('email', email)

            if (alreadyHaveAccount.data!.length <= 0) {
                console.log('Email ainda não registrado');
                throw new Error('Usuário não encontrado');
            }

            const user_account = await supabase.from('users').select('*').eq('email', email).eq('password', password)

        } catch (err) {
            console.log("this is the error", err);
            throw new Error("Erro ao Verificar email do users")
        }
    }

}
