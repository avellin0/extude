import {Response,Request} from 'express'
import {db} from "../database/client-db"

export class GetLastSave{
    async handle(req:Request,res:Response){
        const {id} = req.params

        const research = await db.query("SELECT MAX(date) AS last_date FROM notes WHERE user_id = $1;", [id])
        console.log(research.rows[0].last_date);

        const LatestDate = research.rows[0].last_date
        console.log(`${LatestDate}'`);
        
        const LatestNote = await db.query("SELECT content FROM notes WHERE user_id = $1 ", [id])
        console.log(LatestNote.rows);
        
        res.status(200).send(LatestNote.rows[LatestNote.rows.length - 1])
        
    }
}