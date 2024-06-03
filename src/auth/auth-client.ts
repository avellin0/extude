import { db } from '../database/client-db';
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken';

export const signIn = async (req: Request,res: Response) => {
    try {
        const {userid, name} = req.body;

        const MY_SECRET_KEY= process.env.MY_SECRET_KEY


        if (!MY_SECRET_KEY) {
            throw new Error("Chave Secreta não fornecida!");
        }

        const token = sign({
            userid: userid,
            Access: name
        },MY_SECRET_KEY,{
            algorithm: "HS256",
            expiresIn: "1h"
        })

        res.json(token)

    } catch (error) {
        
    }
}