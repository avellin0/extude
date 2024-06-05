import { config } from "dotenv";
config({path: "./Users/Plogl/Lessons/Projects/SchoolSchedule/src/.env"})
import { db } from '../database/client-db';
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken';

export const signIn = async (req: Request,res: Response) => {

    try {

        const {teacher_id} = req.body;

        const teachers_id = await fetchTeachers(teacher_id)
        const teacher = await teachers_id.rows[0].teacher_id
        const teacher_role = await fetchTeachersAccess(teacher_id)

        const MY_SECRET_KEY = process.env.MY_SECRET_KEY
    

        if (!MY_SECRET_KEY) {
            throw new Error("Chave Secreta não fornecida!");
        }

        const token = sign({
            // userid: teacher,
            // userRole: teacher_role.rows[0]
        },MY_SECRET_KEY,{
            algorithm: "HS256",
            expiresIn: "1h"
        })

        res.json({message: "hello"})

    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }


    async function fetchTeachers(id: number){
        const result = await db.query('SELECT * FROM teachers WHERE teacher_id = $1', [id])
        if(result.rows.length === 0){
            throw new Error("Teacher's informations not found")
        }
        return result
    }

    async function fetchTeachersAccess(id: number){
        const result = await db.query('SELECT role FROM teachers WHERE teacher_id = $1', [id])
        if(result.rows.length === 0){
            throw new Error("Teacher's informations not found")
        }
        return result
    }
}