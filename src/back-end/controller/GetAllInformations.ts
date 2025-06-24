import { Request, Response } from "express";
import { db } from "database/client-db";

export class AllInfo{
    async handle(req:Request,res:Response){
        const {username} = req.body

        const response = await db.query('SELECT * FROM Usuario WHERE name = $1',[username])

        res.status(200).json(response.rows)
    }
}