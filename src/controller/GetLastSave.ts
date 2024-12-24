import {Response,Request} from 'express'
import {db} from "../database/client-db"

export class GetLastSave{
    async handle(req:Request,res:Response){
        const {id} = req.params

        const research = await db.query("SELECT MAX(date) AS last_date FROM notes WHERE user_id = $1;", [id])
        console.log(research.rows[0].last_date);

        const teste = research.rows[0].last_date
        console.log(`${teste}'`);
        


        
        const OtherResearch = await db.query("SELECT content FROM notes WHERE date = $1 ", [research.rows[0].last_date])
        console.log(OtherResearch.rows);
        
        res.status(200).send(OtherResearch.rows)
        
    }
}