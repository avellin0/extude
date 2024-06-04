import { db } from '../database/client-db';
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken';

export const signIn = async (req: Request,res: Response) => {
        const {teacher_id} = req.body;

    try {

        const teachers_id = await fetchTeachers(teacher_id)
        const teacher = await teachers_id.rows[0].teacher_id
        const teacher_Access = await fetchTeachersAccess(teacher_id) 
        const access = await teacher_Access.rows[0].role

        const MY_SECRET_KEY= process.env.MY_SECRET_KEY
    

        if (!MY_SECRET_KEY) {
            throw new Error("Chave Secreta não fornecida!");
        }

        const token = sign({
            userid: teacher,
            Access: access
        },MY_SECRET_KEY,{
            algorithm: "HS256",
            expiresIn: "1h"
        })

        res.json(token)

    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }

    async function fetchTeachers(id:any){
        const result = await db.query('SELECT * FROM teachers WHERE teacher_id = $1', [id])
        if(result.rows.length === 0){
            throw new Error("Teacher's informations not found")
        }
        return result
    }

    async function fetchTeachersAccess(id:any){
        const result = await db.query('SELECT role FROM teachers WHERE teacher_id = $1', [id])
        if(result.rows.length === 0){
            throw new Error("Teacher's informations not found")
        }
        return result
    }
}