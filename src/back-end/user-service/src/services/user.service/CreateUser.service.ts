import { createHash } from "crypto"; 
import {UserProps} from "../../interface/CreateUser.interface"
import { User } from "../../Queries/User.queries";

export class CreateUserService{
    async execute({name,email,password,permissions}: UserProps){
            console.log(name,email,password,permissions);
            
            password = createHash('sha256').update(password).digest('hex')

            try{    

            const user_queries = new User()    

            await user_queries.VerifyUserEmail(email)
            const result =  await user_queries.CreateUser({name,email,password,permissions})

            return result

            }catch(err){
                console.log("esse é o erro:", err);
                throw new Error("Aconteceu algum erro com o service")
            }
    }
}