import { Request, Response } from "express";
import { db } from "../database/client-db";
import { Students } from "../CreateFactories/Students-factory";

export class getStudents{
    async handle(req:Request, res: Response){
        const {student_id} = req.body

        const research = await db.query('SELECT * FROM students WHERE student_id = $1', [student_id])

        const user = {
            userid: research.rows[0].name,
            name: research.rows[0].name,
            age: research.rows[0].age,
            classe: research.rows[0].classe,
            access: research.rows[0].access
        }

        const infoStudent = new Students(user.userid, user.name, user.age, user.classe, user.access).infoStudent()
        console.log(await infoStudent)
        res.send(research.rows)
    }
}