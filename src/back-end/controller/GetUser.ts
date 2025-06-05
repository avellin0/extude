import { Request, Response } from "express";
import { db } from "../database/client-db";

export class GetUser{
    async handle(req:Request,res:Response){
        const {id} = req.body;
    
        if(typeof(id) !== "string"){
            console.log("o id não é uma string");
            console.log("Esse é o id:", typeof(id));
            
        }
        
        const getUserInfo = await db.query("SELECT name FROM usuario WHERE userid = $1", [id])

        console.log(getUserInfo.rows);
        

        res.status(200).send(getUserInfo.rows)
    } 
}