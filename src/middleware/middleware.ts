import { config } from "dotenv";
config({ path: "Users/plogl/Lessons/Projects/SchoolSchedule/src/.env" });
import { NextFunction, Request, Response } from "express"
import { db } from "../database/client-db"
import { verify} from "jsonwebtoken"

export function authMiddleware(permissions?: string[]){

    interface DecodeUser {
        userid: number,
        userRole: { 
             access: number
        },
        access: number
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

            const decoded = verify(token,MY_SECRET_KEY) as DecodeUser

    
            const access = await fetchTeachersAccess(decoded.userid)
            const access_name = await fetchSchoolAccessName(decoded.access)


            const userPermissions = access_name.rows[0].role
            const hasPermissions = permissions?.some((p) => userPermissions.includes(p))            

            

            if(! hasPermissions){
                return res.status(403).json({message: "permissão negada."})
            }



            return next()

        } catch (error) {
            res.status(401).json({message: "deu merda!"})
        }

        async function fetchTeachersAccess(id: number){
            const result = await db.query('SELECT access FROM teachers WHERE teacher_id = $1', [id])
            if(result.rows.length === 0){
                throw new Error("Teacher's informations not found")
            }
            return result
        }
        
        async function fetchStudentsAccess(id: number){
            const result = await db.query('SELECT access FROM students WHERE student_id = $1', [id])
            if(result.rows.length === 0){
                throw new Error("Teacher's informations not found")
            }
            return result
        }

        async function fetchSchoolAccessName(Accessid: number){
            const result = await db.query('SELECT role FROM School_Access WHERE School_Access_id = $1', [Accessid])
            if(result.rows.length === 0){
                throw new Error("Teacher's informations not found")
            }
            return result
        }


    }
}



