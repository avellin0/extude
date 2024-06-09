import { NextFunction, Request, Response } from "express"
import { db } from "../database/client-db"
import { verify} from "jsonwebtoken"

export function authmiddleware(permissions?: string[]){

    interface DecodeUser {
        userid: number,
        Access: string
    }

    return async (req: Request, res:Response, next:NextFunction) => {


        const authheader = req.headers.authorization

        if(!authheader || !authheader.startsWith('Bearer ')){
            return res.status(500).json({message: "token não informado"})
        }

        const token = authheader.substring(7)
    
    
        try {
            
            const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

            if(!MY_SECRET_KEY){
                return res.status(500).json({message: "chave secreta não informada"})
            }

            const verificacao = verify(token,MY_SECRET_KEY) as DecodeUser


            const access = await fetchTeachersAccess(verificacao.userid)
            const access_name = access.rows[0].name

            const hasPermissions = permissions?.some((p) => access_name.includes(p))            

            if(! hasPermissions){
                return res.status(403).json({message: "permissão negada."})
            }


            async function fetchTeachersAccess(id: number){
                const result = await db.query('SELECT role FROM teachers WHERE teacher_id = $1', [id])
                if(result.rows.length === 0){
                    throw new Error("Teacher's informations not found")
                }
                return result
            }
    

            return next()

        } catch (error) {
            res.status(401).json({message: "deu merda!"})
        }


    }


}